// // mobile navbar menu
// var burgerIcon = document.querySelector('#burger');
// var navbarMenu = document.querySelector('#nav-links');

// burgerIcon.addEventListener('click', () => {
//     navbarMenu.classList.toggle('is-active')
// })

var menu1 = document.getElementById("dropdown1");
menu1.addEventListener('click', e=>{
    e.stopPropagation()
    menu1.classList.toggle('is-active')
})

var menu2 = document.getElementById("dropdown2");
menu2.addEventListener('click', e=>{
    e.stopPropagation()
    menu2.classList.toggle('is-active')
})

var menu3 = document.getElementById("dropdown3");
menu3.addEventListener('click', e=>{
    e.stopPropagation()
    menu3.classList.toggle('is-active')
})

/* -----------------SCRIPT FOR MOODBOARD  */
// Image APIs
var pixabayKey = "35740114-335bc84d305f30b42ed6482fb";
var queryURL1;
//
var lan;
var color;
var category;
var check;
var inputs;
var r;

//  Parameter Options LANGUAGE 
var lanOptions = $('.lan');  
lanOptions.on('click', function () { 
  lan =(this.id);
  console.log("Language: "+lan)
});

//  Parameter Options COLOR 
var colorOptions = $('.color');  
colorOptions.on('click', function () { 
  color =(this.id);
  console.log("Color: "+color)
});

//  Parameter Options CATEGORY
var categoryOptions = $('.category');  
categoryOptions.on('click', function () { 
  category =(this.id);
  console.log("category: "+category)
});

// SafeSearch checkbox-
var checkboxx = document.querySelector(".safeSearch");
checkboxx.addEventListener('click', function() {
  if(checkboxx.checked) {
    console.log("Checked");
    check = "true";
  } else {
    console.log("UNChecked");
    check = "false";
  }
});

//  SUBMIT BUTTON 
document.querySelector("#submit").addEventListener("click", function(event){
    event.preventDefault();
    inputs = document.querySelector("#input").value;
    pixabayApi(inputs,lan,category,color,check);
  });
  
  //PIXABAY
  // show your users where the images and videos are from. 
  //100 requests per minute.
  function pixabayApi(inputs,lan,category,color,check) {
    console.log("   pixabayApi()");
    console.log("inputs: "+inputs+" "+lan+" "+category+" "+color);
    var queryURL1 = "https://pixabay.com/api/?key=35740114-335bc84d305f30b42ed6482fb&q="+ inputs+"&lang="+lan+"&image_type=photo&editors_choice=true&category="+category+"&colors="+color+"&safesearch="+check;
    // https://pixabay.com/api/?key=35740114-335bc84d305f30b42ed6482fb   &q=yellow+flowers&image_type=photo
  
    fetch(queryURL1)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var myData = data;
        console.log('data from pixabayApi:');
        console.log(myData);
        document.querySelector(".messages").textContent="We found "+myData.total+" images."
        displayImgs(myData)
      });
      
  }
  
  function displayImgs(myData){
    var datasize = myData.total;
    console.log("datasize: "+datasize);
    if (datasize<10){
      r= datasize;
    } else {
      r=10;
    }
    for (n=0; n<r; n++){
      // var width = ["width: 50%","width: 20%","width: 30%","width: 10%","width: 40%","width: 40%","width: 10%","width: 30%","width: 15%","width: 55%"];
      // var varname = document.createElement("img");
      // varname.setAttribute("style",width[n]);
      // varname.setAttribute("src", myData.hits[n].largeImageURL);
      // document.querySelector(("#pixabay")).appendChild(varname);
      document.getElementById(n).setAttribute("src", myData.hits[n].largeImageURL);
      // document.getElementById(n).setAttribute("style","border-radius: 10px;");
    }
    lan="";
    color="";
    category="";
    console.log("inputs: "+inputs+" "+lan+" "+category+" "+color);
  }