![img](<https://user-images.githubusercontent.com/68781598/124507888-bc4a7400-de09-11eb-9476-149ac4ac613d.PNG>)

# :airplane: Project

> 유기견 해외이동봉사 대상견 매칭 서비스, TAKE US

- **SOPT 28th APPJAM, TAKE US**
- 프로젝트 기간: 2021.06.26 ~ 개발 중.

# 🛠 개발 환경

![img](https://img.shields.io/badge/typescript-4.3.5-blue)
![img](https://img.shields.io/badge/ts--node-10.0.0-green)
![img](https://img.shields.io/badge/Mongoose-5.13.2-yellowgreen)

# 📧API 명세서

[API 명세서 링크](https://github.com/TAKE-US/TAKEUS-BACK/wiki)

## :wrench: Architecture

![Architecture 이미지](https://user-images.githubusercontent.com/68781598/124697754-543b8100-df22-11eb-9d33-fcc07c29372a.jpg)

## ⚙️ Dependencies

```json
{
  "name": "takeus-back",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node src",
    "build": "tsc && node dist"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/mongoose": "^5.11.97",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "mongoose": "^5.13.2",
    "yarn": "^1.22.10"
  },
  "devDependencies": {
    "@types/express": "^4.17.12",
    "@types/node": "^16.0.0",
    "ts-node": "^10.0.0",
    "typescript": "^4.3.5"
  }
}
```

# 📜 Coding Convention

### **🖋 네이밍**

**Class & Constructor**

- 클래스/생성자 이름은 **PascalCase**를 사용합니다.

좋은 예 >

```typescript
  class TakeUs
```

나쁜 예 >

```typescript
class takeus {}
```

**함수 & 변수 & 인스턴스**

- 함수와 변수, 인스턴스에는 **camelCase**를 사용합니다.

### **:memo: 주석**

- `//` 를 단수행의 주석으로 사용합니다.
- `/** ... */` 를 복수행의 주석으로 사용합니다.

### **:herb: 기타**

- 줄의 끝에 반드시 ,(콤마)를 붙입니다. 마지막 요소에도 ,를 붙이는 것에 유의합시다.
- 함수끼리 1줄 개행합니다.
- 중괄호는 아래와 같은 형식으로 사용합니다.

```typescript
if (foo) {
  console.log(foo);
  /*
  ...
  */
}
```

# ✉️ Commit Messge Rules

**강한서버** 들의 **Git Commit Message Rules**

- 반영사항을 바로 확인할 수 있도록 작은 기능 하나라도 구현되면 커밋을 권장합니다.
- 기능 구현이 완벽하지 않을 땐, 각자 브랜치에 커밋을 해주세요.

### **:speech_balloon: 커밋 메시지 태그 모음**

```
- feat    : 기능 (새로운 기능)
- fix     : 버그 (버그 수정)
- update  : 코드 (코드 수정, 추가, 보완)
- refactor: 리팩토링
- style   : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
- docs    : 문서 (문서 추가, 수정, 삭제)
- test    : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
- chore   : 그 외 변경사항 (주석 추가,삭제 등)
```

### **:small_orange_diamond: 커밋 타입**

- `태그: 설명` 형식으로 커밋 메시지를 작성합니다.
- 태그는 영어를 쓰고 첫 문자는 대문자로 작성합니다.

좋은 예 >

```
  Feat: 검색 api 추가
```

나쁜 예 >

```
  검색 api 추가
```

## **💻 Github mangement**

**강한서버** 들의 WorkFlow : **Gitflow Workflow**

- Main과 Develop 브랜치
  
  메인(main): 메인 브랜치
  
  개발(develop): 기능들의 통합 브랜치
    develop 브랜치 아래 각자의 브랜치를 생성해 관리합니다. 
    - boong_u: boong_u가 개발하는 브랜치
    - hanhee: hanhee가 개발하는 브랜치  
    
    각자의 브랜치 아래 feat 브랜치를 생성해 기능을 관리합니다.   
    - feat: 기능 별 브랜치  
   
- Gitflow 규칙
  - Main에 직접적인 commit, push는 가급적 금지합니다. (X)
  - 커밋 메세지는 다른 사람들이 봐도 이해할 수 있게 써주세요.
  - 풀리퀘스트를 통해 코드 리뷰를 해봅시다.
  - 기능 개발 시 각자의 브랜치에서 feat/기능 으로 브랜치를 파서 관리합니다.
  - feat은 자세한 기능 한 가지를 담당하며, 기능 개발이 완료되면 각자의 브랜치로 Pull Request를 보냅니다. 
  - 각자가 기간 동안 맡은 역할을 전부 수행하면, 각자 브랜치에서 develop브랜치로 Pull Request를 보냅니다.  
  **develop 브랜치로의 Pull Request는 상대방의 코드리뷰 후에 merge할 수 있습니다.**

# :paw_prints: Developers
| 박정무 | 강한희 |
|:---:|:---------:|
| <img src="https://user-images.githubusercontent.com/68781598/124697830-78975d80-df22-11eb-9300-63366ede33b0.png" width="200px" />  | <img src="https://user-images.githubusercontent.com/68781598/124511973-4d254d80-de12-11eb-96b8-60741367d22a.png" width="200px" />  |
| [qkrwjdan](https://github.com/qkrwjdan) | [kanghanhee](https://github.com/kanghanhee) |


파이프라인 테스트
