/* Setting up variables for DB */
const AWS       = require('aws-sdk');
const DocClient = new AWS.DynamoDB.DocumentClient();
const table     = "Pets";

exports.get_health = function(alexa){
    alexa.emit(":tell","I am not dead just yet.");
};

exports.interact = function(alexa){
    let hunger = Math.floor(101 * Math.random());
    alexa.emit(":tell", hungerGate(hunger));
};

const exercise = function(){
    return `<emphasis level="strong">Finally.<break time='.5s'/></emphasis> We're finally going for a walk.`
};

const hungerGate = function(hunger){
    switch (hunger) {
        case hunger <= 10:
            return `Oh god. I'm about to die, please feed me!`
        case hunger <=50:
            return `I'm feeling pretty weak, can you please feed me?`;
        case hunger <=80:
            return `I'm content! Thank you for keeping me well fed!`
        case hunger <=100:
            return `I. Am. So. Full. I'm so happy, thank you!`
        case hunger > 101:
            return `Please, no more! I've had enough! No more food!`
    }
};