require('dotenv').config();
import puppeteer from 'puppeteer';

export async function extractCookies() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 웹 페이지 열기
  await page.goto(process.env.MANAGE as string);

  // 로그인
  await page.click('#cMain > div > div > div > a.btn_login.link_kakao_id > span.txt_login'); // 버튼 클릭
  await page.waitForSelector('#loginId--1'); // 페이지 로딩 대기
  await page.focus('#loginId--1'); // 로그인 input 포커스
  await page.keyboard.type(process.env.ID as string); // 아이디 입력
  await page.focus('#password--2'); // 비밀번호 input 포커스
  await page.keyboard.type(process.env.PW as string); // 비밀번호 입력
  await page.click('#mainContent > div > div > form > div.confirm_btn > button.btn_g.highlight.submit'); // 로그인 버튼 클릭
  await page.waitForNavigation(); // 페이지 로딩 대기
  // 쿠키 가져오고
  const cookies = await page.cookies();

  // 브라우저 종료
  await browser.close();
  return cookies;
}
