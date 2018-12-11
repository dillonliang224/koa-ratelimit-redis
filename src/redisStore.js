class RedisStore {
    constructor(options) {
        this.client = options.client
        this.prefix = options.prefix || 'rl:'
        this.expiry = options.expiry || 60000
    }

    async incr(key) {
        let rdsKey = this.prefix + key

        let [ incrRes, ttlRes ] = await this.client.pipeline()
            .incr(rdsKey)
            .ttl(rdsKey)
            .exec()
        
        if (incrRes[1] === 1 || ttlRes[1] === -1) {
            await this.client.expire(rdsKey, this.expiry)
        }

        return incrRes[1]
    }

    async resetKey(key) {
        let rdsKey = this.prefix + key
        return await this.client.del(rdsKey)
    }
}

export default RedisStore
