const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { memoryUsage } = require("process");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName + " " +  lastName);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",    
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = " https://us17.api.mailchimp.com/3.0/lists/bbfd0762f4";
  const options = {
    method: "POST",
     auth: "vanshika1:054a3d48925118635065b6ee1abd389f-us17",
  };
  const request = https.request(url, options, function (response) {

    if (response.statusCode==200){
      res.sendFile(__dirname+ "/success.html");
    } else{
      res.sendFile(__dirname+ "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res)
{
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("server is running on port 3000");
});
//e13404e42ccc5ecbc6728c4a2ecf16e8-us17 api key
//bbfd0762f4 list id

// headers: {
//     "User-Agent": "Request-Promise",
//     Authorization: "auth 1d4d9141673e031455a52356d5284203-us17",
//   },
