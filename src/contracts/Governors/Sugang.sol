// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 수강신청 컨트랙트:

import {MyToken} from "../MyToken.sol";
import {ProfessorNFT} from "../NFTs/ProfessorNFT.sol";
import {ClassCreate} from "./ClassCreate.sol";

contract Sugang {
    // 상태변수

    // 수강신청 강의 구조체
    struct Sugang {
        // 수강신청 상태[0:대기, 1:진행, 2:마감]
        uint256 state;
        // 강의 정원
        uint256 TO;
        // 신청인원
        uint256 applicants;
        // 총 수업료
        uint256 pool;
    }
    // 강의-수강신청 매핑(강의 넘버 => 수강신청 구조체)
    mapping(uint256 => Sugang) private _sugang;

    // 개인 예치 수업료 구조체
    struct Ledger {
        address student;
        uint256 tuition;
    }
    // 강의-수업료 풀 매핑(강의 넘버 => 수강생 넘버(1번부터시작) => 수강생-예치수업료)
    mapping(uint256 => mapping(uint256 => Ledger)) private ledger;

    // 기본 수업료
    uint256 constant baseTuition = 1e18;

    // 자금 계정
    address manager = 0x0A9E6E9d5A81e4f1A58381854255f35aca767918;

    // 거버넌스 토큰 CA
    MyToken token;
    // 교원 NFT CA
    ProfessorNFT prof;
    // 강의 CA
    ClassCreate class;

    // 생성자
    constructor(MyToken _token, ProfessorNFT _prof, ClassCreate _class) {
        // MyToken 컨트랙트 CA 할당
        token = _token;
        // 교원 NFT CA 할당
        prof = _prof;
        // 강의 CA 할당
        class = _class;
    }

    // 함수

    // 총 수업료 계산 함수
    function totalTuition(uint256 _tip) public view returns (uint256) {
        // 추가 수업료
        uint256 tip = _tip * 1e18;
        // 총 수업료
        uint256 tuition = baseTuition + tip;

        return tuition;
    }

    // 수강신청 시작 함수
    function sugangStart(uint256 classNum) public {
        uint256 TO = class.class(classNum).TO;
        // 수강신청 구조체 생성
        _sugang[classNum] = Sugang(1, TO, 0, 0);
    }

    // 수업료 입금 함수
    function sugang(uint256 classNum, uint256 _tip) public {
        // 현재 진행 상태여야 함
        require(_sugang[classNum].state == 1);
        // 예치 수업료
        uint256 _tuition = totalTuition(_tip);
        // 수업료 풀에 예치
        _sugang[classNum].pool += _tuition;
        token.transfer(manager, _tuition);
        // 수강생 카운터 증가
        _sugang[classNum].applicants += 1;
        // 수업료 장부 기록
        uint256 num = _sugang[classNum].applicants;
        ledger[classNum][num].student = msg.sender;
        ledger[classNum][num].tuition = _tuition;
    }

    // 수강신청 마감 함수:

    // 수강료 오름차순 정렬 함수
    function sort(uint256 classNum) private {
        uint256 n = _sugang[classNum].applicants;
        for (uint i = 1; i < n; i++) {
            for (uint j = 1; j < n - i; j++) {
                if (
                    ledger[classNum][j].tuition <
                    ledger[classNum][j + 1].tuition
                ) {
                    // swap arr[j] and arr[j+1]
                    uint tempT = ledger[classNum][j].tuition;
                    address tempS = ledger[classNum][j].student;
                    ledger[classNum][j].tuition = ledger[classNum][j + 1]
                        .tuition;
                    ledger[classNum][j].student = ledger[classNum][j + 1]
                        .student;
                    ledger[classNum][j + 1].tuition = tempT;
                    ledger[classNum][j + 1].student = tempS;
                }
            }
        }
    }

    function sugangEnd(uint256 classNum) public {
        // 현재 진행 상태여야 함
        require(_sugang[classNum].state == 1);
        // 티오 상수
        uint256 TO = _sugang[classNum].TO;
        // if (정원 >= 신청인원) : 추가 수업료 환불해주고 기본수업료만 받음
        if (TO >= _sugang[classNum].applicants) {
            for (uint256 i = 1; i <= _sugang[classNum].applicants; i++) {
                // i번째 학생에게 추가 수업료 환불
                token.transfer(
                    ledger[classNum][i].student,
                    ledger[classNum][i].tuition - baseTuition
                );
                ledger[classNum][i].tuition = baseTuition;
            }
            _sugang[classNum].pool = _sugang[classNum].applicants * baseTuition;
        }
        // if (정원 < 신청인원) : 추가 수업료 많이 낸 순으로 컷. 커트라인 이상의 추가 수업료는 환불.
        else {
            // 수업료 많이 낸 순으로 수강생 정렬
            sort(classNum);
            // 커트라인 상수
            uint256 cutline = ledger[classNum][TO].tuition;

            // 커트라인 미만인 수강생 커트(수업료 전액 환불 및 리스트에서 제거)
            for (uint256 i = TO + 1; i <= _sugang[classNum].applicants; i++) {
                token.transfer(
                    ledger[classNum][i].student,
                    ledger[classNum][i].tuition
                );
                ledger[classNum][i].tuition = 0;
                ledger[classNum][i].student = address(0);
            }
            _sugang[classNum].applicants = TO;
            // 커트라인 이상인 i번째 수강생에게 추가 수업료 환불
            for (uint256 i = 1; i <= TO; i++) {
                token.transfer(
                    ledger[classNum][i].student,
                    ledger[classNum][i].tuition - cutline
                );
                ledger[classNum][i].tuition = cutline;
            }
            _sugang[classNum].pool = TO * cutline;
        }
        // 수강신청 마감
        _sugang[classNum].state == 2;
    }
}
