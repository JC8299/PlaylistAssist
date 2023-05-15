const clientId = process.env.SPOTIFY_CLIENT_ID;
// need to change this because window is for browser and this is serverside
// const params = new URLSearchParams(window.location.search);
// need to change later
const redirectUri = 'http://localhost:3000';
const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: '',
    redirect_uri: redirectUri,
});
// most of this file should not be in the api as I need to continue
// using code to retain authorization
const code = params.get("code");

if(!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    // only valid for 1 hour
    const accessToken = await getAccessToken(clientId, code);

    // need to change this to work with playlists
    const profile = await fetchProfile(accessToken);
    // has access to profile
}

export async function redirectToAuthCodeFlow(clientId) {
    // Redirect to Spotify authorization page
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    let state = generateCodeVerifier(16);
    let scope = 'user-read-private user-read-email';

    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: challenge
    });
    // params.append('client_id', clientId);
    // params.append('response_type', 'code');
    // // need to alter this from working with vite
    // params.append('redirect_uri', redirectUri);
    // // may need to change scope
    // params.append('scope', );
    // params.append('code_challenge_method', 'S256');
    // params.append('code_challenge', challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

// may need to replace btoa
async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }

    const data = new TextEncoder().encode(codeVerifier);
    // maybe use node js crypto libraries to generate hash?
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return base64encode(digest);
}

async function getAccessToken(clientId, code) {
    // Get access token for code
    const verifier = localStorage.getItem('verifier');

    const params = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: verifier
    });
    // params.append('client_id', clientId);
    // params.append('grant_type', 'authorization_code');
    // params.append('code', code);
    // // same issue as previous uri
    // params.append('redirect_uri', redirectUri);
    // params.append('code_verifier', verifier);

    const result = fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });

    // to refresh token, params needs to be:
    // params = new URLSearchParams({
    //     client_id: clientId,
    //     grant_type: 'refresh_token',
    //     refresh_token: 'refresh toekn returned from the authroization exchange',
    // });

    const { access_token } = await result.json();
    return access_token;
}

// need to replace to access playlists
async function fetchProfile(token) {
    // Call Web API
    const result = await fetch('https://api.spotify.com/v1/me', {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

// example of using api json to fill profile
function populateUI(profile) {
    // Update UI with profile data
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}