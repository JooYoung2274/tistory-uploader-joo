"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const rl_service_1 = require("./src/rl.service");
const app = (0, express_1.default)();
const rlService = new rl_service_1.RlService();
app.listen(3333, () => {
    console.log('Server started on port 3333');
    rlService.inputId();
});
