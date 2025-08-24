"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getAuthInstance } from "@/lib/firebase/client"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  })

  useEffect(() => {
    const auth = getAuthInstance()
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/admin/dashboard")
    })
    return () => unsub()
  }, [router])

  async function onSubmit(values: LoginFormValues) {
    try {
      setIsSigningIn(true)
      const auth = getAuthInstance()
      await signInWithEmailAndPassword(auth, values.email, values.password)
      router.replace("/admin/dashboard")
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code
      let message = "Failed to sign in"
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") message = "Invalid email or password"
      if (code === "auth/user-not-found") message = "No user found with this email"
      if (code === "auth/too-many-requests") message = "Too many attempts. Try again later"
      form.setError("password", { message })
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Image
          src="/assets/hero/hero1.png"
          alt=""
          fill
          className="object-cover blur-lg brightness-75 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      <div className="min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border bg-background backdrop-blur p-6 shadow-sm md:p-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/assets/logo.png"
              alt="Adarsh Defence and Sports Academy Logo"
              width={64}
              height={64}
              className="rounded-md"
              priority
            />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Lock className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">Admin Sign In</h1>
              <p className="text-muted-foreground text-sm">Login to access the admin dashboard</p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input inputMode="email" type="email" placeholder="you@example.com" disabled={isSigningIn} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" disabled={isSigningIn} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full h-11 text-base" disabled={isSigningIn}>
                {isSigningIn ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-t-transparent border-current rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}


