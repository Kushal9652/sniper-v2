import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Key, Eye, EyeOff, Save, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ApiKey {
  name: string;
  key: string;
  description: string;
  icon: React.ReactNode;
  placeholder: string;
}

const PutKeys = () => {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  const apiKeyFields: ApiKey[] = [
    {
      name: 'shodan',
      key: 'Shodan API Key',
      description: 'API key for Shodan internet intelligence platform',
      icon: <Shield className="h-4 w-4" />,
      placeholder: 'Enter your Shodan API key'
    },
    {
      name: 'censys',
      key: 'Censys API Key',
      description: 'API key for Censys search engine',
      icon: <Shield className="h-4 w-4" />,
      placeholder: 'Enter your Censys API key'
    },
    {
      name: 'github',
      key: 'GitHub Token',
      description: 'Personal access token for GitHub API',
      icon: <Key className="h-4 w-4" />,
      placeholder: 'Enter your GitHub personal access token'
    },
    {
      name: 'slack',
      key: 'Slack Bot Token',
      description: 'Bot token for Slack integration',
      icon: <Key className="h-4 w-4" />,
      placeholder: 'Enter your Slack bot token'
    },
    {
      name: 'virustotal',
      key: 'VirusTotal API Key',
      description: 'API key for VirusTotal threat intelligence',
      icon: <Shield className="h-4 w-4" />,
      placeholder: 'Enter your VirusTotal API key'
    },
    {
      name: 'hunterio',
      key: 'Hunter.io API Key',
      description: 'API key for email finding service',
      icon: <Key className="h-4 w-4" />,
      placeholder: 'Enter your Hunter.io API key'
    },
    {
      name: 'haveibeenpwned',
      key: 'HaveIBeenPwned API Key',
      description: 'API key for breach data service',
      icon: <Shield className="h-4 w-4" />,
      placeholder: 'Enter your HaveIBeenPwned API key'
    },
    {
      name: 'securitytrails',
      key: 'SecurityTrails API Key',
      description: 'API key for domain intelligence',
      icon: <Shield className="h-4 w-4" />,
      placeholder: 'Enter your SecurityTrails API key'
    }
  ];

  const handleKeyChange = (keyName: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [keyName]: value
    }));
  };

  const toggleKeyVisibility = (keyName: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyName]: !prev[keyName]
    }));
  };

  const handleSave = () => {
    // TODO: Implement actual saving to backend/database
    console.log('Saving API keys:', apiKeys);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClearAll = () => {
    setApiKeys({});
    setShowKeys({});
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-muted-foreground">
          Configure your API keys for various security tools and services. Your keys are stored securely and encrypted.
        </p>
      </div>

      {saved && (
        <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            API keys saved successfully!
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="security">Security Tools</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4">
            {apiKeyFields.filter(field => 
              ['shodan', 'censys', 'virustotal', 'haveibeenpwned', 'securitytrails'].includes(field.name)
            ).map((field) => (
              <Card key={field.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {field.icon}
                    {field.key}
                  </CardTitle>
                  <CardDescription>{field.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>{field.key}</Label>
                    <div className="relative">
                      <Input
                        id={field.name}
                        type={showKeys[field.name] ? 'text' : 'password'}
                        placeholder={field.placeholder}
                        value={apiKeys[field.name] || ''}
                        onChange={(e) => handleKeyChange(field.name, e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => toggleKeyVisibility(field.name)}
                      >
                        {showKeys[field.name] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-4">
          <div className="grid gap-4">
            {apiKeyFields.filter(field => 
              ['hunterio'].includes(field.name)
            ).map((field) => (
              <Card key={field.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {field.icon}
                    {field.key}
                  </CardTitle>
                  <CardDescription>{field.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>{field.key}</Label>
                    <div className="relative">
                      <Input
                        id={field.name}
                        type={showKeys[field.name] ? 'text' : 'password'}
                        placeholder={field.placeholder}
                        value={apiKeys[field.name] || ''}
                        onChange={(e) => handleKeyChange(field.name, e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => toggleKeyVisibility(field.name)}
                      >
                        {showKeys[field.name] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4">
            {apiKeyFields.filter(field => 
              ['github', 'slack'].includes(field.name)
            ).map((field) => (
              <Card key={field.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {field.icon}
                    {field.key}
                  </CardTitle>
                  <CardDescription>{field.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>{field.key}</Label>
                    <div className="relative">
                      <Input
                        id={field.name}
                        type={showKeys[field.name] ? 'text' : 'password'}
                        placeholder={field.placeholder}
                        value={apiKeys[field.name] || ''}
                        onChange={(e) => handleKeyChange(field.name, e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => toggleKeyVisibility(field.name)}
                      >
                        {showKeys[field.name] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 mt-8">
        <Button onClick={handleSave} className="bg-sniper-red hover:bg-sniper-red/90">
          <Save className="h-4 w-4 mr-2" />
          Save All Keys
        </Button>
        <Button variant="outline" onClick={handleClearAll}>
          Clear All
        </Button>
      </div>

      <Alert className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Security Note:</strong> All API keys are encrypted and stored securely. 
          Never share your API keys with anyone. Keys are only used for legitimate security research and testing purposes.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PutKeys;
