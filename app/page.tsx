"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Force immediate theme application
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "testimonials", "pricing", "faq"];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    // Force immediate theme application
    document.documentElement.classList.toggle("dark");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const features = [
    {
      title: "Skill Matching",
      description:
        "Our intelligent matching system connects you with the perfect learning partner based on your interests.",
      icon: <Users className="size-5 text-white" />,
    },
    {
      title: "Virtual Classrooms",
      description:
        "Connect through integrated video calls and screen sharing for effective remote learning sessions.",
      icon: <Layers className="size-5 text-white" />,
    },
    {
      title: "Skill Tracking",
      description:
        "Track your progress as you learn and see the impact you've made as a teacher.",
      icon: <BarChart className="size-5 text-white" />,
    },
    {
      title: "Community Ratings",
      description:
        "Build your reputation through community feedback and recognition for your teaching.",
      icon: <Star className="size-5 text-white" />,
    },
    {
      title: "Resource Sharing",
      description:
        "Share learning materials, guides, and resources with your matches to enhance the learning experience.",
      icon: <Zap className="size-5 text-white" />,
    },
    {
      title: "Scheduling Tools",
      description:
        "Easily coordinate and schedule learning sessions that work with everyone's availability.",
      icon: <Shield className="size-5 text-white" />,
    },
  ];

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white">
              SM
            </div>
            <span>Skill-Match</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#home"
              className={`text-sm font-medium transition-colors hover:text-foreground focus:text-foreground active:text-foreground ${
                activeSection === "home"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveSection("home")}
            >
              Home
            </Link>
            <Link
              href="#features"
              className={`text-sm font-medium transition-colors hover:text-foreground focus:text-foreground active:text-foreground ${
                activeSection === "features"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveSection("features")}
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className={`text-sm font-medium transition-colors hover:text-foreground focus:text-foreground active:text-foreground ${
                activeSection === "testimonials"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveSection("testimonials")}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className={`text-sm font-medium transition-colors hover:text-foreground focus:text-foreground active:text-foreground ${
                activeSection === "pricing"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveSection("pricing")}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className={`text-sm font-medium transition-colors hover:text-foreground focus:text-foreground active:text-foreground ${
                activeSection === "faq"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
              onClick={() => setActiveSection("faq")}
            >
              FAQ
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-[18px]" />
              ) : (
                <Moon className="size-[18px]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:text-foreground active:text-foreground"
            >
              Log in
            </Link>
            <Button className="rounded-full text-white">
              Get Started
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {mounted && theme === "dark" ? (
                <Sun className="size-[18px]" />
              ) : (
                <Moon className="size-[18px]" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container py-4 flex flex-col gap-4">
              <Link
                href="#home"
                className={`py-2 text-sm font-medium ${
                  activeSection === "home"
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
                onClick={() => {
                  setActiveSection("home");
                  setMobileMenuOpen(false);
                }}
              >
                Home
              </Link>
              <Link
                href="#features"
                className={`py-2 text-sm font-medium ${
                  activeSection === "features"
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
                onClick={() => {
                  setActiveSection("features");
                  setMobileMenuOpen(false);
                }}
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className={`py-2 text-sm font-medium ${
                  activeSection === "testimonials"
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
                onClick={() => {
                  setActiveSection("testimonials");
                  setMobileMenuOpen(false);
                }}
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className={`py-2 text-sm font-medium ${
                  activeSection === "pricing"
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
                onClick={() => {
                  setActiveSection("pricing");
                  setMobileMenuOpen(false);
                }}
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className={`py-2 text-sm font-medium ${
                  activeSection === "faq"
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
                onClick={() => {
                  setActiveSection("faq");
                  setMobileMenuOpen(false);
                }}
              >
                FAQ
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link
                  href="#"
                  className="py-2 text-sm font-medium text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Button className="rounded-full text-white">
                  Get Started
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="w-full py-20 md:py-32 lg:py-40 overflow-hidden"
        >
          <div className="container px-4 md:px-6 relative">
            {/* Hero Section Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80"></div>

              {/* Animated gradient orbs */}
              <div className="absolute top-0 left-0 w-[80vw] h-[80vh] bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-[120px] opacity-50 animate-blob"></div>
              <div className="absolute bottom-0 right-0 w-[70vw] h-[70vh] bg-gradient-to-l from-indigo-500/20 to-pink-500/20 rounded-full blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-gradient-to-t from-purple-500/10 to-violet-400/10 rounded-full blur-[120px] opacity-30 animate-blob animation-delay-4000"></div>

              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Launching Soon
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Learn & Teach in Our Skill-Sharing Community
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with people who want to learn what you know, and teach
                what you want to learn. No money involved—just a community of
                learners and mentors helping each other grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base text-white"
                >
                  Join Community
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base"
                >
                  Explore Skills
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Teach & Learn</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="size-4 text-primary" />
                  <span>Community-driven</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20">
                <Image
                  src="https://cdn.dribbble.com/userupload/12302729/file/original-fa372845e394ee85bebe0389b9d86871.png?resize=1504x1128&vertical=center"
                  width={1280}
                  height={720}
                  alt="SaaSify dashboard"
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl opacity-70"></div>
              <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-3xl opacity-70"></div>
            </motion.div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="w-full py-12 border-y bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Join thousands of members already sharing skills
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image
                    key={i}
                    src={`/placeholder-logo.svg`}
                    alt={`Company logo ${i}`}
                    width={120}
                    height={60}
                    className="h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Everything You Need to Succeed
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Our comprehensive platform provides all the tools you need to
                streamline your workflow, boost productivity, and achieve your
                goals.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-10 rounded-full bg-primary flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background/90"></div>

            {/* Subtle shapes */}
            <div className="absolute top-20 right-20 w-[40vw] h-[40vh] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-20 left-20 w-[30vw] h-[30vh] bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full blur-[60px]"></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Simple Process, Powerful Results
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Get started in minutes and see the difference our platform can
                make for your business.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Create Profile",
                  description:
                    "Sign up and list the skills you want to learn and the skills you can teach others.",
                },
                {
                  step: "02",
                  title: "Find Matches",
                  description:
                    "Our system connects you with people who complement your skill exchange preferences.",
                },
                {
                  step: "03",
                  title: "Share & Learn",
                  description:
                    "Schedule sessions, connect virtually or in-person, and start your skill-sharing journey.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Loved by Teams Worldwide
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Don't just take our word for it. See what our customers have to
                say about their experience.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "Skill-Match connected me with an amazing coding mentor. I was able to learn Python basics in just a few weeks through our weekly sessions.",
                  author: "Sarah Johnson",
                  role: "Learned Python Programming",
                  rating: 5,
                },
                {
                  quote:
                    "I've always wanted to share my photography knowledge but didn't know how. Skill-Match made it easy to find eager students and give back to the community.",
                  author: "Michael Chen",
                  role: "Photography Teacher",
                  rating: 5,
                },
                {
                  quote:
                    "The platform made it simple to find someone to practice Spanish with. We meet weekly and take turns helping each other with conversation skills.",
                  author: "Emily Rodriguez",
                  role: "Language Exchange Participant",
                  rating: 5,
                },
                {
                  quote:
                    "I taught guitar basics and learned home cooking in return. The value of this exchange has been incredible - much more meaningful than paid lessons.",
                  author: "David Kim",
                  role: "Music Teacher & Cooking Student",
                  rating: 5,
                },
                {
                  quote:
                    "As a retired teacher, I wanted to keep sharing knowledge. Skill-Match connected me with young professionals wanting to learn public speaking.",
                  author: "Lisa Patel",
                  role: "Public Speaking Coach",
                  rating: 5,
                },
                {
                  quote:
                    "I was skeptical at first, but the community is so supportive. I've learned graphic design and taught fitness in return - a perfect skill exchange!",
                  author: "James Wilson",
                  role: "Fitness Instructor & Design Student",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex mb-4">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star
                              key={j}
                              className="size-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                      </div>
                      <p className="text-lg mb-6 flex-grow">
                        {testimonial.quote}
                      </p>
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                        <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section
          id="pricing"
          className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-muted/30"></div>

            {/* Floating elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[60px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[80px]"></div>

            {/* Dot pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                Join Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Be Part of Our Community
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Skill-Match is 100% free and community-driven. Join thousands of
                members already sharing their knowledge and learning new skills.
              </p>
            </motion.div>

            <div className="mx-auto max-w-5xl">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                {[
                  {
                    name: "Learners",
                    description:
                      "Perfect for anyone looking to learn new skills.",
                    features: [
                      "Access to skilled teachers",
                      "Track your learning progress",
                      "Join skill-based groups",
                      "Request specific skills",
                      "Rate your learning experience",
                    ],
                    cta: "Start Learning",
                  },
                  {
                    name: "Teachers",
                    description: "Share your knowledge and help others grow.",
                    features: [
                      "Create teaching profiles",
                      "Schedule teaching sessions",
                      "Share learning resources",
                      "Build your teaching reputation",
                      "Connect with eager students",
                    ],
                    cta: "Start Teaching",
                    popular: true,
                  },
                  {
                    name: "Skill Exchangers",
                    description: "Both teach and learn in our community.",
                    features: [
                      "Balanced skill exchange",
                      "Teach what you know",
                      "Learn what you want",
                      "Build meaningful connections",
                      "Participate in community events",
                      "Access exclusive resources",
                    ],
                    cta: "Start Exchanging",
                  },
                ].map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card
                      className={`relative overflow-hidden h-full ${
                        plan.popular
                          ? "border-primary shadow-lg"
                          : "border-border/40 shadow-md"
                      } bg-gradient-to-b from-background to-muted/10 backdrop-blur`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="flex items-baseline mt-4">
                          <span className="text-4xl font-bold">Free</span>
                        </div>
                        <p className="text-muted-foreground mt-2">
                          {plan.description}
                        </p>
                        <ul className="space-y-3 my-6 flex-grow">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <Check className="mr-2 size-4 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full mt-auto rounded-full ${
                            plan.popular
                              ? "bg-primary hover:bg-primary/90 text-white"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                variant="secondary"
              >
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Find answers to common questions about our platform.
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "Is Skill-Match really 100% free?",
                    answer:
                      "Yes, Skill-Match is completely free to use. Our platform is built on the principle of community exchange and mutual growth. We don't charge any fees for connecting learners and teachers.",
                  },
                  {
                    question: "How does the skill matching work?",
                    answer:
                      "When you create your profile, you'll list skills you want to learn and skills you can teach. Our matching algorithm then connects you with compatible community members based on complementary skills, availability, and location preferences.",
                  },
                  {
                    question: "Do I have to both teach and learn?",
                    answer:
                      "No, you can choose to only teach or only learn if you prefer. However, the spirit of Skill-Match is about mutual exchange, and many members find value in both sharing their knowledge and learning from others.",
                  },
                  {
                    question: "How are sessions conducted?",
                    answer:
                      "Sessions can be conducted however works best for you and your match. We provide integrated video conferencing tools for virtual sessions, but you can also arrange in-person meetings if both parties are comfortable and in the same area.",
                  },
                  {
                    question: "Is there a verification process for teachers?",
                    answer:
                      "We use a community rating system where learners can provide feedback after sessions. This helps build trust and allows members to make informed decisions about potential matches. We also have basic profile verification steps during signup.",
                  },
                  {
                    question: "What if I have a negative experience?",
                    answer:
                      "We take community safety and quality seriously. If you have any issues, you can report them through our platform, and our community moderators will review the situation. We have guidelines all members agree to follow.",
                  },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-border/40 py-2"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80"></div>

            {/* Animated shapes */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-white/5 rounded-full blur-3xl opacity-50 rotate-12"></div>

            {/* Subtle pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Ready to Start Your Skill-Sharing Journey?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Join our community of learners and teachers who are sharing
                skills, building connections, and growing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base"
                >
                  Join Community
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
              <p className="text-sm text-white/80 mt-4">
                100% free. No payment required. Community-driven learning.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white">
                  SM
                </div>
                <span>Skill-Match</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect with people who want to learn what you know, and teach
                what you want to learn. A community-driven platform for skill
                sharing and growth.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Skills
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Skill-Match. All rights
              reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
