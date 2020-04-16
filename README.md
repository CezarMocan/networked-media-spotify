# Spotify Authentication & Music Playing Examples

This is a simple express app which allows a user to log in with Spotify, displays some basic user information, and allows the user to play a playlist of 2 pre-defined songs. 

First of all, follow the [the App Settings guide](https://developer.spotify.com/documentation/general/guides/app-settings/) in order to create a Spotify App and get its Client Id and Client Secret. Next thing, go to `app.js` in this code, at line 6, and read the comments in there. Place your Client ID and Client Secret in there, and copy the `redirect_uri` from the code into the dashboard.

*Note* If you're running this example on Digital Ocean instead of localhost, you will need to change the `redirect_uri` variable to match your IP address (and port if it's different than 80.)

Once you've made sure the Client Id, Client Secret and `redirect_uri` match what you have in your Spotify dashboard, you should be good to go. You can run the server using `node app.js` and opening your browser to [http://localhost:3000](http://localhost:3000).

Once you have everything running and you can log in and play the sample tracks, you'll likely want to start adding your own functionality. The Spotify API documentation is [here](https://developer.spotify.com/documentation/web-api/reference/).

c

