
// Replace with your own client ID and client secret
const clientId = 'b0a0b5ec72ab484ca47ab6994da9a3e0';
const clientSecret = 'de7986ead2c54716b8962be43be72b59';
// Encode client ID and client secret in base64 format as requested by spotify
const base64ClientIdSecret = btoa(`${clientId}:${clientSecret}`);
// Define the endpoint URL
const tokenUrl = 'https://accounts.spotify.com/api/token';
// variable to hold the token, token will change as the token only last one hour
let accessToken;
// this will be replace by the user search
// let artist = 'arctic monkeys';

// TODO: LocalStorage showOnboarding set (el boton de start)
// TODO: LOCAL STORAGE GET (siempre se hace)

// TODO: This variable should be filled with the user input (dropdown or form);
let genre = 'focus';
// Create the fetch request to get the access token
fetch(tokenUrl, {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${base64ClientIdSecret}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'grant_type=client_credentials'
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed');
    }
  })
  .then(data => {
    accessToken = data.access_token;
  })
  .catch(error => {
    console.error('Error:', error);
  });
  function artistSearch() {
    const apiUrl = `https://api.spotify.com/v1/browse/categories/${genre}/playlists?limit=6`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${accessToken}`}
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed');
        }
      })
      .then(data => {
        //
        console.log('API response:', data);

        function printPlaylists() {
          var playlistDatalist = data.playlists.items;         
          // For loop that creates and prints the playlist with its info
          for (var i = 0; i < data.playlists.items.length; i++) {
            // Creates a container that will hold the playlist name and link to Spotify
            var newPlaylistContainer = document.createElement('div');
            // add the class playlistContainer to style the divs
            newPlaylistContainer.className = "playlistContainer";
            // Appends the div to the webpage (prints)
            document.getElementById('mainPlaylistContainer').appendChild(newPlaylistContainer);
          }
          // Second for loop to add the URL to the Playlist and the Cover and a button to trigger modal
          for (var i = 0; i < data.playlists.items.length; i++) {
            // Creates a container for the anchor tags and images that will hold the URL to spotify

            var imgContainer = document.createElement('img');
            var urlPlaylistContainer = document.createElement('a');
            var playlistName = document.createElement('p');
            
            // Adds text to the anchor tag
            playlistName.innerText = '🎧  ' + data.playlists.items[i].name + '  🎧';
            urlPlaylistContainer.innerText = '  Link to playlist on Spotify';
            
            // Adds the href to the playlist and attributes to the img tag so that the cover is displayed          
            urlPlaylistContainer.setAttribute('href', playlistDatalist[i].external_urls.spotify)
            imgContainer.setAttribute('src', playlistDatalist[i].images[0].url)
            imgContainer.setAttribute('alt', 'playlist cover image');
            imgContainer.className = 'coverImage';
            

            // Adds the attribute so the link is opened in a new tab
            urlPlaylistContainer.setAttribute('target', '_blank');
            // Appends the anchor tags and the url to the Images for the covers
            document.getElementById('mainPlaylistContainer').children[i].appendChild(imgContainer);
            document.getElementById('mainPlaylistContainer').children[i].appendChild(playlistName);
            document.getElementById('mainPlaylistContainer').children[i].appendChild(urlPlaylistContainer);
            
          }
          var getTracksBtn = document.createElement('button');
          getTracksBtn.innerText = 'Show tracks'
          getTracksBtn.setAttribute('class', 'getSongsBtn');
          document.querySelector('.playlistContainer').appendChild(getTracksBtn);
        }
        secondSpotifyCall(data);
        printPlaylists();
        
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
// TODO: Prints 10 tracks of first playlist result to the playlistTracks.html file.
 function secondSpotifyCall(newData){
var playlistID = newData.playlists.items[0].id;
          // var getSongsBtn = document.querySelectorAll('getSongsBtn');
          // getSongsBtn.addEventListener('click', getSongs);
          
          // function getSongs() {
          //   var tracksPage = './playlistTracks.html'
          //   location.assign(tracksPage);
          // }

  const getItemsUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    fetch(getItemsUrl, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${accessToken}`}
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed');
        }
      })
      .then(dataPlaylistItems => {
        console.log('Second API response:', dataPlaylistItems);
        function getSongs(event){
          event.preventDefault();
          console.log('Playlist Songs retrieved');
                // Creates the Ul tag to hold the playlist songs as list items.
        var ulContainer = document.createElement('ul')
        // add a class so querySelector can be used.
        ulContainer.classList.add('playlistSongsContainer')
        // Adds text content to the UL header.
        ulContainer.innerHTML = '<strong>Songs on selected Playlist:</strong>' 
        // Appends the UL container tag to the DOM
        document.getElementById('secondSection').appendChild(ulContainer);
        
          function printPlaylistItems(){
          var firstPlaylistCont = document.querySelector(".playlistSongsContainer")
          // for loop to go through first 10 tracks of the playlist
          for (var i = 0; i < 10; i++) {
            // create li items and append them to the UL container
            var liContainer = document.createElement('li');
            liContainer.textContent = 'Song: ' + dataPlaylistItems.items[i].track.name + '  by: ' + dataPlaylistItems.items[i].track.artists[0].name;
            firstPlaylistCont.appendChild(liContainer);
          }
          }
        printPlaylistItems();
        // createModal(dataPlaylistItems);
          }
        var tracksEventListener = document.querySelectorAll('.getSongsBtn')
        for (var i = 0; i <tracksEventListener.length; i++) {
          tracksEventListener[i].addEventListener('click', getSongs,{once:true});
      }
        // secondAPICall to retrieve playlist songs and print 10 of them on containers
        
        








        




        // ---------------------------MODAL---------------------------------
        // Code to create the html for the modal
        function createModal(info) {
          console.log('modal created')
          // Creates and append first div for modal
          var modalContainer = document.createElement('div');
          modalContainer.className = 'modal';
          modalContainer.setAttribute('id', 'modal-js-example');
          document.body.children[5].appendChild(modalContainer);

          // creates button to trigger modal
          var playlistBtn = document.createElement('button');
          playlistBtn.textContent = 'Show playlist tracks';
          // playlistBtn.setAttribute('class', 'js-modal-trigger');
          playlistBtn.classList.add('js-modal-trigger','is-primary', 'button');
          playlistBtn.setAttribute('data-target', 'modal-js-example');
          playlistBtn.setAttribute('id', 'getTracksBtn');
          document.body.children[5].appendChild(playlistBtn);

          // Creates and appends second div for modal
          var secondDivModal = document.createElement('div');
          secondDivModal.setAttribute('class', 'modal-background');
          document.getElementById('modal-js-example').appendChild(secondDivModal);

          // creates and appends third div for modal
          var modalContent = document.createElement('div');
          modalContent.className = 'modal-content';
          modalContent.setAttribute('id', 'appendModal')
          var firstModalDiv = document.getElementById('modal-js-example');
          firstModalDiv.appendChild(modalContent);

          // creates the 4th and final div for the modal
          var finalDivModal =document.createElement('div');
          finalDivModal.setAttribute('class', 'box');
          finalDivModal.setAttribute('id', 'playlistModal');
          finalDivModal.textContent = 'Playlist:' + info.playlists.items[0].name;
          var finalDivCont = document.getElementById('appendModal');
          finalDivCont.appendChild(finalDivModal);
          var modalParagraph = document.createElement('p');
          modalParagraph.textContent = 'PlaylistName Tracks:'
          var appendParagraph = document.getElementById('playlistModal')
          appendParagraph.appendChild(modalParagraph);
          // Creates the X button to close modal
          var closeModalBtn = document.createElement('button');
          closeModalBtn.setAttribute('class', 'modal-close is-large');
          closeModalBtn.setAttribute('aria-label', 'close');
          document.getElementById('modal-js-example').appendChild(closeModalBtn);

          console.log(info.items[0].track.name)
        }

      })
 }
 // TODO: MODAL FUNCTIONALITY SET ON BUTTON
