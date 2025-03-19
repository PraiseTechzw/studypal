import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 hidden lg:block bg-[#2D3748]">
        <div className="flex items-center justify-center h-full p-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-[#319795] to-[#2D3748] rounded-lg opacity-20 animate-pulse" />
            <img
              alt="Login illustration"
              className="relative z-10 w-full"
              height="400"
              src="/placeholder.svg"
              width="400"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Continue with Github
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" required type="email" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link className="text-sm text-[#319795] hover:underline" href="#">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" required type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full bg-[#319795] hover:bg-[#2C7A7B]">Sign In</Button>
            <p className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <Link className="text-[#319795] hover:underline" href="/signup">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

