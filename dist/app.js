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
exports.cookieData = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const readline_1 = __importDefault(require("readline"));
const data_parsing_1 = require("./src/data-parsing");
const app = (0, express_1.default)();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myCookies = yield (0, data_parsing_1.extractCookies)();
    yield (0, data_parsing_1.articlePost)(myCookies);
}));
class CookieData {
}
exports.cookieData = new CookieData();
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
app.listen(3333, () => {
    console.log('Server started on port 3333');
    if (!exports.cookieData.cookie) {
        rl.question('티스토리 아이디', (answer) => __awaiter(void 0, void 0, void 0, function* () {
            process.env.ID = answer;
            rl.question('티스토리 비밀번호', (answer) => __awaiter(void 0, void 0, void 0, function* () {
                process.env.PW = answer;
                rl.close();
            }));
        }));
    }
});
