"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    BarChart,
    LineChart,
    Activity,
    ArrowRight,
    Brain,
    Calendar,
    FileText,
    Sparkles,
    TrendingUp,
    ChevronRight,
} from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

const HeroContainer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        setIsVisible(true);
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
            {/* Animated particles */}
            <Particles />

            {/* Glowing orb */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
            <div
                className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-teal-500 rounded-full filter blur-[100px] opacity-20 animate-pulse"
                style={{ animationDelay: "1s" }}
            ></div>

            <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8 lg:items-center">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVisible ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-6 z-10"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center rounded-full bg-purple-900/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-purple-100 ring-1 ring-inset ring-purple-700 mb-6"
                        >
                            <Sparkles className="mr-2 h-3.5 w-3.5 text-purple-300" />
                            <span className="mr-2">AI-Powered Mental Health Tracking</span>
                            <span className="flex h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-5xl font-bold tracking-tight text-white sm:text-6xl"
                        >
                            <span className="block">
                                Track Your{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                                    Mental Journey
                                </span>
                            </span>
                            <span className="block mt-1">With AI Insights</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-6 text-xl text-slate-300"
                        >
                            Our advanced AI analyzes your daily journal entries to track depression
                            levels over time, providing personalized insights and visualizations to
                            help you understand your mental health journey.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-8 flex flex-wrap gap-4"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white border-0 shadow-lg shadow-teal-500/20 transition-all duration-300 hover:shadow-teal-500/40"
                            >
                                Start Your Assessment
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-12 grid grid-cols-2 gap-4"
                        >
                            {[
                                {
                                    icon: <Brain className="h-5 w-5 text-teal-400" />,
                                    title: "AI Analysis",
                                    description: "ML-powered mood detection from journal entries",
                                },
                                {
                                    icon: <Calendar className="h-5 w-5 text-purple-400" />,
                                    title: "Daily Tracking",
                                    description: "Monitor your mental health progress over time",
                                },
                                {
                                    icon: <FileText className="h-5 w-5 text-teal-400" />,
                                    title: "Journal Entries",
                                    description: "Express yourself through guided daily journaling",
                                },
                                {
                                    icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
                                    title: "Visual Insights",
                                    description: "Beautiful charts to visualize your journey",
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                                    className="flex items-start space-x-3"
                                >
                                    <div className="mt-0.5 rounded-full bg-slate-800/60 p-2 ring-1 ring-slate-700">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white">{feature.title}</h3>
                                        <p className="mt-1 text-sm text-slate-400">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="lg:col-span-6 relative z-10"
                    >
                        <div className="relative">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: isVisible ? 0 : 20, opacity: isVisible ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="relative z-20"
                            >
                                <Card className="p-6 shadow-xl bg-slate-800/70 backdrop-blur-md border-slate-700 rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10"></div>
                                    <div className="relative">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-lg font-medium text-white">
                                                Depression Score Tracking
                                            </h3>
                                            <Activity className="h-5 w-5 text-teal-400" />
                                        </div>
                                        <div className="space-y-8">
                                            <div className="h-[220px] w-full">
                                                <AdvancedChartAnimation isVisible={isVisible} />
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div className="bg-slate-800/60 rounded-lg p-3 ring-1 ring-slate-700">
                                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                                                        94%
                                                    </div>
                                                    <div className="mt-1 text-slate-400 text-sm">
                                                        Accuracy
                                                    </div>
                                                </div>
                                                <div className="bg-slate-800/60 rounded-lg p-3 ring-1 ring-slate-700">
                                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
                                                        3 min
                                                    </div>
                                                    <div className="mt-1 text-slate-400 text-sm">
                                                        Daily Check
                                                    </div>
                                                </div>
                                                <div className="bg-slate-800/60 rounded-lg p-3 ring-1 ring-slate-700">
                                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                                                        24/7
                                                    </div>
                                                    <div className="mt-1 text-slate-400 text-sm">
                                                        Access
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ y: 40, opacity: 0, x: -20 }}
                                animate={{
                                    y: isVisible ? 0 : 40,
                                    opacity: isVisible ? 1 : 0,
                                    x: isVisible ? 0 : -20,
                                }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className="absolute -bottom-6 -left-6 z-10"
                            >
                                <Card className="p-4 shadow-xl bg-slate-800/80 backdrop-blur-md border-slate-700 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="rounded-full bg-teal-900/60 p-2 ring-1 ring-teal-700">
                                            <BarChart className="h-4 w-4 text-teal-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">
                                                Weekly Report
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                Personalized Analysis
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ y: -20, opacity: 0, x: 20 }}
                                animate={{
                                    y: isVisible ? 0 : -20,
                                    opacity: isVisible ? 1 : 0,
                                    x: isVisible ? 0 : 20,
                                }}
                                transition={{ duration: 0.5, delay: 1.1 }}
                                className="absolute -top-6 -right-6 z-10"
                            >
                                <Card className="p-4 shadow-xl bg-slate-800/80 backdrop-blur-md border-slate-700 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="rounded-full bg-purple-900/60 p-2 ring-1 ring-purple-700">
                                            <LineChart className="h-4 w-4 text-purple-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">
                                                Trend Analysis
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                Track Your Progress
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 1.3 }}
                                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-0"
                            >
                                <div className="w-64 h-64 rounded-full bg-purple-600/20 filter blur-3xl"></div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: isVisible ? 0 : 40, opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 1.3 }}
                            className="mt-12"
                        >
                            <Card className="p-5 shadow-xl bg-slate-800/70 backdrop-blur-md border-slate-700 rounded-xl">
                                <h3 className="text-lg font-medium text-white mb-3">
                                    How It Works
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        {
                                            step: 1,
                                            title: "Initial Assessment",
                                            desc: "Complete a survey to establish your baseline depression score",
                                        },
                                        {
                                            step: 2,
                                            title: "Daily Journaling",
                                            desc: "Write about your day and feelings in a secure, private journal",
                                        },
                                        {
                                            step: 3,
                                            title: "AI Analysis",
                                            desc: "Our ML model analyzes your entries to calculate depression scores",
                                        },
                                        {
                                            step: 4,
                                            title: "Visual Tracking",
                                            desc: "View beautiful charts showing your mental health journey",
                                        },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{
                                                x: isVisible ? 0 : -20,
                                                opacity: isVisible ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.4, delay: 1.4 + i * 0.1 }}
                                            className="flex items-center p-2 rounded-lg hover:bg-slate-700/40 transition-colors"
                                        >
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 text-white font-medium mr-3">
                                                {item.step}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-medium">
                                                    {item.title}
                                                </h4>
                                                <p className="text-slate-400 text-sm">
                                                    {item.desc}
                                                </p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-slate-500" />
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

