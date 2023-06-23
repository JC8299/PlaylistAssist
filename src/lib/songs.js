// import useSWR from 'swr';
// import { useEffect } from 'react';

// const fetcher = async (accessToken) => {
//     const response = await fetchSavedTracks(accessToken);
//     console.log(response);
//     const data = await response.json();
//     return data;
// };

// export default function Songs() {
//     const {accessToken, refreshToken} = authorizeSpotify();

//     useEffect(() => {
//         if (accessToken === 'undefined' || refreshToken === 'undefined') {
//             console.log('problem');
//         }
//     }, [accessToken, refreshToken]);

//     const {
//         data,
//         error,
//     } = useSWR('/authorization', fetcher);

//     if (error) return <div>Failed to load</div>;
//     if (!data) return <div>Loading...</div>;

//     const songs = fetchSavedTracks(data.accessToken);
//     const songList = songs.items;
//     return songList;

//             <ul id="songContainer">
//                 {songlist.map(({ track }) => (
//                     <li key={track.id}>
//                         <p>{track.name}</p>
//                         <p>{track.artists.name}</p>
//                     </li>
//                 ))}
//             </ul>
// }

// async function fetchSavedTracks(token) {
//     const params = new URLSearchParams({
//         limit: 10,
//         offset: 0
//     });

//     const result = await fetch('https://api.spotify.com/v1/me/tracks', {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//         body: params
//     });

//     return await result.json();
// }