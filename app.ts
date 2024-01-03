require('dotenv').config();
import express from 'express';

import { RlService } from './src/rl.service';

const app = express();

const rlService = new RlService();

app.listen(3333, () => {
  console.log('Server started on port 3333');
  rlService.inputId();
});
