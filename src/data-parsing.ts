import puppeteer from 'puppeteer';

async function extractCookies() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 웹 페이지 열기
  await page.goto('개인 티스토리 페이지');

  // 로그인
  await page.click('#txt_login'); // 버튼 클릭
  await page.focus('#loginId'); // 로그인 input 포커스
  await page.keyboard.type('개인아이디'); // 아이디 입력
  // 비밀번호 input 포커스
  // 비밀번호 입력 
  // 로그인 버튼 클릭

  // 쿠키 가져오고
  const cookies = await page.cookies();

  // 브라우저 종료
  await browser.close();
  return cookies;
}

async function articlePost(){
    // 해당 쿠키 + 포스팅 할 내용으로 POST 요청
}