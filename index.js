const express = require('express')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 8000

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_URL);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
  
app.get('/', (req, res) => {
    res.send('Server is working!')
})

app.post('/email', urlencodedParser, (req, res) => {
    const {name, phone, email, subject, message} = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ysyogeshsingh24@gmail.com',
            pass: 'kixevwvrvialygfs'
        }
    });

    var mailOptions = {
        from: 'ysyogeshsingh24@gmail.com',
        to: 'ysyogeshsingh1@gmail.com',
        subject: subject,
        html: `Name: ${name}<br/>Phone: ${phone}<br/>Email: ${email}<br/>Message: ${message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({"status": false});
        } else {
            console.log('Email sent: ' + info.response);
            res.json({"status": true});
        }
    });
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});

module.exports = app;