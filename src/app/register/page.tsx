"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { UserPlus, Calendar, BookOpen, MapPin, Phone, User } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  fatherName: z.string().min(2, { message: "Father's name must be at least 2 characters" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  classStream: z.string().min(1, { message: "Class/Stream is required" }),
  district: z.string().min(2, { message: "District must be at least 2 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, { message: "Phone number must be 10 digits" }),
})

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { t } = useLanguage()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fatherName: "",
      dob: "",
      classStream: "",
      district: "",
      city: "",
      phoneNumber: "",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
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
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 container mx-auto">
        <div className="container px-4">
          <p className="text-sm text-muted-foreground">Home {">"} Register</p>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-3xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t("pageTitle")}</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("pageSubtitle")}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-card rounded-3xl shadow-lg overflow-hidden">
            <div className="bg-primary/10 p-8 flex items-center justify-center">
              <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center">
                <UserPlus className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="h-4 w-4" /> {t("fullName")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("fullNamePlaceholder") as string}
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
                        name="fatherName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="h-4 w-4" /> {t("fatherName")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("fatherNamePlaceholder") as string}
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
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" /> {t("dateOfBirth")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
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
                        name="classStream"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4" /> {t("currentClass")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("currentClassPlaceholder") as string}
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
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" /> {t("district")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("districtPlaceholder") as string}
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
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" /> {t("city")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("cityPlaceholder") as string}
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
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="h-4 w-4" /> {t("phone")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("phonePlaceholder") as string}
                              className="bg-muted/30 border-muted focus:border-primary h-12 rounded-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex justify-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                          {t("submitting")}
                        </>
                      ) : isSuccess ? (
                        <>
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t("registrationSubmitted")}
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4" />
                          {t("submitRegistration")}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
