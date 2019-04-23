# Liri-Node-App

The Liri-Node-App is a demonstration of a fairly basic backend command line application that takes in a user command and search parameter for movies, songs, and bands and returns associated data from 3 APIs.  The can also get its command and search parameter form local file as an alternative.

This application calls the OMDB (Axios); BandsInTown (Axios); and the Spotify API (spotify.search).

The app uses 4 functions --> "movie-this", "spotify-this", & "concert-this" to find and return the requested data.

***IMPORTANT*** -->  In order to use this app and clone this repo, it is necessary to first register for an User UD and Secret  at the Spotify for Developers site https://developer.spotify.com/documentation/web-api/.  You will need to supply your own .env file with your Spotify API User ID and Secret in the below format:

********************************

# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

*********************************

Here is a video demo of the App https://www.youtube.com/watch?v=eMbT2jdVkX0&t=16s 