


const disc_template =  document.createElement("template");
var e = new Date();
var today = e.toLocaleDateString().split(/\//)[1];
disc_template.innerHTML= `

<div class="disc_section">
<aside class="side_links">


<a class="back-link" href="/">Back To Search &#129046; </a>

<p class="small-title"> HOW TO APPLY</p>

<p class="ins-text">please email a copy of your resume and online portfolio to the email below </p>
</aside>
<div class="disc_article">
<div class="disc_header">
<h2 class="title"></h2>


<div class = "aside-header">
<img class="logo" />
<div class="item-header">
<p class=" company-name"></p>
<ul>
<li ><small > <slot name="time" /> </small><samll class="time"></small></li>
<li ><small > <slot name="location" /> </small ><samll class="location"></small></li>
</ul>
</div>

</div>
</div>

<main class="main_disc">

</main>
</div>


</div>
<style>
.disc_section {
  display:grid;
  grid-template-columns:300px 1fr;
  grid-gap:15px ;
  width:90%;
  margin:20px auto;

}
.title {
    font-size:25px;
    color: #233e8b;
  }
  .job_type {
    color:#160f30;
    font-size:16px;
    border-radius:10px ;
    border:1px solid #160f30 ;
    height:30px;
    width:90px ;
    display:flex;
    justify-content:center;
    align-items:center;
    
  }
.aside-header {
  display:flex;
  margin:15px 0;
}
.logo {
  width:90px;
  height:90px;
  border-radius:8px;
}
.location {
  color:grey ;
   margin-left:8px;
}
.company-name {
  font-size : 16px;
    font-weight : 800 ;
    color : #233e8b ;
    margin-left:8px;
}
.small-title {
  font-size : 15px;
    font-weight : 500 ;
    color :grey ;
    margin:10px 0 ;
}
.ins-text {
  font-size : 15px;
    font-weight : 500 ;
    color :#233e8b;
}
.back-link {
   font-size : 13px;
    font-weight : 500 ;
    color :#867ae9;
}
 p {
  color : #233e8b !important;
  background:transparent !important;
}
@media screen and (max-width:880px){
  .disc_section {
    display:flex;
    flex-direction:column-reverse;
    jutsify-content:center ;
  }
  .disc_section aside  {
margin:10px auto;
width:90%;
  }
  .disc_section .disc_article {
    margin:10px auto;
    width:90%;
  }
}
.time,.location {
  color:grey;
  font-size:12px;
}
.item-header  li small i{
  color : grey ;
  margin: 0 3px;
}
.item-header  ul {
  display:flex;
  justify-content:space-around;
}
.item-header  li {
  display:flex ;
  list-style:none;
  margin: 8px 5px;
}
</style>

`

class DescriptionItem extends HTMLElement {
constructor(){
  super();
this.attachShadow({mode:"open"});
this.shadowRoot.appendChild(disc_template.content.cloneNode(true)); 
this.shadowRoot.querySelector(".main_disc").innerHTML = this.getAttribute("test");
this.shadowRoot.querySelector(".main_disc").querySelector("p").style = {}
this.shadowRoot.querySelector(".company-name").innerHTML = this.getAttribute("company");
this.shadowRoot.querySelector(".title").innerHTML = this.getAttribute("title");
this.shadowRoot.querySelector(".location").innerHTML =  " <i class='fas fa-globe-americas'></i> "+ this.getAttribute("location") ;
if(this.getAttribute("logo")){
  this.shadowRoot.querySelector(".logo").setAttribute("src",this.getAttribute("logo")) ;
}else {
  this.shadowRoot.querySelector(".logo").setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARIAAAC4CAMAAAAYGZMtAAAAdVBMVEVpXM2HfdFeUc7/8rbdyr7/7LiFe9H/87ZZTM9mWc1kV87/8LedjsdiVc5xZMzn1L6hlM1/ddKtncTz37qyosTWw7+XjM5+ccr96LmUhciGeMrXxb7/97VrXs1dUM6tn8p6cdPLucDiz72Rhs90bNTv27q6qcNOvLJNAAABwUlEQVR4nO3bXXPSQBiAUUyMdBPSKh9FpB+olf//EwUGCs72YsNY0Ow5V9wwszyThJdhdzAAAAAAAAAAAAAAAAAAAAAAAPjvtEUX7bWXewH1+GMX0xyaTJoyXTW8ufZ6L2DSPH9Odf81jyTl/adUq3ySfEgkiSSS7EkSkSQiyUFoQ9hNopLshUVVNd+3TSTZa6dNNZxJcmKTZDlw45xqp+Ws2L2SZE+SiCQRSSKSRCQ5CnVdB0lOhPloNFrUkhw9VU1TPiyCJK9uhtXd3Y9bV8nRJsmqKDxLTmySzDdPV0mOJIlIEpEk8laSn19SvWSSZPOtnKyPf5NHScKvDhsHyqZ6uvIH+PviJNsJP93uzf0S3zjb34Hp+lfkjSQpQp/3Hp2VJLyMH99xTVd2VpJi9jDu73VyZpKyx9v2JImcJkkeMZ4ySdIsB7eJBssmjyRVk6zKIcl2M0UXix7OaHuHJJuhNXTQx6n14DUJB92SZHGwolOSx+U6gyZdkoRvw8m7Lubf0C1JKcmf8kmyKto0xTyXJOtxoud1k0mS9INrTRZJ2mmn043j+toLvgBnYAEAAAAAAAAAAAAAAAAAAACA3vsNEW1B3Y++7NIAAAAASUVORK5CYII=" );
}

let date = this.getAttribute("time");

let day    = date.split(/T/)[0].split(/-/)[2];
console.log(day,today)
if(parseInt(today )-parseInt(day) == 0){
  this.shadowRoot.querySelector(".time").innerHTML = "Today"
}else {
  this.shadowRoot.querySelector(".time").innerHTML = ` ${parseInt(today )-parseInt(day)} day ago `;
}

}
reInitialize() {
 
}
connectedCallback(){
  
}
}


window.customElements.define("description-area",DescriptionItem);
