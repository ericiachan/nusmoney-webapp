let videos = []
var counter = 0;

function loadVideos() {
    fetch("http://localhost:3000/videos").then(function (response) {
        response.json().then(function (json) {
            console.log(json.videos);
            videos = json.videos;
            lessonvideo.src = videos[0].link;
            video_title.innerHTML  = videos[0].name;
        });
    });

    setNumberOfCompletedLesson(1);
}

function onNextButtonClick() {
    counter = counter + 1;
    console.log(counter)
    if (counter === videos.length - 1) {
        document.getElementById("nextbutton").disabled = true;
    };
    document.getElementById("backbutton").disabled = false;
    lessonvideo.src = videos[counter].link;
    video_title.innerHTML  = videos[counter].name;

    setNumberOfCompletedLesson(counter);
}

function onBackButtonClick() {
    counter = counter - 1;
    if (counter === 0) {
        document.getElementById("backbutton").disabled = true;
    }
    document.getElementById("nextbutton").disabled = false;
    lessonvideo.src = videos[counter].link;
    video_title.innerHTML  = videos[counter].name;
}

document.getElementById("attemptquiz").addEventListener("click", onNextButtonClick());
