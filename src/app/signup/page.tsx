'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Chrome } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // Replace with a proper toast notification
      return;
    }
    setIsLoading(true);
    // Placeholder for Firebase signup logic
    console.log('Signup attempt with:', { email, password });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Redirect or show error based on Firebase response
  };

  return (
    <div className="flex min-h-[calc(100vh-15rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <Logo className="justify-center mb-2" textSize="text-2xl" />
          <CardTitle className="text-2xl font-bold tracking-tight">创建您的账户</CardTitle>
          <CardDescription>
            已经有账户了？{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              在此登录
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '正在创建账户...' : '创建账户'}
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                或使用其他方式注册
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" disabled={isLoading}>
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
            <Button variant="outline" disabled={isLoading}>
              <Chrome className="mr-2 h-4 w-4" /> Google
            </Button>
          </div>
        </CardContent>
         <CardFooter className="text-center text-sm text-muted-foreground">
          <p>继续操作即表示您同意我们的 <Link href="/terms" className="underline hover:text-primary">服务条款</Link> 和 <Link href="/privacy" className="underline hover:text-primary">隐私政策</Link>.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
