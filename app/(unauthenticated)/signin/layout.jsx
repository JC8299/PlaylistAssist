import "@/styles/globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";

export const metadata = {
    title: "Sign in with Spotify",
};

export default function SignInPageLayout({
    children,
}) {
    return (
        <html lang="en">
            <NextAuthProvider>
                <body>
                    <main>{children}</main>
                </body>
            </NextAuthProvider>
        </html>
    )
}