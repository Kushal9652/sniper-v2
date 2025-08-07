
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Target, Eye, EyeOff, Github, Mail, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'password') {
      setPasswordRequirements({
        length: value.length >= 8,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isPasswordValid || !passwordsMatch) {
      setError('Please ensure password requirements are met and passwords match');
      return;
    }

    setIsSubmitting(true);

    try {
      const username = `${formData.firstName} ${formData.lastName}`.trim();
      const result = await register(username, formData.email, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background cyber-grid flex items-center justify-center p-4">
        <div className="text-center">
          <Target className="h-12 w-12 text-sniper-red glow-red mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cyber-grid flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Target className="h-12 w-12 text-sniper-red glow-red" />
          </div>
          <h1 className="text-2xl font-bold text-sniper-red">SNIPER</h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>

        <Card className="bg-card border-muted/30">
          <CardHeader>
            <CardTitle>Get started</CardTitle>
            <CardDescription>Create your account to access security tools</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="border-muted/30 focus:border-sniper-red"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="border-muted/30 focus:border-sniper-red"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-muted/30 focus:border-sniper-red"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="border-muted/30 focus:border-sniper-red pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                
                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={`h-3 w-3 ${passwordRequirements.length ? 'text-sniper-green' : 'text-muted-foreground'}`} />
                    <span className={passwordRequirements.length ? 'text-sniper-green' : 'text-muted-foreground'}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={`h-3 w-3 ${passwordRequirements.lowercase ? 'text-sniper-green' : 'text-muted-foreground'}`} />
                    <span className={passwordRequirements.lowercase ? 'text-sniper-green' : 'text-muted-foreground'}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={`h-3 w-3 ${passwordRequirements.uppercase ? 'text-sniper-green' : 'text-muted-foreground'}`} />
                    <span className={passwordRequirements.uppercase ? 'text-sniper-green' : 'text-muted-foreground'}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={`h-3 w-3 ${passwordRequirements.number ? 'text-sniper-green' : 'text-muted-foreground'}`} />
                    <span className={passwordRequirements.number ? 'text-sniper-green' : 'text-muted-foreground'}>
                      One number
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className={`h-3 w-3 ${passwordRequirements.special ? 'text-sniper-green' : 'text-muted-foreground'}`} />
                    <span className={passwordRequirements.special ? 'text-sniper-green' : 'text-muted-foreground'}>
                      One special character
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`border-muted/30 focus:border-sniper-red pr-10 ${
                      formData.confirmPassword && !passwordsMatch ? 'border-sniper-red' : ''
                    }`}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-sniper-red">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-muted/30"
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{' '}
                  <Link to="/terms" className="text-sniper-red hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-sniper-red hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-sniper-red hover:bg-sniper-red/90"
                disabled={!isPasswordValid || !passwordsMatch || isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6">
              <Separator />
              <p className="text-center text-sm text-muted-foreground mt-4">
                Or continue with
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button variant="outline" className="border-muted/30">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" className="border-muted/30">
                  <Mail className="h-4 w-4 mr-2" />
                  Google
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-sniper-red hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
