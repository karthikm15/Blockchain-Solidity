const {createServer} = require('http');
const next = require('next');

const app = next({
    dev: process.env.NODE_ENV !== 'production' // Determines whether application running in production mode or not
});

const routes = require('./routes'); // Require in routes file that just made
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, err => {
        if (err) throw err;
        console.log('Ready on localhost:3000');
    });
}); // Tell app to listen to a specific port