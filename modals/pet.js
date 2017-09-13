/*jshint esversion: 6 */
exports.get_health = function(alexa){
    let hp = Math.floor(100 * Math.random());
    console.log("HP FOR INSTANCE: ",hp);
    alexa.emit(":tell", healthGate(hp));
};
exports.get_hunger = function(alexa){
    let hunger = Math.floor(101 * Math.random());
    alexa.emit(":tell",hungerGate(hunger));
};
exports.feed = function(alexa){

};
exports.exercise = function(alexa){

};
const exercise = function(){
    return `<emphasis level="strong">Finally.<break time='.5s'/></emphasis> We're finally going for a walk.`
};

const hungerGate = function(hunger){
    switch (true) {
        case (hunger <= 10):
            return `Oh god. I'm about to die, please feed me!`
        case (hunger <=50):
            return `I'm feeling pretty weak, can you please feed me?`;
        case (hunger <=80):
            return `I'm content! Thank you for keeping me well fed!`
        case (hunger <=100):
            return `I. Am. So. Full. I'm so happy, thank you!`
        case (hunger > 101):
            return `Please, no more! I've had enough! No more food!`
    }
};

const exerciseGate = function(fitness){
    switch(true){
        
    }
};

const healthGate = function(hp){
    switch(true){
        case (hp <= 10): 
            return `HP levels are critical. I'm about to die. <emphasis level="strong"> Please </emphasis> Do something about it!`;
        case (hp <= 50):
            return `My health is at ${hp}, please help me. Feed, or play with me!`
        case (hp <= 89):
            return `I'm okay, but I could always eat or play! My hp is at ${hp}`
        case(hp >= 90):
            return `Wow! I'm doing fantastic. You're such a good care-taker! My hp is at ${hp}`
    }
}

/* IDEA */
/* Make it relevent to parents. Feed and exercise with the pet only when they complete chores. Make a parent portal */