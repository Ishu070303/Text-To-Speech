const synth=window.speechSynthesis;

//DOM
const textForm=document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const rateValue=document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchValue=document.querySelector('#pitch-value');
const body=document.querySelector('body');

let voices=[];

//for languages.... to speak
const getVoices=() =>{
    voices=synth.getVoices();
    // console.log(voices);

    // loop through voices
    voices.forEach(voice =>{
        //create option element
        const option =document.createElement('option');
        //filled option with voice and language
        option.textContent=voice.name + '('+ voice.lang +')';

        //set needed option attributes
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);

    })
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged =getVoices;
}


//speak function....

const speak= () =>{

    //check if speaking
    if(synth.speaking){
        console.error('Already speaking ...');
        return;
    }
    if(textInput.value !== ''){

       //get speak text
       const speakText =new SpeechSynthesisUtterance(textInput.value);
       //speak end
       speakText.onend = e =>{
           console.log('Done Speaking');
        }

        //speak error
        speakText.onerror= e =>{
            console.error('something went wrong')
        }

        //selected voice
        const selectedVoice =voiceSelect.selectedOptions[0]
        .getAttribute('data-name');//grabbing the one we select

        //loop through voices
        voices.forEach(voice =>{
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }

        });

        //set pitch and rate
        speakText.rate=rate.value; //rate value
        speakText.pitch =pitch.value;//pitch value
        synth.speak(speakText);

    }
};

//event listners

//form submit
textForm.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate value changed
rate.addEventListener('change', e =>rateValue.textContent=rate.value);
pitch.addEventListener('change', e =>pitchValue.textContent=pitch.value) ;

//voice select change
voiceSelect.addEventListener('change', e =>speak());
