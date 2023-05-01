
// var textArea = document.getElementById('');
// var showInfoBtn = document.getElementById('btn');

// // Authentication Code

// function generateRandomString(length) {
//     let text = '';
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
//     for (let i = 0; i < length; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
//   }
  

//   async function generateCodeChallenge(codeVerifier) {
//     function base64encode(string) {
//       return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
//         .replace(/\+/g, '-')
//         .replace(/\//g, '_')
//         .replace(/=+$/, '');
//     }
  
//     const encoder = new TextEncoder();
//     const data = encoder.encode(codeVerifier);
//     const digest = await window.crypto.subtle.digest('SHA-256', data);
  
//     return base64encode(digest);
//   }
  
//   const clientId = 'b0a0b5ec72ab484ca47ab6994da9a3e0';
//   const redirectUri = 'http://127.0.0.1:5500/testServer.html';
  
//   let codeVerifier = generateRandomString(128);


// Call to API

// FIRST AUTHORIZATION FLOW ATTEMPTED, WOULDNT WORK FOR THE APP

// function getApi() {
//     console.log('The GetApi function is running');
    
//     var requestUrl = 'https://open.spotify.com/artist/7Ln80lUS6He07XvHI8qqHH?si=s7FjS9SUTTSnoNO9dblzVg';

//     fetch(requestUrl, {
//         // headers: {Authentication: 'Bearer BQCmD8YTEfGsY9mBjOT3DYabjT8vyAfpAM07a_zlDXpTrSh4PHerT8NYRIRcl5KxARv5z5QTUA5ZJdiZtMe9RimEu41xa20Tr3iO5Gp4Vp9YsKa1QCDi'}
//     })
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//         // textArea.appendChild(link);
//     }
//     )
// }

// showInfoBtn.addEventListener('click', ()=> generateCodeChallenge(codeVerifier).then(codeChallenge => {
//     let state = generateRandomString(16);
//     let scope = 'user-read-private user-read-email';
  
//     localStorage.setItem('code_verifier', codeVerifier);
  
//     let args = new URLSearchParams({
//       response_type: 'code',
//       client_id: clientId,
//       scope: scope,
//       redirect_uri: redirectUri,
//       state: state,
//       code_challenge_method: 'S256',
//       code_challenge: codeChallenge
//     });
  
//     window.location = 'https://accounts.spotify.com/authorize?' + args;
//   })) ;


// JS code to retrieve Spotify API jSON.

// {"access_token":"BQBBkITqXzKIqxEbAEc5hMHwQQZqTzIN15ah83h1wH43J_4QkrGo1j4Fgq4sRulIVXK3B7AdXjUep6A5zThRKN-2BhB5iWtHmeHhzI9KEs0PpZB98dXx","token_type":"Bearer","expires_in":3600}

// Token final
// {
//     "access_token": "BQCmD8YTEfGsY9mBjOT3DYabjT8vyAfpAM07a_zlDXpTrSh4PHerT8NYRIRcl5KxARv5z5QTUA5ZJdiZtMe9RimEu41xa20Tr3iO5Gp4Vp9YsKa1QCDi",
//     "token_type": "Bearer",
//     "expires_in": 3600
// }

// Arctic Monkeys ID
//"https://open.spotify.com/artist/7Ln80lUS6He07XvHI8qqHH?si=s7FjS9SUTTSnoNO9dblzVg"



// Isas code


// // mobile navbar menu
// var burgerIcon = document.querySelector('#burger');
// var navbarMenu = document.querySelector('#nav-links');

// burgerIcon.addEventListener('click', () => {
//     navbarMenu.classList.toggle('is-active')
// })

// var menu1 = document.getElementById("dropdown1");
// menu1.addEventListener('click', e=>{
//     e.stopPropagation()
//     menu1.classList.toggle('is-active')
// })

// var menu2 = document.getElementById("dropdown2");
// menu2.addEventListener('click', e=>{
//     e.stopPropagation()
//     menu2.classList.toggle('is-active')
// })

// var menu3 = document.getElementById("dropdown3");
// menu3.addEventListener('click', e=>{
//     e.stopPropagation()
//     menu3.classList.toggle('is-active')
// })

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
            document.body.children[4].appendChild(newPlaylistContainer);
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
            document.body.children[4].children[i].appendChild(imgContainer);
            document.body.children[4].children[i].appendChild(playlistName);
            document.body.children[4].children[i].appendChild(urlPlaylistContainer);
            
          }
          var getTracksBtn = document.createElement('button');
          getTracksBtn.innerText = 'Show tracks'
          getTracksBtn.setAttribute('class', 'getSongsBtn');
          document.body.children[4].children[0].appendChild(getTracksBtn);
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




