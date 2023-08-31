/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
var url;
inquirer.prompt([{
    name: "Url",
    message: "Enter an url: ",
    type: "input"
}]).then(function(answer){
    url = answer.Url;
    fs.writeFile("URL.txt",url,{"encoding":"utf8"},(err) =>{
        if(err) throw err;
    });
    var qr_img = qr.image(url,{parse_url: true, type: "png"});
    qr_img.pipe(fs.createWriteStream("qr-img.png"));
});