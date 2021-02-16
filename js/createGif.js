const start = document.getElementById("start");
const stepOne = document.getElementById("firstStep");
const stepTwo = document.getElementById("secondStep")
const stepThree = document.getElementById("thirdStep")
const title = document.getElementById("videoTitle");
const text = document.getElementById("videoText");
const videoContainer = document.getElementById("mainVideo")
const video = document.getElementById("video");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("segs");
const repeat = document.getElementById("repeatContainer");
const card = document.getElementById("card");
const uploadText = document.getElementById("uploadText");
const uploadImage = document.getElementById("uploadImage");
const optionsCard = document.getElementById("optionsCard");
const link = document.getElementById("link")
const download = document.getElementById("download")

let n = 0, h = 0, m = 0, s = 0;
let recorder;
let intervarlId;
let gifId;

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

    hours.style.display = "none";
    seconds.style.display = "none";
    minutes.style.display = "none";
    repeat.style.display = "flex";
}

const repeatRecord = () => {
    start.innerHTML = "GRABAR"
    start.removeEventListener("click", uploadGif)
    start.addEventListener("click", recordGif)
    n = 0, h = 0, m = 0, s = 0;
    repeat.style.display = "none"
    hours.innerHTML = "00:"
    hours.style.display = "block"
    minutes.innerHTML = "00:"
    minutes.style.display = "block"
    seconds.innerHTML = "00"
    seconds.style.display = "block"
}

const uploadGif = async () => {
    const form = new FormData();
    form.append("file", recorder.getBlob(), 'myGif');
    try {
        //Estamos subi
        card.style.display = "flex"
        stepTwo.classList.remove("selected")
        stepThree.classList.add("selected")
        start.style.display = "none"
        repeat.style.display = "none";
        const data = await uploadNewGif(form)
        gifId = data.data.id;
        saveGif(data.data.id)
        optionsCard.style.display = "block"
        uploadImage.src = "../images/createGif/ok.svg"
        uploadText.innerHTML = "GIFO subido con éxito"

    } catch (err) {
        console.log("ERRR", err)
        alert("Ocurrió un error subiendo u Gif, por favor vuelve a intentarlo")
    }
}

function count() {
    s = s > 59 ? 0 : s;
    m = Math.floor(n / 60) % 60;
    h = Math.floor(n / 3600);
    seconds.innerHTML = displayTwoZeros(s)
    minutes.innerHTML = displayTwoZeros(m) + ":"
    hours.innerHTML = displayTwoZeros(h) + ":"
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

const openGifUrl = async () => {
    const gif = await getGif(gifId);
    window.open(gif.data.url)
}

download.addEventListener("click", async () => {
    const gif = await getGif(gifId)
    await downloadGif(gif.data.images.downsized.url)
})
link.addEventListener("click", openGifUrl)
start.addEventListener("click", startExperience)
repeat.addEventListener("click", repeatRecord)