require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))



app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.post('/' , (req,res)=>{
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    
    const msg = ({
        to: {
            name: `${firstname} ${lastname}`,
            email: email,
        },
        from: "sovinhouung7@gmail.com",
        subject: "Thank You For Signing Up!",
        templateId: process.env.TEMPLATE_ID,
        dynamic_template_data: {
            name: firstname,
        }
    })

    const sendMail = async () => {

        try {
            await sgMail.send(msg);
            console.log("Message Send Successfully!")
        } catch (error) {
            console.error(error);
    
            if (error.response) {
                console.error(error.response.body)
            }
        }
    }

    sendMail();
})
app.listen(8080, function(){
console.log("Server is running on port 8080")
})

