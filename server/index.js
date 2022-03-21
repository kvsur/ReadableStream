const Express = require('express');
const http = require('http');
const path = require('path');
const router = require('./router');
require('colors');

const app = Express();

const PORT = 9081;

app.use(router);

app.use(Express.static(path.resolve(__dirname, '../client')));

http.createServer(app).listen(PORT);

console.log(`Servering http://localhost:${PORT}`.underline.blue);

process.on('unhandledRejection', e => {
    console.log(e);

    process.exit(1);
});
