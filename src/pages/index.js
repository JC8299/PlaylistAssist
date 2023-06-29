import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Songs from '../lib/songs';
import Loader from '@/components/Loader';
import Dashboard from '@/components/Dashboard';
import Card from '@/components/Card';

// export const getServerSideProps = async ({ req, res }) => {
//     try {
//         const cookies = cookie.parse(req.headers.cookie || '');
//         const c = getCookies({req, res});
//         console.log(c);
//         console.log(req.headers);
//         console.log(new URLSearchParams(req.url).get('/?code'));
//         const session = await getSessionCookie(cookies);

//         return {
//             props: {
//                 user: session.user,
//             },
//         };
//     } catch (error) {
//         // console.log(error);
//         return {
//             props: {},
//         };
//     }
// };

// export async function getStaticProps() {
//     // get props here
//     return {
//         props: {
//         },
//     };
// }

// check index.js in NextJSDemo to see how to get props
export default function Home() {
    const router = useRouter();
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/auth/signin");
        },
    });

    if (status === 'loading') {
        return <Loader />;
    }

    return (
        <>
            <Head>
                <title>Playlist Assist</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <Dashboard />
        </>
    );
}