const fruit =['apple', 'oranges' , ' ', 'mango', ' ' , 'lemon'];
//console.log(fruit.map(fruit=>'fruit:=>'+fruit))
//array.map() is use to transfer the element of array


//2.
//here the array is manipulate without any error
//becouse array is the refernce type
//its pointing to reference of array which is not change
fruit.push('banana')
//console.log(fruit)


//3 spread operator is use to duplicate of array and object
// its start with ...(three dots)
const obj={
   Name:"firas",
   age:29,
   greet()
   {
    console.log("my name is",this.Name)
   }
}

const frt=[...fruit]
//console.log(frt)
const obj2={...obj}
console.log(obj2)


//4 rest operator is used when use multiple argument
//syntax similar to to spread opreator

const newarray=(...arguement)=>
{
    return arguement
}
console.log(newarray(2,3,4,5))