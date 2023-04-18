let obj= {
 name:"firas",
 age : 22
};
let myobj_serialize=JSON.stringify(obj)
localStorage.setItem('object',myobj_serialize);
//console.log(localStorage)
let obj_deserialize=JSON.parse(localStorage.getItem('object'));
console.log(obj_deserialize);