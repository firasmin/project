
function savetolocalstrorage(event)
{
event.preventDefault()
let name=event.target.username.value;
let mail=event.target.email.value;
let place=event.target.place.value;
let my_obj={
    name,
    mail,
    place


};
let myobj_serialsize=JSON.stringify(my_obj);

localStorage.setItem(my_obj.mail,myobj_serialsize);
shoeonscreen(my_obj)

}
function shoeonscreen(my_obj)
{
let parentelement =document.getElementById('listofitem');

let Childele=document.createElement('li');


Childele.textContent=my_obj.name+' '+my_obj.mail+" "+my_obj.place
let deletebtn=document.createElement('input')
deletebtn.type="button"
deletebtn.value="delete"
deletebtn.onclick=()=>{
    localStorage.removeItem(my_obj.mail)
    parentelement.removeChild(Childele)
}
let editbtn=document.createElement('input')
editbtn.type="button"
editbtn.value="Edit"
editbtn.onclick=()=>{
    localStorage.removeItem(my_obj.mail)
    parentelement.removeChild(Childele)
    document.getElementById('name').value=my_obj.name
    document.getElementById('email1').value=my_obj.mail
    document.getElementById('palce').value=my_obj.place

}

Childele.appendChild(deletebtn)
Childele.appendChild(editbtn)
parentelement.appendChild(Childele)
}








