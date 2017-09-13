/*jshint esversion: 6 */
const Alexa     = require('alexa-sdk');
const Pet       = require('./modals/pet');
const Request   = require('request');

exports.handler = function(event, context, callback){
    const alexa = Alexa.handler(event,context);
    if(event.session.user.accessToken == undefined){
        alexa.emit(':tellWithLinkAccountCard','to start using this skill, please use the companion app to authenticate on Amazon.');
    }
    profileUrl = 'https://api.amazon.com/user/profile?access_token=';
    profileUrl += this.event.session.user.accessToken;
    name = '';
    request.get(profileUrl,function(err,res,body){
        if(res.statusCode == 200){
            let profile = JSON.parse(body);
            console.log(profile);
            name  = profile['name'];
        }
    });
    console.log(name);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function() {
        this.emit(':ask', 'Welcome to Alexa Day care!');
    },
    /* My Intents */

    'GetHealthIntent':function(){
        Pet.get_health(this);
    },
    'GetHungerIntent': function(){
        Pet.get_hunger(this);
    },
    "FeedIntent": function(){
        Pet.feed(this);
    },
    "ExerciseIntent": function(){
        Pet.exercise(this);
    },
    
    /* My Intents */
    'AMAZON.StopIntent': function() {
        // State Automatically Saved with :tell
        this.emit(':tell', `Goodbye.`);
    },
    'AMAZON.CancelIntent': function() {
        // State Automatically Saved with :tell
        this.emit(':tell', `Goodbye.`);
    },
    'SessionEndedRequest': function() {
        // Force State Save When User Times Out
        this.emit(':saveState', true);
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', `You can tell me the name of a musical artist and I will say it back to you.  Who would you like me to find?`, `Who would you like me to find?`);
    },
    'Unhandled': function() {
        this.emit(':ask', `Bark? Bark? I do not know those human words. I mean, bark bark.`);
    }
};
