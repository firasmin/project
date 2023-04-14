// let a =document.getElementById("main-header");
// console.log(a.textContent);
// console.log(a.innerText);
// console.log(a.innerHTML);
// a.innerHTML="<h4>something </h4>"
// console.log(document.body);
// let x= document.getElementsByClassName("list-group-item");
// //document.title.style.backgroundColor="#ffffff";
// document.body.style.backgroundColor="lightblue";
// //document.head.style.backgroundColor="white";

// console.log(x);
// x[0].style.backgroundColor ="f4f1f4";
// for (let i=0;i<x.length;i++)
// {
//     x[i].style.backgroundColor="#f4f4f4";
// }

//let x= document.getElementsByTagName("li");


//console.log(x);
// x[0].style.backgroundColor ="f4f1f4";
// for (let i=0;i<x.length;i++)
// {
//     x[i].style.backgroundColor="#f4f4f4";
// }


// document.querySelector(".list-group-item:nth-child(2)").style.backgroundColor="green";

// document.querySelector(".list-group-item:nth-child(3)").style.visibility  = 'hidden';

// let x= document.querySelectorAll(".list-group-item:nth-child(odd)");
// let y= document.querySelectorAll(".list-group-item:nth-child(even)");


// for(let i=0;i<x.length;i++)
// {
//     x[i].style.backgroundColor="#ccc";
//     y[i].style.backgroundColor="#f4f4f4";

// }
//var itemlist=document.querySelector("#items");
//console.log(itemlist.parentElement);
var newdiv =document.createElement("div");
newdiv.className="hello";
newdiv.id="hello1";
let divtext =document.createTextNode("hello");
newdiv.appendChild(divtext);
let container=document.querySelector('header .container');
let h1=document.querySelector('header h1');

container.insertBefore(newdiv,h1);
newdiv.style.fontSize="50px";
let li =document.createElement('div');
let text=document.createTextNode('water');
li.appendChild(text);
let y=document.getElementById('items')
let as=y.insertBefore(li,y.children[0]);
console.log(li);
li.style.backgroundColor="#ccc"
li.style.fontSize="30px";