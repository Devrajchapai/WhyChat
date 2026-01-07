const {nanoid} = require('nanoid');

function uniqueID (){
    //let char = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
    //let ID = customAlphabet(char, 11);
    let ID = nanoid()
    console.log("ID: "+ ID)
    return ID;
}

module.exports = {uniqueID}



