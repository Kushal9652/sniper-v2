
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Search, Code, Database, Zap, Target, Server, Key } from 'lucide-react';

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState('vulnerability-scanner');
  const [targetUrl, setTargetUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const tools = [
    {
      id: 'vulnerability-scanner',
      name: 'Vulnerability Scanner',
      description: 'Automated security scanning with Nuclei templates',
      icon: Shield,
      color: 'sniper-red',
      category: 'Security'
    },
    {
      id: 'subdomain-enum',
      name: 'Subdomain Enumeration',
      description: 'Discover subdomains using multiple techniques',
      icon: Search,
      color: 'sniper-green',
      category: 'Reconnaissance'
    },
    {
      id: 'js-recon',
      name: 'JavaScript Reconnaissance',
      description: 'Analyze JavaScript files for secrets and endpoints',
      icon: Code,
      color: 'blue-500',
      category: 'Analysis'
    },
    {
      id: 'repo-secrets',
      name: 'Repository Secret Scanner',
      description: 'Find secrets in public repositories',
      icon: Key,
      color: 'purple-500',
      category: 'OSINT'
    },
    {
      id: 'nuclei-scan',
      name: 'Nuclei Scanner',
      description: 'Fast and customizable vulnerability scanner',
      icon: Zap,
      color: 'yellow-500',
      category: 'Security'
    },
    {
      id: 'port-scan',
      name: 'Port Scanner',
      description: 'Discover open ports and services',
      icon: Server,
      color: 'cyan-500',
      category: 'Network'
    }
  ];

  const handleScan = () => {
    if (!targetUrl) return;
    
    setIsScanning(true);
    // Simulate scan process
    setTimeout(() => {
      setIsScanning(false);
      console.log(`Scanning ${targetUrl} with ${selectedTool}`);
    }, 3000);
  };

  const selectedToolData = tools.find(tool => tool.id === selectedTool);

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Security Tools</h1>
          <p className="text-muted-foreground">Comprehensive suite of reconnaissance and vulnerability assessment tools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool Selection */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-muted/30">
              <CardHeader>
                <CardTitle>Available Tools</CardTitle>
                <CardDescription>Select a tool to configure and run</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tools.map((tool) => {
                    const IconComponent = tool.icon;
                    return (
                      <div
                        key={tool.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedTool === tool.id
                            ? 'border-sniper-red bg-sniper-red/10'
                            : 'border-muted/30 hover:border-muted/60'
                        }`}
                        onClick={() => setSelectedTool(tool.id)}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className={`h-5 w-5 text-${tool.color}`} />
                          <div className="flex-1">
                            <h4 className="font-medium">{tool.name}</h4>
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {tool.category}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tool Configuration and Results */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-sniper-red/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedToolData && <selectedToolData.icon className={`h-5 w-5 text-${selectedToolData.color}`} />}
                  {selectedToolData?.name}
                </CardTitle>
                <CardDescription>{selectedToolData?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="configure" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="configure">Configure</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="configure" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Target URL/Domain</label>
                        <Input
                          placeholder="https://example.com"
                          value={targetUrl}
                          onChange={(e) => setTargetUrl(e.target.value)}
                          className="border-muted/30 focus:border-sniper-red"
                        />
                      </div>

                      {selectedTool === 'vulnerability-scanner' && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Scan Type</label>
                            <select className="w-full p-2 rounded-md border border-muted/30 bg-background">
                              <option>Comprehensive Scan</option>
                              <option>Quick Scan</option>
                              <option>Custom Templates</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Severity Level</label>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="cursor-pointer">Low</Badge>
                              <Badge variant="outline" className="cursor-pointer">Medium</Badge>
                              <Badge variant="outline" className="cursor-pointer">High</Badge>
                              <Badge variant="outline" className="cursor-pointer">Critical</Badge>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedTool === 'subdomain-enum' && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Enumeration Method</label>
                            <div className="grid grid-cols-2 gap-2">
                              <Badge variant="outline" className="cursor-pointer justify-center">DNS Brute Force</Badge>
                              <Badge variant="outline" className="cursor-pointer justify-center">Certificate Logs</Badge>
                              <Badge variant="outline" className="cursor-pointer justify-center">Search Engines</Badge>
                              <Badge variant="outline" className="cursor-pointer justify-center">All Methods</Badge>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button 
                        onClick={handleScan}
                        disabled={!targetUrl || isScanning}
                        className="w-full bg-sniper-red hover:bg-sniper-red/90"
                      >
                        {isScanning ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Scanning...
                          </>
                        ) : (
                          'Start Scan'
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="results" className="space-y-4">
                    <div className="bg-muted/20 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Scan Results</h4>
                      {isScanning ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-sniper-green rounded-full animate-pulse"></div>
                            <span className="text-sm">Initializing scan...</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-sniper-green rounded-full animate-pulse"></div>
                            <span className="text-sm">Analyzing target...</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">
                          Configure and run a scan to see results here
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
