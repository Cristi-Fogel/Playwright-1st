let message1 : string = "hello";
message1  = "just stings";

let age1: number = 20;
let isActive1: boolean = true;
let numbers1: number[] = [1,2,3];

let data1: any = "unkown data type";
data1 = "anyData"; // can accept diferent data type, as it :any

// function example
function addX(a: number, b: number): number{
    return a+b;
};
addX(3,4);

// object example
let user1: {name: string, age: number} = {name: "Bob", age:34};
