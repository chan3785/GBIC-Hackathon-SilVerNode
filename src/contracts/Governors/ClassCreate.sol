// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 강의 개설 컨트랙트: 교원 다이렉트 개설 + 제안에 대한 분반 강의 개설

import {MyToken} from "../MyToken.sol";
import {ProfessorNFT} from "../NFTs/ProfessorNFT.sol";
import {ProposalGovernor} from "./ProposalGovernor.sol";

contract ClassCreate {
    // 상태변수
    // 강의 구조체
    struct Class {
        // 담당 교원
        address professeor;
        // 제안 넘버(없으면 0)
        uint256 proposalNumber;
        // 강의계획서 CID
        string CID;
        // 강의 정원
        uint256 TO;
        // 강의 개설 상태[0:대기, 1:개설]
        uint256 state;
    }
    // 강의 구조체 매핑(강의 넘버 => 강의 구조체)
    mapping(uint256 => Class) private _class;
    // 제안-분반 리스트 매핑 (제안 넘버 => 분반 리스트)
    mapping(uint256 => Class[]) private propSeperClass;

    // 강의 게터
    function class(uint256 classNum) public view returns (Class memory) {
        return _class[classNum];
    }

    // 강의 넘버 카운터
    uint256 public classCount = 0;

    // 거버넌스 토큰 CA
    MyToken token;
    // 교원 NFT CA
    ProfessorNFT prof;
    // 제안 투표 CA
    ProposalGovernor proposalGovern;

    // 생성자
    constructor(
        MyToken _token,
        ProfessorNFT _prof,
        ProposalGovernor _proposalGovern
    ) {
        // MyToken 컨트랙트 CA 할당
        token = _token;
        // 교원 NFT CA 할당
        prof = _prof;
        // 제안 투표 CA 할당
        proposalGovern = _proposalGovern;
    }

    // 함수
    // 강의 개설 함수
    function openClass(string memory CID, uint256 TO) public {
        classCount += 1;
        // 강의 개설
        _class[classCount] = Class(msg.sender, 0, CID, TO, 1);
    }

    // 채택 제안에 교원 지원 함수
    function applyClass(
        uint256 proposalNum,
        string memory CID,
        uint256 TO
    ) public {
        // 채택된 제안이어야 함
        require(proposalGovern.proposal(proposalNum).state == 2);
        // 호출자가 교원 NFT를 보유해야 함
        require(prof.balanceOf(msg.sender) > 0);
        // 해당 채택 제안의 지원자에 호출자와 강의계획서 추가
        propSeperClass[proposalNum].push(
            Class(msg.sender, proposalNum, CID, TO, 1)
        );
    }
}
