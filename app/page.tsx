"use client"
import Image from "next/image"
import type React from "react"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Brush,
  Languages,
  ChevronLeft,
  Star,
  Users,
  BookMarked,
  Check,
  AlertCircle,
  XCircle,
} from "lucide-react"
import { useAOS } from "@/hooks/use-aos"
import { Badge } from "@/components/ui/badge"
import { featureItems, benefitItems, heroBookCovers } from "@/lib/consts"

// Define the showcase items with the new images
const showcaseItems = [
  {
    id: 1,
    title: "أزمة الصواريخ الكوبية",
    image: "/images/cuban-missile-crisis.png",
  },
  {
    id: 2,
    title: "كسوف الشمس",
    image: "/images/solar-eclipse.png",
  },
]

export default function Home() {
  // Initialize AOS
  useAOS()

  // State for subscription form
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // State for hero book cover rotation
  const [currentBookIndex, setCurrentBookIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Function to validate email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Function to validate name
  const validateName = (name: string) => {
    return name.trim().length >= 2
  }

  // Function to rotate book covers
  const rotateBookCover = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentBookIndex((prevIndex) => (prevIndex + 1) % heroBookCovers.length)
      setIsTransitioning(false)
    }, 300)
  }, [])

  // Set up automatic rotation
  useEffect(() => {
    const interval = setInterval(rotateBookCover, 5000)
    return () => clearInterval(interval)
  }, [rotateBookCover])

  // Handle subscription form submission
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset error states
    setSubmitError("")

    // Validate inputs
    let hasError = false

    if (!validateName(name)) {
      setNameError("يرجى إدخال اسمك الكامل")
      hasError = true
    } else {
      setNameError("")
    }

    if (!validateEmail(email)) {
      setEmailError("يرجى إدخال بريد إلكتروني صحيح")
      hasError = true
    } else {
      setEmailError("")
    }

    if (hasError) return

    setIsSubmitting(true)

    try {
      // For development/preview environments, simulate a successful response
      // This helps avoid CORS issues during development
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname.includes("vercel.app") ||
        window.location.hostname.includes("v0.dev")
      ) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log("Development mode: Simulating successful API response")
        setIsSubmitting(false)
        setIsSubmitted(true)
        setName("")
        setEmail("")
        return
      }

      // In production, make the actual API call
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch("https://pwldx7xdpbsnlzmjp534n2cuvu0xrzaz.lambda-url.me-south-1.on.aws/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Success:", data)
      setIsSubmitting(false)
      setIsSubmitted(true)
      setName("")
      setEmail("")
    } catch (error) {
      console.error("Error:", error)
      setIsSubmitting(false)

      // Set appropriate error message based on the error
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setSubmitError("تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.")
      } else if (error instanceof DOMException && error.name === "AbortError") {
        setSubmitError("انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.")
      } else {
        setSubmitError("حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقًا.")
      }
    }
  }

  return (
    <main className="bg-white text-black overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="font-serif font-bold text-3xl leading-none text-black">
            عليم
          </Link>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="#early-access">
              <span>الوصول المبكر</span>
              <ChevronLeft className="mr-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-black/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center md:space-x-16 md:space-x-reverse">
            {/* Hero Content */}
            <div className="w-full md:w-1/2 text-right" data-aos="fade-up">
              <Badge className="mb-6 bg-black/10 text-black hover:bg-black/20 backdrop-blur-sm">
                نسخة تجريبية مبكرة
              </Badge>
              <h1 className="font-serif font-bold text-5xl md:text-7xl leading-tight text-black mb-6">
                <span className="block">من الكتاب</span>
                <span className="block">إلى الخلاصة المصورة</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-lg">
                نلخّص المعرفة، ونرسمها لك. أول تطبيق عربي يحوّل الكتب إلى ملخّصات مصوّرة بالذكاء الاصطناعي
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-black/80 rounded-full text-lg"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  قادم قريبا...
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full text-lg"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <Link href="#features">تعرف على المميزات</Link>
                </Button>
              </div>

              <div className="mt-12" data-aos="fade-up" data-aos-delay="300">
                {/* Spacer to maintain layout */}
              </div>
            </div>

            {/* Hero Image */}
            <div className="w-full md:w-1/2 mt-12 md:mt-0" data-aos="fade-left">
              <div className="relative max-w-sm mx-auto md:max-w-md md:mr-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent rounded-3xl transform rotate-6 scale-95"></div>
                <div
                  className="relative bg-black rounded-3xl shadow-2xl overflow-hidden border border-black/10 cursor-pointer"
                  onClick={rotateBookCover}
                >
                  <div className="aspect-[2/3] relative">
                    <Image
                      src={heroBookCovers[currentBookIndex].image || "/placeholder.svg"}
                      alt={`ملخص كتاب ${heroBookCovers[currentBookIndex].title}`}
                      layout="fill"
                      objectFit="cover"
                      className={`object-center transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">ملخص كتاب "{heroBookCovers[currentBookIndex].title}"</h3>
                    <p>{heroBookCovers[currentBookIndex].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <Badge className="mb-4 bg-black/10 text-black hover:bg-black/20">المميزات</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">لماذا تختار "عليم"؟</h2>
            <p className="text-xl text-gray-600">
              نقدم لك تجربة فريدة في تلخيص الكتب وتحويلها إلى محتوى مرئي يسهل فهمه وتذكره
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div
              className="bg-white rounded-2xl p-8 shadow-lg border border-black/5 hover:shadow-xl transition-all"
              data-aos="fade-up"
            >
              <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4">تلخيص ذكي</h3>
              <p className="text-gray-600">
                نلخص لك محتوى الكتاب بدقة ووضوح باستخدام الذكاء الاصطناعي، مع التركيز على الأفكار الرئيسية والمفاهيم
                المهمة.
              </p>
            </div>

            <div
              className="bg-white rounded-2xl p-8 shadow-lg border border-black/5 hover:shadow-xl transition-all"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
                <Brush className="h-7 w-7 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4">تحويل النص إلى صور</h3>
              <p className="text-gray-600">
                نحول الأفكار إلى مشاهد بصرية تجعل الفهم أسهل وأمتع، مما يساعدك على تذكر المعلومات لفترة أطول.
              </p>
            </div>

            <div
              className="bg-white rounded-2xl p-8 shadow-lg border border-black/5 hover:shadow-xl transition-all"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center mb-6">
                <Languages className="h-7 w-7 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4">دعم كامل للغة العربية</h3>
              <p className="text-gray-600">
                مصمم خصيصًا للمستخدم العربي، بلغة عربية فصيحة وواضحة، مع مراعاة خصوصية الثقافة العربية.
              </p>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-2xl p-8 shadow-lg border border-black/5 hover:shadow-xl transition-all flex items-center gap-6"
              data-aos="fade-right"
            >
              <div className="w-14 h-14 bg-black/5 rounded-2xl flex-shrink-0 flex items-center justify-center">
                <Star className="h-7 w-7 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">جودة عالية</h3>
                <p className="text-gray-600">
                  نستخدم أحدث تقنيات الذكاء الاصطناعي لضمان جودة عالية في التلخيص والتصوير.
                </p>
              </div>
            </div>

            <div
              className="bg-white rounded-2xl p-8 shadow-lg border border-black/5 hover:shadow-xl transition-all flex items-center gap-6"
              data-aos="fade-left"
            >
              <div className="w-14 h-14 bg-black/5 rounded-2xl flex-shrink-0 flex items-center justify-center">
                <Users className="h-7 w-7 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">مشاركة سهلة</h3>
                <p className="text-gray-600">
                  شارك الملخصات المصورة مع أصدقائك وزملائك بسهولة عبر مختلف منصات التواصل الاجتماعي.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <Badge className="mb-4 bg-black/10 text-black hover:bg-black/20">كيف يعمل</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">خطوات بسيطة للبدء</h2>
            <p className="text-xl text-gray-600">
              استخدام عليم سهل وبسيط، اتبع هذه الخطوات للحصول على ملخصات مصورة رائعة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {featureItems.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-8 shadow-lg border border-black/5 hover:shadow-xl transition-all text-center"
                data-aos="fade-up"
                data-aos-delay={item.delay}
              >
                <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="py-20 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <Badge className="mb-4 bg-black/10 text-black hover:bg-black/20">معرض الأعمال</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">أمثلة من ملخصاتنا المصورة</h2>
            <p className="text-xl text-gray-600">شاهد كيف يقوم عليم بتحويل الكتب إلى ملخصات مصورة جذابة وسهلة الفهم</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {showcaseItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
                data-aos="fade-up"
                data-aos-delay={(item.id - 1) * 100}
              >
                <div className="relative w-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={800}
                    height={1200}
                    objectFit="contain"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access */}
      <section id="early-access" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/4 top-0 w-1/2 h-1/2 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute right-1/4 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-black/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-8 relative">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-black/10" data-aos="fade-up">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-black/10 text-black hover:bg-black/20">الوصول المبكر</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">انضم إلى النسخة التجريبية المبكرة</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                كن من أوائل من يحصلون على تجربة "عليم" قبل الإطلاق الرسمي واحصل على ميزات حصرية!
              </p>
            </div>

            <form className="max-w-md mx-auto w-full" onSubmit={handleSubscribe} noValidate>
              <div className="flex flex-col gap-3 w-full">
                {!isSubmitted ? (
                  <>
                    <div className="flex-1 flex flex-col">
                      <input
                        type="text"
                        placeholder="الاسم الكامل"
                        className={`px-4 py-3 rounded-full border ${
                          nameError ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-black/20"
                        } focus:outline-none focus:ring-2 text-right`}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          if (nameError) setNameError("")
                        }}
                        disabled={isSubmitting}
                      />
                      {nameError && (
                        <div className="flex items-center mt-2 text-red-500 text-sm pr-3">
                          <AlertCircle className="h-4 w-4 ml-1" />
                          <span>{nameError}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        className={`px-4 py-3 rounded-full border ${
                          emailError ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-black/20"
                        } focus:outline-none focus:ring-2 text-right`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (emailError) setEmailError("")
                        }}
                        disabled={isSubmitting}
                      />
                      {emailError && (
                        <div className="flex items-center mt-2 text-red-500 text-sm pr-3">
                          <AlertCircle className="h-4 w-4 ml-1" />
                          <span>{emailError}</span>
                        </div>
                      )}
                    </div>

                    {submitError && (
                      <div className="w-full bg-red-50 text-red-800 rounded-full py-3 px-4 flex items-center justify-center mb-3">
                        <XCircle className="h-5 w-5 ml-2" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="bg-black text-white hover:bg-black/80 rounded-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          جاري الإرسال...
                        </span>
                      ) : (
                        "اشترك الآن"
                      )}
                    </Button>
                  </>
                ) : (
                  <div className="w-full bg-green-50 text-green-800 rounded-full py-3 px-4 flex items-center justify-center">
                    <Check className="h-5 w-5 ml-2" />
                    <span>تم الاشتراك بنجاح! سنتواصل معك قريباً</span>
                  </div>
                )}
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {benefitItems.map((item, i) => {
                // Dynamically render the icon based on the name
                let IconComponent
                switch (item.icon) {
                  case "BookMarked":
                    IconComponent = BookMarked
                    break
                  case "Users":
                    IconComponent = Users
                    break
                  case "Star":
                    IconComponent = Star
                    break
                  case "BookOpen":
                    IconComponent = BookOpen
                    break
                  default:
                    IconComponent = Star
                }

                return (
                  <div key={i} className="p-4">
                    <IconComponent className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="inline-block mb-3 md:mb-0 order-2 md:order-1">
              <h3 className="font-serif font-bold text-3xl leading-none text-white">عليم</h3>
            </Link>
            <div className="order-1 md:order-2">
              <p className="text-gray-400 text-sm">© 2025 عليم. جميع الحقوق محفوظة</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
