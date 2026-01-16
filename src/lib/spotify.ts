// Spotify API utilities
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

async function getAccessToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refresh_token || "",
        }),
        cache: "no-store",
    });

    return response.json();
}

export async function getNowPlaying() {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
    });

    if (response.status === 204 || response.status > 400) {
        return { isPlaying: false };
    }

    const data = await response.json();

    if (!data.item) {
        return { isPlaying: false };
    }

    return {
        isPlaying: data.is_playing,
        title: data.item.name,
        artist: data.item.artists.map((artist: { name: string }) => artist.name).join(", "),
        album: data.item.album.name,
        albumImageUrl: data.item.album.images[0]?.url,
        songUrl: data.item.external_urls.spotify,
    };
}

export async function getTopTracks() {
    const { access_token } = await getAccessToken();

    const response = await fetch(`${TOP_TRACKS_ENDPOINT}?limit=5&time_range=short_term`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const data = await response.json();

    return data.items?.map((track: {
        name: string;
        artists: { name: string }[];
        album: { name: string; images: { url: string }[] };
        external_urls: { spotify: string };
    }) => ({
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(", "),
        album: track.album.name,
        albumImageUrl: track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
    })) || [];
}

export async function getPlaylists() {
    const { access_token } = await getAccessToken();

    const response = await fetch(`${PLAYLISTS_ENDPOINT}?limit=6`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
    });

    const data = await response.json();

    return data.items?.map((playlist: {
        name: string;
        description: string;
        images: { url: string }[];
        external_urls: { spotify: string };
        tracks: { total: number };
    }) => ({
        name: playlist.name,
        description: playlist.description,
        imageUrl: playlist.images[0]?.url,
        url: playlist.external_urls.spotify,
        trackCount: playlist.tracks.total,
    })) || [];
}
