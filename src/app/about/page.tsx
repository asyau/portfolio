export default function About() {
    return (
        <div className="px-6 md:px-12 lg:px-24 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl">
                <h1 className="text-4xl font-bold mb-12">About</h1>

                <section className="space-y-4 mb-16">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        I&apos;m a Computer Science student at Bilkent University with a focus on
                        AI/ML and full-stack development. Currently on exchange at City University
                        of Hong Kong, studying computer vision, AI, and data science.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        I enjoy building systems that leverage LLMs and machine learning to solve
                        real-world problems. My work spans from deep learning for industrial
                        inspection to AI-powered workflow automation.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-8">Education</h2>
                    <div className="space-y-8">
                        <div className="group p-6 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                    <h3 className="text-lg font-medium">Bilkent University</h3>
                                    <p className="text-muted-foreground">B.S. in Computer Science</p>
                                </div>
                                <span className="text-sm text-muted-foreground">2023 – 2027</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                                GPA: 3.68/4.00 · Merit Scholarship (60%)
                            </p>
                        </div>
                        <div className="group p-6 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                    <h3 className="text-lg font-medium">City University of Hong Kong</h3>
                                    <p className="text-muted-foreground">Exchange Program</p>
                                </div>
                                <span className="text-sm text-muted-foreground">Jan – May 2026</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-8">Skills</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-300">
                            <h3 className="font-medium mb-3">Languages</h3>
                            <p className="text-sm text-muted-foreground">
                                Python, Java, C++, TypeScript, Dart
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-300">
                            <h3 className="font-medium mb-3">Technologies</h3>
                            <p className="text-sm text-muted-foreground">
                                React, Vue.js, Spring Boot, FastAPI, Django, PostgreSQL, Docker
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-border/50 hover:border-border hover:bg-secondary/30 transition-all duration-300">
                            <h3 className="font-medium mb-3">AI/ML</h3>
                            <p className="text-sm text-muted-foreground">
                                LLM Agents, RAG, LangGraph, LangChain, HuggingFace, BERT
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
