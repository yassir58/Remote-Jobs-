


const items_area =document.querySelector(".items-area");
const location_form = document.querySelector(".radio-form"); 
const full_time_input =document.querySelector("#checkbox");
const template = document.createElement("template");
const data_module = document.querySelector(".module_helper").dataset.helper ;
const buttons_template = document.createElement("template");
var elements = Array.from(document.querySelectorAll("job-item"));
buttons_template.innerHTML = `
<style>
  .btn_item {
    width:30px;
    height:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:12px;
    border:1px solid grey;
    color : gey;
    margin:0 5px;
    background:transparent ;
    cursor:pointer;
  }
  .btn_item:hover {
    color : #233e8b; ;
    border:1px solid #233e8b;
  }
  .btn_item:active {
    color:white ;
    background:#233e8b;
  }
  </style>

  <div class="btn_item">
    <p class="btn-num"></p>
    
    </div>

`
const dataInfo = JSON.parse(data_module);
const jobs_arr = JSON.parse(data_module).jobs ;
globalThis["jobs_1"] = jobs_arr.slice(0,5);
globalThis["jobs_2"] = jobs_arr.slice(5,10);
globalThis["jobs_3"] = jobs_arr.slice(10,15);
globalThis["jobs_4"] = jobs_arr.slice(15,20);
var arr_num = 1;
var event = new Date();
var today = event.toLocaleDateString().split(/\//)[1];
template.innerHTML  = ` 

<style>
  .item {
    width:84%;
    max-height:auto;
    max-width:auto;
    height:auto;
    margin:15px auto ;
    background:white ;
    border-radius:12px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    display:grid;
    grid-template-columns:120px 1fr;
    grid-gap:14px;
    text-align:left;
    padding-left:10px;
    padding-top:8px;
    padding-bottom:10px;
  }
  .item:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .company-name {
    font-size : 14px;
    font-weight : 800 ;
    color : #233e8b ;
    margin-top:10px;
  }
  .title {
    font-size:2vw;
    color:#233e8b;
  }
  .job_type {
    color:#160f30;
    font-size:13px;
    border-radius:10px ;
    border:1px solid #160f30 ;
    height:30px;
    width:90px ;
    display:flex;
    justify-content:center;
    align-items:center;
    
  }
  
  .category {
    font-weight:600;
    color:#867ae9;
    
  }
  
  
  .item-info div {
    display:flex ;
    max-width:auto;
    margin: 10px 5px;
  }
  .item-footer  div small i{
    color : grey ;
    margin: 0 5px;
  }
  .logo {
  width:90px;
  height:90px;
  border-radius:8px;
}
.time,.location {
  color:grey;
  font-size:12px;
}
i {
  font-size:10px ;
  color:grey;
}

@media screen and (min-width:1090px) {
.info-container {
  display:flex;
  justify-content:space-between ;
}
 
}
@media screen and (max-width:980px){
  .item {
    width:400px;
    max-width:450px;
  }
}
@media screen and (min-width:800px){
  .item-info  {
    display:flex;
    justify-content:space-between ;
  }
}
.item-disc {
  
}
.item-header {
  display:grid;
  grid-template-rows:70% 1fr;
}

@media screen and (max-width:430px){
  .item {
    width:90%;
  }
}
  </style>
<div class="item">

<div class="item-header">
<img class="logo" />
<small class="company-name"></small>
</div>


 <div class="item-disc">
  <h1 class="title"></h1>
  
  <div class="info-container">
    <small class="job_type"></small>
   
     <div class="item-info">
     <div ><small > <slot name="time" /> </small><samll class="time"></small></div>
     <div ><small > <slot name="location" /> </small ><samll class="location"></small></div>
     </div>


       </div>
    </div>
 
  </div>

`



class jobItem extends HTMLElement {
constructor(){
  super();
this.attachShadow({mode:"open"});
this.shadowRoot.appendChild(template.content.cloneNode(true)); 
this.shadowRoot.querySelector(".company-name").innerText = this.getAttribute("company");
this.shadowRoot.querySelector(".title").innerText = this.getAttribute("title");
this.shadowRoot.querySelector(".job_type").innerText = this.getAttribute('job-type');
if(this.getAttribute("location").includes("/")){
  this.shadowRoot.querySelector(".location").innerHTML = this.getAttribute("location").split(/\//)[0] ;
}else {
  this.shadowRoot.querySelector(".location").innerHTML =   this.getAttribute("location");
}
this.shadowRoot.querySelector(".logo").setAttribute("src",this.getAttribute("logo")) ;

if(this.getAttribute("logo")){
 this.shadowRoot.querySelector(".logo").setAttribute("src",this.getAttribute("logo")) ;
}else {
  this.shadowRoot.querySelector(".logo").setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARIAAAC4CAMAAAAYGZMtAAAAdVBMVEVpXM2HfdFeUc7/8rbdyr7/7LiFe9H/87ZZTM9mWc1kV87/8LedjsdiVc5xZMzn1L6hlM1/ddKtncTz37qyosTWw7+XjM5+ccr96LmUhciGeMrXxb7/97VrXs1dUM6tn8p6cdPLucDiz72Rhs90bNTv27q6qcNOvLJNAAABwUlEQVR4nO3bXXPSQBiAUUyMdBPSKh9FpB+olf//EwUGCs72YsNY0Ow5V9wwszyThJdhdzAAAAAAAAAAAAAAAAAAAAAAAPjvtEUX7bWXewH1+GMX0xyaTJoyXTW8ufZ6L2DSPH9Odf81jyTl/adUq3ySfEgkiSSS7EkSkSQiyUFoQ9hNopLshUVVNd+3TSTZa6dNNZxJcmKTZDlw45xqp+Ws2L2SZE+SiCQRSSKSRCQ5CnVdB0lOhPloNFrUkhw9VU1TPiyCJK9uhtXd3Y9bV8nRJsmqKDxLTmySzDdPV0mOJIlIEpEk8laSn19SvWSSZPOtnKyPf5NHScKvDhsHyqZ6uvIH+PviJNsJP93uzf0S3zjb34Hp+lfkjSQpQp/3Hp2VJLyMH99xTVd2VpJi9jDu73VyZpKyx9v2JImcJkkeMZ4ySdIsB7eJBssmjyRVk6zKIcl2M0UXix7OaHuHJJuhNXTQx6n14DUJB92SZHGwolOSx+U6gyZdkoRvw8m7Lubf0C1JKcmf8kmyKto0xTyXJOtxoud1k0mS9INrTRZJ2mmn043j+toLvgBnYAEAAAAAAAAAAAAAAAAAAACA3vsNEW1B3Y++7NIAAAAASUVORK5CYII=" );
}
let date = this.getAttribute("time");

let day    = date.split(/T/)[0].split(/-/)[2];
if(parseInt(today )-parseInt(day) == 0){
  this.shadowRoot.querySelector(".time").innerHTML = "Today"
}else {
  this.shadowRoot.querySelector(".time").innerHTML = ` ${parseInt(today )-parseInt(day)} day ago `;
}
  

}
reInitialize(title,company,type,location,time) {
  this.shadowRoot.querySelector(".company-name").innerText = company;
this.shadowRoot.querySelector(".title").innerText = title;
this.shadowRoot.querySelector(".job_type").innerText = type;


let day    = time.split(/T/)[0].split(/-/)[2];
if(parseInt(today )-parseInt(day) == 0){
  this.shadowRoot.querySelector(".time").innerHTML = "Today"
}else {
  this.shadowRoot.querySelector(".time").innerHTML = ` ${parseInt(today )-parseInt(day)} day ago `;
}
this.shadowRoot.querySelector(".location").innerHTML = `   ${location.split(/\//)[0] }` ;
}
connectedCallback(){
  this.addEventListener('click',()=>{
    location.replace(`https://sleepy-tor-38724.herokuapp.com/details/${this.getAttribute("category")}/${this.getAttribute("id")}`)
   
  })
}
}


class buttonController extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this.shadowRoot.appendChild(buttons_template.content.cloneNode(true)); 
    this.shadowRoot.querySelector(".btn-num").innerText = this.getAttribute("number");
  }
handleClick(){
  arr_num = parseInt(this.getAttribute("number"));
  
 
 var items = globalThis[`jobs_${this.getAttribute("number")}`];
   
   for(let i=0;i<elements.length;i++){
     elements[i].reInitialize(items[i].title,items[i].company_name,items[i].job_type, items[i].candidate_required_location,items[i].publication_date);
   }
  
   console.log(items)
  
  
}
  
    connectedCallback(){
            this.shadowRoot.addEventListener ("click", ()=> {this.handleClick()}) ;
        }
  
  disconnectedCallBack(){
   
            this.shadowRoot.removeEventListener ("click", ()=> this.handleClicK()) ;
        }

}
window.customElements.define("button-controller", buttonController,{extend:"button"})
window.customElements.define("job-item", jobItem);




