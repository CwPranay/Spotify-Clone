
let currentsongs = new Audio();
let songs;

function secondsToMinutes(seconds) {
    if(isNaN(seconds) || seconds <0)
    {
        return "00:00"
    }
    // Calculate minutes and remaining seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60); // Round down to remove decimals

    // Format minutes and seconds to have leading zeros if needed
    var formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
    var formattedSeconds = (remainingSeconds < 10 ? '0' : '') + remainingSeconds;

    // Combine formatted minutes and seconds with a colon separator
    var formattedTime = formattedMinutes + ':' + formattedSeconds;

    return formattedTime;
}


async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let list = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])

        }

    }
    return songs;


}

const playMusic = (track,pause=false) => {
    currentsongs.src = "/songs/" + track;
    if(!pause){
    currentsongs.play()
    
    play.src= "./pause.svg"}
    document.querySelector(".songinfo").innerHTML =decodeURI(track)
    


}
var circle_e=document.querySelector(".circle");

async function main() {


    songs = await getsongs()
   
    playMusic(songs[0],true)

    let songUL = document.querySelector(".songs-list").getElementsByTagName("ul")[0]

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        <img class="invert music" src="./music.svg" alt="">
        <div class="info">
            <div>${song.replaceAll("%20", " ").replaceAll("%26"," ")}</div>
            <div>Arijt</div>
            
        </div>
        <img class="invert play1" src="./play.svg" alt="">
    </li>`


    }
    
    // document.getElementById("show-all").addEventListener("click",() => {
    //   document.querySelector(".container").innerHTML = document.querySelector(".container").innerHTML  +``
    // }
    // )


    Array.from(document.querySelector(".songs-list").getElementsByTagName("li")).forEach(element => {
        element.addEventListener("click", e => {
            console.log(element.querySelector(".info").firstElementChild.innerHTML.trim())
            playMusic(element.querySelector(".info").firstElementChild.innerHTML.trim())
        


        })



    })

    play.addEventListener("click",() => {
      if(currentsongs.paused){
        currentsongs.play();
        play.src ="./pause.svg"
      }
      else{
        currentsongs.pause();
        play.src="./play.svg"
      }
    }
    )
  
    


    currentsongs.addEventListener("timeupdate",() => {
      
      document.querySelector(".duration").innerHTML =`${secondsToMinutes(currentsongs.currentTime)}  / ${secondsToMinutes(currentsongs.duration)}`;
      
      circle_e.style.left = (currentsongs.currentTime / currentsongs.duration) * 100 + "%"
    }
    )
    document.querySelector(".seekbar").addEventListener("click",e => {
        let percent =(e.offsetX/e.target.getBoundingClientRect().width) * 100 
       circle_e.style.left = percent +"%";
       currentsongs.currentTime = ((currentsongs.duration) * percent) /100
      
    }
    )
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = 0;
    })
    document.querySelector(".cancel").addEventListener("click",() => {
      document.querySelector(".left").style.left = -120 + "%"
    }
    )

    next.addEventListener("click",()=>{
        let index = songs.indexOf(currentsongs.src.split("/").slice(-1)[0])
        if (index + 1>= songs.length) {
            playMusic(songs[index + 1])
            
        }
    })
    previous.addEventListener("click",() => {
        let index = songs.indexOf(currentsongs.src.split("/").slice(-1)[0])
        if (index - 1>= 0) {
            playMusic(songs[index - 1])
            
        }
    }
    )
    let v_seekbar = document.querySelector(".v-seek");
    document.querySelector(".volume-svg").addEventListener("click",() => {
        
        if(v_seekbar.style.opacity == 0){
      v_seekbar.style.opacity = 100 +"%"
        }
        else{
            v_seekbar.style.opacity = 0
        }
    }
    )
    
    v_seekbar.addEventListener("change",(e) => {
      
      currentsongs.volume = parseInt(e.target.value)/100
      if(e.target.value == 0){
        document.querySelector(".volume-svg").src ="./mute.svg"
      }
      else{
        document.querySelector(".volume-svg").src ="./volume.svg"
      }
      
    }
    )

    

}

main()

