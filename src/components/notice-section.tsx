"use client"

import { useEffect, useState } from "react"
import { Bell, Pin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { listNotices, type Notice } from "@/lib/firebase/notices"

function formatDate(dateStr: string) {
	const d = new Date(dateStr)
	return d.toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "2-digit",
	})
}

function isRecent(dateStr: string) {
	try {
		const created = new Date(dateStr).getTime()
		const now = Date.now()
		const sevenDaysMs = 7 * 24 * 60 * 60 * 1000
		return now - created <= sevenDaysMs
	} catch {
		return false
	}
}

export default function NoticeSection() {
	const { t } = useLanguage()
	const [notices, setNotices] = useState<Notice[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let mounted = true
			; (async () => {
				try {
					const data = await listNotices()
					if (!mounted) return
					const pinned = data.filter((n) => n.pinned)
					const others = data.filter((n) => !n.pinned)
					setNotices([...pinned, ...others])
				} catch (err) {
					console.error(err)
					if (mounted) setError("Failed to load notices. Check Firebase config.")
				} finally {
					if (mounted) setLoading(false)
				}
			})()
		return () => {
			mounted = false
		}
	}, [])

	return (
		<section className="py-12 sm:py-16 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
					{/* Left Banner */}
					<div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl sm:rounded-2xl shadow-lg overflow-hidden relative p-6 sm:p-8 flex flex-col justify-center">
						<div className="absolute inset-0 opacity-20 pointer-events-none notice-overlay-gradient" />
						<div className="relative z-10 flex flex-col items-start gap-4">
							<div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-md flex items-center justify-center shadow-md">
								<Bell className="h-8 w-8" />
							</div>
							<div>
								<h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm">
									{t ? t("noticesTitle") : "Important Announcements"}
								</h3>
								<p className="mt-2 text-sm sm:text-base opacity-95 max-w-md">
									{t ? t("noticesSubtitle") : "Latest updates about admissions, exams, and results."}
								</p>
							</div>
						</div>
						<div className="relative z-10 mt-6 sm:mt-8 grid grid-cols-3 gap-3 text-xs sm:text-sm opacity-90">
							<div className="rounded-lg px-3 py-2 text-center bg-primary-foreground/15">Admissions</div>
							<div className="rounded-lg px-3 py-2 text-center bg-primary-foreground/15">Exams</div>
							<div className="rounded-lg px-3 py-2 text-center bg-primary-foreground/15">Results</div>
						</div>
					</div>

					{/* Right Scrollable List */}
					<div className="lg:col-span-2 bg-card border border-border rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
						<div className="px-4 py-3 border-b border-border bg-muted/40 flex items-center justify-between gap-2">
							<div className="flex items-center gap-2 min-w-0">
								<Bell className="h-5 w-5 text-primary shrink-0" />
								<span className="font-semibold text-sm truncate">{t ? t("noticesTitle") : "Latest Notices"}</span>
							</div>
						</div>
						<div className="max-h-[420px] overflow-y-auto custom-scrollbar">
							{loading && (
								<div className="px-4 py-3 text-sm text-muted-foreground">Loading notices...</div>
							)}
							{error && (
								<div className="px-4 py-3 text-sm text-destructive">{error}</div>
							)}
							{!loading && !error && (
								<ul className="divide-y divide-border">
									{notices.map((item) => (
										<li key={item.id} className="px-4 py-3 hover:bg-muted/30 transition-colors">
											<Dialog>
												<DialogTrigger asChild>
													<div className="w-full text-left">
														<div className="flex items-start gap-3">
															<div className="min-w-0 flex-1">
																<p className="text-sm text-foreground line-clamp-2 capitalize" title={item.title}>
																	{item.title}
																	{isRecent(item.createdAt) ? (
																		<span className="inline-flex items-center gap-1 ml-2 text-white dark:text-red-400">
																			<span className="inline-flex items-center rounded-full bg-red-500 px-1 py-0.5 text-[10px]">New</span>
																		</span>
																	) : null}
																</p>
																<p className="text-xs text-muted-foreground mt-1">{formatDate(item.createdAt)}</p>
															</div>
															<div className="flex items-center gap-2">
																{item.pinned ? (
																	<span className="flex items-center">
																		<Pin size={16} className="rotate-45 text-muted-foreground"/>
																	</span>
																) : null}
																<Button size="sm" variant="secondary">Read more</Button>
															</div>
														</div>
													</div>
												</DialogTrigger>
												<DialogContent className="max-h-[80vh] overflow-y-auto">
													<DialogHeader>
														<DialogTitle className="text-xl leading-7">{item.title}</DialogTitle>
														<DialogDescription>
															<span className="inline-flex items-center gap-2">
																<span className="inline-flex items-center rounded-full border bg-muted px-2 py-0.5 text-xs text-muted-foreground">{formatDate(item.createdAt)}</span>
															</span>
														</DialogDescription>
													</DialogHeader>
													<div className="mt-2 text-sm leading-7 prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.description }} />
												</DialogContent>
											</Dialog>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
