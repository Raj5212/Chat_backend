const ratelimit = require('express-rate-limit');

const chatlimiter = ratelimit({
    windowMs: 60 * 1000,
    max: 20,
})

module.exports = chatlimiter;