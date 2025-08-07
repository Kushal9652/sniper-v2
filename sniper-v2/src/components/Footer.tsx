
import React from 'react';
import { Target, Shield, Mail, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-sniper-red/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-sniper-red" />
              <span className="text-xl font-bold text-sniper-red">SNIPER</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Advanced web security reconnaissance platform for ethical hackers and security professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-sniper-red transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-sniper-red transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-sniper-red transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <div className="space-y-2">
              <Link to="/tools" className="block text-sm text-muted-foreground hover:text-sniper-green transition-colors">
                Security Tools
              </Link>
              <Link to="/scans" className="block text-sm text-muted-foreground hover:text-sniper-green transition-colors">
                Vulnerability Scans
              </Link>
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-sniper-green transition-colors">
                Dashboard
              </Link>
              <Link to="/" className="block text-sm text-muted-foreground hover:text-sniper-green transition-colors">
                Get Started
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-sniper-green transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-sniper-green transition-colors">
                API Reference
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-sniper-green transition-colors">
                Tutorials
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-sniper-green transition-colors">
                Community
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-sniper-red" />
                <span className="text-sm text-muted-foreground">support@sniper.dev</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-sniper-green" />
                <span className="text-sm text-muted-foreground">security@sniper.dev</span>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground">
                Built with ❤️ by ethical hackers
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-sniper-red/30 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} SNIPER. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-sniper-red transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-sniper-red transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-sniper-red transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
