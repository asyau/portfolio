import { Music, Book, Code, MapPin } from "lucide-react";

export function CurrentlyStatus() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-border/50 hover:border-border transition-colors">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Location</span>
                </div>
                <p className="font-medium">Hong Kong</p>
                <p className="text-sm text-muted-foreground">Exchange semester</p>
            </div>
            <div className="p-4 rounded-xl border border-border/50 hover:border-border transition-colors">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Code className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Building</span>
                </div>
                <p className="font-medium">Vira</p>
                <p className="text-sm text-muted-foreground">AI workflow automation</p>
            </div>
            <div className="p-4 rounded-xl border border-border/50 hover:border-border transition-colors">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Book className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Reading</span>
                </div>
                <p className="font-medium">Designing Data-Intensive Apps</p>
                <p className="text-sm text-muted-foreground">Martin Kleppmann</p>
            </div>
            <div className="p-4 rounded-xl border border-border/50 hover:border-border transition-colors">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Music className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Listening</span>
                </div>
                <p className="font-medium">Cigarettes After Sex</p>
                <p className="text-sm text-muted-foreground">Apocalypse</p>
            </div>
        </div>
    );
}
