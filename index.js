/*jshint esversion: 6 */
const Alexa = require('alexa-sdk');
const Pet = require('./modals/pet');
const request = require('request');

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context);
    if (event.session.user.accessToken == undefined) {
        alexa.emit(':tellWithLinkAccountCard', 'to start using this skill, please use the companion app to authenticate on Amazon.');
    }
    // console.log(name);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        profileUrl = 'https://api.amazon.com/user/profile?access_token=';
        profileUrl += this.event.session.user.accessToken;
        petUrl = "https://sleepy-beach-44231.herokuapp.com/api/v1/pets";
        name = '';
        /* profile object ={user_id, name, email} */
        request.get(profileUrl, (err, res, body) => {
            if (res.statusCode === 200) {
                let profile = JSON.parse(body);
                name = profile['name'];
                name = name.split(' ');
                request.get(petUrl, (err, res, body) => {
                    if (res.statusCode === 200) {
                        if (JSON.parse(body).length == 0) {
                            this.emit(':ask', `Welcome ${name[0]}, to our doggie daycare! Looks like you don't have any pets. What would you like to name your new puppy?`);
                        }
                        else {
                            this.emit(':ask', `Welcome back ${name[0]}, to our doggie daycare!`);
                        }
                    }
                });
            }
        });
    },
    /* My Intents */

    'GetHealthIntent': function () {
        Pet.get_health(this);
    },
    'GetHungerIntent': function () {
        Pet.get_hunger(this);
    },
    "FeedIntent": function () {
        Pet.feed(this);
    },
    "ExerciseIntent": function () {
        Pet.exercise(this);
    },
    "NamePetIntent": function () {
        this.attributes['myPetName'] = this.event.request.intent.slots.petName.value;
        let body = {
            "pet": {
                "name": this.attributes['myPetName'],
                "user_id": 1
            }
        };
        name = this.attributes['myPetName'];      
        var options = { method: 'POST',
        url: 'https://sleepy-beach-44231.herokuapp.com/api/v1/pets',
        headers: 
         { 'postman-token': 'eabce58a-68c1-c3d8-4aa2-f958769a49fe',
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body: { pet: { name: name, user_id: 1 } },
        json: true };

        Pet.create(this,body,name,options);
    },
    /* My Intents */
    'AMAZON.StopIntent': function () {
        // State Automatically Saved with :tell
        this.emit(':tell', `Goodbye.`);
    },
    'AMAZON.CancelIntent': function () {
        // State Automatically Saved with :tell
        this.emit(':tell', `Goodbye.`);
    },
    'SessionEndedRequest': function () {
        // Force State Save When User Times Out
        this.emit(':saveState', true);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', `In this doggie daycare you can say feed, walk, or play with your pet!`);
    },
    'Unhandled': function () {
        this.emit(':ask', `Bark? Bark? I do not know those human words. I mean, bark bark.`);
    }
};
