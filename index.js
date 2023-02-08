const express= require('express')
const app= express()
const PORT= 5000 || process.env.PORT
app.get("/",(req,res)=>{
    res.send(`<h1>hello there, I also did some lil bit of bash too</h1>`)
})
app.listen(PORT,()=>{console.log(`server listening on ${PORT}`)})
