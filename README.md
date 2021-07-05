![img](<https://user-images.githubusercontent.com/68781598/124507888-bc4a7400-de09-11eb-9476-149ac4ac613d.PNG>)

# :paw_prints: Project

> 유기견 해외이동봉사 대상견 매칭 서비스, TAKE US

- **SOPT 28th APPJAM, TAKE US**
- 프로젝트 기간: 2021.06.26 ~ 2021.07.17

![Desktop - 1](https://www.notion.so/IA-23e83fa5fd2b46538d7eb34aa7012c8b#843cbf401107443d987127f56bde6a8a)

# 🛠 개발 환경

![img](https://img.shields.io/badge/typescript-4.3.4-blue)
![img](https://img.shields.io/badge/ts--node-10.0.0-green)

# 📧API 명세서

[API 명세서 링크](https://www.notion.so/API-a47fdf00011f47f19bf5824218de841a)

## ⚙️ Dependencies

```json

```

# :airplane: Developers


# 📜 Coding Convention

### 📂 폴더구조

- src
  - Logger
  - api
  - config
  - interfaces
  - middleware
  - models
  - 

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

### **🏷 주석**

- `//` 를 단수행의 주석으로 사용합니다.
- `/** ... */` 를 복수행의 주석으로 사용합니다.

### **📎 기타**

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

### **📜 커밋 메시지 태그 모음**

    커밋 규칙을 지키지 않으면 commitlint에서 자동으로 에러가 발생합니다.

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

### **ℹ️ 커밋 타입**

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

**강한** 들의 WorkFlow : **Gitflow Workflow**

- Main과 Develop 브랜치

  메인(main): 메인 브랜치

  개발(develop): 기능들의 통합 브랜치
    - feature 브랜치

- Main에 직접적인 commit, push는 가급적 금지합니다. (X)

- 커밋 메세지는 다른 사람들이 봐도 이해할 수 있게 써주세요.

- 풀리퀘스트를 통해 코드 리뷰를 해봅시다.

```
develop에 바로 merge하지 않습니다.
pr을 develop로 해주세요.
develop에서 완성이 되면 main으로 그때 그때 merge합니다.

merge는 github에서 진행합니다.
```

<img src="https://camo.githubusercontent.com/5af55d4c184cd61dabf0747bbf9ebc83b358eccb/68747470733a2f2f7761632d63646e2e61746c61737369616e2e636f6d2f64616d2f6a63723a62353235396363652d363234352d343966322d623839622d3938373166396565336661342f30332532302832292e7376673f63646e56657273696f6e3d393133" width="80%">