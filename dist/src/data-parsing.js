"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.articlePost = exports.extractCookies = exports.TistoryUpload = void 0;
require('dotenv').config();
const axios_1 = __importDefault(require("axios"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs = __importStar(require("fs"));
class TistoryUpload {
    extractCookies() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.TistoryUpload = TistoryUpload;
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
// @ts-ignore
function articlePost(cookies) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield axios_1.default.post(process.env.POST_URL, uploadData, {
                headers: {
                    'Content-Type': 'application/json',
                    // @ts-ignore
                    Cookie: cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; '),
                },
            });
            //     // 응답 처리
            return response.data;
            // @ts-ignore
        }
        catch (error) {
            // @ts-ignore
            console.error('Error:', error.message);
        }
    });
}
exports.articlePost = articlePost;
