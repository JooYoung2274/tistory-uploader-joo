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
exports.RlService = void 0;
require('dotenv').config();
const readline_1 = __importDefault(require("readline"));
const cookie_parsing_1 = require("./cookie-parsing");
const data_parsing_1 = require("./data-parsing");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
class RlService {
    inputId() {
        rl.question('티스토리 아이디 :  ', (answer) => __awaiter(this, void 0, void 0, function* () {
            process.env.ID = answer;
            this.inputPw();
        }));
    }
    inputPw() {
        rl.question('티스토리 비밀번호 :  ', (answer) => __awaiter(this, void 0, void 0, function* () {
            process.env.PW = answer;
            this.inputTitle();
        }));
    }
    inputTitle() {
        rl.question('제목(string) :  ', (answer) => __awaiter(this, void 0, void 0, function* () {
            process.env.TITLE = answer;
            this.inputCategory();
        }));
    }
    inputCategory() {
        rl.question('카테고리(number) :  ', (answer) => __awaiter(this, void 0, void 0, function* () {
            process.env.CATEGORY = answer;
            this.inputTag();
        }));
    }
    inputTag() {
        rl.question('태그 (example = #테스트 #테스트2) :  ', (answer) => __awaiter(this, void 0, void 0, function* () {
            process.env.TAG = answer;
            this.inputUpload();
        }));
    }
    inputPath() {
        rl.question('파일 경로 (example = ./articles/02_20240102_테스트입니다) :  ', (answer) => __awaiter(this, void 0, void 0, function* () {
            process.env.PATH = answer;
            const myCookies = yield (0, cookie_parsing_1.extractCookies)();
            const postService = new data_parsing_1.PostService(process.env.TITLE, Number(process.env.CATEGORY), process.env.TAG);
            yield postService.articlePost(myCookies);
            process.exit(1);
        }));
    }
    inputUpload() {
        rl.question('업로드할건지 (y/n)', (answer) => __awaiter(this, void 0, void 0, function* () {
            if (answer === 'n') {
                process.exit(1);
            }
            if (answer === 'y') {
                this.inputPath();
            }
        }));
    }
}
exports.RlService = RlService;
