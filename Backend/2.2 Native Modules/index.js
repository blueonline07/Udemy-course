const fs = require("fs");
const { threadId } = require("worker_threads");
// fs.writeFile("haha.txt","hahahahaha",(err)=>{
//     if(err) throw err;
// })
fs.readFile("message.txt","utf8",(err,data)=>{
    if(err) throw err;
    console.log(data);
})