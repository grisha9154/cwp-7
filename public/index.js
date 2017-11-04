const fs = require('fs');
exports.index = function (req, res) {
    const read = fs.createReadStream("./lib/test.js");
    read.on('data', (chunk) => {
        if(res.getHeader('Content-Type')===undefined) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/js');
        }
        res.end(chunk);
});
};