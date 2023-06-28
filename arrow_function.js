//arrow function
let sum=(a,b)=>
{
    return(a+b)
}
console.log(sum(12,24))

//other way of declare is arrow function
let add=(a,b)=>a+b   // here the curly bracket is not there becouse there is one statement and return 
console.log(add(7,8))


// when there is one argument
let one = a =>a+1 // here parenthesis is not there becouse there is one argument
console.log(one(5))


// if there are no arguement
let some=()=> 1+2 // here there empty parenthesis so define that is a function
console.log(some())