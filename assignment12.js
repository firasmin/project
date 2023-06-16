 let posts=[{title:"post1"}]
 let createdpost= (post)=>
{
   return new Promise((resolve,reject)=>{
        setTimeout(() => {
       posts.push(post)
       console.log(posts)
         resolve()
            
        }, 1000);

    })

}
let user =
{
    name:"firas",
    updatetime:"13 of june"
}

let lastupaded=()=>
{
   return new  Promise((resolve,reject)=>{
        setTimeout(() => {
           let a= user.updatetime=new Date().getDate()
           console.log(a)
         resolve()
            
        }, 2000);

    })
}
function deleteBlog(){
  
     return new Promise((resolve, reject) => {
         setTimeout( () => {
             if(posts.length > 0){
                 const poppedElement  = posts.pop();
                 resolve(poppedElement);
             } else {
                 reject("ERROR")
             }
         }, 1000)
     })
 }
function updateLastUserActivityTime()
{

        Promise.all([createdpost({title:"hello"}),lastupaded()]).then(()=>deleteBlog().then((delert)=>{
            console.log(delert)
        }))
}
updateLastUserActivityTime()