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

// from 1->10 give common multiple values of 2 and 5
for(let k=0; k<=10; k++){
    if(k%2 == 0)
    console.log("for loop - multiple 2, 5: " + k)
}