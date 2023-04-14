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