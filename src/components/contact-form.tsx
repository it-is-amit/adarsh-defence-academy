"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { toast } from "sonner"
import { createEnquiry } from "@/lib/firebase/enquiries"

// EmailJS types
interface EmailJS {
  init: (publicKey: string) => void
  sendForm: (
    serviceId: string,
    templateId: string,
    form: HTMLFormElement,
    publicKey: string
  ) => Promise<{ text: string }>
}

interface WindowWithEmailJS extends Window {
  emailjs: EmailJS
}


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { t } = useLanguage()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.async = true
    script.onload = () => {
      // Initialize EmailJS
      if (typeof window !== 'undefined' && 'emailjs' in window) {
        const emailjs = (window as unknown as WindowWithEmailJS).emailjs
        emailjs.init('1fAMcinuo0y3KESTj')
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Form validation function
  const FormValidation = (e: React.FormEvent<HTMLFormElement>): boolean => {
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string

    // Check if all fields are filled
    if (!name || !email || !phone || !message) {
      toast.error("Please fill in all fields", {
        description: "All fields are required to send your message.",
        duration: 4000,
      })
      return false
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address", {
        description: "Please enter a valid email address.",
        duration: 4000,
      })
      return false
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number", {
        description: "Please enter a valid 10-digit phone number.",
        duration: 4000,
      })
      return false
    }

    // Validate name length
    if (name.length < 2) {
      toast.error("Name too short", {
        description: "Name must be at least 2 characters long.",
        duration: 4000,
      })
      return false
    }

    // Validate message length
    if (message.length < 10) {
      toast.error("Message too short", {
        description: "Message must be at least 10 characters long.",
        duration: 4000,
      })
      return false
    }

    return true
  }

  // Helpers
  const sendWithEmailJS = (formEl: HTMLFormElement) => {
    const emailjs = (window as unknown as WindowWithEmailJS).emailjs
    return emailjs.sendForm('service_idn18qd', 'template_07slc0v', formEl, '1fAMcinuo0y3KESTj')
  }

  const saveEnquiryToFirestore = (payload: { name: string; email: string; phone: string; message: string }) => {
    return createEnquiry(payload)
  }

  // Send email function
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formEl = e.currentTarget as HTMLFormElement
    const isValid = FormValidation(e)
    if (!isValid) return

    setIsSubmitting(true)

    const loadingToast = toast.loading("Sending your message...", {
      description: "Please wait while we send your message.",
    })

    const formData = new FormData(formEl)
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      message: String(formData.get('message') || ''),
      timestamp: new Date().toISOString(), // Add timestamp for IST
    }

    try {
      const hasEmailJs = typeof window !== 'undefined' && 'emailjs' in window
      if (hasEmailJs) {
        const [emailResult, dbResult] = await Promise.allSettled([
          sendWithEmailJS(formEl),
          saveEnquiryToFirestore(payload),
        ])

        toast.dismiss(loadingToast)

        if (emailResult.status === 'fulfilled' && dbResult.status === 'fulfilled') {
          toast.success("Message sent successfully!", {
            description: "We received your enquiry and emailed it. We'll get back to you soon.",
            duration: 5000,
          })
          setIsSuccess(true)
          form.reset()
          formEl.reset()
          setTimeout(() => setIsSuccess(false), 3000)
        } else if (emailResult.status === 'fulfilled' && dbResult.status === 'rejected') {
          toast.error("Saved to email, but failed to store enquiry", {
            description: "We sent your message via email, but saving to the system failed.",
            duration: 6000,
          })
        } else if (emailResult.status === 'rejected' && dbResult.status === 'fulfilled') {
          toast.success("Enquiry saved. Email failed.", {
            description: "We saved your message, but email sending failed.",
            duration: 6000,
          })
          form.reset()
          formEl.reset()
        } else {
          toast.error("Failed to submit enquiry", {
            description: "Both email and saving failed. Please try again.",
            duration: 6000,
          })
        }
      } else {
        await saveEnquiryToFirestore(payload)
        toast.dismiss(loadingToast)
        toast.success("Enquiry saved", {
          description: "Email service unavailable. We still saved your message.",
          duration: 5000,
        })
        setIsSuccess(true)
        form.reset()
        formEl.reset()
        setTimeout(() => setIsSuccess(false), 3000)
      }
    } catch (err: unknown) {
      toast.dismiss(loadingToast)
      toast.error("Failed to submit enquiry", {
        description: (err as { message?: string })?.message ?? "Please try again later.",
        duration: 6000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
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
          <h3 className="font-semibold text-lg">{t("contactFormTitle") as string}</h3>
          <p className="text-sm text-muted-foreground">{t("contactFormDescription") as string}</p>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={sendEmail} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                  {t("contactFormNameLabel") as string}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("contactFormNamePlaceholder") as string}
                  className="flex h-12 w-full rounded-lg border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                  {t("contactFormEmailLabel") as string}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={t("contactFormEmailPlaceholder") as string}
                  className="flex h-12 w-full rounded-lg border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                {t("contactFormPhoneLabel") as string}
              </label>
              <input
                type="tel"
                name="phone"
                placeholder={t("contactFormPhonePlaceholder") as string}
                className="flex h-12 w-full rounded-lg border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
                {t("contactFormMessageLabel") as string}
              </label>
              <textarea
                name="message"
                placeholder={t("contactFormMessagePlaceholder") as string}
                className="flex min-h-32 w-full rounded-lg border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 resize-none"
                required
              />
            </div>
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
                  {t("contactFormSending") as string}
                </>
              ) : isSuccess ? (
                <>
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("contactFormSent") as string}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {t("contactFormSendMessage") as string}
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  )
}
