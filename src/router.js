'use strict';

import body from 'koa-body';
import Router from 'koa-better-router';
import * as FBBot from 'cat-middleware/lib/koa-bot-fb';
import * as LineBot from 'cat-middleware/lib/koa-bot-line';

import FBReceivedMessage from './fb';
import LineReceivedMessage from './line';

const router = Router().loadMethods();

router.get('/', body(), ctx => {
  ctx.body = 'Hello World';
});

router.get('/webhook', body(), FBBot.verifyToken);
router.post('/webhook', body(), FBBot.receivedMessage(FBReceivedMessage));

router.post('/line', body(), LineBot.receivedMessage(LineReceivedMessage));

export default router;
