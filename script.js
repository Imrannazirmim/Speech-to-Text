//selected the elements
const textInputEl = document.getElementById('input-text');
const startBtn = document.getElementById('PlayBtn')
const stopBtn = document.getElementById('offBtn')


let recognition;

function startSpeechText() {

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.start()
        setupSpeech(recognition);
    }

}

function setupSpeech(recognition) {
    console.log(recognition)
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = function (e) {
        const { final, inter } = proccesingResult(e.results);

        textInputEl.innerHTML = final + inter
    }
}

function proccesingResult(results) {
    let final = '';
    let inter = '';
    for (let i = 0; i < results.length; i++) {
        let transcript = results[i][0].transcript;
        transcript.replace('\n', '<br>')
        if (results[i].isFinal) {
            final += transcript;
        } else {
            inter += transcript;
        }
        return { final, inter }
    }
}

function stopSpeechText() {
    if (recognition) {
        recognition.stop()
    }
}

startBtn.addEventListener('click', startSpeechText)
stopBtn.addEventListener('click', stopSpeechText)
