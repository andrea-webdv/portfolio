import { generator as pw } from "/encrypter.mjs";

const modal = document.querySelector('dialog');
const button = document.querySelector('#submit');
const input = document.getElementById("img");
const name = document.getElementById('name').childNodes[1];

let preview = document.querySelector('#preview');
const choosed = document.querySelector('#choosed');
let choosedBackup = choosed.innerHTML;
const monitor = document.querySelector('#monitor');
let desiredLength = document.querySelector('#length');
desiredLength = desiredLength.value;
let article = document.querySelector('article');
const runfield = document.querySelector('.run');

const outcome = document.createElement("input");
outcome.type = "password";
outcome.classList.add("passwords", "noData");
outcome. autocomplete = "new-password";
outcome.name = "outcome";
outcome.disabled = true;
const outcomeField =document.createElement("div");
outcomeField.classList.add( "overlayed");
outcomeField.append(outcome);
runfield.append(outcomeField);


let alternativePlacing = document.querySelector('#alternative');
let mainplacing = document.querySelector('main');


let imageData;

/*-- CARICAMENTO IMMAGINE --*/
input.addEventListener('change', (event)=>{
    const choosed = event.target.files[0];

    console.log("is an image?", choosed.type === "image/png" || choosed.type === "image/jpeg" )

    if(choosed.type !== "image/png" && choosed.type !== "image/jpeg"){
        preview.removeAttribute("scr"); 
        preview.style.display = "none";
        monitor.classList.add("wrongData");
        console.log("not an image");
        return
    }

    if(choosed) {
        console.log("start reading");

        if(monitor.lastChild.nodeName === '#text') {
            monitor.removeChild(monitor.lastChild);
        }
        
        const bufferReader = new FileReader();
        const urlReader = new FileReader();

        bufferReader.readAsArrayBuffer(choosed)
        bufferReader.onload = function(e){
            imageData = new Uint8Array(e.target.result)
            imageData? console.log("readed"): console.log("Not readed")
        }  

        urlReader.readAsDataURL(choosed)
        urlReader.onload = function(e){
            if(monitor.children.length > 1) { monitor.removeChild(monitor.lastChild); };
            preview.style.display = "inline-block";
            preview.src = e.target.result;
            monitor.classList.contains("wrongData") ? monitor.classList.replace("wrongData", "rightData") : monitor.classList.add("rightData");
        }

        bufferReader.onerror = function (e){
            console.error(e.target.result);
            monitor.classList.add("wrongData");
        }
        urlReader.onerror = function (e){
            console.error(e.target.result);
            monitor.classList.add("wrongData");

        }
    }
});


/*-- ALTERNARE TIPO CON HOVER --*/
name.addEventListener('mouseover', () => {name.setAttribute("type", "text"); });
name.addEventListener('mouseout', () => {name.setAttribute("type", "password"); });
outcome.onmouseover =  () => { outcome.setAttribute("type", "text") };
outcome.onmouseout = () => { outcome.setAttribute("type", "password") };


/*-- AVVIO CRIPTAZIONE --*/
button.addEventListener('click', async (event) => {
    event.preventDefault(); 
    let inseredName = name.value;

    if(inseredName.length < 5||  !preview.hasAttribute('src')){ modal.showModal(); return}

    let buffer = imageData; 

    try {
        let crypted = null;
        outcome.innerText = "elaboration...";
            console.log("elaboration...");
        crypted = await pw( inseredName, buffer, desiredLength); 
            console.log("lettura pass: ", crypted);

        
        if (crypted){ outcome.value = crypted.output; navigator.clipboard.writeText(crypted.output)};
            
    } catch (error) {
        console.warn(error.message);
    }    


})  


/*-- RESPONSIVITA' E MEDIA QUERY --*/

const rootElement = document.documentElement;
const rootStyle = getComputedStyle(rootElement);

const buttonSize = parseFloat(rootStyle.getPropertyValue('--button-size'));

window.addEventListener('resize',() =>{
    let controlledValue = rootStyle.getPropertyValue('--controlled-width').toString();
    let inputSize = input.offsetWidth;
    let bordersize = parseFloat(getComputedStyle(button).borderTopWidth);
    
    let  controlledWidth = inputSize - buttonSize - (bordersize * 2) -1;
    
    rootElement.style.setProperty('--controlled-width', `${controlledWidth}px`); 
    
})


const orientationQuery = window.matchMedia("(max-width: 700px)");

//-- OSSERVATORE QUERY --//
orientationQuery.onchange = () =>{
    let articleContent = article.children;

    if(orientationQuery.matches) {
        console.log("choosed? ",articleContent[2])

        alternativePlacing.classList.remove("hidden");

        if(articleContent[2].id === 'choosed') {
            article.removeChild(articleContent[2]);
        }

        alternativePlacing.append(choosed);

    }else if(mainplacing.firstElementChild.id !== 'choosed'){
        alternativePlacing.innerHTML = "";
        alternativePlacing.classList.toggle("hidden");
        mainplacing.append(choosed);
    };
}



window.addEventListener('load',()=>{ 
    window.dispatchEvent(new Event('change'));
    window.dispatchEvent(new Event('resize'));

    sessionStorage.clear();
    sessionStorage.setItem('reloaded', 'true');
    let reloadCkeck = sessionStorage.getItem('reloaded');
    if(!reloadCkeck){
        location.reload();
        console.log("reloaded");
        
    } 
});



