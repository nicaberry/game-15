let arrCell = [];
let arrNumber = [];
let container = document.querySelector(".container");
let noticeWin = document.querySelector(".noticeWin");

// cell
for (let i = 0; i < 16; i++) {
    arrCell.push(document.createElement("div"));
}
for (let i = 0; i < arrCell.length; i++) {
    arrCell[i].className = "cell";
    container.appendChild(arrCell[i]);
}

// number
for (let i = 0; i < 15; i++) {
    arrNumber.push(document.createElement("div"));
}

let arrWin = [];
for (let i = 0; i < arrNumber.length; i++) {
    arrNumber[i].className = "number";
    arrNumber[i].innerHTML = i + 1;
    arrCell[i].appendChild(arrNumber[i]);
    arrWin.push(arrNumber[i].innerHTML);
}

// случайный массив
function fortuitousNumber(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

function arrFortuitousNumber() {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let arr2 = [];
    let a = 15;
    let b = 0;
    for (let i = 0; i < 15; i++) {
        let forNum = fortuitousNumber(a, b);
        arr2.push(arr.splice(forNum, 1)[0]);
        a = a - 1;
    }
    return arr2;
}

// перемешать всё
let btnStartGame = document.querySelector(".startGame");
btnStartGame.onclick = function () {
    noticeWin.style.display = "none";
    let arrForNum = arrFortuitousNumber();
    for (let i = 0; i < arrCell.length - 1; i++) {
        arrCell[i].appendChild(arrNumber[arrForNum[i]]);
    }
}

// Win
function Winner() {
    let arrWinner = [];
    let nullCell;
    for (let i = 0; i < arrCell.length; i++) {
        if (arrCell[i].firstElementChild === null) {
            nullCell = i; 
            continue;
        } else {
            arrWinner.push(parseInt(arrCell[i].firstElementChild.innerHTML));
        }
    }

    if (nullCell === 15) {
        if(arrWinner.join("") == "123456789101112131415") {
            noticeWin.style.display = "block";
        }
    }
}


// ходы 
for (let i = 0; i < arrNumber.length; i++) {
    arrNumber[i].onclick = function () {
     
        for (let j = 0; j < arrCell.length; j++) {

            if (arrCell[j].childNodes.length == 0) {

                let previousElSiChild;
                let previousElSi = arrCell[j].previousElementSibling;
                if (previousElSi != null) {
                    previousElSiChild = previousElSi.firstElementChild;
                }

                let previousElSiChild4;
                try {
                    let previousElSi4 = arrCell[j].previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
                    if (previousElSi4 != null) {
                        previousElSiChild4 = previousElSi4.firstElementChild;
                    }
                } catch (e) {

                }

                let nextElSiChild;
                let nextElSi = arrCell[j].nextElementSibling;
                if (nextElSi != null) {
                    nextElSiChild = nextElSi.firstElementChild;
                }

                let nextElSiChild4;
                try {
                    let nextElSi4 = arrCell[j].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
                    if (nextElSi4 != null) {
                        nextElSiChild4 = nextElSi4.firstElementChild;
                    }
                } catch (e) {

                }

                switch (arrNumber[i]) {
                    case previousElSiChild: if (arrCell[j] == arrCell[4] || arrCell[j] == arrCell[8] || arrCell[j] == arrCell[12]) {
                        continue;
                    } else {
                        arrCell[j].appendChild(arrNumber[i]); Winner(); break;
                    }
                    case previousElSiChild4: arrCell[j].appendChild(arrNumber[i]); Winner(); break;
                    case nextElSiChild: if (arrCell[j] == arrCell[3] || arrCell[j] == arrCell[7] || arrCell[j] == arrCell[11]) {
                        continue;
                    } else {
                        arrCell[j].appendChild(arrNumber[i]); Winner(); break;
                    }
                    case nextElSiChild4: arrCell[j].appendChild(arrNumber[i]); Winner(); break;
                }
                break;
            }
        }
    }
}

