
let arr = [8, 3, 4, 5, 8, 5, 5, 8, 8, 8, 8, 4, 2]


let max_dots = Math.max(...arr)
let intervals = arr.length


// Task1 - Submit button
var btn = document.getElementById('submit');
btn.addEventListener('click', func);




function getDotNode(color){
    var new_dot = document.createElement('div');
    color =="fade" ? new_dot.className = "dot dot-fade" : new_dot.className = "dot dot-color"
    return new_dot
}


function getDotNodeTwo(color, number, i){
    var new_dot = document.createElement('div');
    let id = number.toString() + "#" + i.toString()
    new_dot.setAttribute('id', id)
    color =="fade" ? new_dot.className = "dot2 dot2-fade" : new_dot.className = "dot2 dot-color"
    return new_dot
}



function getLine(number){
    var lineContainer = document.createElement('div');
    lineContainer.className = "lineContainer"
    var line = document.createElement('div');
    line.className = "line"
    var numberContainer = document.createElement('div');
    numberContainer.className = "numberContainer"
    var numberNode = document.createElement('div');
    numberNode.className = "number"
    numberNode.innerHTML = number

    numberContainer.appendChild(numberNode)
    lineContainer.appendChild(line)
    lineContainer.appendChild(numberContainer)

    return lineContainer

}

function getDotsAndLines(number, value){
    var div1 = document.createElement('div')
    for( let i=0; i<max_dots-value;i++){
        div1.appendChild(getDotNode("fade"))
    }
    for( let i=0; i<value; i++){
        div1.appendChild(getDotNode("color"));
    }
    div1.appendChild(getLine(number));
    return div1
}


function getDotsAndLinesTwo(number){
    var div1 = document.createElement('div')
    for( let i=0; i<max_dots;i++){
        div1.appendChild(getDotNodeTwo("fade",number, i))
    }
    div1.appendChild(getLine(number));
    return div1
}


// Task-2(a)
for(let i=0; i<intervals; i++){
    let intervalNode = document.createElement('div')
    intervalNode.setAttribute("id", "item");
    intervalNode.appendChild(getDotsAndLines(i, arr[i]))
    document.getElementById("flex-container").appendChild(intervalNode)
}


// Task-2(b)
for(let i=0; i<intervals; i++){
    let intervalNode = document.createElement('div')
    intervalNode.setAttribute("id", "item");
    intervalNode.appendChild(getDotsAndLinesTwo(i, arr[i]))
    document.getElementById("flex-container-2").appendChild(intervalNode)
}


// EventListeners
var dot2 = document.querySelectorAll('.dot2');
dot2.forEach(cell => cell.addEventListener('mouseover', changeColor, false));

var dot2 = document.querySelectorAll('.dot2');
dot2.forEach(cell => cell.addEventListener('mouseout', revertColor, false));

var dot2 = document.querySelectorAll('.dot2');
dot2.forEach(cell => cell.addEventListener('click', changeClass, false));





function changeColor(e){
    let [num, id] = e.target.id.split("#")
    let relevant_id = []
    
    for(let i = parseInt(id); i<max_dots;i++) relevant_id.push(num + "#" + i)

    for( r_id of relevant_id) {
        let dot = document.getElementById(r_id)
        if(dot.className !== "dot2 dot-color permanent"){
            dot.className = "dot2 dot-color"
        } 
    }
}

function revertColor(e){
    let [num, id] = e.target.id.split("#")
    let relevant_id = []
        
    for(let i = parseInt(id); i<max_dots;i++) relevant_id.push(num + "#" + i)

    for( r_id of relevant_id) {
        let dot = document.getElementById(r_id)
        if(dot.className !== "dot2 dot-color permanent") dot.className = "dot2 dot2-fade"
    }    
}


function changeClass(e) {
    let [num, id] = e.target.id.split("#")
    if(e.target.className == "dot2 dot-color permanent") {
        let relevant_id = []
        for(let i = 0; i<max_dots; i++) relevant_id.push(num + "#" + i)
        console.log("Green: ", relevant_id)
        for( r_id of relevant_id) {
            let dot = document.getElementById(r_id)
            dot.className  = "dot2 dot2-fade"
        }  
    } else {
        let relevant_id = []
        for(let i = parseInt(id); i<max_dots; i++) relevant_id.push(num + "#" + i)
        console.log("Gray: ", relevant_id)
        for( r_id of relevant_id) {
            let dot = document.getElementById(r_id)
            dot.className  = "dot2 dot-color permanent"
        }  
        
    }
 }


 // Call back function for Task-1

 function func() {
    let ans = convertNumToWords(document.getElementById("number").value)
    document.getElementById("task1").innerHTML = "Answer: " + ans
  }



 // Code to convert integers to words

 // Algorithm: Hard code some special cases and use recursion to break the problem to smaller problem

 var numToWord = {
    0: "Zero",
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven", 
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
    20: "Twenty",
    30: "Thirty",
    40: "Forty",
    50: "Fifty",
    60: "Sixty",
    70: "Seventy",
    80: "Eighty",
    90: "Ninety",
    100: "Hundred"
}



function convertNumToWords(num) {
    num = parseInt(num)

    if( !Number.isInteger(num)) return "Number is not a valid integer"
    if( num > 9999999 || num < 0) return "Out of range!"

    if( num < 10 && num >=0 ) return numToWord[num]
    
    if( num < 100 && num >= 10 ) {
        if (num in numToWord) return numToWord[num]    
        let ans = convertNumToWords(Math.floor(num/10) * 10) + " " + convertNumToWords(num%10)
        return ans;
    }
    if(num < 1000 && num >= 100) {
        if(num % 100 == 0) return convertNumToWords(num/100) + " " +  "Hundred"
        return convertNumToWords(Math.floor(num/100) * 100) + " " + convertNumToWords(num%100)
    }
    if(num < 100000 && num >= 1000) {
        let temp = convertNumToWords(Math.floor(num/1000)) + " " + "Thousand"
        return (num%1000 == 0 ) ? temp : temp + " " + convertNumToWords(num%1000)
    }
    if(num < 10000000 && num >= 100000) {
        let temp = convertNumToWords(Math.floor(num/100000)) + " " + "Lakh"
        return (num%100000 == 0 ) ? temp : temp + " " + convertNumToWords(num%100000)
    }

}