var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var watson = require('watson-developer-cloud');

var app = express();

app.use(bodyParser());

// Send HTML form to index page
app.get('/', function(req, res){
    var html = '<form action="/" method="post">' +
               'Enter your name:' +
               '<input type="text" name="userName" placeholder="..." />' +
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';
    res.send(html);
});

// Parse the user input from the html form
app.post('/', function(req, res){
    // Retrieve usr input and store as a variable
    var userName = req.body.userName;

    // Create a tone analyzer variable using credentials from your Bluemix account 
    // www.ibm.com/cloud-computing/bluemix/
    var tone_analyzer = watson.tone_analyzer({
        username: 'XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
        password: 'XXXXXXXXXXX',
        version: 'v3',
        version_date: '2016-05-19'
    });
    // Use the user input as a parameter and query the API via the tone analyzer variable
    tone_analyzer.tone({ text: userName},
        function(err, tone) {
        if (err)
            console.log(err);
        else
            // this is the JSON response (tone analysis) that you can view in terminal
            console.log(JSON.stringify(tone, null, 2));
     });
    res.send(html);
});

var server = http.createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log('Express server running on *:' + port);
});
