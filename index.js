const server = require('./api/server');

server.listen(5000, () => {
    console.log('** API is running on port 5k **')
})