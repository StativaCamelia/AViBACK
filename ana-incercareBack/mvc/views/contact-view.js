const fs = require('fs');
const path = require('path');

exports.build = (title,content,callback) => {
    fs.readFile(path.join(__dirname,'html','contact.html'),'UTF-8',(err,data) => {
        if(err)
            throw err;
        let body;
        body = data.replace(/{title}/g,title).replace(/{content}/g,content);
        callback(body);
    });
}