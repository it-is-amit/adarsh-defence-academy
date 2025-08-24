"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import "quill/dist/quill.snow.css"

type RichTextEditorProps = {
	value: string
	onChange: (html: string) => void
	placeholder?: string
	className?: string
}

const toolbarModules = {
	toolbar: [
		[{ header: [1, 2, 3, false] }],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ color: [] }, { background: [] }],
		[{ align: [] }],
		["link"],
		["clean"],
	],
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
	const containerRef = React.useRef<HTMLDivElement | null>(null)
	const quillRef = React.useRef<{ 
		root: { innerHTML: string }
		on: (event: string, callback: () => void) => void
		off: (event: string) => void
		getSelection: () => { index: number; length: number } | null
		setSelection: (selection: { index: number; length: number } | null) => void
	} | null>(null)

	React.useEffect(() => {
		let mounted = true
		;(async () => {
			const Quill = (await import("quill")).default
			if (!mounted || !containerRef.current) return
			quillRef.current = new Quill(containerRef.current, {
				theme: "snow",
				modules: toolbarModules,
				placeholder,
			})
			quillRef.current.root.innerHTML = value || ""
			quillRef.current.on("text-change", () => {
				if (!quillRef.current) return
				const html = quillRef.current.root.innerHTML as string
				onChange(html)
			})
		})()
		return () => {
			mounted = false
			if (quillRef.current) {
				quillRef.current.off?.("text-change")
				quillRef.current = null
			}
		}
	}, [onChange, placeholder, value])

	React.useEffect(() => {
		const quill = quillRef.current
		if (quill && quill.root && quill.root.innerHTML !== (value || "")) {
			const selection = quill.getSelection()
			quill.root.innerHTML = value || ""
			if (selection) quill.setSelection(selection)
		}
	}, [value])

	return (
		<div
			className={cn(
				"border border-input rounded-lg bg-background overflow-hidden focus-within:ring-[3px] focus-within:ring-ring/50",
				className
			)}
		>
			<div ref={containerRef} className="min-h-40" />
		</div>
	)
}
