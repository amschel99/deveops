const express= require('express')
const app= express()
const PORT= 5000 || process.env.PORT
app.get("/",(req,res)=>{
    res.send(`<h1>hello there</h1>`)
})
app.listen(PORT,()=>{console.log(`server listening on ${PORT}`)})