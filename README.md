## Tistory Uploader joo


### 1. Express 환경에서 사용할 경우

#### 1-1. INSTALL

```shell
$ cd express
$ npm install
```

#### 1-2. .env 추가

```shell
MANAGE=https://{티스토리주소}.tistory.com/manage
POST_URL=https://{티스토리주소}.tistory.com/manage/posts.json
```

#### 1-3. RUN

```shell
$ npm run build
$ npm run start
```

#### 1-4. 업로드 정보 입력

```
티스토리 아이디 :  개인 티스토리 아이디
티스토리 비밀번호 :  개인 티스토리 비밀번호
제목(string) :  블로그 글 제목
카테고리(number) :  카테고리 번호
태그 (example = #테스트 #테스트2) : #태그 #태그2
업로드할건지 (y/n) y
파일 경로 (example = ./articles/02_20240102_테스트입니다) :  /Users/ttttt/Desktop/tistory-uploader-joo/articles/02_글.md
```


### 2. CLI 환경에서 사용할 경우



### 3. 주의사항

- 너무 반복적으로 올리게 되면 캡챠 화면이 뜰수도 있습니다. 캡챠 화면이 뜰 경우 브라우저에서 직접 업로드 진행해주세요. (캡챠화면은 브라우저에서 직접 로그인하고 시간이 지나면 사라집니다.)

- 크롬이 설치되어 있어야 합니다. 

- 비공개 글로 업로드 됩니다.

- 일단 업로드가 잘되는지만 확인한 상태라서 많은 에러가 있을 수도 있습니다. 하나씩 업데이트 하겠습니다. 

- 수정, 삭제 등도 업데이트 예정입니다.

- express 환경이 아닌 npm 라이브러리로 cli 환경에서 구동하는 버전은 개발 중입니다. 언제 완료될지는 모르겠고, 악용할 여지가 있어 공개할지도 모르겠습니다.
