'use strict';

import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import Koa from 'koa';
import morgan from 'koa-morgan';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import etag from 'koa-etag';
import botFB from 'cat-middleware/lib/koa-bot-fb';

import router from './router';
import receivedMessage from 'fb/receivedMessage';

const app = new Koa();
const root = path.resolve(__dirname, './../');
const ENV = process.env.NODE_ENV === 'production';

// middleware
if(ENV)
  app.use(morgan('combined', {
    stream: fs.createWriteStream(
      path.resolve(root, 'server.log'), {
        flags: 'a'
      }
    )
  }));
else
  app.use(morgan('dev'));
app.use(helmet());
app.use(etag());
app.use(compress({
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH
}));
app.use(router.middleware());
app.use(botFB(receivedMessage).middleware());

// setting
app.listen(ENV ? 80 : 8000, () => {
  console.log('server start');
});
