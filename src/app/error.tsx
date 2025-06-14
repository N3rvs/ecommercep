'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-lg text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">哎呀！出错了</CardTitle>
          <CardDescription className="text-muted-foreground">
            我们遇到了一些技术问题。请稍后再试。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-muted/50 p-3 rounded-md text-left text-sm mb-4">
              <p className="font-semibold">错误信息:</p>
              <pre className="whitespace-pre-wrap break-all">{error?.message}</pre>
              {error?.digest && <p className="mt-2"><span className="font-semibold">Digest:</span> {error.digest}</p>}
            </div>
          )}
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            size="lg"
            className="w-full"
          >
            再试一次
          </Button>
          <p className="mt-4 text-sm">
            <Button variant="link" asChild>
              <a href="/">返回首页</a>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
