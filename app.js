const express = require("express");
const app = express();
const request = require("request");
const https = require("https");


const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))

//CSS and Images are static file on local server
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {

    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    console.log(jsonData);

    const url = "https://us21.api.mailchimp.com/3.0/lists/02098e9502"

    const options = {
        method: "POST",
        auth: "suyog:4669a15b70f02e2cf1d621293f532b54-us21"
    }

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }


        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
})


//API Key
// 4669a15b70f02e2cf1d621293f532b54-us21

//Audience Id
// 02098e9502