/*
 document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

// -----------------------------MODAL-------------------------------------

*/









//  Event listener that triggers with the Busca un Artista Button
  const button = document.getElementById('searchbtn');
  button.addEventListener('click', (event) => {
    artistSearch();
    event.preventDefault();
    // playlistSongSearch()
  });

  

  // Code to target a different API Endpoint To retreive more data



// Code to change HTML when click the Check Playlist Info on the HTML button





var menu3 = document.getElementById("dropdown3");
menu3.addEventListener('click', e=>{
    e.stopPropagation()
    menu3.classList.toggle('is-active')
})

// ORIGINAL CODE XIME
// var startBtn = document.getElementById("startBtn");
// startBtn.addEventListener('click', () => {
//     var startPage = document.getElementById("startPage");
//     startPage.style.display= 'none';
//     var header = document.getElementById("header");
//     header.style.display='inline';
//     var searchbar = document.getElementById("searchbar");
//     searchbar.style.display='inline';
//     var dropdowns = document.getElementById("dropdowns");
//     // dropdowns.style.display ='inline';
//     dropdowns.style.visibility = "visible";
//     dropdowns.setAttribute("class","dropdownsinit");
//     results.style.visibility = "visible";
// });

// ---------------------------------------------------------COMENTED SEARCHBTN FUNCTIONALITY
// var searchBtn = document.getElementById("searchBtn");
// searchBtn.addEventListener('click', () => {
//     var results = document.getElementById("results");
//     results.style.display = 'block';
// });

// ------------------------------------------------------------------XIMENA 
// dropdowns.style.visibility = "hidden";
// results = document.getElementById("results");
// results.style.visibility = "hidden";

var pixabayKey = "35740114-335bc84d305f30b42ed6482fb";
var queryURL1;
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
    inputs = document.querySelector("#inputxim").value;
    pixabayApi(inputs,lan,category,color,check);
    
    var unhideResults= document.getElementById("results");
    unhideResults.classList.remove("hidden");
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
      document.getElementById(n).setAttribute("src", myData.hits[n].largeImageURL);
    }
    lan="";
    color="";
    category="";
    console.log("inputs: "+inputs+" "+lan+" "+category+" "+color);
  }
