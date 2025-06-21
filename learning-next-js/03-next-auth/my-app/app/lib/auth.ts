import CredentialsProvider  from "next-auth/providers/credentials";

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Enter your username"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password"
                }
            },
            async authorize(credentials: any) {
                console.log(credentials)
                return {
                    id: "user1", 
                    name: credentials.username,
                    email: credentials.username
                }
            }
        })
    ], 
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token, user }: any) => {
            session.id = token.sub; // add id here
            
            return session;
        }
    }
}

