require('dotenv').config();
import axios from 'axios';
import * as fs from 'fs';

export class TistoryUpload {
  async extractCookies() {}
}

export async function articlePost(cookies: any) {
  const domain = './articles'; // 포스팅할 아티클 경로
  const articleArray = fs.readdirSync(domain);
  const articleRead = fs.readFileSync(`${domain}/${articleArray[articleArray.length - 1]}`, 'utf8');
  const article = JSON.stringify(articleRead);

  // 해당 쿠키 + 포스팅 할 내용으로 POST 요청
  const uploadData = {
    id: '0',
    title: 'testesetddsetest',
    content: article,
    slogan: 'ㄴㅇㄹㅁㄴㅇㄹㅇㅁㄴㄹㅁㄴㅇㄹ',
    visibility: 0,
    category: 1,
    tag: '',
    published: 1,
    password: '43NjI2Mz',
    uselessMarginForEntry: 1,
    daumLike: '401',
    cclCommercial: 0,
    cclDerive: 0,
    thumbnail: null,
    type: 'post',
    attachments: [],
    recaptchaValue: '',
    draftSequence: null,
  };
  try {
    const response = await axios.post(process.env.POST_URL as string, uploadData, {
      headers: {
        'Content-Type': 'application/json',
        // @ts-ignore
        Cookie: cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; '),
      },
    });

    //     // 응답 처리
    return response.data;
    // @ts-ignore
  } catch (error) {
    // @ts-ignore
    console.error('Error:', error.message);
  }
}
