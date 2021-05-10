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

#### Common

- 로그인, 로그아웃, 회원가입

![signin](/readme_images/Common/0_1.png)
![signup](/readme_images/Common/0_2.png)

- 프로필 조회; 자신이 푼 모든 문제를 보여줌

![profile](/readme_images/Common/6.png)

- 공지사항 페이지의 게시글 조회

![notice](/readme_images/Common/1_1.png)
![notice_spec](/readme_images/Common/1_2.png)

- 순위 조회; 회원 등급별로 따로 조회 가능

![scoreboard](/readme_images/Common/2.png)
![scoreboard_spec](/readme_images/Common/3.png)

- 문제 페이지 조회; 문제 분류별로 따로 조회 가능

![chall](/readme_images/Common/4.png)
![chall_spec](/readme_images/Common/5.png)

- 문제 풀이 및 결과 출력; 결과에 따라 다른 결과로 반응

![failed](/readme_images/Common/7.png)
![success](/readme_images/Common/8.png)
![already](/readme_images/Common/9.png)

#### Admin only

- 회원 정보 수정 및 삭제 그리고 밴 기능

![user](/readme_images/Admin/1.png)

- 문제 추가, 수정, 삭제, 스위치(온오프) + 파일 업로드

![chall_man_1](/readme_images/Admin/2.png)
![chall_man_2](/readme_images/Admin/3.png)

![chall_add_without_file](/readme_images/Admin/5.png)
![chall_add_with_file](/readme_images/Admin/6.png)

- 공지사항 추가, 수정, 삭제

![notice_admin](/readme_images/Admin/4.png)
![notice_add](/readme_images/Admin/7.png)

- 서버 로그 조회

![log](/readme_images/Admin/8.png)

#### Security

- Prepared Statement 적용
- 데이터베이스 계정 분리
- (회원가입, 로그인) 정규식 사용으로 특수문자 필터링
- (회원가입, 로그인) 클라이언트, 서버에서 두 번 검증하여 신뢰할 수 있는 데이터만 사용

### Role

- (어드민 페이지) 전부
- (어드민페이지 제외) 퍼블리싱, 디자인 작업을 제외한 모든 부분

### Acquired Tech Stack

- node.js 기본
- ECMAScript2016+의 문법과 원리
- HTTP 기본 (Header 등)
- Regex 사용법
- HTML, CSS 등의 기초적인 문법
- MariaDB(MySQL) 기초 문법
- 동적 웹 페이지 생성 방식
- 로깅의 이유와 로그 분석 능력
- ##### 보안의 중요성

### Review
- - -
많은 점을 배우게 된 대회었습니다.   
사실 이번 대회 주최에 있어서 웹 페이지를 만드는건 A부터 Z까지 모두 제 역할이었습니다.

하지만 결과를 보면 실수를 해서 웹 퍼블리싱 부분에서 도움을 받게 되었습니다.   
그 실수는 개발자에게 있어서 가장 큰 실수였습니.

바로 오만함이었습니다.

저에게 주어진 시간은 단 두 달이었습니다.   
지금까지 node.js를 이용해서 만들어본 것이라고는
YISF에서 WEB 분야의 문제를 만들었던 것입니다.

하지만 지금와서 그 페이지를 보게 되면 끔찍했습니다.   
app.js 파일 하나에 모든 것을 넣은 원페이지 코드었고      
기초적인 부분들에서 문제가 생겨 대회 중간에 수정을 하는 일도 있었습니다.

그런 제가 두 달이면 쉽게 만들 것이라 자부했고 결과적으로 시간이 부족했습니다.

그렇기에 급하게 퍼블리싱을 도와줄 사람을 찾았고 겨우 완성해냈습니다.   
많은 사람들이 이번 연초대회 사이트는 잘 만들었다며 칭찬했지만      
사람들이 말하는 것은 깔끔한 디자인이었습니다.

다음 개발부터는 이러한 부분들을 인정하고       
충분한 논의를 통해서 협업을 하기로 결심했습니다.

그리고 이번 대회를 거치며 많은 부분에서 성장했음을 느꼈습니다.

개발 중간 문제를 느낀 이후에 이 대회를 성공적으로 마치게 하기 위하여 많은 고민을 했었습니다.   
이전 대회에는 어떤 문제가 있었는지, 대회를 같이 주최하는 운영진들 등에게    
어떤 기능이 필요한지 등의 많은 부분을 고려하며 개발을 했습니다.

친구들이나 선배들 등 많은 지인들에게 많은 도움을 받기도 했습니다.

결과적으로 걱정하던 부분들에서 문제가 생기지 않았고    
단 한번의 픽스 없이 성공적으로 대회를 마칠 수 있게 되었습니다.

대회 오픈 3주 전부터는 잠도 거의 못 자면서 노력했었습니다.   
그런 저에게는 정말 잊지 못할 경험이라고 생각합니다.

이번엔 정말 많은 것을 얻었습니다.    
이번엔 애매한 결과물로 만들어진 오만함이 아닌 진짜 자신감을 얻게 되었습니다. 

이러한 기회를 준 SecurityFirst 동아리에 정말 감사함을 느꼈습니다.

급하다고 하자마자 바로 도와주겠다고 뛰어들어준 Pwnable 팀장 이선구님,    
그리고 완성을 시킬지 못 시킬지도 모르는 초보자를 믿고 계속 기다려준 회장 이찬우님께 정말 감사합니다.


두서없이 막 쓴 글을 읽어주느라 수고 많으셨습니다..!
