/*
 * Copyright © 2025 [Il tuo Nome/Nome Entità]. Tutti i diritti riservati.
 * Questo codice e il suo sviluppo sono proprietà intellettuale di [Il tuo Nome/Nome Entità].
 */

let salt;

function encoder(arr8){
    let result = "";

    for (let index = 0; index < 16 ; index++) {
        
        let number = arr8[index];

        function checker(n){
            if (n < 33) {
                n += 33;
                return checker(n)
            } else if(n >= 58 && n < 61 ){
                n = n - 10;
                return checker(n)
            }else if(n >= 61 && n < 65 ){
                n += 10;
                return checker(n)
            }
            else if(n > 122) {
                n = n - 100;
                return checker(n)
            }
            return String.fromCharCode(n)
        }
        
        result += checker(number)
    }

    return result
}


async function generator(key, imageData, length) {
    const usedKey= key + key + key
    const keyData = new TextEncoder().encode(usedKey);
 
    //--- GENERAZIONE E LETTURA DEL SALE ---\\
    let existing= localStorage.getItem(key);
    let salt;

    if(existing){
            console.log("salt recovered: ",existing);
            
        salt = existing;
    }else{
        salt = randomizer(usedKey.length);
        localStorage.setItem(key, salt);
    }

    const saltData = new TextEncoder().encode(salt); 

    //--- UNIT8ARRAY COMBINATO ---\\\
    const totalLength =  keyData.length + imageData.length + saltData.length;
    const combinedData = new Uint8Array(totalLength);
    let offset = 0

    combinedData.set(keyData,offset);
    offset = keyData.length;
    combinedData.set(imageData,offset);
    offset = keyData.length + imageData.length;
    combinedData.set(saltData,offset);

    //--- GENERAZIONE CON CRYPTO ---\\
    let generation = await crypto.subtle.digest('SHA-256', combinedData);
        console.log("digested: ", generation);

    const result = new Uint8Array(generation);
    console.log("converted in unit8: ", result);

    let output = encoder(result)
        
    if(output.length > length){
        output.slice(0,length - 1);
    }

    return {
        output
    }
}



function randomizer(n) {
  

  let randomString= "";

  for (let index = 0; index < n; index++) {
    let randomIndex = Math.round((Math.random() * 122 ) + 33 );
    let randomCharachter= String.fromCharCode(randomIndex);
    
    randomString += randomCharachter
  }
  
  return randomString;
}

export {generator}


 