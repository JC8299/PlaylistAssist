'use client'

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Signin({
    providers,
}) {
    return (
        <div className="bg-black h-screen flex flex-col items-center pt-40 space-y-8">
            <Image
                src="/images/spotify_logo.png"
                alt="Spotify"
                height={250}
                width={600}
                style={{objectFit:"contain"}}
                className="animate-pulse"
            />
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-ex md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]" onClick={() => signIn(provider.id, {callbackUrl: "/"}, {prompt: "login"})}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))
            }
        </div>);
}