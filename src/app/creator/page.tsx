import { SpotifyWidget } from "@/components/spotify-widget";
import { ContentCreatorSection } from "@/components/content-creator";

export default function Creator() {
    return (
        <div className="px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl">
                <h1 className="text-4xl font-bold mb-12">Creator</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-6">Music</h2>
                        <SpotifyWidget />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-6">Content</h2>
                        <ContentCreatorSection />
                    </div>
                </div>
            </div>
        </div>
    );
}
