# SecurityFirst CTF (2021 early)

node.js를 사용하여 개발한 CTF 플랫폼

## Self-Introduction

- 순천향대학교 정보보호학과 20학번 재학생
- 정보보호학과 학술동아리 SecurityFirst 운영진(Web Team Leader)
- 정보보안 포럼 Anti-root 회원

## Description

### Why?

- SecurityFirst의 운영진은 한 해에 3개의 CTF를 운영해야 함.
- 겨울방학엔 신입생을 위한 신입생 해킹대회(CTF)를 준비해야 함. (비영리 목적의 대회)
- 전통적으로(?) CTF 플랫폼은 웹 팀에서 만들어야 하고, 필자가 웹 팀의 운영진임.

### Environment

- 개발 환경: Macbook Air(M1) + Visual Studio Code
- 서버 환경(Web): Windows 10 + Intel i7-6700, 32GB Memory
- 서버 환경(DB): Ubuntu 20.04 + Intel i7-4790K 12GB Memory

+ 서버를 분리했는데, 웹 서버는 동아리방에서 돌렸고 DB는 개인 서버에서 돌렸음.
+ 웹 서버를 동아리실에서 올려야만 했던 이유는 도메인 때문. (securityfirst.co.kr)
+ DB 서버를 개인 서버에서 돌린 이유는 웹 서버 컴퓨터에 돌아가고 있는 서버가 굉장히 많아 리소스 부담을 덜기 위함임.

### Specification

- 언어: Javascript(ES6+), HTML, CSS 등
- 프레임워크: node.js only
- 라이브러리(미들웨어): crypto, ejs, express, express-session, fs, mariadb, multer, winston 등
- 데이터베이스: MariaDB

### Function

Common

- 로그인, 로그아웃, 회원가입
![login](/readme_images/Common/0_1.png)

- 프로필 조회; 자신이 푼 모든 문제를 보여줌
- 공지사항 페이지의 게시글 조회
- 순위 조회; 회원 등급별로 따로 조회 가능
- 문제 페이지 조회; 문제 분류별로 따로 조회 가능
- 문제 풀이 및 결과 출력; 결과에 따라 다른 결과로 반응

Admin only

- 회원 정보 수정 및 삭제
- 회원 밴 기능
- 공지사항 추가, 수정, 삭제
- 문제 추가, 수정, 삭제, 스위치(온오프) + 파일 업로드
- 서버 로그 조회

### Role

- (어드민 페이지) 전부
- (어드민페이지 제외) 퍼블리싱, 디자인 작업을 제외한 모든 부분

### Review
