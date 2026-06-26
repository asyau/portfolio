import Link from "next/link";

const publications = [
    {
        title: "Surface and Edge Defect Inspections on Metals Using Deep Learning and Optical Camera Data",
        authors: "A. Unal et al.",
        venue: "IEEE FiCloud 2025",
        location: "Istanbul, Turkey",
        date: "Aug. 2025",
        link: "https://ieeexplore.ieee.org/document/11205212",
    },
    {
        title: "Real-Time Anomaly Detection in Industry 4.0 Using Asset Administration Shell",
        authors: "F. Kaya, A. Unal et al.",
        venue: "Springer LNCS 16066, MobiWIS 2025",
        location: "pp. 114–128",
        date: "Aug. 2025",
        link: "https://link.springer.com/chapter/10.1007/978-3-032-02060-4_8",
    },
];

export default function Publications() {
    return (
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold mb-12">Publications</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {publications.map((pub, i) => (
                    <div
                        key={i}
                        className="group p-6 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-300 flex flex-col"
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <span className="text-xs px-2 py-0.5 bg-accent-brand/10 text-accent-brand rounded font-medium shrink-0 mt-0.5">
                                {pub.venue.split(" ")[0]}
                            </span>
                            <span className="text-xs text-muted-foreground">{pub.date}</span>
                        </div>
                        <h2 className="text-base font-medium mb-2 group-hover:text-foreground leading-snug">{pub.title}</h2>
                        <p className="text-sm text-muted-foreground mb-1">{pub.authors}</p>
                        <p className="text-sm text-muted-foreground">
                            {pub.venue}, {pub.location}
                        </p>
                        {pub.link && (
                            <Link
                                href={pub.link}
                                target="_blank"
                                className="inline-flex items-center gap-1 mt-auto pt-4 text-sm text-accent-brand hover:opacity-75 transition-opacity font-medium"
                            >
                                Read paper →
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
