let form =document.getElementById("addForm")
let itemelist =document.getElementById("items")
let 
form.addEventListener('submit',onsubmit)
itemelist.addEventListener('click',remove)
function onsubmit(e)
{
    e.preventDefault();
    let text=document.getElementById("item").value;
    let aq= document.createElement("li")
   let buttonedit=document.createElement("button")
   buttonedit.className="btn btn-danger btn-sm float-right delete"
   buttonedit.appendChild(document.createTextNode("X"))
    aq.className="list-group-item"
    aq.appendChild(document.createTextNode(text))
    aq.appendChild(buttonedit)
    itemelist.appendChild(aq)
   
}
function remove(e)
{
    if(e.target.classList.contains('delete'))
    {
        if(confirm('are you sure?'))
        {
            let li=e.target.parentElement
            itemelist.removeChild(li)
        }
    }
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