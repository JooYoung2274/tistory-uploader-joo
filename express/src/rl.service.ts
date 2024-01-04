require('dotenv').config();
import readline from 'readline';
import { extractCookies } from './cookie-parsing';
import { PostService } from './data-parsing';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class RlService {
  inputId() {
    rl.question('티스토리 아이디 :  ', async (answer) => {
      process.env.ID = answer;
      this.inputPw();
    });
  }

  inputPw() {
    rl.question('티스토리 비밀번호 :  ', async (answer) => {
      process.env.PW = answer;
      this.inputTitle();
    });
  }

  inputTitle() {
    rl.question('제목(string) :  ', async (answer) => {
      process.env.TITLE = answer;
      this.inputCategory();
    });
  }

  inputCategory() {
    rl.question('카테고리(number) :  ', async (answer) => {
      process.env.CATEGORY = answer;
      this.inputTag();
    });
  }

  inputTag() {
    rl.question('태그 (example = #테스트 #테스트2) :  ', async (answer) => {
      process.env.TAG = answer;
      this.inputUpload();
    });
  }

  inputPath() {
    rl.question('파일 경로 (example = ./articles/02_20240102_테스트입니다) :  ', async (answer) => {
      process.env.PATH = answer;
      const myCookies = await extractCookies();
      const postService = new PostService(
        process.env.TITLE as string,
        Number(process.env.CATEGORY),
        process.env.TAG as string,
      );
      await postService.articlePost(myCookies);
      process.exit(1);
    });
  }

  inputUpload() {
    rl.question('업로드할건지 (y/n)', async (answer) => {
      if (answer === 'n') {
        process.exit(1);
      }
      if (answer === 'y') {
        this.inputPath();
      }
    });
  }
}
