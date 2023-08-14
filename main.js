let duration =1000 ;
let card =document.querySelectorAll(".game-block") ;
let model =document.querySelectorAll(".model") ;
let tries =document.querySelector(".tries span") ;
let timer =document.querySelector(".timer span") ;


let maxTime =20 ;
let timeLeft =maxTime ;


document.querySelector(".control-buttons span").onclick = function(){
    let name = prompt("enter your name") ;
    if(!name){
        document.querySelector(".info-container .name span").innerHTML ="UnKnown"
        
    }else {
        document.querySelector(".info-container .name span").innerHTML =name ;
    }
    document.querySelector(".control-buttons").remove();
    showCards() ;
    setInterval(initTimer, 1000) ;

    
}
function initTimer() {
    if(timeLeft <= 0) {
        
        return clearInterval(timer);

    }
    timeLeft--;
    timer.innerHTML = timeLeft;
    
}


let blocksContainer =document.querySelector(".memory-game-blocks") ;

let blocks=Array.from(blocksContainer.children)

shuffle(blocks) ;
let order = Array.from(Array(blocks.length).keys()) ;



blocks.forEach((block ,index)=> {
block.style.order = order[index]

block.addEventListener("click",function(){
    isFlipped(block) ;
})
});

function isFlipped(selectedBlock){
selectedBlock.classList.add("is-flipped") ;


let AllBlock = blocks.filter(flippedBlock =>flippedBlock.classList.contains("is-flipped"));

if(AllBlock.length=== 2){
    stopCliking();
    checkMatchCard(AllBlock[0] ,AllBlock[1]) ;
    
}
}

function shuffle(array){
let current = array.length, temp, random ;

while(current > 0){
    random = Math.floor(Math.random ()* current) //get an number from 0 to 19
    current-- ;
    temp =array[current];
    array[current] = array[random] ;
    array[random ] =temp
    

}
return array ;
}

function stopCliking(){
    blocksContainer.classList.add("no-clicking"); 
    setTimeout(()=>{
    blocksContainer.classList.remove("no-clicking");

    },duration)
}
function checkMatchCard(firstCard ,secondCard) {

    if(firstCard.dataset.technology === secondCard.dataset.technology){

        firstCard.classList.remove("is-flipped");
        secondCard.classList.remove("is-flipped");

        firstCard.classList.add("has-match")
        secondCard.classList.add("has-match")

        document.getElementById("success").play() ;

    }else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1 ;
        // showModel()
        setTimeout( function(){
            firstCard.classList.remove("is-flipped");
            secondCard.classList.remove("is-flipped");

        },duration)
        document.getElementById("fail").play() ;


    }

}
function showCards() {
    card.forEach(e=>{
        e.classList.add("is-flipped");

        setTimeout(()=> {
            e.classList.remove("is-flipped")
        },duration + 2000) ;
    })
}

