import { ethers } from "ethers";
import { useConnectWallet } from "@web3-onboard/react";
import {pinJSONToIPFS} from "./pinata";
import React, { useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import { doc, setDoc, addDoc, collection, getDocs, query } from 'firebase/firestore';
import "../index.css"
import ProposalABI from "../ABI/ProposalABI";
type Comment = {
    userId: string; // 사용자 ID
    text: string;
};

type Proposal = {
    id: number;
    title: string;
    description: string;
    comments: Comment[];
    votes: number;  // Add this line
};


const proposalsInitial: Proposal[] = [
    { id: 1, title: '산스크리트어 강의', description: '공학의 성지 인도에서 공부하기 위해 산스크리트어 학습', comments: [], votes: 0 },  // Add votes: 0
];






const VotePage: React.FC = () => {
    const [proposals, setProposals] = useState(proposalsInitial);
    const [newProposalTitle, setNewProposalTitle] = useState('');
    const [newProposalDescription, setNewProposalDescription] = useState('');
    const [showAddProposal, setShowAddProposal] = useState(false);
    const [comments, setComments] = useState<{[key: number]: string}>({});  // 각 제안에 대한 댓글 상태 관리
    const [newVotes, setNewVotes] = useState(0);

    // 여기서 사용자 정보를 받아와야 합니다. 현재는 임시로 "User123"으로 설정해두었습니다.
    const currentUser = auth.currentUser;
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  let ethersProvider;
    if (wallet) {
        ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any"); //ethers.BrowserProvider in v6
      }

      const handleVote = async (proposalId: number) => {
        // TODO: Implement actual voting logic
        await vote(proposalId);
    
        // Increase the vote count for the proposal
        const updatedProposals = proposals.map(p =>
            p.id === proposalId
                ? { ...p, votes: p.votes + 1 }
                : p
        );
    
        setProposals(updatedProposals);
    };
    

    const handleAddProposal = async () => {
        const newProposal = {
            id: proposals.length + 1,
            title: newProposalTitle,
            description: newProposalDescription,
            comments: [],
            votes: newVotes,
        };
        const CID = await upload(newProposalTitle, newProposalDescription);
        await resisterProposal(CID);

        try {
            await setDoc(doc(database, "proposals", newProposal.id.toString()), newProposal);
            setProposals([...proposals, newProposal]);
        } catch (error) {
            console.error("Error adding new proposal: ", error);
        }

        setShowAddProposal(false);
        setNewProposalTitle('');
        setNewProposalDescription('');
        setNewVotes(0);
    };

    const handleAddComment = (proposalId: number) => {
        const newComment: Comment = {
            userId: currentUser?.displayName ? currentUser.displayName : "Anonymous",
            text: comments[proposalId] || ''
        };
    
        addDoc(collection(database, "comments"), {
            comment: newComment.text,
            createdAt: Date.now(),
            username: currentUser?.displayName || "Anonymous",
            userID: currentUser?.uid,
            proposalId: proposalId  // 이 줄 추가
        })
    
        const updatedProposals = proposals.map(p =>
            p.id === proposalId
                ? { ...p, comments: [...p.comments, newComment] }
                : p
        );
    
        setProposals(updatedProposals);
        setComments({...comments, [proposalId]: ''});  // 해당 제안의 댓글 초기화
    };
    useEffect(() => {
        const loadProposalsFromFirestore = async () => {
            try {
                const q = query(collection(database, "proposals"));
                const querySnapshot = await getDocs(q);

                const loadedProposals: Proposal[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    loadedProposals.push({
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        comments: data.comments || []
                    });
                });

                setProposals(loadedProposals);
            } catch (error) {
                console.error("Error loading proposals from Firestore: ", error);
            }
        };
        const loadCommentsFromFirestore = async () => {
            const q = query(collection(database, "comments"));
            const querySnapshot = await getDocs(q);

            const loadedComments: { [proposalId: number]: Comment[] } = {};

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // 현재 예제에서는 proposalId를 어떻게 저장하는지 모르기 때문에 임의로 예시로 씁니다.
                // 실제 구현할 때는 적절한 proposalId 값을 사용하셔야 합니다.
                const proposalId = data.proposalId;  // 이 줄 수정

                if (!loadedComments[proposalId]) {
                    loadedComments[proposalId] = [];
                }

                loadedComments[proposalId].push({
                    userId: data.username,
                    text: data.comment
                });
            });

            const updatedProposals = proposals.map(p => {
                return {
                    ...p,
                    comments: loadedComments[p.id] || []
                };
            });

            setProposals(updatedProposals);
        };
        loadProposalsFromFirestore();
        loadCommentsFromFirestore();
    }, []);

    const resisterProposal = async (CID:string) => {
        const proposalContract = new ethers.Contract(ProposalCA, ProposalABI, ethersProvider.getSigner());
        const resister = await proposalContract.resisterProposal(CID);
        resister.wait();
      }
      const vote = async (num:uint32) => {
        const proposalContract = new ethers.Contract(ProposalCA, ProposalABI, ethersProvider.getSigner());
        const votes = await proposalContract.vote(num);
        votes.wait();
      }
    const ProposalCA = "0x6aE3424Fec66a9b2DC2a0ced3320077f2f3cDe49";
    const upload = async (name:string, description:string) => {
    
        // 2. 받아온 주소로 메타데이터 설정.
        const metadata = {                          
          name:  `${name}$` ,              // 제안 제목
          description: `${description}$`,  // 제안 설명
          attributes: [],
        };
    
        // 3. 메타데이터(file in IPFS, 이름, 설명)를 IPFS에 올려서 주소 받아오기.
        const jsonResult = await pinJSONToIPFS(metadata);  
    
        // 4. 받아온 주소로 nft 발행하기.
        //mint(`https://gateway.pinata.cloud/ipfs/${jsonResult.IpfsHash}`); 
        return jsonResult.IpfsHash; 
      };
      return (
        <div className="p-5 bg-white w-full min-h-screen m-auto text-black">
            <div className="sticky top-0 z-10 bg-white p-2 border-b">
                <h1 className="text-2xl font-bold mb-4">개설희망 강의 제안</h1>
                {showAddProposal ? (
                    <div>
                        <input
                            className="border p-2 rounded w-full mb-2"
                            placeholder="제목"
                            value={newProposalTitle}
                            onChange={(e) => setNewProposalTitle(e.target.value)}
                        />
                        <textarea
                            className="border p-2 rounded w-full mb-2 resize-y min-h-[50px] max-h-[150px]"
                            placeholder="내용"
                            value={newProposalDescription}
                            onChange={(e) => setNewProposalDescription(e.target.value)}
                        ></textarea>
                        <button className="bg-blue-500 text-white rounded px-5 py-2 hover:bg-blue-700 cursor-pointer" onClick={handleAddProposal}>제안하기</button>
                    </div>
                ) : (
                    <button className="bg-blue-500 text-white rounded px-5 py-2 hover:bg-blue-700 cursor-pointer mb-4" onClick={() => setShowAddProposal(true)}>개설 강의 제안하기</button>
                )}
            </div>
            <h2 className="text-xl font-bold mt-4 mb-2">제안 강의 목록</h2> {/* 추가된 부분 */}
            <ul className="list-decimal pl-5">
                {proposals.map((proposal) => (
                    <li key={proposal.id} className="mb-5 p-4 bg-white border rounded shadow">
                        <h2 className="text-xl mb-2">{proposal.title}</h2>
                        <p className="mb-2">{proposal.description}</p>
                        <button className="bg-blue-500 text-white rounded px-5 py-2 hover:bg-blue-700 cursor-pointer mb-2 mr-2" onClick={() => handleVote(proposal.id)}>투표하기</button>
                        <span>현재 득표수: {proposal.votes}표</span>
                        <textarea
                            className="border p-2 rounded w-full mb-2 resize-y min-h-[50px] max-h-[150px]"
                            placeholder="댓글 입력하기"
                            value={comments[proposal.id] || ''}
                            onChange={(e) => setComments({...comments, [proposal.id]: e.target.value})}
                        />
                        <button className="bg-blue-500 text-white rounded px-5 py-2 hover:bg-blue-700 cursor-pointer mb-2" onClick={() => handleAddComment(proposal.id)}>댓글 달기</button>
                        <ul className="list-decimal pl-5">
                            {proposal.comments.map((c, index) => (
                                <li key={index} className="mb-1 break-words">{c.userId}: {c.text}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );    
};

export default VotePage;