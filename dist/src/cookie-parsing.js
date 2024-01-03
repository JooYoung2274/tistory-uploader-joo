"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCookies = void 0;
require('dotenv').config();
const puppeteer_1 = __importDefault(require("puppeteer"));
function extractCookies() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        // 웹 페이지 열기
        yield page.goto(process.env.MANAGE);
        // 로그인
        yield page.click('#cMain > div > div > div > a.btn_login.link_kakao_id > span.txt_login'); // 버튼 클릭
        yield page.waitForSelector('#loginId--1'); // 페이지 로딩 대기
        yield page.focus('#loginId--1'); // 로그인 input 포커스
        yield page.keyboard.type(process.env.ID); // 아이디 입력
        yield page.focus('#password--2'); // 비밀번호 input 포커스
        yield page.keyboard.type(process.env.PW); // 비밀번호 입력
        yield page.click('#mainContent > div > div > form > div.confirm_btn > button.btn_g.highlight.submit'); // 로그인 버튼 클릭
        yield page.waitForNavigation(); // 페이지 로딩 대기
        // 쿠키 가져오고
        const cookies = yield page.cookies();
        // 브라우저 종료
        yield browser.close();
        return cookies;
    });
}
exports.extractCookies = extractCookies;
