import { StarField } from "@/components/StarField"
import { ChevronDown, Coins, Zap, Shield, Headphones, BotIcon as Robot } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import { ChatbotModal } from "@/components/ChatbotModal"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Index() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [initialHeight, setInitialHeight] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const maxBlur = 8
          const triggerHeight = initialHeight * 1.2
          const newBlurAmount = Math.min(maxBlur, (scrollRef.current / triggerHeight) * maxBlur)

          setBlurAmount(newBlurAmount)

          lastScrollRef.current = scrollRef.current
          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [initialHeight])

  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true)
          if (headingRef.current) {
            headingObserver.unobserve(headingRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (headingRef.current) {
      headingObserver.observe(headingRef.current)
    }

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true)
          if (aboutContentRef.current) {
            aboutObserver.unobserve(aboutContentRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (aboutContentRef.current) {
      aboutObserver.observe(aboutContentRef.current)
    }

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true)
          if (servicesContentRef.current) {
            servicesObserver.unobserve(servicesContentRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (servicesContentRef.current) {
      servicesObserver.observe(servicesContentRef.current)
    }

    const servicesTitleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesTitleVisible(true)
          if (servicesTitleRef.current) {
            servicesTitleObserver.unobserve(servicesTitleRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (servicesTitleRef.current) {
      servicesTitleObserver.observe(servicesTitleRef.current)
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current)
      }
      if (aboutContentRef.current) {
        aboutObserver.unobserve(aboutContentRef.current)
      }
      if (servicesContentRef.current) {
        servicesObserver.unobserve(servicesContentRef.current)
      }
      if (servicesTitleRef.current) {
        servicesTitleObserver.unobserve(servicesTitleRef.current)
      }
    }
  }, [])

  const scaleFactor = 1 + blurAmount / 16

  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out",
  }

  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const openChatbot = () => setIsChatbotOpen(true)
  const closeChatbot = () => setIsChatbotOpen(false)

  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  }

  return (
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden bg-black" style={heroStyle}>
        <div className="absolute top-6 right-6 z-10 flex space-x-3">
          <Button
            onClick={scrollToContact}
            variant="outline"
            size="sm"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
          >
            Купить валюту
          </Button>
        </div>

        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div
              className="backdrop-blur-sm px-6 py-4 rounded-lg inline-block relative"
              style={{
                background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
              }}
            >
              <h1 className="text-4xl font-bold text-white md:text-6xl font-heading">
                GoldVault{" "}
                <span role="img" aria-label="монеты">
                  🪙
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 md:text-xl px-4 max-w-xs mx-auto md:max-w-none">
                Игровая валюта — быстро, безопасно, выгодно
              </p>
              <Button
                onClick={scrollToAbout}
                variant="outline"
                size="sm"
                className="mt-6 bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
              >
                Узнать больше
              </Button>
            </div>
          </div>

          <div
            className="absolute bottom-20 animate-bounce cursor-pointer"
            onClick={scrollToAbout}
            role="button"
            aria-label="Перейти к разделу о нас"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToAbout()
              }
            }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </section>

      <section ref={aboutSectionRef} id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div
            ref={aboutContentRef}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-1000 ease-out",
              isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-yellow-500/40 flex-shrink-0 flex items-center justify-center bg-gray-800">
                <span className="text-8xl">🎮</span>
              </div>
              <div className="space-y-4 text-center md:text-left px-4 md:px-0">
                <h2 className="text-3xl font-bold font-heading">О нас</h2>
                <div className="space-y-4 max-w-2xl">
                  <p className="text-gray-300">
                    GoldVault — магазин игровой валюты для самых популярных онлайн-игр. Мы работаем с 2020 года и провели тысячи успешных сделок.
                  </p>
                  <p className="text-gray-300">
                    Пополняй золото, кристаллы и монеты в любой игре — без ожидания и лишних сложностей. Доставка на аккаунт в течение нескольких минут.
                  </p>
                  <p className="text-gray-300">
                    Гарантируем безопасность каждой сделки и поддержку 24/7. Если возникнет вопрос — мы всегда на связи.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center md:justify-start">
                  <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button
                      onClick={scrollToContact}
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[160px] mx-auto sm:mx-0"
                    >
                      Сделать заказ
                    </Button>
                    <Button
                      onClick={openChatbot}
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[160px] mx-auto sm:mx-0 flex items-center justify-center"
                    >
                      <Robot className="mr-1 h-4 w-4" />
                      Задать вопрос
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesSectionRef} id="services" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2
            ref={servicesTitleRef}
            className={cn(
              "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
              isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Что мы предлагаем
          </h2>
          <div
            ref={servicesContentRef}
            className={cn(
              "max-w-5xl mx-auto transition-all duration-1000 ease-out",
              isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Coins className="h-7 w-7 text-yellow-400 mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Игровая валюта</h3>
                </div>
                <p className="text-gray-300">
                  Золото, кристаллы, монеты, гемы и другая внутриигровая валюта для сотен популярных игр. Лучшие цены на рынке.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Zap className="h-7 w-7 text-blue-400 mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Мгновенная доставка</h3>
                </div>
                <p className="text-gray-300">
                  Валюта поступает на ваш игровой аккаунт в течение 5–15 минут после оплаты. Работаем круглосуточно.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Shield className="h-7 w-7 text-green-400 mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Безопасные сделки</h3>
                </div>
                <p className="text-gray-300">
                  Все сделки защищены. Мы не запрашиваем пароль от аккаунта и работаем только проверенными методами передачи.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
                <div className="flex items-center mb-4">
                  <Headphones className="h-7 w-7 text-purple-400 mr-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold font-heading">Поддержка 24/7</h3>
                </div>
                <p className="text-gray-300">
                  Наша команда всегда на связи. Помогаем с выбором игры, консультируем по объёмам и решаем любые вопросы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={contactSectionRef} id="contact" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2
            ref={headingRef}
            className={cn(
              "mb-4 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
              isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Сделать заказ
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Укажите игру, количество валюты и мы свяжемся с вами
          </p>
          <ContactForm />
        </div>
      </section>

      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  )
}
