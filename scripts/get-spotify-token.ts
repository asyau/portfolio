// Run this script with: npx ts-node scripts/get-spotify-token.ts
// Or just follow the manual steps below

/*
MANUAL STEPS TO GET SPOTIFY REFRESH TOKEN:

1. Open this URL in your browser:
   https://accounts.spotify.com/authorize?client_id=410cd67422784ef1b9e6a60bd9015595&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8888%2Fcallback&scope=user-read-currently-playing%20user-top-read%20playlist-read-private

2. Log in and authorize the app

3. You'll be redirected to something like:
   http://localhost:8888/callback?code=AQD...very_long_code...

4. The page will show an error (that's fine!) 
   Just copy the 'code' value from the URL

5. Open terminal and run (replace the values):

   curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code" \
     -d "code=PASTE_YOUR_CODE_HERE" \
     -d "redirect_uri=http://localhost:8888/callback" \
     -d "client_id=410cd67422784ef1b9e6a60bd9015595" \
     -d "client_secret=YOUR_CLIENT_SECRET"

6. From the response, copy the "refresh_token" value

7. Create .env.local in the project root:

   SPOTIFY_CLIENT_ID=410cd67422784ef1b9e6a60bd9015595
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REFRESH_TOKEN=the_refresh_token_you_got

8. Restart the dev server: npm run dev
*/

console.log(`
=== SPOTIFY TOKEN HELPER ===

Open this URL in your browser:
https://accounts.spotify.com/authorize?client_id=410cd67422784ef1b9e6a60bd9015595&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8888%2Fcallback&scope=user-read-currently-playing%20user-top-read%20playlist-read-private

After authorizing, the page will error - that's OK!
Copy the 'code' from the URL and use it with curl to get your refresh token.
`);
