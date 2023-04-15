let form = document.getElementById('addForm');
console.log(form);
let itemlist=document.getElementById('items');
form.addEventListener('submit',onsubmit);
itemlist.addEventListener('click',remove);
function onsubmit(e)
{
    e.preventDefault();
    let avb=document.getElementById('item').value;
    
    let li= document.createElement('li');
    li.className="list-group-item";
    li.appendChild(document.createTextNode(avb));
    let detbtn=document.createElement('button');
    detbtn.className="btn btn-danger btn-sm float-right delete";
    detbtn.appendChild(document.createTextNode('X'));
    li.appendChild(detbtn);
    
    itemlist.appendChild(li);
     
}
function remove(e)
{

    e.preventDefault()
    if(e.target.classList.contains('delete')){
     if(confirm("are you sur"))
     {
        let li=e.target.parentElement;
        itemlist.removeChild(li);
     }
    }
}
let a=document.getElementsByTagName('li');
console.log(a);
let c=document.querySelectorAll("button");


for(let i=0;i<a.length;i++)
{
    let btg =document.createElement('button');
btg.appendChild(document.createTextNode('edit'));
btg.className="btn btn-info"
a[i].insertBefore(btg,c[i]);


}

