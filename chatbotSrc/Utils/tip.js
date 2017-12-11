function createTipString(number){
    let string = "Here are tip results for $"+number+". " ;
    let tip = 10;
    for ( ; tip <21; tip +=5){
      string+= tip +"% would be "+number*tip/100+". ";
    }
    return string;
}
module.exports = {createTipString: createTipString}
