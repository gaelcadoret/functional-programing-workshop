// const initApp = require('./express-app');
const initApp = require('./fastify-app');

const PORT = 3003;

;(async () => {
    const app = await initApp();

    app.listen({ port: PORT }, (err, address) => {
        if (err) throw err
        // Server is now listening on ${address}
        console.log(`Server is now listening on http://localhost:${PORT}`);
    });
})();