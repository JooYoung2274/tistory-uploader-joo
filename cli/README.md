## Tistory Uploader joo

**!! 개인 블로그 업로드용으로만 사용해주세요 !!**

#### 1. INSTALL

```shell
$ npm install -g joo-uploader-tistory
```

#### 2. COMMAND

```shell
$ joo-upload -h
$ joo-upload register
$ joo-upload upload
```

#### 3. 업로드 정보 입력

#### **1. joo-upload register**

```
아이디를 입력하세요 : 개인 티스토리 아이디
비밀번호를 입력하세요 [hidden] : 개인 티스토리 비밀번호
블로그 주소를 입력하세요 (.tistory.com 제외) : 티스토리 주소 앞부분
```

#### **1. joo-upload upload**

```
업로드 할 글 경로를 입력하세요. : 업로드 할 글 경로 (pwd)
글 제목 : 글 제목
카테고리 (ex. 1) : 카테고리 넘버 (모를경우 1로 지정 후 나중에 수정)
태그 (ex. #태그 #태그2) : 태그
업로드 (y / n) : y or n
```

### 3. 주의사항

- cli에서 실행할 경우 joo-upload register 명령어를 통해 로그인 정보를 저장하기 때문에 한 번만 로그인 하면 12시간정도 joo-upload upload 명령어를 통해 글 업로드가 가능합니다.

- 만약 업로드 시 에러가 나게되면 joo-upload register를 다시 실행한 후 joo-upload upload를 진행하면 됩니다.

- cli에서 joo-upload register 명령어를 사용하게 되면 /usr/local/lib/node_modules/joo-uploader-tistory/dist/userData.json 이라는 파일에 개인 아이디, 비밀번호 등이 저장되게 됩니다. 공용으로 사용하는 컴퓨터에선 개인정보가 노출될 수 있으니 개인 컴퓨터에서만 사용해주세요.

- 만약 개인정보를 지우고 싶으면 /usr/local/lib/node_modules/joo-uploader-tistory/dist/userData.json 파일을 삭제하시면 됩니다.

  - 맥북의 경우 rm -rf /usr/local/lib/node_modules/joo-uploader-tistory/dist/userData.json
  - 윈도우의 경우 폴더로 직접들어가서 삭제하시면 됩니다.

- _크롬이 설치되어 있어야 합니다._

- _비공개 글로 업로드 됩니다._

- _일단 업로드가 잘되는지만 확인한 상태라서 많은 에러가 있을 수도 있습니다. 하나씩 업데이트 하겠습니다._

- _수정, 삭제 등도 업데이트 예정입니다._

<br><br>

- 20240202
  - velog 업로드 기능도 추가 할 예정
  - 소셜 로그인 진행 시 2차 인증은 해결 불가능
