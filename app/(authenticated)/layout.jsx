import Providers from "@/provider/Providers";

import "@/styles/globals.css"
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata = {
    title: 'Spotify Playlist Assist',
    description: 'A site to make Spotify playlists easier'
}

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Dashboard>
                        {children}
                    </Dashboard>
                </Providers>
            </body>
        </html>
    )
}