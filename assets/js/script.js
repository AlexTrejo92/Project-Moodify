
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

