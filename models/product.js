const { json } = require('body-parser')
const fs =require('fs')
const path=require('path')

const Paths=path.join(path.dirname(process.mainModule.filename),'data','products.json')
const getproductfile=cb=>{

    fs.readFile(Paths,(err,filecontent)=>
    {
        if(err)
        {
            cb([])
        }
        else{
        cb(JSON.parse(filecontent))
        }
    })
}
   
module.exports=class Product
{
   constructor(title)
   {
    this.title=title
   }
   save()
   {
      getproductfile(products=>{
        products.push(this)
        fs.writeFile(Paths,JSON.stringify(products),(err)=>
        {
            console.log(err)
        })
      })
        

   }
   static fetchall(cb)
   {
    getproductfile(cb)
   }
}