# moayo

[필수 구현] 
- [ ] 지출 내역 입력 폼 (지출 금액, 지출항목, 지출 날짜)
- [ ] 지출 내역 목록(일반 리스트형, 칼렌더 형 표기 가능) 
- [ ] 지출 내역 수정 및 삭제 

[선택 구현]
- [ ] 지출 내역 칼렌더로 표기
- [ ] 지출 내역 월별 내역, 주별 내역, 일별 내역 표기 
- [ ] 차트를 이용해서 소비 내역 표기 하기
- [ ] 모바일 형태로 구현할지, 웹 형태로 구현할지는 자유

### 프로젝트 설치 방법
Local에서 사용할 폴더 위치로 이동 (cd '폴더위치')

```cmd
git init
git remote add origin https://github.com/ozazat/moayo.git
git fetch --all
git pull origin main
npm i
npm run dev
```

 ### 깃허브 브랜치 생성 방법
+ issue 탭 들어가기
+ new Issue 작성
+ assignee에 Issue 맡을 사람 지정(보통 본인)
+ 우측 바에 create new Branch 클릭
+ 브랜치 생성 후 로컬에서 fetch
+ 해당 브랜치에서 작업하기




### Api Docs


BaseURL : http://52.78.195.183:3003/api

### 1. 소비 기록 작성 API

Request:
```javascript
POST /expenses
Content-Type: application/json

interface ExpenseReq {
  amount: number;
  userId: string;
  category: string;
  date: string;
}
```
요청 데이터 예시
```javascript
{
  amount: 100,
  userId: "user123",
  category: "food",
  date: "2023-07-04T10:30:00.000Z"
}
```

Response:
Status: 201 Created
```typescript
interface ExpenseRes {
  message: string;
}
```


```javascript
{
  message: "Expense created successfully"
}
```
---

### 2. 모든 카테고리 조회 API
Request:

```javascript
GET /categories?userId={userId}

요청데이터 : X
```
Response: 

Status: 200 OK
```typescript
type categoryRes = string[];
```
응답데이터 예시
```javascript
["food", "clothing", "electronics"]
```
---
### 3. 검색어에 해당하는 소비 항목 및 금액 조회 API
   
Request:
```javascript
GET /expenses/search?q={keyword}&userId={userId}
//keyword에 빈 문자열을 넣으면 전체 데이터가 조회됨.

요청데이터 : X
```

Response:
Status: 200 OK

```typescript
type searchRes = search[];

interface search {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}
```

```javascript

[
  {
    _id: "5321basd12321314123"
    amount: 100,
    userId: "user123",
    category: "food",
    date: "2023-07-04T10:30:00.000Z"
  },
  {
    _id: "412312ba1231a123"
    amount: 80,
    userId: "user456",
    category: "food",
    date: "2023-07-03T14:20:00.000Z"
  }
]
```
---
### 4. 일별, 주별, 월별 소비 조회 API
Request:
```javascript 
GET /expenses/summary?period={period}&userId={userId}
period : daily, weekly, monthly

요청데이터 : X
```
Response:
Status: 200 OK

```typescript
export type periodRes = period[];

interface period {
  _id: string;
  totalAmount: number;
}
```
응답 데이터 예시
```javascript
// daily 일 때
[
  {
    _id: "2023-07-04",
    totalAmount: 180
  },
  {
    _id: "2023-07-03",
    totalAmount: 80
  }
]
// weekly 일 때, 해당 년의 주차별 합계가 나옴
// ex) 2023-22 : 23년의 22주차(5월29~6월 4일까지)
[
  {
    _id: "2023-22',
    totalAmount: 5500
  },
  {
    _id: "2023-26',
    totalAmount: 6000
  }
]
// monthly 일 때
[
  {
    _id: "2023-07',
    totalAmount: 10500
  },
  {
    _id: "2023-06',
    totalAmount: 6000
  }
]
```
---
### 5. 소비 기록 수정 API
Request:

```typescript
PUT /expenses/${_id} // 가계 상세 id값을 넣어줘야합니다!

Content-Type: application/json
interface editExpenseReq {
  amount: number;
  userId: string;
  category: string;
  date: string;
}
```
요청데이터 예시
```javascript

{
  amount: 150,
  userId: "user123",
  category: "food",
  date: "2023-07-04T10:30:00.000Z"
}
```
Response:
Status: 200 OK
```typescript
interface editExpenseRes {
  message: string;
}
```
응답 데이터 예시
```javascript
{
  message: "Expense updated successfully"
}
```
---
### #6. 소비 기록 삭제 API
Request:
```javascript
DELETE /expenses/${_id} // 가계 상세 id값을 넣어줘야합니다!

요청 데이터: X
```

Response:
Status: 200 OK

```typescript
interface removeExpenseRes {
  message: string;
}
```
응답 데이터 예시
```javascript
{
  message: "Expense deleted successfully"
}
```
---
### 7. 소비 기록 달력 호출 API

Request:
```typescript
interface parameter = { 
  yearNumb : number, // 조회하고싶은 년도
  monthNumb : number, // 조회하고싶은 달
  userId : string// 가계 추가(post)할 때 넣었던 userId
}

GET /expenses/calendar?year=${yearNumb}&month=${monthNumb}&userId={userId}

요청 데이터 : X
```

Response:
Status: 200 OK
```typescript
interface calendarRes {
  [key: number]: ExpenseReq[];
}
// key는 해당 월의 사용한 날(일)
interface ExpenseReq {
  amount: number;
  userId: string;
  category: string;
  date: string;
}

```
응답 데이터 예시
```javascript
{
  "1": [
    {
      amount: 100,
      userId: "user123",
      category: "food",
      date: "2023-07-01T10:30:00.000Z"
    }
  ],
  "4": [
    {
      amount: 80,
      userId: "user456",
      category: "food",
      date: "2023-07-04T14:20:00.000Z"
    }
  ]
}

```

---

### 8. 카데고리에 해당하는 소비 항목 및 금액 조회 API(정확한 카테고리)
   
Request:
```javascript
GET /expenses/category?q={keyword}&userId={userId}

요청데이터 : X
```

Response:
```typescript
type searchCategoryRes = search[];

interface search {
  _id: string;
  amount: number;
  userId: string;
  category: string;
  date: string;
}
```
응답데이터 예시
```javascript
Status: 200 OK
[
  {
    _id: "2312asdf123"
    amount: 100,
    userId: "user123",
    category: "food",
    date: "2023-07-04T10:30:00.000Z"
  },
  {
    _id: "123124adb1231245w1"
    amount: 80,
    userId: "user456",
    category: "food",
    date: "2023-07-03T14:20:00.000Z"
  }
]
```