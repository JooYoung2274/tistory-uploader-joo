import puppeteer from 'puppeteer';

export async function extractCookies(id: string, pw: string) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // 웹 페이지 열기
  await page.goto(`https://velog.io/`);

  // 페이지 로딩 대기
  await page.waitForSelector(
    'body > div > div.HomeLayout_block__ZqnqH > div.responsive_mainResponsive___uG64 > div > header > div > div.Header_right__IaiY4 > button',
  );

  // 로그인 버튼 클릭
  await page.click(
    'body > div > div.HomeLayout_block__ZqnqH > div.responsive_mainResponsive___uG64 > div > header > div > div.Header_right__IaiY4 > button',
  );

  // 로그인 input 포커스
  await page.focus(
    'body > div > div.Modal_backdrop__JxQ1v.keyframes_fadeIn__9Emp7 > div > div.AuthModal_white-block__SuoSm > div.AuthModal_block-content__3Dk7K > div > div.AuthForm_upper-warepper__r7h_t > section:nth-child(2) > form > input',
  );

  // 아이디 입력
  await page.keyboard.type(id);

  // 페이지 로딩 대기
  await page.waitForSelector(
    'body > div > div.Modal_backdrop__JxQ1v.keyframes_fadeIn__9Emp7 > div > div.AuthModal_white-block__SuoSm > div.AuthModal_block-content__3Dk7K > div > div.AuthForm_upper-warepper__r7h_t > section:nth-child(2) > form > button',
  );

  // 로그인 버튼 클릭
  setTimeout(() => {
    page.click(
      'body > div > div.Modal_backdrop__JxQ1v.keyframes_fadeIn__9Emp7 > div > div.AuthModal_white-block__SuoSm > div.AuthModal_block-content__3Dk7K > div > div.AuthForm_upper-warepper__r7h_t > section:nth-child(2) > form > button',
    );
  }, 1000);

  // await page.focus('#password--2'); // 비밀번호 input 포커스
  // await page.keyboard.type(pw); // 비밀번호 입력
  // await page.click(
  //   '#mainContent > div > div > form > div.confirm_btn > button.btn_g.highlight.submit',
  // ); // 로그인 버튼 클릭
  // await page.waitForNavigation(); // 페이지 로딩 대기
  // // 쿠키 가져오고
  // const cookies = await page.cookies();

  // 브라우저 종료
  // await browser.close();
  return;
}
