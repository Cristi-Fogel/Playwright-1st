class ExternalPerson{
    age = 25
    // location ="canada"
    // can use getters instead to bring data from wherever
    // get=> property getter
    get location(){
        return "canada"
    }
    
    // constructor: method that executes by default when you create an object for the class
    constructor(firstName, lastName){
        this.firstName = firstName //now, it can be accessed from anywhere else
        this.lastName = lastName
    }

    //method
    fullName(){
        //if not using return, undefined will be output
        return this.firstName + " " + this.lastName;
    }
}

let person = new ExternalPerson('jim', 'bob');
let person1 = new ExternalPerson('hawk', 'tuah');

console.log(person);
console.log(person1);
console.log(person.age);
console.log(person.location);
console.log(person.fullName());

module.exports =ExternalPerson;