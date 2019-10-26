'use strict'
var sales = document.getElementById('sales');
var ctx = document.getElementById('myChart').getContext('2d');
function TheSale(title, src) {
    this.title = title;
    this.src = src;
    this.clickCtr = 0;
    this.shownCtr = 0;
    TheSale.all.push(this);
}

TheSale.roundCtr = 0;
TheSale.roundLimit = 25;
TheSale.all = [];
TheSale.container = document.getElementById('sales-container');
TheSale.leftImage = document.getElementById('left-sale-image');
TheSale.centerImage = document.getElementById('center-sale-image');
TheSale.rightImage = document.getElementById('right-sale-image');

TheSale.leftTitle = document.getElementById('left-sale-title');
TheSale.centerTitle = document.getElementById('center-sale-title');
TheSale.rightTitle = document.getElementById('right-sale-title');
TheSale.leftObject = null;
TheSale.centerObject = null;
TheSale.rightObject = null;


new TheSale('bag', 'images/bag.jpg');
new TheSale('banana', 'images/banana.jpg');
new TheSale('bathroom', 'images/bathroom.jpg');
new TheSale('boots', 'images/boots.jpg');
new TheSale('breakfast', 'images/breakfast.jpg');
new TheSale('bubblegum', 'images/bubblegum.jpg');
new TheSale('chair', 'images/chair.jpg');
new TheSale('cthuhlhu', 'images/cthulhu.jpg');
new TheSale('dog-duck', 'images/dog-duck.jpg');
new TheSale('dragon', 'images/dragon.jpg');
new TheSale('pen', 'images/pen.jpg');
new TheSale('pet-sweep', 'images/pet-sweep.jpg');
new TheSale('scissors', 'images/scissors.jpg');
new TheSale('shark', 'images/shark.jpg');
new TheSale('sweep', 'images/sweep.png');
new TheSale('tauntaun', 'images/tauntaun.jpg');
new TheSale('unicorn', 'images/unicorn.jpg');
new TheSale('usb', 'images/usb.gif');
new TheSale('water-can', 'images/water-can.jpg');
new TheSale('wine-glass', 'images/wine-glass.jpg');

function updateSales() {
    var salesString = JSON.stringify(TheSale.all);
    localStorage.setItem('sales', salesString);
}
function getSales() {
    var data = localStorage.getItem('sales');
    var salesData = JSON.parse(data);
    if (salesData) {
        for (var i = 0; i < salesData.length; i++) {
            var rawSalesObject = salesData[i];
            var newSale = TheSale.all[i] ;
            newSale.clickCtr=rawSalesObject.clickCtr ; 
            newSale.shownCtr=rawSalesObject.shownCtr ;
        } 
        
        renderNewTheSale(); }
    }


function renderNewTheSale() {

    var forbidden = [TheSale.leftObject, TheSale.centerObject, TheSale.rightObject];

    do {

        TheSale.leftObject = getRandomTheSale();

    } while (forbidden.includes(TheSale.leftObject))


    forbidden.push(TheSale.leftObject);

    do {

        TheSale.centerObject = getRandomTheSale();

    } while (forbidden.includes(TheSale.centerObject));

    forbidden.push(TheSale.centerObject);

    do {

        TheSale.rightObject = getRandomTheSale();

    } while (forbidden.includes(TheSale.rightObject));


    TheSale.leftObject.shownCtr++;
    TheSale.centerObject.shownCtr++;
    TheSale.rightObject.shownCtr++;
    var leftTheSaleImageElement = TheSale.leftImage;
    var centerTheSaleImageElement = TheSale.centerImage;
    var rightTheSaleImageElement = TheSale.rightImage;

    leftTheSaleImageElement.setAttribute('src', TheSale.leftObject.src);
    leftTheSaleImageElement.setAttribute('alt', TheSale.leftObject.title);
    centerTheSaleImageElement.setAttribute('src', TheSale.centerObject.src);
    centerTheSaleImageElement.setAttribute('alt', TheSale.centerObject.title);
    rightTheSaleImageElement.setAttribute('src', TheSale.rightObject.src);
    rightTheSaleImageElement.setAttribute('alt', TheSale.rightObject.title);
    TheSale.leftTitle.textContent = TheSale.leftObject.title;
    TheSale.centerTitle.textContent = TheSale.centerObject.title;
    TheSale.rightTitle.textContent = TheSale.rightObject.title;
}
function getRandomTheSale() {
    var index = Math.floor(Math.random() * TheSale.all.length);
    return TheSale.all[index];
}

function updateTotals() {
    var printOut = document.getElementById('sales');
    printOut.innerHTML = '';
    for (var i = 0; i < TheSale.all.length; i++) {
        var sale = TheSale.all[i];
        var data = addElement('data', printOut);
        addElement('section', data, sale.title + ' had ' + sale.clickCtr + ' votes and was shown ' + sale.shownCtr + ' times')

    }
}

function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if (text) {
        element.textContent = text;
    }
    return element;
}
function clickHandler(event) {

    var clickedId = event.target.id;
    var saleClicked;

    if (clickedId === 'left-sale-image') {
        saleClicked = TheSale.leftObject;
    } else if (clickedId === 'center-sale-image') {
        saleClicked = TheSale.centerObject;
    } else if (clickedId === 'right-sale-image') {
        saleClicked = TheSale.rightObject;
    } else {
        console.log(clickedId);
    }

    if (saleClicked) {
        saleClicked.clickCtr++;
        TheSale.roundCtr++;

       

        if (TheSale.roundCtr === TheSale.roundLimit) {
            updateTotals();
            alert('The end of voting ! Thank you ');
            salesChart();
            TheSale.container.removeEventListener('click', clickHandler);
            updateSales();
        } else {

            renderNewTheSale();
        }
    }
}

TheSale.container.addEventListener('click', clickHandler);
function getTheSaleTitles() {

    var saleTitles = [];

    for (var i = 0; i < TheSale.all.length; i++) {
        var saleInstance = TheSale.all[i];
        saleTitles.push(saleInstance.title);

    }
    return saleTitles;
}
var clickCounter = [];
function click() {

    for (var i = 0; i < TheSale.all.length; i++) {

        var clickInstance = TheSale.all[i];

        clickCounter.push(clickInstance.clickCtr);

    }
    return clickCounter;
}
var shownCounter = [];
function shown() {

    for (var i = 0; i < TheSale.all.length; i++) {
        var shownTnstance = TheSale.all[i];
        shownCounter.push(shownTnstance.shownCtr);
    }
    return shownCounter;
}
function salesChart() {


    var chart = new Chart(ctx, {

        type: 'bar',

        data: {
            labels: getTheSaleTitles(),
            datasets: [
                {
                    label: 'click ',
                    backgroundColor: 'white',
                    borderColor: 'black',
                    data: click(),
                },
                {
                    label: 'shown ',
                    backgroundColor: 'blue',
                    borderColor: 'black',
                    data: shown(),
                }
            ]
        },
        options: {}
    });
}



renderNewTheSale();

getSales();
