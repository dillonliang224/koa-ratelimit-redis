## Koa Rate Limit By Redis

Note: This module is based on express-rate-limit.

### Install

npm install --save koa-ratelimit-redis

### Usage

```js
const Redis = require('ioredis')
const RateLimit = require('koa-ratelimit-redis').RateLimit
const RedisStore = require('koa-ratelimit-redis').RedisStore
const Koa = require('koa')
const router = require('koa-router')()

const client = new Redis({
    host: '127.0.0.1',
    port: '6379',
    db: 0,
})

function skip(ctx) {
    return false
}

function koaHandler(ctx) {
    ctx.body = {
        ok: false,
        code: 'RATE_LIMIT',
        msg: 'RATE_LIMIT',
    }
}

function defaultRateLimiter(max = 5, expiry = 60, handler = koaHandler) {
    return new RateLimit({
        store: new RedisStore({
            client,
            expiry: expiry,
            prefix: 'rl:'
        }),
        keyGenerator(ctx) {
            return `default::${ctx.method}:${ctx.path}:${ctx.ip}`
        },
        max: max,
        statusCode: 200,
        handler,
        skip,
    })
}

function doHello(ctx) {
    ctx.body = 'hello world'
}

const app = new Koa()

router.get('/hello', defaultRateLimiter(), doHello)
router.get('/world', defaultRateLimiter(1, 30, (ctx) => {
    ctx.body = {
        msg: 'RATE_LIMIT'
    }
}), doHello)

app.use(router.middleware())

app.listen(8080)

```

