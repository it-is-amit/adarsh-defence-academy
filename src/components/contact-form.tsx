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
import { useLanguage } from "@/contexts/language-context"

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contactFormNameLabel") as string}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("contactFormNamePlaceholder") as string}
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
                      <FormLabel>{t("contactFormEmailLabel") as string}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("contactFormEmailPlaceholder") as string}
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
                    <FormLabel>{t("contactFormPhoneLabel") as string}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("contactFormPhonePlaceholder") as string}
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
                    <FormLabel>{t("contactFormMessageLabel") as string}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("contactFormMessagePlaceholder") as string}
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
        </Form>
      </div>
    </motion.div>
  )
}
