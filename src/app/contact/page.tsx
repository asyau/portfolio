import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export default function Contact() {
    return (
        <div className="px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl">
                <h1 className="text-4xl font-bold mb-4">Contact</h1>
                <p className="text-muted-foreground mb-12">
                    Have a question or want to work together? Feel free to reach out.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <ContactForm />
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-xl border border-border/50">
                            <div className="flex items-center gap-3 mb-2">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Email</span>
                            </div>
                            <a
                                href="mailto:asya.unal@ug.bilkent.edu.tr"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                asya.unal@ug.bilkent.edu.tr
                            </a>
                        </div>

                        <div className="p-6 rounded-xl border border-border/50">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">Location</span>
                            </div>
                            <p className="text-muted-foreground">
                                Hong Kong (Jan–May 2026)<br />
                                Ankara, Turkey (Home)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
