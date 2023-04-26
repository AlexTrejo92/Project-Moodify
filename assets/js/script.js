// Image APIs Test 
var pixabayKey = "35740114-335bc84d305f30b42ed6482fb";
//
var lan;
var color;
var category;
var check;

var selected;
var selectedArr=[];
var inputs;

// // Hide options:
// var count = document.querySelectorAll(".optionsDiv");
// console.log("count: ",count);
// for (i=0;i<3;i++){
//   count[i].style.visibility = "hidden";
// }

// //  Parameter Options LANGUAGE 
// var optionsTitle = $('.optionsTitle');  
// optionsTitle.on('mouseover', function (event) { 
//   for (i=0;i<3;i++){
//     count[i].style.visibility = "visible";
//   }
// });

//  Parameter Options LANGUAGE 
var lanOptions = $('.lan');  
lanOptions.on('click', function () { 
  lan =(this.id);
  console.log("Language: "+lan)
});

//  Parameter Options COLOR // Prevent double information to be stored!!!!
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
  var queryURL1 = "https://pixabay.com/api/?key=35740114-335bc84d305f30b42ed6482fb&q="+ inputs+"&lang="+lan+"&category="+category+"&colors="+color+"&safesearch="+check;
  // https://pixabay.com/api/?key=35740114-335bc84d305f30b42ed6482fb   &q=yellow+flowers&image_type=photo

  fetch(queryURL1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var myData = data;
      console.log('data from pixabayApi:');
      console.log(myData);
      displayImgs(myData)
    });
    
}

function displayImgs(myData){
  for (n=0; n<10; n++){
    var width = ["width: 50%","width: 20%","width: 30%","width: 10%","width: 40%","width: 40%","width: 10%","width: 30%","width: 15%","width: 55%"];
    var varname = document.createElement("img");
    // varname.css('width',width[n]);
    // varname.setAttribute("style",width[n]);
    varname.setAttribute("src", myData.hits[n].largeImageURL);
    document.querySelector(("#pixabay")).appendChild(varname);
  }
}

// API that gets weather info
// function getWeatherApi(lat,lon) {
//   console.log("   getweatherApi()");
//   // https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//   var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=41adf6f71fd0597dbaad07a430a610c9&units=metric" ;

//   fetch(queryURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log("Data from api 2");
//       console.log(data);

//       // displayInfo(data)
//     });
// }

// Displays weather info on screen: 
// function displayInfo(data){
//   console.log("   displayInfo()");
  
//   document.querySelector("#cityName").textContent=data.city.country+" - "+data.city.name;
//   document.querySelector("#icon").setAttribute("src", "https://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png");
//   document.querySelector("#mainW").textContent=data.list[0].weather[0].description;
//   document.querySelector("#temp").textContent="Temperature: "+data.list[0].main.temp+" °C";
//   document.querySelector("#wind").textContent="Wind: "+data.list[0].wind.speed+" m/sec";
//   document.querySelector("#hum").textContent="Humidity: "+data.list[0].main.humidity+" %";

//   for (i=0;i<5;i++){
//     var indexs =[0,10,20,30,39];
//     date5[i] = data.list[indexs[i]].dt_txt.split(' ');
//     icon[i] = "https://openweathermap.org/img/wn/"+data.list[indexs[i]].weather[0].icon+"@2x.png"
//     document.querySelector("#icon").style.visibility = "visible";
//     mainW[i] =data.list[indexs[i]].weather[0].description;
//     temp[i] ="Temperature: "+data.list[indexs[i]].main.temp+" °C";
//     wind[i] ="Wind: "+data.list[indexs[i]].wind.speed+" m/sec";
//     hum[i] = "Humidity: "+data.list[indexs[i]].main.humidity+" %";

//     document.querySelector("#future"+i).textContent=date5[i][0];
//     var varname = document.createElement("img");
//     varname.setAttribute("src", "https://openweathermap.org/img/wn/"+data.list[indexs[i]].weather[0].icon+"@2x.png");
//     document.querySelector(("#future"+i)).appendChild(varname);
//     appends("p","mainWeatherF",mainW[i],("#future"+i));
//     appends("p","temperatureF",temp[i],("#future"+i));
//     appends("p","windF",wind[i],("#future"+i));
//     appends("p","humF",hum[i],("#future"+i));
//     document.querySelector("#futures").style.visibility = "visible";
//   } 

// }

// Click on history cards
// function clickHistory(){
//   console.log("   clickHistory()");

//   var saveButton = $('.card');
//   saveButton.on('click', function () {

//     var stored = localStorage.getItem(this.innerHTML).split(" "); 
//     var storedlat = parseFloat(stored[0].slice(1));
//     var storedlon = parseFloat(stored[1].slice(0,-1)); 
    
//     getWeatherApi(storedlat,storedlon);
//   });
// }

// append function
function appends(Elname,className,content,selecName){
  // Elname -  element type (string) eg: "div"
  // classname - new element class (string) eg: "temp"
  // content -  content to be appended
  // selecName - name of parent element (strin) eg: "#history"
  var varname = document.createElement(Elname);
  varname.setAttribute("class", className);
  varname.textContent= content;
  document.querySelector(selecName).appendChild(varname);
}