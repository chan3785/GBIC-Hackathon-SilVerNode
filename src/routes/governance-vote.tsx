import React, { useState } from 'react';
import styled from 'styled-components';

type Proposal = {
    id: number;
    title: string;
    description: string;
};

const proposalsInitial: Proposal[] = [
    { id: 1, title: 'Proposal 1', description: 'Description for proposal 1' },
    { id: 2, title: 'Proposal 2', description: 'Description for proposal 2' },
];

const Container = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    width: 100%;
    margin: 0 auto;
    height: 100vh;
    overflow-y: auto;
    color: black;
`;

const ProposalList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: black;
`;

const ProposalItem = styled.li`
    margin-bottom: 20px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: calc(33.33% - 20px);
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
    const [selectedProposalId, setSelectedProposalId] = useState<number | null>(null);

    const handleVote = (proposalId: number) => {
        setSelectedProposalId(proposalId);
        console.log(`Voted for proposal: ${proposalId}`);
    };

    const addNewProposal = () => {
        const newProposal = {
            id: proposals.length + 1,
            title: `Proposal ${proposals.length + 1}`,
            description: `Description for proposal ${proposals.length + 1}`
        };
        setProposals([...proposals, newProposal]);
    };

    return (
        <Container>
            <h1>Vote Using Your Governance Token</h1>
            <ProposalList>
                {proposals.map((proposal) => (
                    <ProposalItem key={proposal.id}>
                        <h2>{proposal.title}</h2>
                        <p>{proposal.description}</p>
                        <Button onClick={() => handleVote(proposal.id)}>Vote</Button>
                    </ProposalItem>
                ))}
            </ProposalList>
            <Button onClick={addNewProposal}>Add New Proposal</Button>
        </Container>
    );
};

export default VotePage;
