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
exports.PostService = void 0;
require('dotenv').config();
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const marked_1 = require("marked");
class PostService {
    constructor(title, category, tag) {
        this.title = title;
        this.category = category;
        this.tag = tag;
    }
    articlePost(cookies) {
        return __awaiter(this, void 0, void 0, function* () {
            const articleRead = fs.readFileSync(process.env.PATH, 'utf8');
            // markdown to html
            const articleHtml = (0, marked_1.marked)(articleRead);
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
                const response = yield axios_1.default.post(process.env.POST_URL, uploadData, {
                    headers: {
                        'Content-Type': 'application/json',
                        // @ts-ignore
                        Cookie: cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; '),
                    },
                });
                // 응답 처리
                return response.data;
                // @ts-ignore
            }
            catch (error) {
                // @ts-ignore
                console.error('Error:', error.message);
            }
        });
    }
}
exports.PostService = PostService;
