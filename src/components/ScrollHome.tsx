import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Play, Zap, Shield, Camera, BarChart3, CheckCircle, Upload, FileVideo } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoUploader from './VideoUploader';
import Hero from './Hero';

gsap.registerPlugin(ScrollTrigger);

interface ScrollHomeProps {
  onUploadComplete: () => void;
  isProcessing: boolean;
}

export default function ScrollHome({ onUploadComplete, isProcessing }: ScrollHomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const uploaderRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(smoothProgress, [0, 0.33], [0, -200]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.33], [1, 0]);
  const uploaderY = useTransform(smoothProgress, [0.2, 0.66], [100, -100]);
  const featuresY = useTransform(smoothProgress, [0.5, 1], [100, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Upload section parallax
      gsap.fromTo('.upload-card',
        { y: 150, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: uploaderRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Features stagger animation
      gsap.fromTo('.feature-card',
        { y: 100, opacity: 0, rotateX: 45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax background elements
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { 
      icon: Camera, 
      title: 'AI-Powered Detection', 
      description: 'Advanced computer vision for real-time violation detection',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Zap, 
      title: 'Instant Processing', 
      description: 'Process video footage in real-time with 99.9% accuracy',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Shield, 
      title: 'Secure Evidence', 
      description: 'Tamper-proof evidence collection and storage',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: BarChart3, 
      title: 'Smart Analytics', 
      description: 'Comprehensive reporting and trend analysis',
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Parallax Background */}
      <div className="parallax-bg fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900/30 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-blue-950 to-blue-950" />
      </div>

      {/* Section 1: Hero */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="hero-title text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Smart Traffic
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Controller
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Revolutionary AI-powered traffic enforcement system that processes video footage to detect 
              speeding violations and license plates with unprecedented accuracy and speed.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16">
            {[
              { value: '99.9%', label: 'Accuracy Rate' },
              { value: '24/7', label: 'Monitoring' },
              { value: '<1s', label: 'Processing Time' },
              { value: '500+', label: 'Cities Deployed' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm md:text-base uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-blue-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Section 2: Video Upload */}
      <motion.section 
        ref={uploaderRef}
        style={{ y: uploaderY }}
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="upload-card w-full max-w-6xl mx-auto px-4">
          <VideoUploader 
            onUploadComplete={onUploadComplete}
            isProcessing={isProcessing}
          />
        </div>
      </motion.section>

      {/* Section 3: Features */}
      <motion.section 
        ref={featuresRef}
        style={{ y: featuresY }}
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Advanced AI technology meets intuitive design for the ultimate traffic enforcement solution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="feature-card group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl blur-xl group-hover:blur-lg transition-all" />
                  <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:border-blue-500/30 transition-all group-hover:transform group-hover:-translate-y-4 group-hover:scale-105">
                    <div className="mb-6">
                      <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
}