function location_filter(arr,pattern){
let newArr = arr.filter(element=>{
if(element.candidate_required_location  == pattern){
  return element ;
}
return false;
})
for(let i=0;i<elements.length;i++){
     elements[i].reInitialize(newArr[i].title,newArr[i].company_name,newArr[i].job_type, newArr[i].candidate_required_location,newArr[i].publication_date);
   }
}




function fulltime_filter(arr){
 let newArr =  arr.filter(element => {
  if(element.job_type == "full_time"){
    return element ;
  }
  return false ;
});
for(let i=0;i<elements.length;i++){
     elements[i].reInitialize(newArr[i].title,newArr[i].company_name,newArr[i].job_type, newArr[i].candidate_required_location,newArr[i],newArr[i].publication_date);
   }
}




full_time_input.addEventListener("change",(e)=>{
  if(e.currentTarget.checked == true){
fulltime_filter(jobs_arr);
  }else if(e.currentTarget.checked == false){
    for(let i=0;i<elements.length;i++){
     elements[i].reInitialize(jobs_arr[i].title,jobs_arr[i].company_name,jobs_arr[i].job_type,jobs_arr[i].candidate_required_location,jobs_arr[i].publication_date);
   }
  }
})
location_form.addEventListener('change',(e)=>{
location_filter(jobs_arr,e.target.dataset.pattern);
})




//// convert date


var date = "2021-05-14T19:20:21";

console.log(dataInfo);



