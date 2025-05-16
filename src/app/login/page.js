"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; 
import { 
  Loader2, 
  LogIn, 
  Mail, 
  Lock, 
  UserPlus, 
  Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { loginAction } from "@/auth/actions";

function LoginPage() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await loginAction(email, password);
      if (response.errorMessage) {
        toast("Error", {
          description: response.errorMessage,
          unstyled: true,
          classNames: {
            toast: "bg-red-600",
            title: "text-white font-bold text-xl",
            description: "text-white text-sm",
            actionButton: "bg-red-500 hover:bg-red-400",
            closeButton: "bg-red-400 hover:bg-red-300",
          },
          variant: "destructive",
        });
      } else {
        toast("Success", {
          description: "Logged in successfully!",
          unstyled: true,
          classNames: {
            toast: "bg-green-600",
            title: "text-white font-bold text-xl",
            description: "text-white text-sm",
            actionButton: "bg-green-500 hover:bg-green-400",
            closeButton: "bg-green-400 hover:bg-green-300",
          },
        });

        router.replace("/");
      }
    } catch (err) {
      toast("Unexpected Error", {
        description: "An unexpected error occurred. Please try again later.",
        unstyled: true,
        classNames: {
          toast: "bg-red-600",
          title: "text-white font-bold text-xl",
          description: "text-white text-sm",
          actionButton: "bg-red-500 hover:bg-red-400",
          closeButton: "bg-red-400 hover:bg-red-300",
        },
        variant: "destructive",
      });
      console.error("Unexpected Error:", err);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 left-1/3 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 p-3 w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/10 shadow-lg shadow-primary/5">
            <Zap className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
            CodeTracker
          </h1>
          <p className="text-base text-muted-foreground mt-2">
            Sign in to access your coding progress
          </p>
        </div>
        
        <div className="bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 shadow-xl shadow-primary/5 rounded-lg overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary via-violet-500 to-blue-500"></div>
          
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center">
              <LogIn className="mr-2 h-5 w-5 text-primary" />
              Login
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <Label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-1.5 flex items-center text-foreground/80"
                >
                  <Mail className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    className="pl-9 bg-background border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    placeholder="Enter your email"
                    disabled={pending}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <Label 
                  htmlFor="password" 
                  className="block text-sm font-medium mb-1.5 flex items-center text-foreground/80"
                >
                  <Lock className="h-3.5 w-3.5 mr-1.5 text-violet-500/70" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    className="pl-9 bg-background border border-input rounded-md focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
                    placeholder="Enter your password"
                    disabled={pending}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
  type="submit"
  className={`w-full py-5 bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-violet-500 text-white font-medium rounded-md flex items-center justify-center gap-2 transform transition-all duration-300 hover:-translate-y-0.5 ${
    pending ? "cursor-not-allowed opacity-75" : "hover:brightness-110"
  }`}
  disabled={pending}
>
  {pending ? (
    <Loader2 className="h-5 w-5 animate-spin mr-2 text-white" />
  ) : (
    <LogIn className="h-5 w-5 mr-2 text-white dark:text-gray-900" />
  )}
<span className="text-white dark:text-gray-900">
  {pending ? "Signing In..." : "Sign In"}
</span>



</Button>

            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-card/80 text-muted-foreground">OR</span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col space-y-2">
                <p className="text-sm text-muted-foreground">
                  Don't have an account yet?
                </p>
                <Button
                  variant="outline"
                  className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-foreground flex items-center justify-center gap-2"
                  asChild
                >
                  <Link href="/signUp">
                    <UserPlus className="h-4 w-4 mr-1 text-primary" />
                    Create Account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default LoginPage;