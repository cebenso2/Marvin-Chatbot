//creates the tip for a user given a number
function createTipString(number){
    let string = "Here are tip results for $"+number+".\n " ;
    let tip = 10;
    for ( ; tip <21; tip +=5){
      string+= tip +"% would be $"+Math.round(number*tip)/100+".\n ";
    }
    return string;
}
module.exports = {createTipString: createTipString}
