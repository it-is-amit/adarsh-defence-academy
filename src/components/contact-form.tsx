"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { motion } from "framer-motion"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(values)
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => setIsSuccess(false), 3000)
    form.reset()
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="bg-card rounded-xl shadow-md overflow-hidden"
    >
      <div className="bg-primary/10 p-6 flex items-center gap-4">
        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
          <Send className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Send us a Message</h3>
          <p className="text-sm text-muted-foreground">We'll get back to you as soon as possible</p>
        </div>
      </div>

      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="bg-muted/30 border-muted focus:border-primary h-12 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="bg-muted/30 border-muted focus:border-primary h-12 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your 10-digit phone number"
                        className="bg-muted/30 border-muted focus:border-primary h-12 rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your message"
                        className="bg-muted/30 border-muted focus:border-primary rounded-lg min-h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </motion.div>
  )
}
