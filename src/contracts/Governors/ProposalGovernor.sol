// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 강의 제안 컨트랙트: 학생이 개설을 희망하는 강의를 제안해 투표 올리는 컨트랙트.

import {MyToken} from "../MyToken.sol";

contract ProposalGovernor {
    // 상태변수
    // 제안 구조체
    struct Proposal {
        // 제안 CID
        string CID;
        // 투표상태[0:대기, 1:진행, 2:채택, 3:사망]
        uint256 state;
        // 동의 투표수
        uint256 votes;
    }
    // 제안 구조체 매핑(제안 넘버 => 제안 구조체)
    mapping(uint256 => Proposal) private _proposal;

    // 제안 게터
    function proposal(
        uint256 proposalNum
    ) public view returns (Proposal memory) {
        return _proposal[proposalNum];
    }

    // 제안 넘버 카운터
    uint256 public proposalCount = 0;

    // 정족수 (토큰 10개)
    uint256 public quorum = 10e18;
    // 토큰 최소 보유량 for 투표 제안 (토큰 1개)
    uint256 public proposalThreshold = 1e18;
    // 거버넌스 토큰 CA
    MyToken public token;

    // 생성자
    constructor(MyToken _token) {
        // MyToken 컨트랙트 CA 할당
        token = _token;
    }

    // 1. 제안 생성
    // 웹에서 제안을 메타데이터로 생성시, ipfs에 저장됨.
    // 그 ipfs cid를 인자로 제안을 생성하고 저장.

    // 제안 토큰 필터 함수
    function thresholdFilter() public view {
        // 토큰 1개 이상 보유해야 제안할 수 있음
        require(
            proposalThreshold <= token.balanceOf(msg.sender),
            "Need more tokens!"
        );
    }

    // 제안 등록 함수
    function resisterProposal(string memory CID) public {
        proposalCount += 1;
        _proposal[proposalCount] = Proposal(CID, 0, 0);
    }

    // 2. 투표 진행
    // 현재 제안에 찬성 또는 반대 표를 던진다.

    // 투표 시작 함수
    function votingStart(uint256 proposalNum) public {
        // 제안이 대기 상태여야 함
        require(_proposal[proposalNum].state == 0, "The voting is not pending");
        // 제안 상태 변경 to 진행중
        _proposal[proposalNum].state = 1;
    }

    // 동의 투표 함수
    function vote(uint256 proposalNum) public {
        // 제안 투표가 진행 상태여야 함
        require(_proposal[proposalNum].state == 1, "The voting is not actived");
        // 동의수 +1
        _proposal[proposalNum].votes += 1;
    }

    // 3. 투표 종료
    // 투표 종료 함수
    function votingEnd(uint256 proposalNum) public {
        // 제안 투표가 진행 상태여야 함
        require(_proposal[proposalNum].state == 1, "The voting is not actived");
        // if 정족수를 충족하면,
        if (quorum <= _proposal[proposalNum].votes) {
            // 제안 채택
            _proposal[proposalNum].state = 2;
        }
        // else 정족수 충족 못하면,
        else {
            // 제안 사망
            _proposal[proposalNum].state = 3;
        }
    }
}
