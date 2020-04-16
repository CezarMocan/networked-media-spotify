// This is a "wrapper" around the Spotify Web Playback SDK.
// It means that I've created a few functions you can use easily
// in order to access the Spotify music player. It's quite complicated to use directly...
// You don't need to understand everything that's going on in here,
// you can simply call SpotifyPlayerInitialize(), SpotifyPlayerPlayTracks(), etc.
// There are examples of how to call them in the views/profile.ejs file.
// If you do want to understand more, or extend the functionalities of this file
// the documentation is here: https://developer.spotify.com/documentation/web-playback-sdk/reference/

var __SPOTIFY_PLAYER

SpotifyPlayerInitialize = function(name, access_token) {
    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log(name, access_token)
        const token = access_token
        player = new Spotify.Player({
            name: name,
            getOAuthToken: cb => { cb(token); }
        });

        __SPOTIFY_PLAYER = player
    
        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });
    
        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });
    
        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });
    
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
    
        // Connect to the player!
        player.connect();
    
        return player    
        };    
}

SpotifyPlayerPlayTracks = function(trackSpotifyUris) {
    var spotify_uris = trackSpotifyUris
    var getOAuthToken = __SPOTIFY_PLAYER._options.getOAuthToken
    var id = __SPOTIFY_PLAYER._options.id
    getOAuthToken(access_token => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: spotify_uris }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      })
    })
}

SpotifyPlayerPause = function() {
    __SPOTIFY_PLAYER.pause().then(() => {
        console.log('Player Paused')
    })
}

SpotifyPlayerResume = function() {
    __SPOTIFY_PLAYER.resume().then(() => {
        console.log('Player Resumed')
    })
}

SpotifyPlayerSetVolume = function(v) {
    __SPOTIFY_PLAYER.setVolume(v).then(() => {
        console.log('Player Volume set to: ', v)
    })
}

SpotifyPlayerNextTrack = function() {
    __SPOTIFY_PLAYER.nextTrack().then(() => {
        console.log('Skipped to next track')
    })
}

SpotifyPlayerPreviousTrack = function() {
    __SPOTIFY_PLAYER.previousTrack().then(() => {
        console.log('Previous track')
    })
}