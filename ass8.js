let form = document.getElementById('addForm');
let itemlist=document.getElementById('items');
let filter= document.getElementById('filter')
form.addEventListener('submit',onsubmit);
itemlist.addEventListener('click',remove);
filter.addEventListener('keyup',filteritem);
function onsubmit(e)
{
    e.preventDefault();
    let avb=document.getElementById('item').value;
    let qwe=document.getElementById('item1').value;
    let li= document.createElement('li');
    li.className="list-group-item";
    li.appendChild(document.createTextNode(avb));
    li.appendChild(document.createTextNode(qwe));
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
btg.className="btn btn-info btn-sm float-end";
a[i].insertBefore(btg,c[i]);


}
function filteritem(e)
{
    let text=e.target.value.toLowerCase();
    let items=itemlist.getElementsByTagName('li');
    Array.from(items).forEach(function (item)
     {
        let itemname=item.firstChild.textContent;
        let describtion =item.childNodes[1].textContent;
        if(itemname.toLowerCase().indexOf(text)!=-1||describtion.toLowerCase().indexOf(text)!=-1)
        {
            item.style.display="block"
        }
        else
        {
            item.style.display="none";
        }
        
    });
}
