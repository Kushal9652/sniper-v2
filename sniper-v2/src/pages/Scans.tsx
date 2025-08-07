
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, Download, Eye, Trash2, Play, Pause, RotateCcw } from 'lucide-react';

const Scans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const scans = [
    {
      id: 1,
      target: 'example.com',
      type: 'Full Security Scan',
      status: 'completed',
      progress: 100,
      vulnerabilities: 5,
      subdomains: 23,
      jsFiles: 12,
      startTime: '2024-01-15 10:30',
      endTime: '2024-01-15 11:45',
      duration: '1h 15m'
    },
    {
      id: 2,
      target: 'test.org',
      type: 'Subdomain Enumeration',
      status: 'running',
      progress: 65,
      vulnerabilities: 0,
      subdomains: 47,
      jsFiles: 0,
      startTime: '2024-01-15 12:00',
      endTime: null,
      duration: '2h 30m'
    },
    {
      id: 3,
      target: 'demo.net',
      type: 'JS Reconnaissance',
      status: 'completed',
      progress: 100,
      vulnerabilities: 2,
      subdomains: 0,
      jsFiles: 28,
      startTime: '2024-01-14 14:20',
      endTime: '2024-01-14 14:35',
      duration: '15m'
    },
    {
      id: 4,
      target: 'vulnerable.app',
      type: 'Nuclei Scan',
      status: 'failed',
      progress: 45,
      vulnerabilities: 0,
      subdomains: 0,
      jsFiles: 0,
      startTime: '2024-01-14 09:15',
      endTime: '2024-01-14 09:20',
      duration: '5m'
    },
    {
      id: 5,
      target: 'secure.com',
      type: 'Full Security Scan',
      status: 'paused',
      progress: 30,
      vulnerabilities: 1,
      subdomains: 12,
      jsFiles: 5,
      startTime: '2024-01-13 16:45',
      endTime: null,
      duration: '45m'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-sniper-green/20 text-sniper-green';
      case 'running': return 'bg-blue-500/20 text-blue-500';
      case 'failed': return 'bg-sniper-red/20 text-sniper-red';
      case 'paused': return 'bg-yellow-500/20 text-yellow-500';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getStatusActions = (status: string, scanId: number) => {
    switch (status) {
      case 'running':
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Pause className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        );
      case 'paused':
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Play className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        );
      case 'failed':
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <RotateCcw className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        );
      default:
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Eye className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-3 w-3" />
            </Button>
          </div>
        );
    }
  };

  const filteredScans = scans.filter(scan => {
    const matchesSearch = scan.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scan.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || scan.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Scan History</h1>
          <p className="text-muted-foreground">Monitor and manage your security scans</p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 bg-card border-muted/30">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search scans by target or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-muted/30 focus:border-sniper-red"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-sniper-red hover:bg-sniper-red/90' : ''}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'running' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('running')}
                  className={filterStatus === 'running' ? 'bg-sniper-red hover:bg-sniper-red/90' : ''}
                >
                  Running
                </Button>
                <Button
                  variant={filterStatus === 'completed' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('completed')}
                  className={filterStatus === 'completed' ? 'bg-sniper-red hover:bg-sniper-red/90' : ''}
                >
                  Completed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scans List */}
        <div className="space-y-4">
          {filteredScans.map((scan) => (
            <Card key={scan.id} className="bg-card border-muted/30 hover:border-muted/60 transition-all">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                  <div className="lg:col-span-2">
                    <h3 className="font-semibold text-lg">{scan.target}</h3>
                    <p className="text-sm text-muted-foreground">{scan.type}</p>
                    <Badge variant="outline" className={`mt-1 ${getStatusColor(scan.status)}`}>
                      {scan.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{scan.progress}%</span>
                    </div>
                    <Progress value={scan.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-sm font-medium text-sniper-red">{scan.vulnerabilities}</p>
                      <p className="text-xs text-muted-foreground">Vulns</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-sniper-green">{scan.subdomains}</p>
                      <p className="text-xs text-muted-foreground">Subdomains</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{scan.jsFiles}</p>
                      <p className="text-xs text-muted-foreground">JS Files</p>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Started: {scan.startTime}</p>
                    {scan.endTime && <p>Ended: {scan.endTime}</p>}
                    <p>Duration: {scan.duration}</p>
                  </div>

                  <div className="flex justify-end">
                    {getStatusActions(scan.status, scan.id)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredScans.length === 0 && (
          <Card className="bg-card border-muted/30">
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No scans found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or run a new scan</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Scans;
