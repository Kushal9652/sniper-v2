
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Shield, Search, Code, Database, Zap, Activity, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalScans: 0,
    vulnerabilities: 0,
    subdomains: 0,
    jsFiles: 0
  });

  const [recentScans] = useState([
    { id: 1, target: 'example.com', type: 'Full Scan', status: 'completed', vulnerabilities: 5, date: '2024-01-15' },
    { id: 2, target: 'test.org', type: 'Subdomain Enum', status: 'running', vulnerabilities: 0, date: '2024-01-15' },
    { id: 3, target: 'demo.net', type: 'JS Recon', status: 'completed', vulnerabilities: 2, date: '2024-01-14' },
  ]);

  useEffect(() => {
    // Animate stats counting up
    const timer = setInterval(() => {
      setStats(prev => ({
        totalScans: Math.min(prev.totalScans + 1, 127),
        vulnerabilities: Math.min(prev.vulnerabilities + 1, 43),
        subdomains: Math.min(prev.subdomains + 5, 2856),
        jsFiles: Math.min(prev.jsFiles + 2, 184)
      }));
    }, 50);

    setTimeout(() => clearInterval(timer), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Security Dashboard</h1>
          <p className="text-muted-foreground">Monitor your reconnaissance and vulnerability scanning activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-sniper-red/30 hover:border-sniper-red/60 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <Target className="h-4 w-4 text-sniper-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sniper-red">{stats.totalScans}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-sniper-green/30 hover:border-sniper-green/60 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vulnerabilities Found</CardTitle>
              <Shield className="h-4 w-4 text-sniper-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sniper-green">{stats.vulnerabilities}</div>
              <p className="text-xs text-muted-foreground">-8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-muted/30 hover:border-muted/60 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subdomains</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.subdomains}</div>
              <p className="text-xs text-muted-foreground">+24% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-muted/30 hover:border-muted/60 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">JS Files Analyzed</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.jsFiles}</div>
              <p className="text-xs text-muted-foreground">+16% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Scans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-card border-sniper-red/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-sniper-red" />
                Active Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">test.org - Subdomain Enumeration</p>
                    <p className="text-sm text-muted-foreground">Started 2 hours ago</p>
                  </div>
                  <Badge variant="secondary" className="bg-sniper-green/20 text-sniper-green">
                    Running
                  </Badge>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-sm text-muted-foreground">157 subdomains found so far</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-sniper-green/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-sniper-green" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-sniper-red rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">High severity vulnerability detected</p>
                    <p className="text-xs text-muted-foreground">example.com - SQL Injection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">New subdomain discovered</p>
                    <p className="text-xs text-muted-foreground">api.example.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-sniper-green rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Scan completed successfully</p>
                    <p className="text-xs text-muted-foreground">demo.net - JS Reconnaissance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Scans Table */}
        <Card className="bg-card border-muted/30">
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
            <CardDescription>Your latest reconnaissance and vulnerability scanning activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-muted/30">
                    <th className="text-left py-2">Target</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Vulnerabilities</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan) => (
                    <tr key={scan.id} className="border-b border-muted/20">
                      <td className="py-3 font-medium">{scan.target}</td>
                      <td className="py-3">{scan.type}</td>
                      <td className="py-3">
                        <Badge 
                          variant={scan.status === 'completed' ? 'default' : 'secondary'}
                          className={scan.status === 'completed' ? 'bg-sniper-green/20 text-sniper-green' : 'bg-yellow-500/20 text-yellow-500'}
                        >
                          {scan.status}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <span className={scan.vulnerabilities > 3 ? 'text-sniper-red' : 'text-sniper-green'}>
                          {scan.vulnerabilities}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{scan.date}</td>
                      <td className="py-3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
