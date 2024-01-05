#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import { extractCookies } from './src/cookie-parsing';
import { PostService } from './src/data-parsing';

const program = new Command();
const commandList = ['register', 'path', 'upload'];
program.version('0.0.1', '-v').name('cli');

program
  .command('register')
  .description('아이디/비밀번호를 컴퓨터에 등록합니다.')
  .action((command) => {
    if (!commandList.includes(program.args[0] as string)) {
      console.log('해당 명령어를 찾을 수 없습니다.');
      program.help();
    } else {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'id',
            message: '아이디를 입력하세요',
          },
          {
            type: 'password',
            name: 'password',
            message: '비밀번호를 입력하세요',
          },
        ])
        .then(async (answers) => {
          const myCookies = await extractCookies(answers.id, answers.password);
          answers.cookies = myCookies;
          const dataFilePath = `${__dirname}/userData.json`;
          const userData = JSON.stringify(answers, null, 2);

          fs.writeFileSync(dataFilePath, userData, 'utf8');

          console.log('사용자 정보가 저장되었습니다.', dataFilePath);
        });
    }
  });

program
  .command('upload')
  .description('업로드 합니다.')
  .action((command) => {
    if (!commandList.includes(program.args[0] as string)) {
      console.log('해당 명령어를 찾을 수 없습니다.');
      program.help();
    } else {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'path',
            message:
              '업로드 할 글 경로를 입력하세요. \nex) /Users/username/Desktop/contents/20230101_title.md',
          },
          {
            type: 'input',
            name: 'title',
            message: '글 제목 : ',
          },
          {
            type: 'input',
            name: 'category',
            message: '카테고리 (ex. 1) : ',
          },
          {
            type: 'input',
            name: 'tag',
            message: '태그 (ex. #태그 #태그2) : ',
          },
          {
            type: 'input',
            name: 'upload',
            message: '업로드 (y / n) : ',
          },
        ])
        .then(async (answers) => {
          if (answers.upload !== 'y' && answers.upload !== 'n') {
            console.log('y 또는 n을 입력해주세요.');
            return;
          }

          const postService = new PostService(
            answers.title,
            Number(answers.category),
            answers.tag,
          );
          const dataFilePath = `${__dirname}/userData.json`;
          const articleRead = fs.readFileSync(dataFilePath, 'utf8');
          const data = JSON.parse(articleRead);

          await postService.articlePost(data.cookies, answers.path);

          console.log('Done!');
        });
    }
  });

program.parse(process.argv);
