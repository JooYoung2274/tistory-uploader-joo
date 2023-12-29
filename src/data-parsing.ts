import axios from 'axios';
import puppeteer from 'puppeteer';

export async function extractCookies() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // 웹 페이지 열기
  await page.goto('https://joorrr.tistory.com/manage');

  // 로그인
  await page.click('#cMain > div > div > div > a.btn_login.link_kakao_id > span.txt_login'); // 버튼 클릭
  await page.waitForSelector('#loginId--1'); // 페이지 로딩 대기
  await page.focus('#loginId--1'); // 로그인 input 포커스
  await page.keyboard.type('개인아이디!!!!!!!!!!!!!!!!!!!!!'); // 아이디 입력
  await page.focus('#password--2'); // 비밀번호 input 포커스
  await page.keyboard.type('개인비밀번호!!!!!!!!!!!!!!!!!!!!!!'); // 비밀번호 입력
  await page.click('#mainContent > div > div > form > div.confirm_btn > button.btn_g.highlight.submit') // 로그인 버튼 클릭
 await page.waitForNavigation(); // 페이지 로딩 대기
  // 쿠키 가져오고
  const cookies = await page.cookies();

  // 브라우저 종료
  await browser.close();
  return cookies;
}

// @ts-ignore
export async function articlePost(cookies){
    // 해당 쿠키 + 포스팅 할 내용으로 POST 요청
  const a = {
    "id": "0",
    "title": "ㅇㄴㄹㅁㄴㅇ",
    "content": "<p data-ke-size=\"size16\">ㄹㅁㄴㅇㄹㄴㅁㅇㄹ</p>",
    "slogan": "ㅇㄴㄹㅁㄴㅇ",
    "visibility": 0,
    "category": 1045846,
    "tag": "",
    "published": 1,
    "password": "40NzUxMj",
    "uselessMarginForEntry": 1,
    "daumLike": "401",
    "cclCommercial": 0,
    "cclDerive": 0,
    "thumbnail": null,
    "type": "post",
    "attachments": [],
    "recaptchaValue": "",
    "draftSequence": null
  }
    try {
      const response = await axios.post('https://joorrr.tistory.com/manage/posts.json', a, {
        headers: {
          'Content-Type': 'application/json',
          // @ts-ignore
          'Cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
        }
      });
  
      // 응답 처리
      return response.data;
      // @ts-ignore
    } catch (error) {
      // @ts-ignore
      console.error('Error:', error.message);
    }
}