/*jshint esversion: 6 */
request = require('request');
exports.get_stats = function(alexa){
    var options = { method: 'GET',
    url: 'https://sleepy-beach-44231.herokuapp.com/api/v1/pets',
    };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    body = JSON.parse(body);    
    console.log("CHECK FOR BODY", body);
    let petname = body[0].name;
    let petHealth = body[0].health;
    let fitness = body[0].fitness;
    let hunger = body[0].hunger;
    bark = `<audio src="https://s3.amazonaws.com/puppy.sounds/puppy_bark.mp3"/>`;
    alexa.emit(":ask",`${bark}, hold on puppy, I was asked a question. Sorry about that. ${petname} is at ${petHealth} health, ${fitness} fitness, and ${hunger} hunger.`, `Remember you can always play or feed him! Or ask me for help!`);
  });
  
};
exports.get_health = function (alexa) {
    let hp = Math.floor(100 * Math.random());
    console.log("HP FOR INSTANCE: ", hp);
    alexa.emit(":tell", healthGate(hp));
};
exports.get_hunger = function (alexa) {
    let hunger = Math.floor(101 * Math.random());
    alexa.emit(":tell", hungerGate(hunger));
};
exports.feed = function (alexa) {
};
exports.exercise = function (alexa) {
};
exports.create = function (alexa, data, name, options) {
    var request = require("request");

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log("THE BODY IS HERE", body);
        puppybark = `<audio src="https://s3.amazonaws.com/puppy.sounds/puppy_bark.mp3"/>`;
        alexa.emit(`:ask`, `Meet your new puppy, ${name}! Say hello! ${puppybark} Say help, anytime you need any help!`, `Need some help? Say help!`);
    });

};
const exercise = function () {
    return `<emphasis level="strong">Finally.<break time='.5s'/></emphasis> We're finally going for a walk.`;
};

const hungerGate = function (hunger) {
    switch (true) {
        case (hunger <= 10):
            return `Oh god. I'm about to die, please feed me!`
        case (hunger <= 50):
            return `I'm feeling pretty weak, can you please feed me?`;
        case (hunger <= 80):
            return `I'm content! Thank you for keeping me well fed!`
        case (hunger <= 100):
            return `I. Am. So. Full. I'm so happy, thank you!`
        case (hunger > 101):
            return `Please, no more! I've had enough! No more food!`
    }
};

const exerciseGate = function (fitness) {
    switch (true) {

    }
};

const healthGate = function (hp) {
    switch (true) {
        case (hp <= 10):
            return `HP levels are critical. I'm about to die. <emphasis level="strong"> Please </emphasis> Do something about it!`;
        case (hp <= 50):
            return `My health is at ${hp}, please help me. Feed, or play with me!`;
        case (hp <= 89):
            return `I'm okay, but I could always eat or play! My hp is at ${hp}`;
        case (hp >= 90):
            return `Wow! I'm doing fantastic. You're such a good care-taker! My hp is at ${hp}`;
    }
};

/* IDEA */
/* Make it relevent to parents. Feed and exercise with the pet only when they complete chores. Make a parent portal */