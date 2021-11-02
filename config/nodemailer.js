const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
    service:"gmail",
    host:'smtp.gamil.com',
    port:587,
    secure:false,
    auth:{
        user:'fixthebug02@gmail.com'
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("error in rendering template");
                return;
            }
            mailHTML=template;
        }
    )
        return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}