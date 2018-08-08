
var inputBox = document.getElementById('inputBox');
var equalsLastPressed = false;
var historySpan = document.getElementById('historyText');
historySpan.innerHTML = '';
function inputPressed(inputVal) {
    inputBox.value += String(inputVal);
}

function calculate() {
    
    //First validate there are only accepted operators and numbers
    if (validateInput()) {
       historySpan.innerHTML += inputBox.value;
       //Now check for OOP and eval those first EMDAS (exp, mult/div, add/sub) 
       for (i=0; i<inputBox.value.length; i++) {
            if (inputBox.value[i].match(/^(\^)$/)) {
                var a = getTerm(i, 'l');
                var b = getTerm(i, 'r');
                var c = a ** b;
                var d = inputBox.value.split('');
                d = d.split('')
                d.splice((i-String(a).length) , (Number(String(a).length)+1+Number(String(b).length)), String(c));
                // d.splice((i-String(a).length),(Number(String(a).length)+1+Number(String(b).length)));
                d = d.join('');
                // console.log(d);
                inputBox.value = d;
                i=0;
            }
        }

        for (i=0; i<inputBox.value.length; i++) {
            if (inputBox.value[i].match(/^(\*|\/|\%)$/)) {
                var a = getTerm(i, 'l');
                var b = getTerm(i, 'r');
                var c = eval(`a ${inputBox.value[i]} b`);
                var d = inputBox.value
                d = d.split('')
                d.splice((i-String(a).length) , (Number(String(a).length)+1+Number(String(b).length)), String(c));
                // d.splice((i-String(a).length),(Number(String(a).length)+1+Number(String(b).length)));
                d = d.join('');
                // console.log(d);
                inputBox.value = d;
                i=0;
            }
        }

        for (i=0; i<inputBox.value.length; i++) {
            if (inputBox.value[i].match(/^(\+|\-)$/)) {
                var a = getTerm(i, 'l');
                var b = getTerm(i, 'r');
                var c = eval(`a ${inputBox.value[i]} b`);
                // console.log(`i:${i}, String(a).length=${String(a).length}, String(b).length=${String(b).length}, startCutIndex=${(i-String(a).length)}, cutOutChars=${(Number(String(a).length)+1+Number(String(b).length))}, stringArray=${inputBox.value.split('')}, cutinputval:${inputBox.value.split('').splice((i-String(a).length),(Number(String(a).length)+1+Number(String(b).length)))}`);
                var d = inputBox.value
                d = d.split('')
                d.splice((i-String(a).length) , (Number(String(a).length)+1+Number(String(b).length)), String(c));
                // d.splice((i-String(a).length),(Number(String(a).length)+1+Number(String(b).length)));
                d = d.join('');
                // console.log(d);
                inputBox.value = d;
                i=0;
            }
        }
    }
    equalsLastPressed = true;
    historySpan.innerHTML += ` = ${inputBox.value} &nbsp;`;
    if (historySpan.innerHTML.length > 57){ 
        historySpan.innerHTML = historySpan.innerHTML.slice((historySpan.innerHTML.length-57));
    } 
    }
    
function getTerm(pos, dir) {
    var termStart;
    var termEnd;
    if (dir == 'l') {
        termEnd = pos;
        for (var i = (pos-1); i>=0; i--) {
            if (i==0) {return Number(inputBox.value.slice(0,termEnd));}
            if (inputBox.value[i].match(/^(\+|\-|\*|\/|\%|\^)$/)) {
                termStart = i+1;
                return Number(inputBox.value.slice(termStart,termEnd));
            }
        }
    } else {
        termStart = pos+1;
        for (var i = (pos+1); i>=0; i++) {
            if (i==inputBox.value.length) {
                return Number(inputBox.value.slice(termStart,i));}
            if (inputBox.value[i].match(/^(\+|\-|\*|\/|\%|\^)$/)) {
                termEnd = i;
                return Number(inputBox.value.slice(termStart,termEnd));
            }
        }
    }
}

function clearAll() {
    inputBox.value = "";
    equalsLastPressed = false;
}

function validateInput () {
    if (inputBox.value == "") {alert('Need input first!'); return false}
    if (inputBox.value[0].match(/^(\+|\-|\*|\/|\%|\^)$/)) {
        alert(`Can't start input with operator, type a number first!`);
        return false;
    }
    for (i=0; i<inputBox.value.length; i++) {
        if (inputBox.value[i].match(/^(\s)$/)) {
            inputBox.value = inputBox.value.substring(0,i)+ inputBox.value.substring((i+1), inputBox.value.length);
            i = 0;
        };
    }
    for (i=0; i<inputBox.value.length; i++) {
        if (inputBox.value[i].match(/^(1|2|3|4|5|6|7|8|9|0|\+|\-|\*|\/|\%|\^)$/)) {
            // console.log(inputBox.value[i]);
        } else {
            alert(`Invalid input character ${inputBox.value[i]}, please delete or correct input`)
            return false;
        }
        if (inputBox.value[i].match(/^(\+|\-|\*|\/|\%|\^)$/)) {
            if (inputBox.value[i+1].match(/^(\+|\-|\*|\/|\%|\^)$/)) {
                alert(`Can't use two operators in a row! Please delete or clear input`);
                return false;
            }
        }
    }

    return true;
}