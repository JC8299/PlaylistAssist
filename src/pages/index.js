import Head from 'next/head';
import Link from 'next/link';

import { siteTitle } from '../components/layout';

export async function getStaticProps() {
    // get props here
    return null;
}

// check index.js in NextJSDemo to see how to get props
export default function Home() {
    <>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        {/* rest of the html */}
    </>
}