function AdvancedChartAnimation({ isVisible }: { isVisible: boolean }) {
    return (
        <div className="relative h-full w-full">
            {/* Background grid */}
            <div className="absolute inset-0 grid grid-cols-7 gap-1">
                {Array(7)
                    .fill(0)
                    .map((_, i) => (
                        <motion.div
                            key={`grid-${i}`}
                            className="h-full border-r border-slate-700/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                        />
                    ))}
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <motion.div
                            key={`grid-h-${i}`}
                            className="absolute w-full h-px bg-slate-700/30"
                            style={{ top: `${20 + i * 20}%` }}
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0, scaleX: isVisible ? 1 : 0 }}
                            transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                        />
                    ))}
            </div>

            {/* Bar chart */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const height = [65, 40, 55, 30, 70, 50, 60][i];
                const color =
                    height > 60
                        ? "from-red-500 to-red-400"
                        : height > 45
                        ? "from-yellow-500 to-yellow-400"
                        : "from-teal-500 to-teal-400";

                return (
                    <motion.div
                        key={i}
                        className={`absolute bottom-0 bg-gradient-to-t ${color} rounded-t-sm w-[10%]`}
                        style={{ left: `${i * 15}%`, height: "0%" }}
                        animate={{ height: isVisible ? `${height}%` : "0%" }}
                        transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                    >
                        <motion.div
                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 0.3, delay: 1.5 + i * 0.1 }}
                        >
                            <span
                                className={`${
                                    height > 60
                                        ? "text-red-400"
                                        : height > 45
                                        ? "text-yellow-400"
                                        : "text-teal-400"
                                }`}
                            >
                                {height}
                            </span>
                        </motion.div>
                    </motion.div>
                );
            })}

            {/* Line chart */}
            <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
            >
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(45, 212, 191, 0.8)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.8)" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(45, 212, 191, 0.4)" />
                        <stop offset="100%" stopColor="rgba(45, 212, 191, 0)" />
                    </linearGradient>
                </defs>

                <motion.path
                    d="M0,35 C10,40 20,60 30,45 C40,30 50,50 60,30 C70,10 80,30 90,40 C100,50 110,30 120,25"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isVisible ? 1 : 0 }}
                    transition={{ duration: 1.5, delay: 1.7 }}
                />

                <motion.path
                    d="M0,35 C10,40 20,60 30,45 C40,30 50,50 60,30 C70,10 80,30 90,40 C100,50 110,30 120,25 L120,100 L0,100 Z"
                    fill="url(#areaGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 0.5 : 0 }}
                    transition={{ duration: 1, delay: 2 }}
                />

                {/* Data points */}
                {[
                    { x: 0, y: 35 },
                    { x: 30, y: 45 },
                    { x: 60, y: 30 },
                    { x: 90, y: 40 },
                ].map((point, i) => (
                    <motion.circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="3"
                        fill="#fff"
                        stroke="rgba(45, 212, 191, 1)"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
                        transition={{ duration: 0.4, delay: 2 + i * 0.1 }}
                    />
                ))}
            </motion.svg>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-1 transform translate-y-6">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                    <motion.div
                        key={i}
                        className="text-[10px] text-slate-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVisible ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 1.8 + i * 0.05 }}
                    >
                        {day}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function Particles() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {Array(20)
                .fill(0)
                .map((_, i) => {
                    const size = Math.random() * 3 + 1;
                    const initialX = Math.random() * 100;
                    const initialY = Math.random() * 100;
                    const duration = Math.random() * 20 + 10;
                    const delay = Math.random() * 5;

                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white opacity-30"
                            style={{
                                width: size,
                                height: size,
                                left: `${initialX}%`,
                                top: `${initialY}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration,
                                delay,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
        </div>
    );
}

export default HeroContainer;
