class RateLimit {
    constructor(options) {
        this.options = Object.assign({}, options)
        this.store = options.store

        return this._rateLimit.bind(this)
    }

    async keyGenerator(ctx) {
        if (this.options.keyGenerator) {
            return this.options.keyGenerator(ctx)
        }
        return `${this.options.prefixKey}:${ctx.request.ip}`
    }

    async skip(ctx) { // eslint-disable-line
        if (this.options.skip) {
            return this.options.skip(ctx);
        }
        return false;
    }

    async handler(ctx, next) {
        if (this.options.handler) {
            this.options.handler(ctx);
        } else {
            ctx.status = this.options.statusCode;
            ctx.body = { message: this.options.message };
        }
    }

    async _rateLimit(ctx, next) {
        const skip = await this.skip(ctx)
        if (skip) return next()

        const key = await this.keyGenerator(ctx)
        let current = await this.store.incr(key)
        let max = this.options.max

        if (max && current > max ) {
            return this.handler(ctx, next)
        }

        return next()
    }
}

export default RateLimit
