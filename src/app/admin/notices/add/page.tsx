"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import RichTextEditor from "@/components/rich-text-editor"
import { createNotice, noticeSchema, type NoticeInput } from "@/lib/firebase/notices"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Form schema: require explicit boolean for better type-compat with RHF
const addSchema = z.object({
  title: noticeSchema.shape.title,
  description: noticeSchema.shape.description,
  pinned: z.boolean(),
})

type AddFormValues = z.infer<typeof addSchema>

export default function AddNoticePage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<AddFormValues>({
    resolver: zodResolver(addSchema),
    defaultValues: {
      title: "",
      description: "",
      pinned: false,
    },
    mode: "onTouched",
  })

  async function onSubmit(values: AddFormValues) {
    try {
      setSubmitting(true)
      const payload: NoticeInput = {
        title: values.title,
        description: values.description,
        pinned: values.pinned,
      }
      await createNotice(payload)
      router.push("/admin/notices")
    } catch (err) {
      console.error(err)
      alert("Failed to create notice. Check Firebase config and permissions.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[60vh] px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-start gap-3 mb-6">
          <Button asChild variant="outline" size="icon" className="text-primary rounded-full">
            <Link href="/admin/notices"><ArrowLeft /></Link>
          </Button>
          <h1 className="text-2xl font-semibold">Add Notice</h1>
        </div>

        <div className="border rounded-xl p-5 bg-background/70 backdrop-blur">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Write the notice here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pinned"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <input id="pinned" type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                      <FormLabel htmlFor="pinned" className="mb-0">Pin this notice</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Saving..." : "Save Notice"}
                </Button>
                <Button type="button" variant="outline" onClick={() => form.reset()} disabled={submitting}>
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}


