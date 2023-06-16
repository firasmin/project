  console.log("person1:show ticket")
  console.log("person2:show ticket")
  
  
  
 
 
  const premovie = async ()=>
  {
    const wifebring= new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve("ticket")
        }, 3000);
      })
      const getpopcorn=new Promise((resolve,reject)=>resolve(`popcorn`))
      const butterpopcorn= new Promise((resolve,reject)=>resolve(` butter`))
    
      let ticket= await wifebring

      console.log("husbund:let go in")
        console.log("wife:i am hyungy")
        console.log("husbund:let have popcorn")

     let popcorn=await getpopcorn
     console.log("husbund:now we go!")
    console.log("wife:no  ineed butter on my popcor")
    let butter=await butterpopcorn
      return ticket

  }
  premovie().then((m)=>console.log(`person3:show ${m}`))
  console.log("person4:show ticket")
  console.log("person5:show ticket")