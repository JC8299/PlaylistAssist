'use client'

import { NextUIProvider } from "@nextui-org/react";
import NextAuthProvider from "./NextAuthProvider";

export default function Providers({
    children
}) {
    return (
        <NextAuthProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </NextAuthProvider>
    )
}