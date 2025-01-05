console.log("hey hey");

var a = 4;
let b = 5;
const c = 7.5;

var string = "i am text"; //cannot redeclare variable
console.log(a, b, c);
console.log(typeof(c));

var d = 1; 
d = c+a;  //can reassign
console.log(d);

let boolean = true;
console.log("boolean is: " + typeof(boolean));

///////////////////////////////////////////////////////
const flag = true;
if (!flag){
    console.log("flag: condition satisfied");
}
else{
    console.log("flag: condition not satisfied");
}

let i = 0
while(i<10){
    i++;
    console.log("while loop " + i);
}

do {
    i++;
    console.log("DO while loop " + i); // i not reset, picking up set value from above-operation
}while(i<10);
console.log(i);

// many times execution until condition met
for(let k=0; k<=10; k++){
    console.log("for loop: " + k)
}

// execution while condition is met, after changes -bye bye
let required = true;
while(required){
    console.log("while loop: " + required);
    required= false;
}

// from, and/or loops
for(let k=0; k<=10; k++){
    if(k%2 == 0 && k%5 == 0)
    console.log("for loop - multiple 2 AND 5: " + k)
}
for(let k=0; k<=10; k++){
    if(k%2 == 0 || k%5 == 0)
    console.log("for loop - multiple 2 OR 5: " + k)
}

let n = 0;
for(let k=0; k<=100; k++){
    if(k%2 == 0 && k%5 == 0){
        n++;
        console.log("for loop - multiple 2 OR 5 - first 3 characters: " + k);
        if (n==3);
        break;
    }
}

console.log("########################################################")
console.log("ARRAYS");
var marks = Array(6);
var marks = new  Array(20, 40, 35, 12, 38);

var marks = [20, 40, 35, 12, 38];
mySubArray = marks.slice(2,5);
console.log("subArray: " + mySubArray);

console.log(marks[2]);

marks[3] = 15;
console.log(marks[3]);

console.log("array length: " + marks.length);

var sum = 0;
for(let i=0; i<marks.length; i++){
    console.log("array element: " + marks[i]);
    sum = sum + marks[i];
    console.log("sum of elements is: " + sum);
}
console.log("sum of all array elements is: " + sum);

marks.push(65);//append
console.log(marks);
marks.pop();
console.log(marks);
marks.unshift(1); // add element on 1st position

console.log("number on posistion: " + marks.indexOf(38));
console.log("120 part of array? " + marks.includes(120));

//reduce filter map (works on sum or multiplication)
// takes 2 arguments, puls each value from 1st and puts it into the second
let total = marks.reduce((sum, mark) => sum+mark, 0);
console.log("total from reduce is " + total);


var scores = [12, 13, 14, 16];
var evenScores = [];
for(let i=0; i<scores.length; i++){
    if(scores[i]%2 == 0){
        evenScores.push(scores[i])
    }
}
console.log("even numbers in array are: " + evenScores);

let newFilterEvenScores = scores.filter(score=>score%2==0);
console.log("new filter even score: " + newFilterEvenScores);

// map array function (modify values in array to new ones)
// example, use filtered values and multiply them by 3
let mappedArray = newFilterEvenScores.map(score=>score*3);
console.log("mapped array values: " + mappedArray);

summOfMappedArray = mappedArray.reduce((sum,val)=> sum+ val,0);
console.log("summOfMappedArray " + summOfMappedArray);

/// -----------------------------------------------------
// chain of operations example
var scores1 = [12,13,14,16];
let sumValues1 = scores1.filter(score=>score%2==0).map(score=>score*3).reduce((sum, val)=> sum+val, 0);
console.log("sumValues1: " + sumValues1);

//sorting   .sort() method limited to strings
let fruits = ["banana", "mango", "pomegranite", "apple"];
 
console.log(fruits.sort());     //asc
console.log(fruits.reverse());  //desc

// number sorting
var scrores2 = [12, 0.3,19,20,3]
console.log(scrores2.sort());
//need to apply bubble sort in recursive manner to sort them properly
console.log(scrores2.sort((a,b)=> a-b)); //asc
console.log(scrores2.sort((a,b)=> b-a)); //desc


// creation of functions
function addNumbers(a,b){
    return a+b
};
let functionSum = addNumbers(3,5);
console.log("functionSum: " + functionSum);

// anonymus functions 
let sumOfIntegers = function(c,d){
    return c+d
}

// anonymus functions simplification
let sumOfNr = (c,d)=> c+d;
console.log("sum of nr: " + sumOfNr(3,4));

// function scope
var greet = "Global Level"; // global value 
let greeting = "block level no matter what"  // global value, but block value is prio
const constantValue = "you can't change me" //var + let can be reinitialized; but const will remain the same

function greet1(){
    var greet = "Block level"; 
    var greeting = "block level because i said so";
    let niu = "not visible outside this block";

    console.log(greet);
    console.log(greeting);
    console.log(niu);
    console.log(constantValue);
}
greet1();


//// string examples
let day = 'tuesday ';
console.log("string length is " + day.length);
let subString = day.slice(0,2);
console.log("cine? " + subString);
console.log(day[1]); //this will show the array value within the string
let splitDay = day.split("s");
console.log(splitDay[1].trim()); 

let date = '23';
let nextDate = '27';
//convert to integers from strings, to do the operations
dayDifference = parseInt(nextDate) - parseInt(date);
console.log("dayDifference " + dayDifference);
//convert back to string (if needed duh...)
dayDifference.toString();

//string concatenation
let newQuote = day + "is Funday";
console.log(newQuote);

//array indexes
let indexCount = 0
let indexValue = newQuote.indexOf("day", 5); // 5 is optional, used since we have 2x occurences - tuesDAY and funDAY
console.log(indexValue);

while (indexValue!== -1){
    indexCount++
    indexValue = newQuote.indexOf("day", indexValue+1);
   
}
console.log("count of 'value' ocurrences is: " + indexCount);
