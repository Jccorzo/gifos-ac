const start = document.getElementById("start");
const stepOne = document.getElementById("firstStep");
const stepTwo = document.getElementById("secondStep")
const title = document.getElementById("videoTitle");
const text = document.getElementById("videoText");
const videoContainer = document.getElementById("mainVideo")
const video = document.getElementById("video");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("segs");
let n = 0;
let h = 0;
let m = 0;
let s = 0;
let recorder;
var intervarlId;


const recordGif = () => {
    start.innerHTML = "FINALIZAR"
    start.removeEventListener("click", recordGif)
    start.addEventListener("click", stopRecording)
    recorder.startRecording()
    intervarlId = setInterval(count, 1000);
}

const stopRecording = () => {
    recorder.stopRecording()
    start.removeEventListener("click", stopRecording)
    start.addEventListener("click", uploadGif)
    start.innerHTML = "SUBIR GIFO"
    clearInterval(intervarlId)
}

const uploadGif = () => {

}

function count(){
    s = s > 59 ? 0 : s;
    m = Math.floor(n / 60) % 60;
    h = Math.floor(n / 3600);
    seconds.innerHTML = displayTwoZeros(s)
    minutes.innerHTML = displayTwoZeros(m)
    hours.innerHTML = displayTwoZeros(h)
    s++;
    n++;
}

const startExperience = () => {
    start.style.visibility = "hidden"
    stepOne.classList.add("selected");
    title.innerHTML = `¿Nos das acceso <br> a tu cámara?`;
    text.innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    }).then((stream) => {
        title.remove()
        text.remove()
        videoContainer.classList.add("moodVideo")
        video.style.display = "block";
        video.style.position = "absolute";
        stepOne.classList.remove("selected")
        stepTwo.classList.add("selected")
        start.removeEventListener("click", startExperience)
        start.addEventListener("click", recordGif)
        start.innerHTML = "GRABAR";
        start.style.visibility = "visible";
        start.style.minWidth = "127px"
        video.srcObject = stream;
        video.play()
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240
        });
    }).catch(() => {
        alert("Es necesario que nos permitas usar tu camara para grabar")
    })
}

start.addEventListener("click", startExperience)