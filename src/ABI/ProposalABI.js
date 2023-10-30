export default[
    {
       "inputs": [
          {
             "internalType": "contract MyToken",
             "name": "_token",
             "type": "address"
          }
       ],
       "stateMutability": "nonpayable",
       "type": "constructor"
    },
    {
       "inputs": [
          {
             "internalType": "uint256",
             "name": "proposalNum",
             "type": "uint256"
          }
       ],
       "name": "proposal",
       "outputs": [
          {
             "components": [
                {
                   "internalType": "string",
                   "name": "CID",
                   "type": "string"
                },
                {
                   "internalType": "uint256",
                   "name": "state",
                   "type": "uint256"
                },
                {
                   "internalType": "uint256",
                   "name": "votes",
                   "type": "uint256"
                }
             ],
             "internalType": "struct ProposalGovernor.Proposal",
             "name": "",
             "type": "tuple"
          }
       ],
       "stateMutability": "view",
       "type": "function"
    },
    {
       "inputs": [],
       "name": "proposalCount",
       "outputs": [
          {
             "internalType": "uint256",
             "name": "",
             "type": "uint256"
          }
       ],
       "stateMutability": "view",
       "type": "function"
    },
    {
       "inputs": [],
       "name": "proposalThreshold",
       "outputs": [
          {
             "internalType": "uint256",
             "name": "",
             "type": "uint256"
          }
       ],
       "stateMutability": "view",
       "type": "function"
    },
    {
       "inputs": [],
       "name": "quorum",
       "outputs": [
          {
             "internalType": "uint256",
             "name": "",
             "type": "uint256"
          }
       ],
       "stateMutability": "view",
       "type": "function"
    },
    {
       "inputs": [
          {
             "internalType": "string",
             "name": "CID",
             "type": "string"
          }
       ],
       "name": "resisterProposal",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
    },
    {
       "inputs": [],
       "name": "thresholdFilter",
       "outputs": [],
       "stateMutability": "view",
       "type": "function"
    },
    {
       "inputs": [],
       "name": "token",
       "outputs": [
          {
             "internalType": "contract MyToken",
             "name": "",
             "type": "address"
          }
       ],
       "stateMutability": "view",
       "type": "function"
    },
    {
       "inputs": [
          {
             "internalType": "uint256",
             "name": "proposalNum",
             "type": "uint256"
          }
       ],
       "name": "vote",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
    },
    {
       "inputs": [
          {
             "internalType": "uint256",
             "name": "proposalNum",
             "type": "uint256"
          }
       ],
       "name": "votingEnd",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
    },
    {
       "inputs": [
          {
             "internalType": "uint256",
             "name": "proposalNum",
             "type": "uint256"
          }
       ],
       "name": "votingStart",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
    }
 ]