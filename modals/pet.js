exports.get_health = function(alexa){
    alexa.emit(":tell","I am not dead just yet.");
};

exports.interact = function(alexa){
    let res = exercise();
    alexa.emit(":tell",res);
};

const exercise = function(){
    return `<emphasis level="strong">Finally.<break time='.5s'/></emphasis> We're finally going for a walk.`
};