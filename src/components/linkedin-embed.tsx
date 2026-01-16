// LinkedIn Post Embed Component
// 
// HOW TO GET LINKEDIN EMBED CODE:
// 1. Go to the LinkedIn post you want to embed
// 2. Click the "..." menu in the top right of the post
// 3. Select "Embed this post"
// 4. Copy the iframe code
// 5. Extract the 'src' URL and use it in the embedUrl prop
//
// Example: For ACM Bilkent event posts, you can embed 2-3 highlight posts

"use client";

interface LinkedInEmbedProps {
    embedUrl: string;
    title?: string;
}

export function LinkedInEmbed({ embedUrl, title }: LinkedInEmbedProps) {
    return (
        <div className="rounded-xl overflow-hidden border border-border/50">
            {title && (
                <div className="px-4 py-2 bg-secondary/50 border-b border-border/50">
                    <p className="text-sm font-medium">{title}</p>
                </div>
            )}
            <iframe
                src={embedUrl}
                height="400"
                width="100%"
                frameBorder="0"
                allowFullScreen
                title="LinkedIn Post"
                className="bg-white"
            />
        </div>
    );
}

// Example usage with placeholder - replace with real embed URLs
export function ACMLinkedInPosts() {
    // Replace these with actual LinkedIn embed URLs from ACM Bilkent posts
    const posts = [
        {
            embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:EXAMPLE1",
            title: "ACM Bilkent Tech Talk",
        },
        {
            embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:EXAMPLE2",
            title: "Hackathon 2025",
        },
    ];

    return (
        <div className="grid md:grid-cols-2 gap-4">
            {posts.map((post, i) => (
                <LinkedInEmbed key={i} {...post} />
            ))}
        </div>
    );
}
