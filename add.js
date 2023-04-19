let form = document.getElementById('form');
form.addEventListener('submit',onsubmit);
function onsubmit(e)
{
e.preventDefault()
let name=document.getElementById('name').value;
let mail=document.getElementById('email').value;
let place=document.getElementById('palce').value;
let my_obj={
    name,
    mail,
    place


};
let myobj_serialsize=JSON.stringify(my_obj);

localStorage.setItem(my_obj.mail,myobj_serialsize);
let parent =document.getElementById('listofitem');
let child=document.createElement('li');
let detbtn=document.createElement('button');
detbtn.className="btn btn-danger btn-sm float-right delete";
detbtn.appendChild(document.createTextNode('delete'));
child.textContent=my_obj.name+' '+my_obj.mail+" "+my_obj.place

parent.addEventListener('click',remove)
// console.log(child.parentNode)
function remove(e)
{

e.preventDefault()
if(e.target.classList.contains('delete')){
 if(confirm("are you sur"))
 {
    localStorage.removeItem(my_obj.mail)
    let li=e.target.parentElement;
    parent.removeChild(li);
    
 }
 
}

}
child.appendChild(detbtn);
parent.appendChild(child);
}





