/***************initializing the variables used below****************/
let currSongIndex=0;
let masterPlayButton=document.getElementById("masterPlayButton");
let masterSongName=document.getElementsByClassName("masterSongName")[0];
let masterSingerName=document.getElementsByClassName("masterSingerName")[0];
let masterSongImg=document.getElementById("masterSongImg");
let audioELement=new Audio("songs/1.mp3");
let gif=document.getElementById("gif");
let progressBar=document.getElementById("myProgressBar");
let songItems=document.querySelectorAll(".songItem");       //Array containing all song items
let loopBtn=document.getElementById("loopButton");
let shuffleBtn=document.getElementById("shuffleButton");


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



/*********************Listen to events************************/

for(var i=0;i<songItems.length;i++) {
    songItems[i].querySelector("#songPlay").addEventListener("click", function(e) {
        if(audioELement.paused || audioELement.currentTime<=0) {
            makeAllPlays();
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            currSongIndex=parseInt(e.target.classList[0]);
            audioELement.currentTime=0;
            audioELement.src=songs[currSongIndex].songPath;
            audioELement.play();

            masterPlayButton.classList.remove("fa-circle-play");
            masterPlayButton.classList.add("fa-circle-pause");
            gif.style.opacity = 1;
            masterSongName.innerHTML=songs[currSongIndex].songName;
            masterSingerName.innerHTML=songs[currSongIndex].singerName;
            masterSongImg.src=songs[currSongIndex].coverImage;
        }
        else {
            audioELement.pause();
            makeAllPlays();
            gif.style.opacity = 0;
            masterPlayButton.classList.remove("fa-circle-pause");
            masterPlayButton.classList.add("fa-circle-play");
        }
    });
}

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
        makeAllPlays();
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
});

document.getElementById("volumeBtn").addEventListener("change", function(e) {
    audioELement.volume=e.currentTarget.value/100;
});


//If one song ends, play the next song
audioELement.addEventListener("ended",function() {
    
    if(shuffleBtn.src.match("shuffle-on2.png")) {       //If shuffle is ON
        let randomIndex=Math.floor((Math.random())*10);
        currSongIndex=randomIndex;
    }
    else {                          //If shuffle is off
        if(currSongIndex>=9) {
            currSongIndex=0;
        }
        else {
            currSongIndex+=1;
        }
    }

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
});

//loop functionality
loopBtn.addEventListener("click",function() {
    if(this.src.match("loop-off.png")) {
        this.src="loop-all2.png";
        audioELement.loop=false;
    }
    else if(this.src.match("loop-all2.png")) {
        this.src="loop-one2.png";
        audioELement.loop=true;
    }
    else {
        this.src="loop-off.png";
        audioELement.loop=false;
    }
});

//Shuffle play functionality
shuffleBtn.addEventListener("click", function() {
    if(this.src.match("shuffle-off.png")) {
        this.src="shuffle-on2.png";
    }
    else {
        this.src="shuffle-off.png";
    }
});

// shuffleBtn.addEventListener("mouseover", function() {
//     if(this.src.match("shuffle-off.png")) {
//         document.getElementById("shuffON").style.opacity=1;
//     }
//     else {
//         document.getElementById("shuffOFF").style.opacity=1;
//     }
// });

// shuffleBtn.addEventListener("mouseout", function() {
//     document.getElementById("shuffON").style.opacity=0;
//     document.getElementById("shuffOFF").style.opacity=0;
// });
