
const StartJarvis = document.getElementById('start');
const StopJarvis = document.getElementById('stop');
// const SpeakJarvis = document.getElementById('speakk');
const statu = document.querySelector(".status");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition ;

const recognition = new SpeechRecognition();

recognition.onstart = function () {
    statu.innerText="Jarvis is active";
}

recognition.onresult = function(event){
    let result = event.resultIndex;
    let tran = event.results[result][0].transcript.toLowerCase();
    console.log(tran)
    let toSpeak= "";
    if (tran.includes('hi')){
       toSpeak= toSpeak+  'Hello Sir, '
    }
    if (tran.includes('jarvis')){
       toSpeak= toSpeak+  'rupin, '
    }
    if (tran.includes('open youtube')){
       toSpeak= toSpeak+  'Opening Youtube, '
       window.open("https://www.youtube.com/")
    }
    if (tran.includes('open google')){
       toSpeak= toSpeak+  'Opening Google, '
       window.open("https://www.google.com/")
    }
    if (tran.includes('open firebase')){
       toSpeak= toSpeak+  'Opening firebase, '
       window.open("https://www.firebase.com/")
    }
    if (tran.includes('search for')){
       toSpeak= toSpeak+  "here's your desired result, "
       let input = tran.split("")
       input.splice(0,11);
       input.pop()
       input = input.join('')
       
       window.open("https://www.google.com/search?q="+input)
    }
    if (tran.includes('show me')){
       toSpeak= toSpeak+  "here's your desired result, "
       let input = tran.split("")
       input.splice(0,8);
       input.pop()
       input = input.join('')
       input = input.split(" ")
       input = input.join("+")
       
       window.open("https://www.youtube.com/results?search_query="+input)
    }

    readOut(toSpeak)
}

recognition.onend = function () {
    setTimeout(() => {
        
        statu.innerText="Jarvis is shut";
    }, 1000);
}

// recognition.continous = true;

StartJarvis.addEventListener("click",()=>{
    recognition.start();
})

// StopJarvis.addEventListener("click",()=>{
//     recognition.onend()
// })


function readOut(message){
    const speech = new SpeechSynthesisUtterance()
    speech.text = message ;
    speech.volume = 1;
    const allVoices = speechSynthesis.getVoices();
    speech.voice = allVoices[12];
    window.speechSynthesis.speak(speech)
    statu.innerText="speaking";
}

// SpeakJarvis.addEventListener("click", ()=>{
//     readOut("Namaste, My Name is Rupin Vijan.")
// })

setInterval(() => {
    const today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.querySelector(".clock").innerText="Time "+ time;
}, 1000);
    navigator.getBattery().then(function(battery) {

        var level = battery.level *100;
    
        document.querySelector(".battery").innerText="Battery : "+ level+"%";
    });
