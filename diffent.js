// DIFFRENT BETWEEN FAT ARROW AND NORMAL function
// 1.SYNTAX
// function student()
// {

// }
// //normal function is also called function declaration

// let student=()=>
// {

// }
// //arrow function is also called function expresstion

// 2.hoisting

// 3.this
// fat arrow function doesn't have own (this) keyword its used it parent this keyword
// so when function want parent this keyword  at that time arrow function is used
let obj={
    name:"firas",
    age:29,
    print:()=>{console.log(this.name)
    }
}
obj.print()
// here its give undefined becouse arrow function does not have its own this keyword

//.................................................................................
//here the normal function is use becouse itsd has its own this keyword

let student={
    name:"firas",
    age:29,
    print()
    {
        
        console.log(this.name)
        
    }
}
student.print()
//..................................................
// here inside a function arrow function is use its use its this keyword
let other={
    name:"firas",
    age:29,
    print()
    {
        return ()=>
        {
        console.log(this.name)
        }
    }
}
other.print()()

 