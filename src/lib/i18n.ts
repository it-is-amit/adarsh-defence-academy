export const defaultLocale = "en"
export const locales = ["en", "hi"] as const
export type Locale = (typeof locales)[number]

export const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About us",
    facilities: "Facilities",
    programs: "Programs",
    achievements: "Achievements",
    contact: "Contact us",
    register: "Register",

    // Hero Section
    heroTitle1: "Empowering Future Heroes",
    heroSubtitle1: "Nurturing Talent, Building Character, Achieving Excellence",
    heroTitle2: "Defence Training Excellence",
    heroSubtitle2: "Comprehensive preparation for NDA, SSB and defence examinations",
    heroTitle3: "Sports Excellence",
    heroSubtitle3: "Professional coaching in multiple sports disciplines",
    explore: "Explore",
    learnMore: "Learn More",
    joinNow: "Join Now",

    // About Section
    aboutTitle: "Empowering Future Heroes - Adarsh Defence and Sports Academy",
    aboutSubtitle: "Nurturing Talent, Building Character, Achieving Excellence",
    nationalPride: "National Pride",
    nationalPrideDesc:
      "We instill a sense of national pride and patriotism in our students, and we encourage them to serve the nation with dedication and commitment.",
    sportsmanship: "Sportsmanship",
    sportsmanshipDesc:
      "We promote fair play, sportsmanship and a healthy competitive spirit among our students, and we encourage them to win with grace and lose with dignity.",
    holisticDevelopment: "Holistic Development",
    holisticDevelopmentDesc:
      "We focus on the overall development of our students, including their physical, mental, and emotional well-being, and we provide support and guidance to help them achieve their goals.",

    // Core Values
    coreValues: "Core Values",
    coreValuesSubtitle: "The principles that guide our academy and shape our students",
    integrity: "Integrity",
    integrityDesc:
      "We operate with transparency, honesty, and ethics, and we expect the same from our students and staff",
    excellence: "Excellence",
    excellenceDesc:
      "We aim for excellence in everything we do, from training and coaching to academics and character development.",
    respect: "Respect",
    respectDesc:
      "We promote respect for oneself, others, and the nation, and we encourage our students to become responsible and compassionate citizens",
    teamwork: "Teamwork",
    teamworkDesc:
      "We believe that teamwork is essential for achieving greatness, and we foster a sense of camaraderie and collaboration among our students and staff",
    innovation: "Innovation",
    innovationDesc:
      "We stay updated with the latest trends and techniques in defence training and sports coaching, and we continuously seek innovative ways to improve our programs and services.",

    // Gallery
    galleryTitle: "Academy Gallery",
    gallerySubtitle: "Glimpses of our training facilities, events, and student achievements",

    // Contact
    getInTouch: "Get in Touch",
    getInTouchDesc: "Have questions about our programs? Reach out to us and our team will get back to you shortly.",
    sendMessage: "Send us a Message",
    sendMessageDesc: "We'll get back to you as soon as possible",
    name: "Name",
    email: "Email",
    phone: "Phone Number",
    message: "Message",
    sendBtn: "Send Message",
    sending: "Sending...",
    sent: "Sent!",

    // Facilities
    facilitiesTitle: "Facilities",
    facilitiesDesc: "State-of-the-art facilities designed to nurture excellence in defence and sports training",
    infrastructureTitle: "Our Infrastructure",
    infrastructureDesc: "Modern infrastructure supporting comprehensive training and development",
    teamTitle: "Our Team",
    teamDesc: "Experienced professionals dedicated to shaping future leaders",

    // Programs
    programsTitle: "Programs Section",
    programsDesc: "Comprehensive training programs designed for excellence in defence and sports",
    defenceTraining: "Defence Training NDA",
    defenceTrainingDesc:
      "Complete preparation for NDA will be provided starting from the written test, SSB, and medical fitness test.",
    sportsCoaching: "Sports Coaching",
    sportsCoachingDesc:
      "Cricket, Football, Basketball, Athletics, Badminton, Kabaddi, Kho-kho, Table Tennis, Chess, Wrestling, Judo etc games will be provided.",
    whatYouLearn: "What you'll learn:",

    // Achievements
    achievementsTitle: "Our Achievements",
    achievementsDesc: "Celebrating excellence and success stories that inspire future generations",
    successStories: "Success Stories of Alumni",
    successStoriesDesc: "Our proud alumni who have made their mark in defence and sports",
    awardsRecognition: "Awards and Recognition",
    awardsRecognitionDesc: "Recognition and accolades that validate our commitment to excellence",
    notableAchievements: "Notable Achievements in Sports and Defence Exams",
    notableAchievementsDesc: "Outstanding performances that showcase our training excellence",

    // Registration
    joinAcademy: "Join Our Academy",
    joinAcademyDesc:
      "Fill out the form below to register your interest in our programs. Our team will contact you with further details.",
    fullName: "Full Name",
    fatherName: "Father's Name",
    dateOfBirth: "Date of Birth",
    classStream: "Class/Stream",
    district: "District",
    city: "City",
    phoneNumber: "Phone Number",
    sendInquiry: "Send Inquiry",
    processing: "Processing...",
    inquirySent: "Inquiry Sent!",

    // Footer
    quickLinks: "Quick Links",
    programs: "Programs",
    contactInfo: "Contact",

    // Common
    viewDetails: "View Details",
    breadcrumbSeparator: ">",
  },
  hi: {
    // Navigation
    home: "होम",
    about: "हमारे बारे में",
    facilities: "सुविधाएं",
    programs: "कार्यक्रम",
    achievements: "उपलब्धियां",
    contact: "संपर्क करें",
    register: "पंजीकरण",

    // Hero Section
    heroTitle1: "भविष्य के नायकों को सशक्त बनाना",
    heroSubtitle1: "प्रतिभा का पोषण, चरित्र निर्माण, उत्कृष्टता प्राप्ति",
    heroTitle2: "रक्षा प्रशिक्षण उत्कृष्टता",
    heroSubtitle2: "एनडीए, एसएसबी और रक्षा परीक्षाओं की व्यापक तैयारी",
    heroTitle3: "खेल उत्कृष्टता",
    heroSubtitle3: "विभिन्न खेल विषयों में पेशेवर कोचिंग",
    explore: "अन्वेषण करें",
    learnMore: "और जानें",
    joinNow: "अभी जुड़ें",

    // About Section
    aboutTitle: "भविष्य के नायकों को सशक्त बनाना - आदर्श रक्षा और खेल अकादमी",
    aboutSubtitle: "प्रतिभा का पोषण, चरित्र निर्माण, उत्कृष्टता प्राप्ति",
    nationalPride: "राष्ट्रीय गर्व",
    nationalPrideDesc:
      "हम अपने छात्रों में राष्ट्रीय गर्व और देशभक्ति की भावना पैदा करते हैं, और उन्हें समर्पण और प्रतिबद्धता के साथ राष्ट्र की सेवा करने के लिए प्रोत्साहित करते हैं।",
    sportsmanship: "खेल भावना",
    sportsmanshipDesc:
      "हम अपने छात्रों के बीच निष्पक्ष खेल, खेल भावना और स्वस्थ प्रतिस्पर्धी भावना को बढ़ावा देते हैं, और उन्हें गरिमा के साथ जीतने और गरिमा के साथ हारने के लिए प्रोत्साहित करते हैं।",
    holisticDevelopment: "समग्र विकास",
    holisticDevelopmentDesc:
      "हम अपने छात्रों के समग्र विकास पर ध्यान देते हैं, जिसमें उनकी शारीरिक, मानसिक और भावनात्मक कल्याण शामिल है, और उन्हें अपने लक्ष्यों को प्राप्त करने में सहायता और मार्गदर्शन प्रदान करते हैं।",

    // Core Values
    coreValues: "मूल मूल्य",
    coreValuesSubtitle: "वे सिद्धांत जो हमारी अकादमी का मार्गदर्शन करते हैं और हमारे छात्रों को आकार देते हैं",
    integrity: "ईमानदारी",
    integrityDesc:
      "हम पारदर्शिता, ईमानदारी और नैतिकता के साथ काम करते हैं, और हम अपने छात्रों और कर्मचारियों से भी यही अपेक्षा करते हैं",
    excellence: "उत्कृष्टता",
    excellenceDesc: "हम जो कुछ भी करते हैं उसमें उत्कृष्टता का लक्ष्य रखते हैं, प्रशिक्षण और कोचिंग से लेकर शिक्षा और चरित्र विकास तक।",
    respect: "सम्मान",
    respectDesc:
      "हम स्वयं, दूसरों और राष्ट्र के लिए सम्मान को बढ़ावा देते हैं, और अपने छात्रों को जिम्मेदार और दयालु नागरिक बनने के लिए प्रोत्साहित करते हैं",
    teamwork: "टीम वर्क",
    teamworkDesc:
      "हम मानते हैं कि महानता प्राप्त करने के लिए टीम वर्क आवश्यक है, और हम अपने छात्रों और कर्मचारियों के बीच सौहार्द्र और सहयोग की भावना को बढ़ावा देते हैं",
    innovation: "नवाचार",
    innovationDesc:
      "हम रक्षा प्रशिक्षण और खेल कोचिंग में नवीनतम रुझानों और तकनीकों के साथ अपडेट रहते हैं, और अपने कार्यक्रमों और सेवाओं को बेहतर बनाने के लिए लगातार नवाचार के तरीकों की तलाश करते हैं।",

    // Gallery
    galleryTitle: "अकादमी गैलरी",
    gallerySubtitle: "हमारी प्रशिक्षण सुविधाओं, कार्यक्रमों और छात्र उपलब्धियों की झलकियां",

    // Contact
    getInTouch: "संपर्क में रहें",
    getInTouchDesc: "हमारे कार्यक्रमों के बारे में प्रश्न हैं? हमसे संपर्क करें और हमारी टीम जल्द ही आपसे संपर्क करेगी।",
    sendMessage: "हमें संदेश भेजें",
    sendMessageDesc: "हम जल्द से जल्द आपसे संपर्क करेंगे",
    name: "नाम",
    email: "ईमेल",
    phone: "फोन नंबर",
    message: "संदेश",
    sendBtn: "संदेश भेजें",
    sending: "भेजा जा रहा है...",
    sent: "भेज दिया गया!",

    // Facilities
    facilitiesTitle: "सुविधाएं",
    facilitiesDesc: "रक्षा और खेल प्रशिक्षण में उत्कृष्टता को बढ़ावा देने के लिए डिज़ाइन की गई अत्याधुनिक सुविधाएं",
    infrastructureTitle: "हमारा बुनियादी ढांचा",
    infrastructureDesc: "व्यापक प्रशिक्षण और विकास का समर्थन करने वाला आधुनिक बुनियादी ढांचा",
    teamTitle: "हमारी टीम",
    teamDesc: "भविष्य के नेताओं को आकार देने के लिए समर्पित अनुभवी पेशेवर",

    // Programs
    programsTitle: "कार्यक्रम अनुभाग",
    programsDesc: "रक्षा और खेल में उत्कृष्टता के लिए डिज़ाइन किए गए व्यापक प्रशिक्षण कार्यक्रम",
    defenceTraining: "रक्षा प्रशिक्षण एनडीए",
    defenceTrainingDesc: "लिखित परीक्षा, एसएसबी और चिकित्सा फिटनेस टेस्ट से शुरू होकर एनडीए की पूरी तैयारी प्रदान की जाएगी।",
    sportsCoaching: "खेल कोचिंग",
    sportsCoachingDesc:
      "क्रिकेट, फुटबॉल, बास्केटबॉल, एथलेटिक्स, बैडमिंटन, कबड्डी, खो-खो, टेबल टेनिस, शतरंज, कुश्ती, जूडो आदि खेल प्रदान किए जाएंगे।",
    whatYouLearn: "आप क्या सीखेंगे:",

    // Achievements
    achievementsTitle: "हमारी उपलब्धियां",
    achievementsDesc: "उत्कृष्टता और सफलता की कहानियों का जश्न जो भविष्य की पीढ़ियों को प्रेरणा देती हैं",
    successStories: "पूर्व छात्रों की सफलता की कहानियां",
    successStoriesDesc: "हमारे गर्वित पूर्व छात्र जिन्होंने रक्षा और खेल में अपनी पहचान बनाई है",
    awardsRecognition: "पुरस्कार और मान्यता",
    awardsRecognitionDesc: "मान्यता और सम्मान जो उत्कृष्टता के प्रति हमारी प्रतिबद्धता को मान्य करते हैं",
    notableAchievements: "खेल और रक्षा परीक्षाओं में उल्लेखनीय उपलब्धियां",
    notableAchievementsDesc: "उत्कृष्ट प्रदर्शन जो हमारी प्रशिक्षण उत्कृष्टता को प्रदर्शित करते हैं",

    // Registration
    joinAcademy: "हमारी अकादमी में शामिल हों",
    joinAcademyDesc:
      "हमारे कार्यक्रमों में अपनी रुचि दर्ज करने के लिए नीचे दिया गया फॉर्म भरें। हमारी टीम आपसे और विवरण के साथ संपर्क करेगी।",
    fullName: "पूरा नाम",
    fatherName: "पिता का नाम",
    dateOfBirth: "जन्म तिथि",
    classStream: "कक्षा/स्ट्रीम",
    district: "जिला",
    city: "शहर",
    phoneNumber: "फोन नंबर",
    sendInquiry: "पूछताछ भेजें",
    processing: "प्रसंस्करण...",
    inquirySent: "पूछताछ भेजी गई!",

    // Footer
    quickLinks: "त्वरित लिंक",
    programs: "कार्यक्रम",
    contactInfo: "संपर्क",

    // Common
    viewDetails: "विवरण देखें",
    breadcrumbSeparator: ">",
  },
} as const

export function getTranslation(locale: Locale, key: keyof typeof translations.en): string {
  return translations[locale][key] || translations.en[key]
}
