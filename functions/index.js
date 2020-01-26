const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuid = require('uuid');
const nodemailer = require('nodemailer');

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });
const firestore = admin.firestore();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().mail.user,
        pass: functions.config().mail.pass
    }
});


exports.addUserMetadata = functions.auth.user().onCreate((user) => {
    firestore.collection('users').set({ email: user.email, list: uuid.v4() });
});

const buildEmail = (name) => `<html>
<head>
    <style>
        .button {
            background-color:#44c767;
            border-radius:28px;
            border:1px solid #18ab29;
            display:inline-block;
            cursor:pointer;
            color:#ffffff;
            font-family:Arial;
            font-size:17px;
            padding:16px 31px;
            text-decoration:none;
            text-shadow:0px 1px 0px #2f6627;
        }
        .button:hover {
            background-color:#5cbf2a;
        }
        .button:active {
            position:relative;
            top:1px;
        }
    </style>
</head>
<body>
    <h3>
        Hey there! 👋
    </h3>
    <p>
        You've been invited by ${name} to view their grocery list!
    </p>
    <a href='https://groceries.cortlan.dev' class='button'>See the list</a>
</body>
</html>`;

exports.sendInviteEmail = functions.firestore
    .document('shares/{docId}')
    .onCreate((docSnap) => {
        const mailOptions = {
            from: `Cortlan <${functions.config().mail.user}@gmail.com>`,
            to: docSnap.get('requestedEmail'),
            subject: 'You\'ve been invited to view to groceries.cortlan.dev',
            html: buildEmail(docSnap.get('senderName'))
        };

        console.log('Sending email');

        transporter.sendMail(mailOptions, (error, info) => {
            console.log('Sent email');
            if (error) {
                console.error(error.stack);
                return -1;
            } else {
                return 0;
            }
        });
    });