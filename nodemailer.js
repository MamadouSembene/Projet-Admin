/*  nodemailler  */
var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user: "mamemorthiampo@gmail.com",
    pass: "Seneg@l60"
  }
});

const options = {
  from:"mamemorthiampo@gmail.com",
  to:"babacacthiam@gmail.com",
  subject: 'Sending email with node.js!',
  text:`pass:${transporter.password}`,
  password:"Seneg@l60"
}

transporter.sendMail(options,  function(err,info){
  
if(err){
  console.log(err);
  return;
}

console.log( "Sent:" + info.response);
}) 
