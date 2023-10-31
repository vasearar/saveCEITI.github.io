const crosshair = document.querySelector(".crosshair");
const gun = document.querySelector(".gun");
const scoreSpan = document.querySelector(".score");
const crosshairElement = document.querySelectorAll('.crosshairElement');
const height = window.innerHeight;
const width = window.innerWidth;
const ambientAudio = document.querySelector("#ambientSound");
const volumeControl = document.querySelector("#sound");
let score = 0;

window.addEventListener("mousemove", (e) => {
  const width = window.innerWidth;
  let x = e.clientX;
  let y = e.clientY;
  crosshair.style.left = `${x}px`;
  crosshair.style.top = `${y}px`;
  crosshair.style.display = "block";
  gun.style.left = `calc(25% + ${x/width*20}%)`;
  gun.style.bottom = `-${y/height*50}px`;
  if(x > width/2){
    gun.style.transform = "scaleX(-1)";
  } else {
    gun.style.transform = "scaleX(1)";
  }
});

function spawnSpider(size){
  let spider = document.createElement("span");
  spider.innerHTML = "🕷";
  spider.style.fontSize = `${size}rem`;
  document.querySelector(".game").append(spider);
  spider.classList.add("spider");
  spider.style.left = `${getRandomNumberPos()}rem`;
  let i = 0;
  spiderInterval = setInterval(() => {
    spider.style.top = `${i}vh`;
    i = i + 0.3;
    if (i > 80 && i < 80.1){
      killSpider(spider);
    }
  }, 10);

  spider.addEventListener("click", () => {
    handleClick(spider, spiderInterval);
  });

  spider.addEventListener("mouseover", () => {
    handleHover();
  });

  spider.addEventListener("mouseout", () => {
    handleOut();
  });
};

function handleHover(){
  crosshairElement[0].style.background = 'linear-gradient(90deg, rgb(192, 30, 30) 0%, rgb(192, 30, 30) 40%, transparent 40%, transparent 60%, rgb(192, 30, 30) 60%, rgb(192, 30, 30) 100%)';
  crosshairElement[1].style.background = 'linear-gradient(90deg, rgb(192, 30, 30) 0%, rgb(192, 30, 30) 40%, transparent 40%, transparent 60%, rgb(192, 30, 30) 60%, rgb(192, 30, 30) 100%)';
}

function handleClick(x){
  x.remove();
  crosshairElement[0].style.background = 'linear-gradient(90deg, rgb(96, 236, 40) 0%, rgb(96, 236, 40) 40%, transparent 40%, transparent 60%, rgb(96, 236, 40) 60%, rgb(96, 236, 40) 100%)';
  crosshairElement[1].style.background = 'linear-gradient(90deg, rgb(96, 236, 40) 0%, rgb(96, 236, 40) 40%, transparent 40%, transparent 60%, rgb(96, 236, 40) 60%, rgb(96, 236, 40) 100%)';
  scoreBoard();
}

function handleOut(){
  crosshairElement[0].style.background = 'linear-gradient(90deg, rgb(96, 236, 40) 0%, rgb(96, 236, 40) 40%, transparent 40%, transparent 60%, rgb(96, 236, 40) 60%, rgb(96, 236, 40) 100%)';
  crosshairElement[1].style.background = 'linear-gradient(90deg, rgb(96, 236, 40) 0%, rgb(96, 236, 40) 40%, transparent 40%, transparent 60%, rgb(96, 236, 40) 60%, rgb(96, 236, 40) 100%)';  
}

function scoreBoard(){
  scoreSpan.textContent = `Score: ${score}`;
  score++;
}

scoreBoard();

function getRandomNumberPos() {
  return Math.floor(Math.random() * (89 - 11 + 1)) + 11;
}

var hp = 3;
var hpBar = document.querySelector(".hp");


function killSpider(x){
  x.remove();
}


function abtME(){
  alert("173cm, 62kg, 62kg bench pr");
}


function settings(){
  let menu = document.querySelector(".menu");
  let settings =  document.querySelector(".settings");
  menu.style.left = "-50%";
  menu.style.rotate = "720deg";
  settings.style.left = "50%";
}

function back(){
  let menu = document.querySelector(".menu");
  let settings =  document.querySelector(".settings");
  settings.style.left = "150%";
  menu.style.left = "50%";
  menu.style.rotate = "0deg";
}

const rangeInput = document.getElementById("joke");
rangeInput.addEventListener("input", function() {
  if (parseInt(rangeInput.value) > 30) {
    rangeInput.value = 30;
  }
});

volumeControl.addEventListener("input", function() {
  const volume = volumeControl.value / 100;
  ambientAudio.volume = volume;
});

let aux = 0;  
setInterval(() => {
aux++;  
let titles = ["Protect CEITI🕷", "Booooo👻", "Shoot shoot shoot🔫"];
document.title = titles[aux%3];
}, 7500);


function startGame(){
  let game = document.querySelector(".game");
  let loading = document.querySelector(".loading");
  let menu = document.querySelector(".menu");

  loading.classList.add("appear");
  setTimeout(() => {
    loading.style.opacity = "1";
    loading.classList.remove("appear");
    menu.style.display = "none";
    document.querySelector(".settings").style.display = "none";
    setTimeout(() => {
      game.style.display = "block";
      loading.classList.add("disappear");
      document.querySelector("*").style.cursor = "none";
      setTimeout(() => {
        loading.style.display = "none";
        window.addEventListener("click", (e) => {
          let x = e.clientX;
          let y = e.clientY;
          let boom = document.createElement("img");
          boom.src = "./assets/boom.png";
          document.querySelector(".game").append(boom);
          boom.style.left = `${x}px`;
          boom.style.top = `${y}px`;
          boom.classList.add("boom");
          boom.style.transform = `translate(-50%, -43%) rotate(${Math.floor(Math.random() * 361) - 180}deg)`;
          setInterval(() => {
            boom.remove();
          }, 500);
          const shotAudio = new Audio("./assets/shot.mp3");
          shotAudio.volume = "0.1";
          shotAudio.play();
        });
        let starting = 1400;
        let size = 10;
        spawnInterval = setInterval(() => {
          spawnSpider(size);
          starting = starting - 14;
          size = size - 0.098;
          if (starting < 80){
            clearInterval(spawnInterval);
            if (score > 100){
              alert("Concratulations");
              location.reload();
            } else {
              alert("Loser");
              location.reload();
            }
          }
        }, starting);
      },2000);
    }, 2000);
  }, 1000);
 
  ambientAudio.play();
}
