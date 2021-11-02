const nodeMailer=require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment=(comment )=>{
    console.log('inside new comment mailer',comment);

    nodeMailer.transporter.sendMail({
        from:'fixthebug02@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        html:"<h1>Your comment is now published</h1>"
    },(err,info)=>{
        if(err){
            console.log('error in sending email',err)
            return;
        }
        console.log('Mail delievered',info);
        return;
    })
}