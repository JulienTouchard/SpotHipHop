import { playlist } from "./playlist.js";

function initList (){

    playlist.forEach(function(value,index) {
        
        // creation d'ne entree de playlist
        var list = document.getElementById("list");
        var divItem = document.createElement("div");
        divItem.classList.add("divItem");
        list.append(divItem);
        // creation d'une img pour une miniature de cover
        var imgItem = document.createElement("img");
        imgItem.src = playlist[index].cover;
        imgItem.classList.add("imgItem");
        divItem.append(imgItem);
    
        var titleItem = document.createElement("span");
        titleItem.innerText = playlist[index].titre;
        divItem.append(titleItem);
    
        var separator = document.createElement("span");
        separator.innerText = "|";
        divItem.append(separator);
    
        var artistItem = document.createElement("span");
        artistItem.innerText = playlist[index].artiste;
        divItem.append(artistItem);
    
        var playIcon = document.createElement("i");
        playIcon.classList.add("fa-solid");
        playIcon.classList.add("fa-caret-right");
        divItem.append(playIcon);
    
        var loveIcon = document.createElement("i");
        loveIcon.classList.add("fa-regular");
        loveIcon.classList.add("fa-heart");
        divItem.append(loveIcon);
        
        playIcon.addEventListener("click",function(){
            currentTrack = index;
            nextTrack(false);
        })


    });

}
export {initList}