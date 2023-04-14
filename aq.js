let a =document.getElementById("main-header");
console.log(a.textContent);
console.log(a.innerText);
console.log(a.innerHTML);
a.innerHTML="<h4>something </h4>"
console.log(document.body);
let x= document.getElementsByClassName("list-group-item");
//document.title.style.backgroundColor="#ffffff";
document.body.style.backgroundColor="lightblue";
//document.head.style.backgroundColor="white";

console.log(x);
x[0].style.backgroundColor ="f4f1f4";
for (let i=0;i<x.length;i++)
{
    x[i].style.backgroundColor="#f4f4f4";
}
let v=document.head;
v.style.backgroundColor="#f2f0f0";