
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Target, Shield, Search, Code, Database, Zap, Star, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(0);
  
  const texts = ['Bug Hunting', 'Reconnaissance', 'Vulnerability Scanning', 'Security Testing'];
  
  const companies = [
    { name: 'CyberSec Corp', logo: '🛡️' },
    { name: 'HackDefense', logo: '🔒' },
    { name: 'SecureNet', logo: '🌐' },
    { name: 'VulnCheck', logo: '🔍' },
    { name: 'PenTest Pro', logo: '⚡' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Advanced Vulnerability Scanning',
      description: 'Automated security scanning with Nuclei templates and custom payloads for comprehensive vulnerability detection.',
      color: 'sniper-red'
    },
    {
      icon: Search,
      title: 'Deep Reconnaissance',
      description: 'Comprehensive subdomain enumeration, port scanning, and information gathering from multiple sources.',
      color: 'sniper-green'
    },
    {
      icon: Code,
      title: 'JavaScript Analysis',
      description: 'Deep JavaScript reconnaissance, endpoint discovery, and secret detection in client-side code.',
      color: 'sniper-red'
    },
    {
      icon: Database,
      title: 'Repository Secret Scanning',
      description: 'Automated scanning of online repositories for exposed API keys, credentials, and sensitive information.',
      color: 'sniper-green'
    },
    {
      icon: Zap,
      title: 'Automated Bug Hunting',
      description: 'Streamlined bug hunting workflows with automated tool chaining and intelligent result correlation.',
      color: 'sniper-red'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share findings, collaborate on assessments, and manage team workflows in a centralized platform.',
      color: 'sniper-green'
    }
  ];

  const stats = [
    { number: '3+', label: 'Vulnerabilities Found' },
    { number: '4+', label: 'Security Researchers' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCompany((prev) => (prev + 1) % companies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [companies.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="min-h-screen cyber-grid flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-2 h-2 bg-sniper-red rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-sniper-green rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-sniper-red rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-sniper-green rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="relative">
                <Target className="h-16 w-16 md:h-24 md:w-24 text-sniper-red glow-red" />
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-sniper-red/30 rounded-full border-t-sniper-red"></div>
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6">
              <span className="text-sniper-red">SNIPER</span>
            </h1>
            
            <div className="text-xl sm:text-2xl md:text-4xl font-semibold mb-6 md:mb-8 h-12 md:h-16 flex items-center justify-center">
              <span className="text-foreground">Advanced </span>
              <span className="text-sniper-green ml-2 min-w-[150px] sm:min-w-[200px] md:min-w-[250px] text-left">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto px-4">
              Automate your security reconnaissance with powerful tools for bug hunting, 
              subdomain enumeration, JavaScript analysis, and vulnerability scanning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16 px-4">
              <Link to="/get-started">
                <Button size="lg" className="bg-sniper-red hover:bg-sniper-red/90 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/tools">
                <Button variant="outline" size="lg" className="border-sniper-green text-sniper-green hover:bg-sniper-green hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                  Explore Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-sniper-red">Advanced</span> Security Tools
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive security testing platform built for ethical hackers and security professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`bg-card border-${feature.color}/30 hover:border-${feature.color}/60 transition-all duration-500 group hover:scale-105 hover:shadow-lg`}>
                <CardContent className="p-4 md:p-6">
                  <feature.icon className={`h-10 w-10 md:h-12 md:w-12 text-${feature.color} mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-sniper-red mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="py-16 md:py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="text-sniper-green">Security Teams</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Leading security companies rely on SNIPER for their reconnaissance needs
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 md:space-x-4 p-4 md:p-6 rounded-lg border transition-all duration-500 hover:scale-105 ${
                    index === currentCompany 
                      ? 'border-sniper-green bg-sniper-green/10 scale-110 shadow-lg' 
                      : 'border-muted/30 opacity-60'
                  }`}
                >
                  <span className="text-2xl md:text-4xl">{company.logo}</span>
                  <span className="text-base md:text-xl font-semibold hidden sm:block">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Developer Section */}
      <div className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the <span className="text-sniper-red">Developer</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-card border-sniper-red/30 hover:border-sniper-red/60 transition-all duration-500 hover:shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div className="text-center lg:text-left order-2 lg:order-1">
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto lg:mx-0 mb-4 md:mb-6 bg-gradient-to-r from-sniper-red to-sniper-green rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl md:text-6xl font-bold text-white">K</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Kushal</h3>
                    <p className="text-lg md:text-xl text-sniper-green mb-4">Full Stack Developer & Ethical Hacker</p>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 md:h-5 md:w-5 text-sniper-red" />
                        <span className="text-xs md:text-sm">Security Expert</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Code className="h-4 w-4 md:h-5 md:w-5 text-sniper-green" />
                        <span className="text-xs md:text-sm">Full Stack Dev</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <p className="text-sm md:text-base text-muted-foreground mb-4">
                      Passionate about cybersecurity and full-stack development, Kushal combines deep technical expertise 
                      with ethical hacking skills to create powerful security tools.
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground mb-6">
                      With years of experience in penetration testing, vulnerability research, and web development, 
                      he built SNIPER to democratize advanced security testing capabilities for the ethical hacking community.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-sniper-red block mb-2">Specialties:</strong>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Web Application Security</li>
                          <li>• Automated Reconnaissance</li>
                          <li>• Full Stack Development</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-sniper-green block mb-2">Tools:</strong>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• React, Node.js, Python</li>
                          <li>• Nuclei, Subfinder, FFuF</li>
                          <li>• Docker, Linux, Cloud</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-gradient-to-r from-sniper-red/10 to-sniper-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Level Up Your <span className="text-sniper-red">Security Testing</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto">
            Join thousands of security researchers using SNIPER to automate their reconnaissance and vulnerability discovery workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link to="/signup">
              <Button size="lg" className="bg-sniper-red hover:bg-sniper-red/90 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/tools">
              <Button variant="outline" size="lg" className="border-sniper-green text-sniper-green hover:bg-sniper-green hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
