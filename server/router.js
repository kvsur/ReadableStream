const { Router } = require("express");

const { Readable } = require('stream')

/**
 * @type {import("express").IRouter}
 */
const router = new Router();

router.get('/streamSocket', (req, res) => {
    const stream = new Readable({ encoding: 'utf-8' });
    let counter = 1;
    stream._read = () => {
        if (counter <= 20) {
            setTimeout(() => {
                counter++;
                stream.push(JSON.stringify({
                    code: 0,
                    data: Math.random().toString(36).slice(2),
                    message: 'success'
                }), 'utf-8');
            }, 1000);
        }
        else {
            stream.push(null);
            stream.pause();
            stream.unpipe();
            res.send();
            // res.end();
        }
    };

    stream.pipe(res);
});

module.exports = router;
