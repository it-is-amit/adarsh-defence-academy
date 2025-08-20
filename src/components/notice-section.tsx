"use client"

import { Bell } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const notices = [
	{ title: "Admissions Open for 2024-25", date: "2024-07-01" },
	{ title: "Exam Schedule Released", date: "2024-07-10" },
	{ title: "Results Announced", date: "2024-07-15" },
	{ title: "Independence Day Celebration", date: "2024-08-15" },
	{ title: "Campus Closed on 20th July", date: "2024-07-20" },
	{ title: "New Sports Facilities Inauguration", date: "2024-08-05" },
	{ title: "Scholarship Applications Open", date: "2024-08-07" },
	{ title: "Parent-Teacher Meeting Schedule", date: "2024-08-12" },
	{ title: "NDA Preparation Bootcamp Dates", date: "2024-08-18" },
	{ title: "Library Timings Updated", date: "2024-08-22" },
]

export default function NoticeSection() {
	const { t } = useLanguage()

	return (
		<section className="py-12 sm:py-16 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-8 sm:mb-12">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary flex items-center justify-center gap-2">
						<Bell className="h-7 w-7 text-primary" />
						{t ? t("noticesTitle") : "Notifications & Notices"}
					</h2>
					<p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
						{t ? t("noticesSubtitle") : "Stay updated with the latest admissions, exams, results, and announcements."}
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
					{/* Left Banner */}
					<div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl sm:rounded-2xl shadow-lg overflow-hidden relative p-6 sm:p-8 flex flex-col justify-center">
						<div
							className="absolute inset-0 opacity-20 pointer-events-none"
							style={{
								background:
									"radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.35), transparent 40%)",
							}}
						/>
						<div className="relative z-10 flex items-start gap-4">
							<div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
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
							<div className="bg-white/15 rounded-lg px-3 py-2 text-center">Admissions</div>
							<div className="bg-white/15 rounded-lg px-3 py-2 text-center">Exams</div>
							<div className="bg-white/15 rounded-lg px-3 py-2 text-center">Results</div>
						</div>
					</div>

					{/* Right Scrollable List */}
					<div className="lg:col-span-2 bg-card border border-border rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
						<div className="px-4 py-3 border-b border-border bg-muted/40 flex items-center gap-2">
							<Bell className="h-5 w-5 text-primary" />
							<span className="font-semibold text-sm">Latest Notices</span>
						</div>
						<div className="max-h-[420px] overflow-y-auto custom-scrollbar">
							<ul className="divide-y divide-border">
								{notices.map((item, idx) => (
									<li key={idx} className="px-4 py-3">
										<p className="text-sm text-foreground truncate" title={item.title}>{item.title}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
