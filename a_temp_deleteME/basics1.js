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

for(let k=0; k<=10; k++){
    console.log("for loop: " + k)
}

