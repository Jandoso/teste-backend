const app = require('./src/app');
const PORT = 3030;

app.listen(PORT, (err) => {
    if (err) {
        console.log('There was an error to initialize server');
    } else {
        console.log(`Server is running at port ${PORT}`)
    };
});