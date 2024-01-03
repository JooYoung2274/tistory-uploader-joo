require('dotenv').config();
import express from 'express';

import readline from 'readline';
import { articlePost } from './src/data-parsing';
import { extractCookies } from './src/cookie-parsing';
const app = express();

app.get('/', async (req, res) => {
  const myCookies = await extractCookies();
  await articlePost(myCookies);
});

async function posting() {
  const myCookies = await extractCookies();
  const result = await articlePost(myCookies);
  return result;
}

class CookieData {
  public cookie: string | undefined;
}

export const cookieData = new CookieData();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

app.listen(3333, () => {
  console.log('Server started on port 3333');

  if (!cookieData.cookie) {
    rl.question('티스토리 아이디 :  ', async (answer) => {
      process.env.ID = answer;

      rl.question('티스토리 비밀번호 :  ', async (answer) => {
        process.env.PW = answer;

        rl.question('업로드할건지 (y/n)', async (answer) => {
          if (answer === 'n') {
            process.exit(1);
          }
          if (answer === 'y') {
            rl.question('파일 경로 (example = ./articles/02_20240102_테스트입니다) :  ', async (answer) => {
              await posting();
              rl.close();
              process.exit(1);
            });
          }
        });
      });
    });
  }
});
