"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, Disc3, Headphones } from "lucide-react";

interface NowPlaying {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
}

interface Track {
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
}

export function SpotifyNowPlaying() {
    const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const res = await fetch("/api/spotify/now-playing");
                const data = await res.json();
                setNowPlaying(data);
            } catch (error) {
                console.error("Failed to fetch now playing:", error);
            }
        };

        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);

    if (!nowPlaying) {
        return (
            <div className="p-4 rounded-xl border border-border/50 animate-pulse">
                <div className="h-4 w-24 bg-secondary rounded mb-2" />
                <div className="h-5 w-32 bg-secondary rounded" />
            </div>
        );
    }

    return (
        <div className="p-4 rounded-xl border border-border/50 hover:border-border transition-colors">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                {nowPlaying.isPlaying ? (
                    <Disc3 className="h-4 w-4 animate-spin" style={{ animationDuration: "3s" }} />
                ) : (
                    <Music className="h-4 w-4" />
                )}
                <span className="text-xs font-medium uppercase tracking-wider">
                    {nowPlaying.isPlaying ? "Now Playing" : "Recently Played"}
                </span>
            </div>
            {nowPlaying.title ? (
                <Link
                    href={nowPlaying.songUrl || "#"}
                    target="_blank"
                    className="flex items-center gap-3 group"
                >
                    {nowPlaying.albumImageUrl && (
                        <Image
                            src={nowPlaying.albumImageUrl}
                            alt={nowPlaying.album || "Album"}
                            width={48}
                            height={48}
                            className="rounded"
                        />
                    )}
                    <div className="min-w-0">
                        <p className="font-medium truncate group-hover:text-green-500 transition-colors">
                            {nowPlaying.title}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">{nowPlaying.artist}</p>
                    </div>
                </Link>
            ) : (
                <p className="text-muted-foreground">Not playing</p>
            )}
        </div>
    );
}

export function SpotifyTopTracks() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopTracks = async () => {
            try {
                const res = await fetch("/api/spotify/top-tracks");
                const data = await res.json();
                setTracks(data);
            } catch (error) {
                console.error("Failed to fetch top tracks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopTracks();
    }, []);

    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 animate-pulse">
                        <div className="w-10 h-10 bg-secondary rounded" />
                        <div className="flex-1">
                            <div className="h-4 w-32 bg-secondary rounded mb-1" />
                            <div className="h-3 w-24 bg-secondary rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tracks.map((track, i) => (
                <Link
                    key={i}
                    href={track.songUrl}
                    target="_blank"
                    className="flex items-center gap-3 group"
                >
                    <span className="w-5 text-sm text-muted-foreground">{i + 1}</span>
                    {track.albumImageUrl && (
                        <Image
                            src={track.albumImageUrl}
                            alt={track.album}
                            width={40}
                            height={40}
                            className="rounded"
                        />
                    )}
                    <div className="min-w-0 flex-1">
                        <p className="font-medium truncate group-hover:text-green-500 transition-colors">
                            {track.title}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export function SpotifyWidget() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Spotify</h3>
            </div>

            <SpotifyNowPlaying />

            <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                    Top Tracks This Month
                </p>
                <SpotifyTopTracks />
            </div>
        </div>
    );
}
