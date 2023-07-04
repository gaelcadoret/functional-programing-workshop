const initApp = require('./express-app');

const app = initApp();

app.listen({ port: 3002 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
    console.log(`Server is now listening on http://localhost:3002`);
});
