import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

import Signin from "./signin";
import { getAuthenticatedSession } from "@/utils/serverUtils"; 

export const metadata = {
    title: 'Sign In - Playlist Assist',
}

async function getSpotifyProviders() {
    const providers = await getProviders();
    return providers;
}

export default async function Page() {
    const session = await getAuthenticatedSession();
    if (session) {
        redirect('/');
    }
    const providers = await getSpotifyProviders();

    return <Signin providers={providers} />;
}