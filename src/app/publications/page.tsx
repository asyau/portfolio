import Link from "next/link";

const publications = [
    {
        title: "Surface and Edge Defect Inspections on Metals Using Deep Learning and Optical Camera Data",
        authors: "A. Unal et al.",
        venue: "IEEE FiCloud 2025",
        location: "Istanbul, Turkey",
        date: "Aug. 2025",
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
        <div className="px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl">
                <h1 className="text-4xl font-bold mb-12">Publications</h1>

                <div className="space-y-6">
                    {publications.map((pub, i) => (
                        <div
                            key={i}
                            className="group p-6 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-300"
                        >
                            <h2 className="text-lg font-medium mb-2 group-hover:text-foreground">{pub.title}</h2>
                            <p className="text-sm text-muted-foreground mb-1">{pub.authors}</p>
                            <p className="text-sm text-muted-foreground">
                                {pub.venue}, {pub.location}, {pub.date}
                            </p>
                            {pub.link && (
                                <Link
                                    href={pub.link}
                                    target="_blank"
                                    className="inline-block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Read paper →
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
