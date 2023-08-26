const AWS=require('aws-sdk')
exports.uplodtoS3=(data,filename)=>
{
     const BUCKET_NAME='sharpner1'
     const IAM_USER_KEY='AKIAUTGP63SJFP6TP6I7'
     const IAM_USER_SECRET='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'
     let S3bucket=new AWS.S3({
         accessKeyId:IAM_USER_KEY,
         secretAccessKey:IAM_USER_SECRET
     })

         var params={
             Bucket:BUCKET_NAME,
             Key:filename,
             Body:data,
             ACL:'public-read'
         }
         return new Promise((resolve,reject)=>{
          S3bucket.upload(params,(err,S3response)=>{
            if(err)
            {
                console.log("something went wrong")
                reject(err)
            }
            else{
                console.log("success")
                resolve(S3response.Location)
            }
        })

         })
         
     
}