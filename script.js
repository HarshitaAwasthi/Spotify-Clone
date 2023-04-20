//initializing the variables used below
let currSongIndex=0;
let masterPlayButton=document.getElementById("masterPlayButton");
let masterSongName=document.getElementsByClassName("masterSongName")[0];
let masterSingerName=document.getElementsByClassName("masterSingerName")[0];
let masterSongImg=document.getElementById("masterSongImg");
let audioELement=new Audio("songs/1.mp3");
let gif=document.getElementById("gif");
let progressBar=document.getElementById("myProgressBar");
let songItems=document.querySelectorAll(".songItem");       //Array containing all song items

//array of objects
let songs = [
    {songName: "Tere Hawaale" , singerName: "Arijit Singh", songPath: "songs/1.mp3" , coverImage: "covers/1.jpg"},
    {songName: "O rangrez" , singerName: "Javed Bashir, Shreya Ghoshal", songPath: "songs/2.mp3" , coverImage: "covers/2.jpg"},
    {songName: "Inkem Inkem Kaavale" , singerName: "Sid Sriram", songPath: "songs/3.mp3" , coverImage: "covers/3.jpg"},
    {songName: "Apna Har Din" , singerName: "Shaan, Anushka Manchanda", songPath: "songs/4.mp3" , coverImage: "covers/4.jpg"},
    {songName: "Uff Teri Adaa" , singerName: "Shankar Mahadevan", songPath: "songs/5.mp3" , coverImage: "covers/5.jpg"},
    {songName: "Nazar Laaye (Reprise)" , singerName: "A.R. Rahman", songPath: "songs/6.mp3" , coverImage: "covers/6.jpg"},
    {songName: "O Re Piya" , singerName: "Rahat Fateh Ali Khan", songPath: "songs/7.mp3" , coverImage: "covers/7.jpg"},
    {songName: "Tum Mile (Love Reprise)" , singerName: "Javed Ali, Pritam", songPath: "songs/8.mp3" , coverImage: "covers/8.jpg"},
    {songName: "SaudeBazi" , singerName: "Javed Ali", songPath: "songs/9.mp3" , coverImage: "covers/9.jpg"},
    {songName: "Rehna Tu" , singerName: "A.R. Rahman", songPath: "songs/10.mp3" , coverImage: "covers/10.jpg"}
];

//Let's set the corresponding images and cover of the index.html according to above array
for(var i=0;i<songItems.length;i++) {
    songItems[i].getElementsByTagName("img")[0].src=songs[i].coverImage;
    songItems[i].querySelector(".songName").innerHTML=songs[i].songName;
    songItems[i].querySelector(".singerName").innerHTML=songs[i].singerName;
}

//playing a song
const makeAllPlays = function() {
    for(var i=0;i<songItems.length;i++) {
        songItems[i].querySelector("#songPlay").classList.remove("fa-circle-pause");
        songItems[i].querySelector("#songPlay").classList.add("fa-circle-play");
    }
}

for(var i=0;i<songItems.length;i++) {
    songItems[i].querySelector("#songPlay").addEventListener("click", function(e) {
        makeAllPlays();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        currSongIndex=e.target.classList[0];
        audioELement.currentTime=0;
        audioELement.src=songs[currSongIndex].songPath;
        audioELement.play();

        masterPlayButton.classList.remove("fa-circle-play");
        masterPlayButton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        masterSongName.innerHTML=songs[currSongIndex].songName;
        masterSingerName.innerHTML=songs[currSongIndex].singerName;
        masterSongImg.src=songs[currSongIndex].coverImage;
    });
}

//Listen to events
masterPlayButton.addEventListener("click", function() {
    if(audioELement.paused || audioELement.currentTime<=0) {
        audioELement.play();
        masterPlayButton.classList.remove("fa-circle-play");
        masterPlayButton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else {
        audioELement.pause();
        masterPlayButton.classList.remove("fa-circle-pause");
        masterPlayButton.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});

audioELement.addEventListener("timeupdate",function() {
    //Update progress bar
    let progress=parseInt((audioELement.currentTime/audioELement.duration)*100);
    console.log(progress);
    progressBar.value=progress;
})

progressBar.addEventListener("change", function() {
    audioELement.currentTime=((progressBar.value*audioELement.duration)/100);
});

document.getElementById("fwdButton").addEventListener("click",function() {
    if(currSongIndex>=9) {
        currSongIndex=0;
    }
    else {
        currSongIndex+=1;
        audioELement.src=songs[currSongIndex].songPath;
        audioELement.currentTime=0;
        audioELement.play();

        makeAllPlays();
        songItems[currSongIndex].querySelector("#songPlay").classList.remove("fa-circle-play");
        songItems[currSongIndex].querySelector("#songPlay").classList.add("fa-circle-pause");
        masterPlayButton.classList.remove("fa-circle-play");
        masterPlayButton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        masterSongName.innerHTML=songs[currSongIndex].songName;
        masterSingerName.innerHTML=songs[currSongIndex].singerName;
        masterSongImg.src=songs[currSongIndex].coverImage;
    }
});

document.getElementById("backButton").addEventListener("click",function() {
    if(currSongIndex<=0) {
        currSongIndex=0;
    }
    else {
        currSongIndex-=1;
        audioELement.src=songs[currSongIndex].songPath;
        audioELement.currentTime=0;
        audioELement.play();

        makeAllPlays();
        songItems[currSongIndex].querySelector("#songPlay").classList.remove("fa-circle-play");
        songItems[currSongIndex].querySelector("#songPlay").classList.add("fa-circle-pause");
        masterPlayButton.classList.remove("fa-circle-play");
        masterPlayButton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        masterSongName.innerHTML=songs[currSongIndex].songName;
        masterSingerName.innerHTML=songs[currSongIndex].singerName;
        masterSongImg.src=songs[currSongIndex].coverImage;
    }
})