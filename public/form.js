const fs = require('fs');
exports.form = function (req, res) {
        const read = fs.createReadStream("E:\\Univer\\5 семестр\\ПСКП\\PSKP\\Лабы\\lab7\\cwp-7\\public\\form.html");
        read.on('data', (chunk) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(chunk);
        });
    };