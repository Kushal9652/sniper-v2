
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Shield, Search, Code, Database, Zap, Brain, Users, Award, ChevronRight, Play, Rocket, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  const tools = [
    {
      icon: Shield,
      name: 'Nuclei Scanner',
      description: 'Advanced vulnerability scanning with 5000+ templates',
      status: 'Active'
    },
    {
      icon: Search,
      name: 'Subdomain Finder',
      description: 'Comprehensive subdomain enumeration using multiple sources',
      status: 'Active'
    },
    {
      icon: Code,
      name: 'JS Reconnaissance',
      description: 'Deep JavaScript analysis and endpoint discovery',
      status: 'Active'
    },
    {
      icon: Database,
      name: 'Repository Scanner',
      description: 'Automated secret detection in online repositories',
      status: 'Active'
    },
    {
      icon: Zap,
      name: 'Port Scanner',
      description: 'High-speed port scanning with service detection',
      status: 'Active'
    },
    {
      icon: Brain,
      name: 'AI Vulnerability Agent',
      description: 'Autonomous AI agent for intelligent vulnerability scanning',
      status: 'Coming Soon'
    }
  ];

  const features = [
    'Automated reconnaissance workflows',
    'Real-time vulnerability detection',
    'Multi-source data aggregation',
    'Custom payload integration',
    'Team collaboration tools',
    'API integration support',
    'Detailed reporting system',
    'Cloud-based scanning'
  ];

  const stats = [
    { number: '50K+', label: 'Security Scans', icon: Shield },
    { number: '1M+', label: 'Vulnerabilities Found', icon: Target },
    { number: '10K+', label: 'Active Users', icon: Users },
    { number: '99.9%', label: 'Uptime', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <div className="py-20 bg-gradient-to-br from-sniper-red/10 via-background to-sniper-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Target className="h-20 w-20 text-sniper-red glow-red animate-pulse" />
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="w-20 h-20 border-2 border-sniper-red/30 rounded-full border-t-sniper-red"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-sniper-red">SNIPER</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              The most advanced web security reconnaissance platform designed for ethical hackers, 
              penetration testers, and security professionals worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/home">
                <Button size="lg" className="bg-sniper-red hover:bg-sniper-red/90 text-white px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Launch Platform
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="border-sniper-green text-sniper-green hover:bg-sniper-green hover:text-white px-8 py-4 text-lg">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <stat.icon className="h-8 w-8 text-sniper-green mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-sniper-red">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Framework Building Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-sniper-red/20 text-sniper-red rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Rapidly Evolving Framework
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Building the <span className="text-sniper-red">Future</span> of Security Testing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our framework is rapidly expanding with cutting-edge technologies and methodologies. 
              We're continuously adding new tools, improving existing ones, and pioneering the next 
              generation of automated security testing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-sniper-green/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-sniper-green" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Continuous Integration</h3>
                  <p className="text-muted-foreground">Daily updates and improvements to our scanning engines</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-sniper-green/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-sniper-green" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Community-Driven</h3>
                  <p className="text-muted-foreground">Built with feedback from thousands of security professionals</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-sniper-green/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-sniper-green" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Enterprise Ready</h3>
                  <p className="text-muted-foreground">Scalable architecture designed for enterprise environments</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-sniper-red/20 to-sniper-green/20 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <Target className="h-16 w-16 text-sniper-red mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold text-sniper-red mb-2">Framework Status</h3>
                  <p className="text-sniper-green font-semibold">Rapidly Expanding</p>
                  <div className="mt-4 w-full bg-muted rounded-full h-2">
                    <div className="bg-sniper-green h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-sniper-red">Advanced</span> Security Arsenal
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive suite of tools for every aspect of security testing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="bg-card border-sniper-red/30 hover:border-sniper-red/60 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <tool.icon className="h-10 w-10 text-sniper-red group-hover:scale-110 transition-transform" />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tool.status === 'Active' 
                        ? 'bg-sniper-green/20 text-sniper-green' 
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {tool.status}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* AI Agent Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <Brain className="h-12 w-12 text-sniper-green mr-4" />
                <span className="px-4 py-2 bg-sniper-green/20 text-sniper-green rounded-full text-sm font-medium">
                  R&D in Progress
                </span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Autonomous <span className="text-sniper-green">AI Agent</span>
              </h3>
              
              <p className="text-xl text-muted-foreground mb-6">
                Our dedicated research and development team is building a revolutionary AI-powered autonomous agent 
                that will intelligently scan, analyze, and identify vulnerabilities without human intervention. 
                This cutting-edge technology represents the future of automated security testing.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-sniper-green" />
                  <span>Machine learning vulnerability pattern recognition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-sniper-green" />
                  <span>Automated exploit chaining and validation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-sniper-green" />
                  <span>Adaptive scanning based on target behavior</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-sniper-green" />
                  <span>Intelligent report generation and prioritization</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-sniper-green/10 rounded-lg border border-sniper-green/30">
                <p className="text-sm text-sniper-green font-medium">
                  <strong>Development Status:</strong> Currently in active development by our R&D team. 
                  Expected beta release in Q2 2024.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-sniper-green/20 to-sniper-red/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Brain className="h-24 w-24 text-sniper-green mx-auto mb-4 animate-pulse" />
                  <p className="text-2xl font-bold text-sniper-green">AI Agent</p>
                  <p className="text-muted-foreground">Coming Soon</p>
                  <div className="mt-4 flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-sniper-green rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-sniper-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-sniper-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-sniper-red">SNIPER</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Built by hackers, for hackers - with enterprise-grade reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-sniper-red/30 hover:border-sniper-red/60 transition-all duration-300">
                <CheckCircle className="h-5 w-5 text-sniper-green flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-sniper-red/10 to-sniper-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your <span className="text-sniper-red">Security Journey</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join thousands of security professionals who trust SNIPER for their reconnaissance and vulnerability assessment needs. 
            Experience the power of our rapidly evolving framework today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/home">
              <Button size="lg" className="bg-sniper-red hover:bg-sniper-red/90 text-white px-8 py-4 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Launch Platform
              </Button>
            </Link>
            <Link to="/tools">
              <Button variant="outline" size="lg" className="border-sniper-green text-sniper-green hover:bg-sniper-green hover:text-white px-8 py-4 text-lg">
                Explore Tools
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
