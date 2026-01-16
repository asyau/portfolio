"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        // Simulate sending
        setTimeout(() => setStatus("sent"), 1000);
    };

    if (status === "sent") {
        return (
            <div className="p-8 rounded-xl border border-border/50 text-center space-y-2">
                <CheckCircle className="h-8 w-8 mx-auto text-green-500" />
                <p className="font-medium">Message sent!</p>
                <p className="text-sm text-muted-foreground">I&apos;ll get back to you soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
                />
            </div>
            <input
                type="text"
                placeholder="Subject"
                required
                className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors"
            />
            <textarea
                placeholder="Message"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors resize-none"
            />
            <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full"
            >
                {status === "sending" ? (
                    "Sending..."
                ) : (
                    <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>
        </form>
    );
}
