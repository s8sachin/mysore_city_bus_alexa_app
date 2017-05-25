'use strict';
var alexa = require('alexa-app'); //require alexa app
module.change_code = 1;  // Allow this module to be reloaded by hotswap when changed
var routes;
var data = [];
var prompt;
var app = new alexa.app('bus_stop');
var resp = require('./helper');
var DataHelper = new resp();

app.launch(function(req,res){
	var prompt = "tell me the bus number"
	res.say(prompt).reprompt(prompt).shouldEndSession(false); 
});

app.intent("stop",{
	"slots":{
    "INPUT":'AMAZON.NUMBER'
}
},
function(req,res)
{
	routes = req.slot('INPUT')
  var prompt;
  let busStop = new Promise((resolve, reject) =>{
   DataHelper.requestAirportStatus(routes).then(function(response){
    prompt = response.body.data.route.toString()
     // prompt = p.toString()
  resolve("Success!");
 });  
 });
 return busStop.then((successMessage) => {
    res.say(prompt).reprompt(prompt).shouldEndSession(false).send();
      console.log("response" + successMessage);
    });
});

app.intent('AMAZON.HelpIntent',
  function(req, res) {
    var help = "";
    res.say(help).shouldEndSession(false); // Or let the user stop an action (but remain in the skill)

  });

app.intent('AMAZON.StopIntent',
  function(req, res) {
    var goodbye = "Had a nice time talking to you. Goodbye.";
    res.say(goodbye).shouldEndSession(true); // Or let the user stop an action (but remain in the skill)

  });

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
  return utterancesMethod().replace(/\{\-\|/g, '{');
};

  module.exports = app;
