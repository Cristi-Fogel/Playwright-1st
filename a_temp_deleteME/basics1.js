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

marks.push(65);//append
console.log(marks);
marks.pop();
console.log(marks);
marks.unshift(1); // 1st position

console.log("number on posistion: " + marks.indexOf(38));
console.log("120 part of array? " + marks.includes(120));

