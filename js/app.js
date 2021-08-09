 'use strict';


let imgArray = [
     'wine-glass.jpg', 'water-can.jpg', 'unicorn.jpg',
     'tauntaun.jpg', 'sweep.png', 'shark.jpg', 'scissors.jpg',
     'pet-sweep.jpg', 'pen.jpg', 'dragon.jpg', 'dog-duck.jpg', 
     'cthulhu.jpg', 'chair.jpg', 'bubblegum.jpg', 'breakfast.jpg',
     'boots.jpg', 'bathroom.jpg', 'banana.jpg', 'bag.jpg' 
];


let all = [];
let countRound = 0;
let numberOfRound = 25;
let shownArray = [0,0,0];



const bussMallContainer = document.getElementById('bussMallContainer');
let leftImage = document.getElementById('leftBusMallImage');
let middleImage = document.getElementById('middleBusMallImage');
let rightImage = document.getElementById('rightBusMallImage');
let resultBtn = document.getElementById('resultBtn');
let resultTable = document.getElementById('resultsTable');


function BussMall( imgName , imageSrc ) {

        this.imgName = imgName;
        this.image = imageSrc;
        this.shown = 0;
        this.clicked = 0;
        BussMall.all.push(this);

    }

    console.log(all);


for(let i = 0; i < imgArray.length; i++ ){
    new BussMall( imgArray[i].split('.')[0], imgArray[i] );
           }


BussMall.prototype.render = function() {

    var leftImageRandom = getRandomNum(0, imgArray - 1);
    var middleImageRandom = getRandomNum(0, imgArray -1);
    var rightImageRandom = getRandomNum(0, imgArray - 1);

    leftImage.src = './assets/' + BussMall.all[leftImageRandom].image;
    middleImage.src = './assets/' + BussMall.all[middleImageRandom].image;
    rightImage.src = './assets/' + BussMall.all[rightImageRandom].image;


    BussMall.all[leftImageRandom].shown++;
    BussMall.all[leftImageRandom].clicked++;

    BussMall.all[middleImageRandom].shown++;
    BussMall.all[middleImageRandom].clicked++;

    BussMall.all[rightImageRandom].shown++;
    BussMall.all[rightImageRandom].clicked++;

    BussMall.all = [];
    

}
render();


bussMallContainer.addEventListener('click', clickHandler);
function clickHandler(click){

    if ((click.target.id === 'leftBusMallImage' || click.target.id === 'middleBusMallImage'
     || click.target.id === 'rightBusMallImage') && countRound < numberOfRound ){
        render();
         countRound++;
                  
     }

}

resultBtn.addEventListener('submit', resultHandler);
function resultHandler(event){
 
let headerTable = document.createElement('tr');
resultTable.appendChild(headerTable);

let h1 = document.createElement('th');
h1.textContent = 'Image Name';
headerTable.appendChild(h1);

let h2 = document.createElement('th');
h1.textContent = 'No of Clicked';
headerTable.appendChild(h2);

let h3 = document.createElement('th');
h3.textContent = "No of viewed";
headerTable.appendChild(h3);


 let dr = document.createElement('tr');
 resultTable.appendChild(dr);

let dcell = document.createElement('td');
    dcell.textContent = imgArray[i].split('.')[0];
    dr.appendChild(dcell);

    let dcell2 = document.createElement('td');
    dcell2.textContent = this.clicked;
    dr.appendChild(dcell2);

    let dcell3 = document.createElement('td');
    dcell3.textContent = this.shown;
    dr.appendChild(dcell3);

}

function getRandomNum ( min , max ){
    return Math.floor(Math.random() * (max - min + 1) + min);

}