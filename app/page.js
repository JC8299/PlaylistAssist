import { getAuthenticatedSession } from '@/utils/serverUtils';
import { redirect } from 'next/navigation';

import SearchPanel from '@/components/searchPanel/SearchPanel';


export const metadata = {
    title: 'Playlist Assist Dashboard',
}

export default async function Page() {
    const session = await getAuthenticatedSession();
    
    if (!session) {
        redirect('/signin');
    }

    return (
        <>
            {/* <link rel="icon" href="/favicon.ico" /> */}
            {/* <SearchPanel /> */}
            <div>placeholder</div>
        </>
    );
}