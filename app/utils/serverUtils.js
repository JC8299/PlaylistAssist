import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route"; 

export async function getAuthenticatedSession() {
    const session = await getServerSession(authOptions);

    if (!session) return null;
    // check if session expired

    return session;
}

export async function getSpotifyWebApi(url, session) {
    if (!session) {
        return null;
    }

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        }
    });

    return res.json();
}