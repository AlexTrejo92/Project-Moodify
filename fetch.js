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
let genre = 'rock';
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
    const apiUrl = `https://api.spotify.com/v1/browse/categories/${genre}/playlists`;
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
          var playlistContainers = document.querySelectorAll('.playlistCont');
          var playlistDatalist = data.playlists.items;
          var playlistUrl = playlistDatalist[0].external_urls.spotify;
          console.log(playlistUrl);

          console.log(playlistDatalist);
          
// TODO: CREATE ELEMENTS FOR EVERY SINGLE PLAYLIST SO THAT IS RESPONSIVE TO THE NUMBER OF RESULTS
          for (var i = 0; i < data.playlists.items.length; i++) {
            var newPlaylistContainer = document.createElement('div');

            var urlPlaylistContainer = document.createElement('a');
          
            // var selectUrl = document.querySelector('.playlistLink'); 

            
            newPlaylistContainer.innerText = data.playlists.items[i].name + '  -->';

            newPlaylistContainer.className = "playlistContainer";

            document.body.children[4].appendChild(newPlaylistContainer);

            // playlistContainers[i].innerText = playlistName;
            urlPlaylistContainer.innerText = '  Link to playlist on Spotify'
            urlPlaylistContainer.setAttribute('href', playlistDatalist[i].external_urls.spotify)
            urlPlaylistContainer.setAttribute('target', '_blank');
            document.body.children[4].children[i].appendChild(urlPlaylistContainer);
          }
        }

        // TODO: MAKE FOR LOOP TO GET THE PLAYLIST ID

        secondSpotifyCall(data);
        printPlaylists();
        // secondAPICall to retrieve playlist songs and print 10 of them on containers
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
// TODO: Make this work!!!!! Print 10 tracks of first playlist result.
 function secondSpotifyCall(newData){
var playlistID = newData.playlists.items[0].id;
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
        function printPlaylistItems(){
          // gets track name
          console.log(dataPlaylistItems.items[0].track.name);
          // gets artist
          var i = 0;
          console.log(dataPlaylistItems.items[0].track.artists[0].name);
          var trackName = dataPlaylistItems.items[i].track.name;
          var artistName = dataPlaylistItems.items[i].track.artists[0].name;
          console.log(document.getElementById('firstPlaylist'))
          var firstPlaylistCont = document.getElementById("firstPlaylist")
          // for loop to go through first 10 tracks of the playlist
          for (var i = 0; i < 10; i++) {
            // create an UL & li items and append them
            var ulContainer = document.createElement('ul');
            ulContainer.textContent = 'Song: ' + dataPlaylistItems.items[i].track.name + '  Artist: ' + dataPlaylistItems.items[i].track.artists[0].name;
            firstPlaylistCont.appendChild(ulContainer);
          }

        }
        printPlaylistItems();
      })
 }

  const button = document.getElementById('btn');
  button.addEventListener('click', () => {
    artistSearch();
    // playlistSongSearch()
  });

  

  // Code to target a different API Endpoint To retreive more data