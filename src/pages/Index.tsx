
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InfrastructureSection from '@/components/InfrastructureSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import { Github, ExternalLink, ChevronUp, ArrowRight, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSEO } from '@/hooks/use-seo';
import EnhancedInfrastructureSection from '@/components/EnhancedInfraSection';
import DemoSection from '@/components/DemoSection';
import TestimonialsSection from '@/components/Testimonials';

const Index = () => {
  useSEO({
    title: 'Vireia AI: Beautiful Resume in minutes',
    description: 'Create professional, ATS-friendly resumes in minutes with Vireia AI.  resume builder with AI-powered optimization, job-specific templates, and instant feedback. Land your dream job today!',
    canonical: 'https://www.vireia.com/',
    keywords: 'resume builder, AI resume, ATS resume,  resume builder, professional resume, job application, resume maker, CV builder, AI-powered resume, job search tools, ATS-optimized, resume templates, online resume builder, career tools',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Vireia AI Resume Builder",
      "url": "https://www.vireia.com",
      "description": "AI-powered resume builder that creates ATS-optimized resumes",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "ATS-Optimized Templates",
        "AI-Powered Content Suggestions",
        "Real-time Resume Analysis",
        "Job-Specific Optimization",
        "Multiple Export Formats"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "2847"
      }
    }
  });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  // Check authentication status
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session);
    });

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsSignedIn(!!session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/dashboard');
    } else {
      navigate('/sign-up');
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* Resume's Ranked Announcement */}
        <section className="py-24 relative overflow-hidden">
          {/* Background with animated gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-resume-purple via-resume-violet to-resume-purple-dark opacity-95 z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_60%)] animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/15 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1.5s' }}></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                </div>
                <span className="text-white font-semibold text-sm tracking-wider uppercase">🚀 New Feature Launch</span>
              </div>

              {/* Main heading with gradient animation */}
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Introducing{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent animate-pulse">
                      Resume's Ranked
                    </span>
                    <div className="absolute -bottom-2  -right-16  w-96 h-1 bg-gradient-to-r from-white/50 to-transparent rounded-full"></div>
                  </span>
                </h2>
                <div className='flex justify-center items-center'>

                  <p className="text-xl md:text-2xl text-white/90 max-w-4xl justify-center items-center leading-relaxed font-light">
                    Join the ultimate competition where professionals worldwide compete for resume supremacy.
                    <span className="font-semibold text-white"> Climb the leaderboards</span> with AI-powered scoring and prove your worth.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button onClick={handleGetStarted} size="lg" variant="outline" className="border-resume-purple-dark group hover:bg-resume-purple-dark text-lg font-semibold text-resume-purple  hover:text-white shadow-lg shadow-black/15 transition-all duration-300 hover:shadow-xl hover:shadow-resume-purple/30">
                  Join the Competition
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant='outline'
                  className=" hover:bg-resume-purple-dark shadow-lg  border-resume-purple dark:text-white shadow-resume-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-resume-purple/30 group hover:text-white"
                  onClick={handleGetStarted}>
                  Create Your Resume
                  {/* <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /> */}
                </Button>
              </div>

              {/* Feature highlights with enhanced styling */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 w-full max-w-4xl">
                <div className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Competitive Ranking</h3>
                    <p className="text-white/80 text-sm">Battle for the top spot with real-time rankings</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2">AI-Powered Scoring</h3>
                    <p className="text-white/80 text-sm">Advanced algorithms evaluate every detail</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Live Leaderboards</h3>
                    <p className="text-white/80 text-sm">Watch your progress in real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <InfrastructureSection /> */}
        <EnhancedInfrastructureSection />
        <DemoSection />

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-resume-purple/5 via-white to-resume-violet/5 z-0"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 rounded-full border border-resume-purple/20">
                <span className="text-sm font-semibold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
                  ❤️ Built with Love
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-tl from-purple-200 via-resume-purple to-resume-violet bg-clip-text text-transparent">
                Open Source & Community Driven
              </h2>
              <p className="max-w-3xl text-resume-gray md:text-xl leading-relaxed">
                Join thousands of professionals using our completely <span className="font-semibold text-resume-purple">open source</span> platform,
                built by an <span className="font-semibold text-resume-violet">indie team</span> that believes in empowering careers through technology.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔓</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">100% Open Source</h3>
                <p className="text-sm text-gray-600">Transparent, secure, and community-driven development</p>
              </div>



              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Community First</h3>
                <p className="text-sm text-gray-600">Your feedback shapes our development roadmap</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Made with Love</h3>
                <p className="text-sm text-gray-600">Every feature crafted with care for your success</p>
              </div>
            </div>

            {/* Developer Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-resume-purple/20 shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-resume-purple via-resume-violet to-resume-purple-dark rounded-2xl flex items-center justify-center shadow-xl">
                      <Github className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-resume-gray-dark mb-2 flex items-center justify-center lg:justify-start gap-2">
                        Saarthak
                        <span className="text-lg">🏆</span>
                      </h3>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-resume-purple/10 to-resume-violet/10 text-resume-purple text-xs font-semibold rounded-full border border-resume-purple/20">
                          Full-Stack Developer
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                          AI Enthusiast
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                          Open Source Advocate
                        </span>
                      </div>
                    </div>

                    <p className="text-resume-gray mb-6 text-lg leading-relaxed">
                      Passionate about creating AI-powered tools that help people advance their careers.
                      Building Vireia AI with the mission to democratize professional success through technology.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <a
                        href="https://github.com/SaarD00"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-resume-purple to-resume-violet  hover:brightness-110 text-white rounded-xl transition-all  duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                      >
                        <Github className="h-5 w-5" />
                        View GitHub Profile
                        <ExternalLink className="h-4 w-4" />
                      </a>

                      <a
                        href="https://github.com/Saarddev/vireia-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-resume-purple/30 text-resume-purple hover:bg-resume-purple/5 rounded-xl transition-all duration-300 font-semibold"
                      >
                        <span className="text-lg">⭐</span>
                        Star on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-resume-purple/30 transition-all duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent mb-2">
                    100%
                  </div>
                  <p className="text-gray-600 font-medium">Free & Open Source</p>
                </div>

                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-resume-purple/30 transition-all duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent mb-2">
                    24/7
                  </div>
                  <p className="text-gray-600 font-medium">Available Worldwide</p>
                </div>

                <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-resume-purple/30 transition-all duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent mb-2">
                    ∞
                  </div>
                  <p className="text-gray-600 font-medium">Unlimited Usage</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <TestimonialsSection /> */}

        <PricingSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
