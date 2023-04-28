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
let artist = 'arctic monkeys';

// TODO: This variable should be filled with the user input (dropdown or form);
let genre = 'pop';
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
    // const apiUrl = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;
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
          console.log(data.playlists);
          console.log(data.playlists.href);
          console.log(data.playlists.items[0].name);
          var playlistContainers = document.querySelectorAll('.playlistCont');

          var playlistUrl = data.playlists.items[0].external_urls.spotify;
          console.log(playlistUrl);

          var link2playlist = document.getElementById('playlistLink');
          console.log(link2playlist);
          document.getElementById('playlistLink').setAttribute('href', 'https://open.spotify.com/playlist/37i9dQZF1DXcF6B6QPhFDv');

          for (var i = 0; i < playlistContainers.length; i++) {

            var playlistName = data.playlists.items[i].name;
            
            playlistContainers[i].innerText = playlistName;
            console.log(playlistContainers);
            console.log(playlistContainers[i]);
          }
        }
        printPlaylists();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

 

  const button = document.getElementById('btn');
  button.addEventListener('click', () => {
    artistSearch();
    
  });

  

  // Code to target a different API Endpoint To retreive more data