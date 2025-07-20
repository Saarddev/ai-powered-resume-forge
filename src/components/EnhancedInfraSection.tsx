import React, { useEffect, useRef, useState } from 'react';
import {
    Brain,
    FileText,
    Sparkles,
    Search,
    LineChart,
    CheckCircle,
    Zap,
    Database,
    Code,
    Timer,
    Network,
    Cpu,
    Layers,
    Target,
    BarChart,
    Activity,
    GitBranch,
    Workflow
} from 'lucide-react';
import { PulseBeamsUi } from './Pulse';

const EnhancedInfrastructureSection = () => {
    const sectionRef = useRef(null);
    const [activeFlow, setActiveFlow] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const aiFlows = [
        { id: 1, name: 'Document Analysis', progress: 95, color: '#9b87f5' },
        { id: 2, name: 'Content Generation', progress: 88, color: '#8B5CF6' },
        { id: 3, name: 'ATS Optimization', progress: 92, color: '#7C3AED' },
        { id: 4, name: 'Quality Assurance', progress: 100, color: '#6D28D9' }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setActiveFlow(prev => (prev + 1) % aiFlows.length);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isVisible]);

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            className="py-24 relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/30"
        >
            {/* Animated neural network background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                    <defs>
                        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 40 80 Q 200 60 360 80 T 680 80"
                        stroke="url(#neuralGradient)"
                        strokeWidth="1"
                        fill="none"
                        className="animate-pulse"
                    />
                    <path
                        d="M 80 160 Q 240 140 400 160 T 720 160"
                        stroke="url(#neuralGradient)"
                        strokeWidth="1"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDelay: '0.7s' }}
                    />
                </svg>
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                {/* Enhanced Header */}
                <div className="flex flex-col items-center text-center space-y-6 mb-20">
                    <div className="inline-flex items-center rounded-full bg-resume-violet/10 px-3 py-1 text-sm text-resume-violet max-w-fit mb-2">
                        <Zap className="mr-1 h-3.5 w-3.5" />
                        <span>AI Technology</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-br from-resume-gray-dark to-resume-purple/90 bg-clip-text text-transparent">How Our AI Technology Works</h2>
                    <p className="max-w-[700px] text-resume-gray md:text-lg">
                        Our advanced AI infrastructure analyzes thousands of successful resumes and job descriptions to create the perfect match for your career goals
                    </p>
                </div>

                {/* AI Process Visualization */}
                <div className="grid gap-8 lg:grid-cols-2 items-center mb-20">
                    {/* Left side - Process cards */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: Search,
                                title: "Intelligent Document Analysis",
                                description: "Advanced NLP algorithms scan and understand job requirements, extracting key competencies and preferred qualifications.",
                                tech: "Natural Language Processing",
                                delay: 0
                            },
                            {
                                icon: Brain,
                                title: "Dynamic Content Generation",
                                description: "AI crafts personalized content that highlights your relevant experience using proven templates and successful patterns.",
                                tech: "Generative AI Models",
                                delay: 200
                            },
                            {
                                icon: Target,
                                title: "ATS Optimization Engine",
                                description: "Machine learning algorithms ensure your resume passes through applicant tracking systems with maximum score.",
                                tech: "Pattern Recognition",
                                delay: 400
                            },
                            {
                                icon: CheckCircle,
                                title: "Quality Assurance Protocol",
                                description: "Multi-layer validation checks formatting, consistency, and impact to guarantee professional standards.",
                                tech: "Automated QA Systems",
                                delay: 600
                            }
                        ].map((step, index) => (
                            <div
                                key={index}
                                className={`group p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${step.delay}ms` }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                        <step.icon className="h-6 w-6 text-primary" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground mb-3 leading-relaxed">
                                            {step.description}
                                        </p>
                                        <div className="inline-flex items-center px-3 py-1 bg-primary/5 rounded-full text-xs font-medium text-primary border border-primary/20">
                                            <Cpu className="mr-1.5 h-3 w-3" />
                                            {step.tech}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right side - Live AI visualization */}
                    {/* <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-resume-gray-light/30 to-white/80 backdrop-blur-sm rounded-xl overflow-hidden flex items-center justify-center p-6 border border-gray-100 shadow-inner">
                            <div className="grid grid-cols-2 gap-4 w-full max-w-[400px]">
                                <div className="space-y-4">
                                    <div className="h-24 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md transform hover:scale-105 transition-transform duration-300">
                                        <div className="h-4 w-1/2 bg-gradient-to-r from-resume-purple/30 to-resume-violet/30 rounded mb-2"></div>
                                        <div className="h-3 w-full bg-resume-gray-light rounded mb-1"></div>
                                        <div className="h-3 w-3/4 bg-resume-gray-light rounded"></div>
                                    </div>
                                    <div className="h-24 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md transform hover:scale-105 transition-transform duration-300">
                                        <LineChart className="h-6 w-6 text-resume-purple mb-2" />
                                        <div className="h-3 w-full bg-resume-gray-light rounded mb-1"></div>
                                        <div className="h-3 w-2/3 bg-resume-gray-light rounded"></div>
                                    </div>
                                </div>
                                <div className="h-[180px] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md flex flex-col transform hover:scale-105 transition-transform duration-300">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-resume-purple" />
                                        <div className="h-3 w-1/2 bg-resume-purple/50 rounded flex justify-start items-center"><span className='text-sm text-black'>
                                            Content
                                        </span></div>
                                    </div>
                                    <div className="space-y-1.5 flex-grow mt-3">
                                        <div className="h-2.5 w-full bg-resume-gray-light rounded"></div>
                                        <div className="h-2.5 w-3/4 bg-resume-gray-light rounded"></div>
                                        <div className="h-2.5 w-5/6 bg-resume-gray-light rounded"></div>
                                        <div className="h-2.5 w-2/3 bg-resume-gray-light rounded"></div>
                                    </div>
                                    <div className="h-6 w-full bg-gradient-to-r from-resume-purple/20 to-resume-violet/20 rounded-full mt-auto"></div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-resume-purple/10 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-100">
                            <Database className="h-5 w-5 text-resume-purple-dark" />
                        </div>

                        <div className="absolute -bottom-5 -right-5 w-10 h-10 rounded-full bg-resume-violet/10 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-500">
                            <Code className="h-5 w-5 text-resume-violet" />
                        </div>

                        <div className="absolute top-1/2 -left-8 w-8 h-8 rounded-full bg-resume-purple/15 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-300">
                            <Network className="h-4 w-4 text-resume-purple" />
                        </div>

                        <div className="absolute top-1/4 -right-8 w-8 h-8 rounded-full bg-resume-violet/15 backdrop-blur-md flex items-center justify-center shadow-md animate-float animate-delay-700">
                            <Cpu className="h-4 w-4 text-resume-violet" />
                        </div>
                    </div> */}

                    <PulseBeamsUi />
                </div>

                {/* Enhanced Technology Stack */}
                <div className="bg-gradient-to-br from-card/60 to-muted/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/50 shadow-2xl">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                                <Sparkles className="mr-2 h-4 w-4" />
                                <span>Cutting-Edge Technology</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                                Enterprise-Grade AI Infrastructure
                            </h3>

                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Built on a foundation of advanced machine learning models, our platform combines natural language processing,
                                predictive analytics, and automated optimization to deliver results that consistently outperform traditional approaches.
                            </p>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    { icon: Activity, label: "Real-time Processing", value: "< 3 seconds" },
                                    { icon: Layers, label: "ML Model Layers", value: "12+ Deep" },
                                    { icon: BarChart, label: "Success Rate", value: "94.7%" },
                                    { icon: Workflow, label: "Optimization Steps", value: "50+" }
                                ].map((metric, index) => (
                                    <div key={index} className="p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/30">
                                        <div className="flex items-center gap-3 mb-2">
                                            <metric.icon className="h-5 w-5 text-primary" />
                                            <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                                        </div>
                                        <div className="text-xl font-bold text-primary">{metric.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-video bg-gradient-to-br from-muted/20 to-card/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/30 shadow-inner">
                                <div className="p-6 h-full">
                                    {/* Code visualization */}
                                    <div className="space-y-3 font-mono text-xs">
                                        <div className="text-primary/70">// AI Resume Optimization Engine</div>
                                        <div className="text-muted-foreground">
                                            <span className="text-blue-400">const</span>{" "}
                                            <span className="text-yellow-400">optimizeResume</span> =
                                            <span className="text-blue-400"> async</span> (resumeData) =&gt; {"{"}
                                        </div>
                                        <div className="ml-4 space-y-1 text-muted-foreground">
                                            <div>
                                                <span className="text-blue-400">const</span> analysis =
                                                <span className="text-blue-400"> await</span> nlpEngine.analyze(jobDesc);
                                            </div>
                                            <div>
                                                <span className="text-blue-400">const</span> keywords =
                                                extractKeywords(analysis);
                                            </div>
                                            <div>
                                                <span className="text-blue-400">const</span> optimized =
                                                aiModel.enhance(resumeData, keywords);
                                            </div>
                                            <div>
                                                <span className="text-purple-400">return</span> atsValidator.verify(optimized);
                                            </div>
                                        </div>
                                        <div className="text-muted-foreground">{"}"}</div>
                                    </div>

                                    {/* Live metrics */}
                                    <div className="absolute bottom-4 right-4 space-y-2">
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-muted-foreground">Processing...</span>
                                        </div>
                                        <div className="bg-card/80 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium">
                                            ATS Score: <span className="text-primary">96%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30">
                                <Zap className="h-4 w-4 text-primary" />
                            </div>

                            <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30">
                                <GitBranch className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnhancedInfrastructureSection;