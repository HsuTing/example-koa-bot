'use strict';

import body from 'koa-body';
import Router from 'koa-better-router';
import * as FBBot from 'cat-middleware/lib/koa-bot-fb';
import receivedMessage from 'fb/receivedMessage';

const router = Router().loadMethods();

router.get('/', body(), ctx => {
  ctx.body = 'Hello World';
});

router.get('/webhook', body(), FBBot.verifyToken);
router.post('/webhook', body(), FBBot.receivedMessage(receivedMessage));

export default router;
