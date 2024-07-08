var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fustal@gmail.com',
      pass: 'futsal123'
    }
  });
  
  var mailOptions = {
    from: 'fustal@gmail.com',
    to: email,
    subject: 'Check garya',
    text: 'You are registered with Fustal.'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });