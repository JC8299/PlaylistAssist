import Image from "next/image";

export default function PlaylistHeader({
    playlist,
}) {
    <div className="flex">
        {playlist.images.length > 0 ? (
            <Image
                src={playlist.images[0].url}
                alt={playlist.name}
                fill={true}
                className="object-cover rounded-sm"
            />
        ) : (
            <div className="w-full">
                placeholder for no image
            </div>
        )}

        <div className="flex flex-col">
            {/* playlist type */}
            <p>{playlist.public ? '' : 'Private '}{playlist.type}</p>

            {/* playlist name */}
            <h2>{playlist.name}</h2>

            {/* playlist description */}
            {playlist.description && (
                <p>{playlist.description}</p>
            )}

            {/* playlist owner, playlist followers, tracks length */}
            <div className="flex flex-row">
                <p>{playlist.owner?.display_name}</p>
                {playlist.followers.total > 0 && (
                    <>
                        {/* do something with it */}
                        {/* .followers.total is a number */}
                    </>
                )}
                {playlist.tracks.items.length > 0 && (
                    <>
                        <p>{playlist.tracks.total.toLocaleString()} songs</p>
                    </>
                )}
            </div>
            {/* ignore owner image and playlist total because too much of a pain */}
        </div>
    </div>
}