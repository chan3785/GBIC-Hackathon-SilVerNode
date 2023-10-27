import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth, database } from '../firebase';
import { doc, setDoc, addDoc, collection, getDocs, query } from 'firebase/firestore';


type Comment = {
    userId: string; // 사용자 ID
    text: string;
};

type Proposal = {
    id: number;
    title: string;
    description: string;
    comments: Comment[];
};

const proposalsInitial: Proposal[] = [
    { id: 1, title: 'Proposal 1', description: 'Description for proposal 1', comments: [] },
    { id: 2, title: 'Proposal 2', description: 'Description for proposal 2', comments: [] },
];

const Container = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    width: 100%;
    margin: 0 auto;
    color: black;
`;

const ProposalList = styled.ul`
    list-style: none;
    padding: 0;
    color: black;
`;

const ProposalItem = styled.li`
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const CommentList = styled.ul`
    list-style: none;
    padding-left: 0;
`;

const CommentTextArea = styled.textarea`
    width: 100%;
    resize: vertical;         // 수직으로만 크기 조절
    min-height: 50px;
    max-height: 150px;
`;

const CommentItem = styled.li`
    margin-bottom: 5px;
    word-break: break-word;   // 긴 단어나 URL에 대한 줄바꿈
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const VotePage: React.FC = () => {
    const [proposals, setProposals] = useState(proposalsInitial);
    const [newProposalTitle, setNewProposalTitle] = useState('');
    const [newProposalDescription, setNewProposalDescription] = useState('');
    const [showAddProposal, setShowAddProposal] = useState(false);
    const [comments, setComments] = useState<{[key: number]: string}>({});  // 각 제안에 대한 댓글 상태 관리

    // 여기서 사용자 정보를 받아와야 합니다. 현재는 임시로 "User123"으로 설정해두었습니다.
    const currentUser = auth.currentUser;

    const handleVote = (proposalId: number) => {
        // TODO: Implement actual voting logic
        console.log(`Voted for proposal: ${proposalId}`);
    };

    const handleAddProposal = async () => {
        const newProposal = {
            id: proposals.length + 1,
            title: newProposalTitle,
            description: newProposalDescription,
            comments: []
        };

        try {
            await setDoc(doc(database, "proposals", newProposal.id.toString()), newProposal);
            setProposals([...proposals, newProposal]);
        } catch (error) {
            console.error("Error adding new proposal: ", error);
        }

        setShowAddProposal(false);
        setNewProposalTitle('');
        setNewProposalDescription('');
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

    return (
        <Container>
            <h1>Vote Using Your Governance Token</h1>
            {showAddProposal ? (
                <div>
                    <input 
                        placeholder="Proposal Title" 
                        value={newProposalTitle} 
                        onChange={(e) => setNewProposalTitle(e.target.value)} 
                    />
                    <textarea 
                        placeholder="Proposal Description" 
                        value={newProposalDescription} 
                        onChange={(e) => setNewProposalDescription(e.target.value)}
                    ></textarea>
                    <Button onClick={handleAddProposal}>Submit Proposal</Button>
                </div>
            ) : (
                <Button onClick={() => setShowAddProposal(true)}>Add New Proposal</Button>
            )}
            <ProposalList>
                {proposals.map((proposal) => (
                    <ProposalItem key={proposal.id}>
                        <h2>{proposal.title}</h2>
                        <p>{proposal.description}</p>
                        <Button onClick={() => handleVote(proposal.id)}>Vote</Button>
                        <CommentTextArea 
                            placeholder="Add comment"
                            value={comments[proposal.id] || ''}
                            onChange={(e) => setComments({...comments, [proposal.id]: e.target.value})}
                        />
                        <Button onClick={() => handleAddComment(proposal.id)}>Add Comment</Button>
                        <CommentList>
                            {proposal.comments.map((c, index) => (
                                <CommentItem key={index}>{c.userId}: {c.text}</CommentItem>
                            ))}
                        </CommentList>
                    </ProposalItem>
                ))}
            </ProposalList>
        </Container>
    );
};

export default VotePage;