import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";


var user_credential = []
export default NextAuth({


    // Configure one or more authentication providers
    providers: [
        GitHubProvider({
            clientId: "3cda2d89ec0497e54f92",
            clientSecret: "20b028124e67f58e076eee08079a62e122ee751d",
        }),
    ],

    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            //google token
            var user_token = token.token.account

            return token;
        },
        async session({ session, token, user }) {
            user_credential = {
                "provider": "github",
                // "auth_token":token.token.account.id_token,
            }
            if (token.token.account.access_token) {
                user_credential["auth_token"] = token.token.account.access_token
            }
            if (token.token.account.id_token) {
                user_credential["auth_token"] = token.token.account.id_token
            }
            // Send properties to the client, like an access_token from a provider.
            // session.accessToken = token
            return user_credential
        }
    },
    secret: "G98di5p1KYGycZRa9wOhULNe0uwEv9JwPOv1Nw+wWZI=",
    jwt: {
        secret: "G98di5p1KYGycZRa9wOhULNe0uwEv9JwPOv1Nw+wWZI=",
        encryption: true,
    },
    pages: {
        signIn: "/api/auth/sigin",
    },
});