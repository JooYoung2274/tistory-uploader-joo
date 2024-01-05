require('dotenv').config();
import axios from 'axios';
import * as fs from 'fs';

import { marked } from 'marked';

export class PostService {
  public title: string | undefined;
  public category: number | undefined;
  public tag: string | undefined;

  constructor(title: string, category: number, tag: string) {
    this.title = title;
    this.category = category;
    this.tag = tag;
  }

  async articlePost(cookies: any, path: string) {
    const articleRead = fs.readFileSync(path, 'utf8');

    // markdown to html
    const articleHtml = marked(articleRead);

    // 해당 쿠키 + 포스팅 할 내용으로 POST 요청
    const uploadData = {
      id: '0',
      title: this.title,
      content: articleHtml,
      slogan: '?',
      visibility: 0,
      category: this.category,
      tag: this.tag,
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
      const response = await axios.post(
        process.env.POST_URL as string,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            // @ts-ignore
            Cookie: cookies
              .map((cookie: any) => `${cookie.name}=${cookie.value}`)
              .join('; '),
          },
        },
      );

      // 응답 처리
      return response.data;
      // @ts-ignore
    } catch (error) {
      // @ts-ignore
      console.error('Error:', error.message);
    }
  }
}
