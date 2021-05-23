const express = require("express");
const fetch = require("node-fetch");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded()); 
app.use(express.json());
var search ;
var dataArray = [] 


app.use(express.static(__dirname + '/public'));





app.get('/',(req,res)=>{
fetch('https://remotive.io/api/remote-jobs?limit=20')
.then(data=>data.json())
.then(response=>{
  res.render("index",{data:response,search:"New Jobs"})
  dataArray = response ;
})
.catch(err=>{
 console.log(err);

})
   });


   
app.get('/categories/:category/', function (req, res) {
  fetch(`https://remotive.io/api/remote-jobs?category=${req.params.category}`)
  .then(data=>data.json())
  .then(data => res.render('category',{data:data}))
  .catch(err=>{
    console.log(err)
   
  })
})
app.post('/',(req,res)=>{
 fetch(`https://remotive.io/api/remote-jobs?search=${req.body.query}`)
.then(data=>data.json())
.then(data =>{

res.render('index',{data:data,search:`result for ${req.body.query}`})

})
.catch(err=>{
console.log(err)
})
});


app.get('/details/:jobCategory/:jobId',(req,res)=>{
  fetch(`https://remotive.io/api/remote-jobs?category=${req.params.category}`)
.then(data=>data.json())
.then(response=>{
  var detailsItem ;
  response.jobs.forEach(item=>{
    if(item.id == req.params.jobId){
    
      res.render("details",{data:item})
  } 
    })
})
.catch(err=>{
 console.log(err);
 
}) 
})

app.get("/not_found",(req,res)=>{
  res.render("not_found")
})

app.get('*', function(req, res){
  res.status(404).redirect('/not_found');
});
// app.listen("3000",function(){
//     console.log('server running on port 3000');
// })
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);