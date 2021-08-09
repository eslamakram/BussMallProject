'use strict';


let imgArray = [
    'wine-glass.jpg', 'water-can.jpg', 'unicorn.jpg',
    'tauntaun.jpg', 'sweep.png', 'shark.jpg', 'scissors.jpg',
    'pet-sweep.jpg', 'pen.jpg', 'dragon.jpg', 'dog-duck.jpg',
    'cthulhu.jpg', 'chair.jpg', 'bubblegum.jpg', 'breakfast.jpg',
    'boots.jpg', 'bathroom.jpg', 'banana.jpg', 'bag.jpg'
];


//let all = [];
let countRound = 0;
let numberOfRound = 25;

let leftIndex = 0;
let middleIndex = 0;
let rightIndex = 0;

let imgNameArr = [];
let shownArr = [];
let clickedArr = [];

let preventArr = [];


const bussMallContainer = document.getElementById('bussMallContainer');
let leftImage = document.getElementById('leftBusMallImage');
let middleImage = document.getElementById('middleBusMallImage');
let rightImage = document.getElementById('rightBusMallImage');
let resultBtn = document.getElementById('resultBtn');
let resultTable = document.getElementById('resultsTable'); 


function BussMall(imgName, imageSrc) {
    this.imgName = imgName;
    this.image = imageSrc;
    this.shown = 0;
    this.clicked = 0;
    BussMall.all.push(this);

}

BussMall.all = [];
console.log(BussMall.all);

for (let i = 0; i < imgArray.length; i++) {
    new BussMall(imgArray[i].split('.')[0], imgArray[i]);
}


function render() {

    leftIndex = getRandomNum(0, imgArray.length - 1);
    middleIndex = getRandomNum(0, imgArray.length - 1);
    rightIndex = getRandomNum(0, imgArray.length - 1);

    leftImage.src = './assets/' + BussMall.all[leftIndex].image;
    middleImage.src = `./assets/${BussMall.all[middleIndex].image}`;
    rightImage.src = './assets/' + BussMall.all[rightIndex].image;


    BussMall.all[leftIndex].shown++;
   
    BussMall.all[middleIndex].shown++;
    
    BussMall.all[rightIndex].shown++;
   
}
render();


bussMallContainer.addEventListener('click', clickHandler);
function clickHandler(click) {

    if ((click.target.id === 'leftBusMallImage' || click.target.id === 'middleBusMallImage'
        || click.target.id === 'rightBusMallImage') && countRound < numberOfRound) {
        

    if(click.target.id === 'leftBusMallImage'){

        BussMall.all[leftIndex].clicked++;

    }
    else if(click.target.id === 'middleBusMallImage'){

        BussMall.all[middleIndex].clicked++;

    }
    else if(click.target.id === 'rightBusMallImage'){

        BussMall.all[rightIndex].clicked++;

    }
    render();
        countRound++;

}}



resultBtn.addEventListener('click', resultHandler);
function resultHandler(event) {

    for(let i = 0; i < BussMall.all.length; i++){

        imgNameArr.push(BussMall.all[i].imgName);
        shownArr.push(BussMall.all[i].shown);
        clickedArr.push(BussMall.all[i].clicked);
    }

  if ( event.target.id === 'resultBtn'){

    let headerTable = document.createElement('tr');
    resultTable.appendChild(headerTable);

    let hRow1 = document.createElement('th');
    hRow1.textContent = 'Image Name';
    headerTable.appendChild(hRow1);

    let hRow2 = document.createElement('th');
    hRow2.textContent = 'No of Clicked';
    headerTable.appendChild(hRow2);

    let hRow3 = document.createElement('th');
    hRow3.textContent = "No of viewed";
    headerTable.appendChild(hRow3);

for(let i = 0; i < BussMall.all.length; i++){

    let dr = document.createElement('tr');
    resultTable.appendChild(dr);

    let dcell = document.createElement('td');
    dcell.textContent = imgNameArr[i];
    dr.appendChild(dcell);

    let dcell2 = document.createElement('td');
    dcell2.textContent = clickedArr[i];
    dr.appendChild(dcell2);

    let dcell3 = document.createElement('td');
    dcell3.textContent = shownArr[i];
    dr.appendChild(dcell3);
}
}

}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}