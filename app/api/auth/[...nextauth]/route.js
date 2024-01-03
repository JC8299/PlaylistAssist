import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

const scopes = [
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
];

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property.
 * @param {*} token
 */
async function refreshAccessToken(token) {
    try {
        // console.log('Refreshing token');

        const url =
            'https://accounts.spotify.com/api/token?' +
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken,
            });

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
            },
            method: "POST",
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            console.log(refreshedTokens);
            throw refreshedTokens;
        }

        // console.log('Finishing refreshing token');
        
        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.log("Error refreshing access token", error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions = {
    // Secret for JWT decryption
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        authorization: `https://accounts.spotify.com/authorize?scope=${scopes.join(',')}&show_dialog=true`,
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // Initial sign in
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    accessTokenExpires: Date.now() + account.expires_in * 1000,
                    refreshToken: account.refresh_token,
                    user,
                };
            } else if (Date.now() < token.accessTokenExpires) {
                // Return previous token if the access token has not expired yet
                return token;
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.error = token.error;

            return session;
        },
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};