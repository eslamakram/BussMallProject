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
let numberOfRound = 5;

let leftIndex = 0;
let middleIndex = 0;
let rightIndex = 0;

let imgNameArr = [];
let shownArr = [];
let clickedArr = [];

let preventIndArr = [];


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



    do {

        if((leftIndex === middleIndex) || (preventIndArr.includes(leftIndex)) || (preventIndArr.includes(middleIndex))){
          
            middleIndex = getRandomNum(0, imgNameArr.length-1);
            preventIndArr.push(leftIndex, middleIndex);

        }else if((leftIndex === rightIndex) || (preventIndArr.includes(leftIndex)) || (preventIndArr.includes(middleIndex))){

            rightIndex = getRandomNum(0, imgArray.length-1);
            preventIndArr.push(rightIndex);
        }

    } while( leftIndex === middleIndex || middleIndex === rightIndex || leftIndex === rightIndex);

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

} else {
    createChart();
  }
}


function createChart(){
    let ctx = document.getElementById( 'myChart' ).getContext( '2d' );

  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {

       labels: imgNameArr,
      datasets: [{
        label: '# shown',
        data: shownArr,
        backgroundColor:
                'rgba(255, 99, 132, 0.2)',

        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
        order : 2
    } ,
        {
            label: '# clicked',
            data: clickedArr,
            backgroundColor:
                    'rgba(255, 99, 132, 0.2)',
    
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2,
            order : 1

      }
    ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  } );
}



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