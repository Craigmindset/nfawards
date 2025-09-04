"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect } from "react"
import {
  ArrowUpRight,
  X,
  ChevronRight,
  CookingPot,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Award,
  Users,
  Heart,
  Trophy,
  Computer,
} from "lucide-react"
import CountdownTimer from "@/components/countdown-timer"
import MobileMenu from "@/components/mobile-menu"
import SwipeableCategories from "@/components/swipeable-categories"
import AudioNotification from "@/components/audio-notification"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const navLinks = [
    { href: "#top", label: "Home" },
    { href: "#nominees-section", label: "Nominees" },
    { href: "#partners-section", label: "Partners" },
    { href: "#about-section", label: "About" },
    { href: "#", label: "Media" },
  ]

  const [showVotingPopup, setShowVotingPopup] = useState(false)
  const [showPassPopup, setShowPassPopup] = useState(false)
  const isMobile = useMobile()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const videoUrl =
    "https://dohdf572hojoyskk.public.blob.vercel-storage.com/Awards%20Ceremony%20Opener%20Video%20-%20After%20Effects%20Template%20%28online-video-cutter.com%29-Gdnw07dcbQ2qBWQxcdte8cGWVxhfaV.mp4"

  // Handle video playback for Safari
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Function to check if browser is Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    // Function to attempt playing the video
    const attemptPlay = () => {
      video
        .play()
        .then(() => {
          setVideoLoaded(true)
          console.log("Video playing successfully")
        })
        .catch((error) => {
          console.error("Error playing video:", error)
          // If autoplay fails, we'll rely on the poster image
        })
    }

    // Make sure video is muted (required for autoplay)
    video.muted = true

    // Define handleUserInteraction outside the conditional block but within useEffect
    const handleUserInteraction = () => {
      if (!videoLoaded) {
        attemptPlay()
      }
      // Remove the event listener after first interaction
      document.removeEventListener("click", handleUserInteraction)
    }

    // For Safari, we need to wait until the video is loaded
    if (isSafari) {
      video.addEventListener("loadedmetadata", attemptPlay)
      // Also try to play on canplay event
      video.addEventListener("canplay", attemptPlay)

      // Add a click handler to the document to try playing on user interaction
      document.addEventListener("click", handleUserInteraction)
    } else {
      // For other browsers, just attempt to play
      attemptPlay()
    }

    return () => {
      if (isSafari && video) {
        video.removeEventListener("loadedmetadata", attemptPlay)
        video.removeEventListener("canplay", attemptPlay)
      }
      document.removeEventListener("click", handleUserInteraction)
    }
  }, [videoLoaded])

  return (
    <main className="min-h-screen pt-[72px]">
      {/* Audio Notification */}
      <AudioNotification
        audioUrl="https://dohdf572hojoyskk.public.blob.vercel-storage.com/2%20Unlimited%20-%20Get%20Ready%20For%20This-rX56iNR4zWbmYEbPeGVs3dtjZ1D6ub.mp3"
        delay={10000}
      />

      {/* Header */}
      <header className="bg-black border-b fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-5 md:py-6 lg:py-7 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="#top" className="flex items-center">
              <Image
                src="/nfawards-logo.png"
                alt="Nigeria Fitness Awards"
                width={180}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href} className="text-sm font-medium text-white hover:text-gold-400">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="#sponsor"
              className="bg-[#D4AF37] text-black text-sm px-4 py-2 rounded-sm hover:bg-[#C4A030] transition"
            >
              Become a sponsor
            </Link>
            <Link
              href="#nominees-section"
              className="bg-white text-black text-sm px-4 py-2 rounded-sm flex items-center gap-1 hover:bg-gray-50 transition"
            >
              See Nominee List
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <MobileMenu links={navLinks} />
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative min-h-[100vh] bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/awards-laurel-bg.jpeg"
            width="1920"
            height="1080"
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Fallback text for browsers that don't support video */}
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 z-[-1]">
            <Image
              src="/awards-laurel-bg.jpeg"
              alt="Fitness Awards background"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center pb-0 md:pb-16 lg:pb-32">
            <div className="flex flex-col items-center md:items-start h-full pt-24 sm:pt-20 pb-20">
              <div className="pl-0 text-center md:text-left sm:pl-4 md:pl-8 lg:pl-12 max-w-3xl pt-16 sm:pt-0">
                <h1 className="font-bebas-neue text-white text-5xl sm:text-6xl md:text-7xl font-bold leading-tight md:mt-8 lg:mt-12">
                  WHERE FITNESS <br />
                  MEETS EXCELLENCE
                </h1>
                <div className="mt-6 md:mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                  <Link
                    href="#signup"
                    className="bg-[#D4AF37] text-black px-5 sm:px-6 py-2 sm:py-3 rounded-sm flex items-center gap-1 hover:bg-[#C4A030] transition text-sm sm:text-base"
                  >
                    Signup
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#nominate"
                    className="bg-transparent border border-white text-white px-5 sm:px-6 py-2 sm:py-3 rounded-sm hover:bg-white/10 transition text-sm sm:text-base"
                  >
                    Nominate 
                  </Link>
                </div>

                <div className="space-y-4 max-w-xl font-pp-neue mt-8">
                  <p className="text-sm sm:text-base text-gray-300 text-justify">
                    The Nigeria Fitness Awards (NFAWARD) is the premier celebration of fitness excellence, bringing
                    together athletes, trainers, and industry leaders to recognize outstanding achievements in the
                    Nigerian fitness community. It's a platform where fitness enthusiasts, professionals, and brands
                    converge to celebrate innovations, build partnerships, and inspire the nation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Hosts Section */}
      <section id="hosts" className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/host-section-bg.jpeg" alt="Background" fill className="object-cover opacity-30" priority />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            <div className="px-0 md:px-8 order-2 lg:order-1">
              <h2 className="font-bebas-neue text-3xl sm:text-4xl font-bold leading-none mb-6 sm:mb-8 text-center lg:text-left">
                OUR EVENT HOST
              </h2>

              <div className="mb-8">
                <p className="text-gray-700 mb-4 text-sm sm:text-base text-justify md:text-left">
                  We're thrilled to announce Bobby Uranta as the official hosts for this year's Nigeria
                  Fitness Awards. Their passion for fitness, vibrant personalities, and deep connection to Nigeria's
                  wellness community make them the perfect pair to guide us through this celebration of excellence.
                </p>

                <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base text-justify md:text-left">
                  With their combined experience in entertainment and fitness, Nancy and Bobby will bring energy,
                  insight, and star power to the stage as we honor the best in Nigeria's fitness industry.
                </p>

                <button
                  onClick={() => setShowPassPopup(true)}
                  className="bg-black text-white px-5 sm:px-6 py-2 sm:py-3 rounded-sm inline-flex items-center gap-1 hover:bg-black/80 transition text-sm sm:text-base"
                >
                  Get your pass
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-4 md:px-12">
                <div className="flex flex-col items-center">
                  <div className="rounded-lg overflow-hidden mb-2 flex justify-center">
                    <Image
                      src="/guess%20host.png"
                      alt="Guess the Host"
                      width={280}
                      height={280}
                      className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                    />
                  </div>
                  {/* Nancy's name and title removed */}
                </div>
                <div className="flex flex-col items-center">
                  <div className="rounded-lg overflow-hidden mb-2 flex justify-center">
                    <Image
                      src="/bobby-uranta.png"
                      alt="Bobby Uranta - Event Host"
                      width={280}
                      height={280}
                      className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold">BOBBY URANTA</h3>
                  <p className="text-gray-700 text-xs sm:text-sm">Celebrity Fitness Trainer | Lifestyle Coach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Nominees Grid */}
      <section id="nominees-section" className="py-12 sm:py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-bebas-neue text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              MEET OUR AWARDS 2025 NOMINEES
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">Top fitness brands competing for excellence</p>
          </div>

          <style jsx global>{`
            @keyframes beep {
              0%, 100% { background-color: #10B981; }
              50% { background-color: #EAB308; }
            }
            .beeping-dot {
              animation: beep 1.5s infinite;
            }
            
            @keyframes cooking {
              0% { transform: scale(0.8); opacity: 0.5; }
              50% { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(0.8); opacity: 0.5; }
            }
            .cooking-animation {
              animation: cooking 2s infinite;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .spinner {
              animation: spin 1.5s linear infinite;
            }
          `}</style>

          <div className="max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-3 lg:gap-2 pl-4 sm:pl-8 md:pl-12">
            {/* Row 1 */}
            <div className="flex flex-col">
              <div className="bg-white aspect-square mb-3 rounded-lg overflow-hidden flex items-center justify-center p-4">
                <Image
                  src="/four-points-sheraton.png"
                  alt="Four Points by Sheraton Lagos"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="beeping-dot w-2 h-2 rounded-full"></div>
                <span className="text-xs">Voting in progress</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg">Four Points by Sheraton</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3">Best Hotel Fitness Center</p>
              <button
                onClick={() => setShowVotingPopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-sm transition text-sm"
              >
                Vote Now
              </button>
            </div>

            <div className="flex flex-col">
              <div className="bg-white aspect-square mb-3 rounded-lg overflow-hidden flex items-center justify-center p-4">
                <Image
                  src="/fitness-factory.png"
                  alt="Fitness Factory"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="beeping-dot w-2 h-2 rounded-full"></div>
                <span className="text-xs">Voting in progress</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg">Fitness Factory</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3">Best Fitness Equipment Provider</p>
              <button
                onClick={() => setShowVotingPopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-sm transition text-sm"
              >
                Vote Now
              </button>
            </div>

            <div className="flex flex-col">
              <div className="bg-white aspect-square mb-3 rounded-lg overflow-hidden flex items-center justify-center p-4">
                <Image
                  src="/fitgrit.png"
                  alt="FitGrit"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="beeping-dot w-2 h-2 rounded-full"></div>
                <span className="text-xs">Voting in progress</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg">FitGrit</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3">Best Fitness Training Program</p>
              <button
                onClick={() => setShowVotingPopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-sm transition text-sm"
              >
                Vote Now
              </button>
            </div>

            <div className="flex flex-col">
              <div className="bg-white aspect-square mb-3 rounded-lg overflow-hidden flex items-center justify-center p-4">
                <Image
                  src="/fitness-plus.png"
                  alt="Fitness+"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="beeping-dot w-2 h-2 rounded-full"></div>
                <span className="text-xs">Voting in progress</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg">Fitness+</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3">Best Digital Fitness Platform</p>
              <button
                onClick={() => setShowVotingPopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-sm transition text-sm"
              >
                Vote Now
              </button>
            </div>

            {/* Additional nominees (showing first 4 on mobile, all on larger screens) */}
            <div className="flex flex-col md:flex">
              <div className="bg-white aspect-square mb-3 rounded-lg overflow-hidden flex items-center justify-center p-4">
                <Image
                  src="/fit-fab-gym.png"
                  alt="Fit & Fab Gym"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="beeping-dot w-2 h-2 rounded-full"></div>
                <span className="text-xs">Voting in progress</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg">Fit & Fab Gym</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3">Best Boutique Fitness Studio</p>
              <button
                onClick={() => setShowVotingPopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-sm transition text-sm"
              >
                Vote Now
              </button>
            </div>

            <div className="flex flex-col md:flex">
              <div className="bg-white aspect-square mb-3 rounded-lg overflow-hidden flex items-center justify-center p-4">
                <Image
                  src="/golden-c.png"
                  alt="Golden C Fitness"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="beeping-dot w-2 h-2 rounded-full"></div>
                <span className="text-xs">Voting in progress</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg">Golden C Fitness</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3">Best Luxury Fitness Experience</p>
              <button
                onClick={() => setShowVotingPopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-sm transition text-sm"
              >
                Vote Now
              </button>
            </div>

            <div className="flex flex-col lg:flex">
              <div className="bg-white aspect-square mb-3 rounded-lg overflow-hidden flex items-center justify-center p-4">
                <Image
                  src="/irep.png"
                  alt="iREP Fitness"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="beeping-dot w-2 h-2 rounded-full"></div>
                <span className="text-xs">Voting in progress</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg">iREP Fitness</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3">Best Home Workout Equipment</p>
              <button
                onClick={() => setShowVotingPopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-sm transition text-sm"
              >
                Vote Now
              </button>
            </div>

            <div className="flex flex-col lg:flex">
              <div className="bg-white aspect-square mb-3 rounded-lg overflow-hidden flex items-center justify-center p-4">
                <Image
                  src="/i-fitness.png"
                  alt="i-Fitness"
                  width={300}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="beeping-dot w-2 h-2 rounded-full"></div>
                <span className="text-xs">Voting in progress</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg">i-Fitness</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3">Best Fitness Chain</p>
              <button
                onClick={() => setShowVotingPopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-sm transition text-sm"
              >
                Vote Now
              </button>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="#nominees-section"
              className="bg-white text-black px-5 sm:px-6 py-2 sm:py-3 rounded-sm inline-flex items-center gap-1 hover:bg-gray-200 transition text-sm sm:text-base"
            >
              View All Nominees
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Media Passes Section */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 z-0">
          <Image src="/media-pass-bg-new.jpeg" alt="Media Pass Background" fill className="object-cover" priority />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-start items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            <div className="mb-6 md:mb-0 pl-0 sm:pl-4 md:pl-12 lg:pl-20 text-center md:text-left">
              <h3 className="text-white text-xs sm:text-sm mb-3 sm:mb-4 flex items-center gap-2 justify-center md:justify-start">
                <ChevronRight className="w-4 h-4" /> See categories
              </h3>
              <h2 className="text-white font-bebas-neue text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
                YOU CAN BE <br className="md:hidden" />
                THE <span className="text-[#D4AF37]">NEXT NOMINEE!</span>
              </h2>
            </div>
            <div className="ml-0 md:ml-16 lg:ml-24 xl:ml-32">
              <Link
                href="#media-pass"
                className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-sm inline-flex items-center gap-2 hover:bg-gray-100 transition text-sm sm:text-base"
              >
                Apply here
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Banner */}
      <div className="bg-gray-800 text-white p-4 relative">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <CookingPot className="w-5 h-5" />
            <p className="text-sm sm:text-base">We are cooking things up</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <CountdownTimer targetDate="2025-06-01T00:00:00" />
            <Link
              href="#nominees-section"
              className="bg-white text-black px-4 py-2 rounded-sm hover:bg-gray-100 transition text-sm w-full sm:w-auto text-center"
            >
              See Nominee list
            </Link>
          </div>
          <button className="absolute right-2 top-4 sm:top-1/2 sm:-translate-y-1/2 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <section id="categories" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-bebas-neue text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">
            NIGERIAN FITNESS AWARD (NFA) CATEGORIES
          </h2>
          <p className="text-center text-base sm:text-lg mb-6 sm:mb-8 max-w-3xl mx-auto">
            A voting website platform will be created to enable voting in different categories.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Top categories</h3>

          {/* Mobile Swipeable View */}
          <div className="md:hidden">
            <SwipeableCategories
              categories={[
                {
                  title: "Best Gym Category 2024",
                  description:
                    "Recognizing excellence in gym facilities, equipment, services, and overall member experience.",
                },
                {
                  title: "Best Fitness Coach category 2024",
                  description:
                    "Honoring outstanding fitness coaches who demonstrate exceptional knowledge, client results, and teaching abilities.",
                },
                {
                  title: "Best Influencer category 2024",
                  description:
                    "Celebrating fitness influencers who inspire and motivate their audience with quality content and authentic engagement.",
                },
                {
                  title: "Best Fitness Band Category 2024",
                  description:
                    "Recognizing the most innovative and effective fitness bands and wearable technology in the market.",
                },
                {
                  title: "Best Wellness & Spa Category 2024",
                  description:
                    "Honoring exceptional wellness centers and spas that provide outstanding services for physical and mental wellbeing.",
                },
                {
                  title: "Best Fitness app category 2024",
                  description: "Celebrating the most user-friendly, innovative, and effective fitness applications.",
                },
                {
                  title: "Best fitness Dance Schools 2024",
                  description:
                    "Recognizing dance schools that excel in fitness-oriented dance programs and instruction.",
                },
                {
                  title: "Sexiest man and woman alive 2024",
                  description:
                    "Honoring individuals who embody fitness excellence and inspire others with their dedication to health and wellness.",
                },
              ]}
            />
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="border p-4 sm:p-6 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">Best Gym Category 2024</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Recognizing excellence in gym facilities, equipment, services, and overall member experience.
              </p>
            </div>

            <div className="border p-4 sm:p-6 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">
                Best Fitness Coach category 2024
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Honoring outstanding fitness coaches who demonstrate exceptional knowledge, client results, and teaching
                abilities.
              </p>
            </div>

            <div className="border p-4 sm:p-6 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">
                Best Influencer category 2024
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Celebrating fitness influencers who inspire and motivate their audience with quality content and
                authentic engagement.
              </p>
            </div>

            <div className="border p-4 sm:p-6 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">
                Best Fitness Band Category 2024
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Recognizing the most innovative and effective fitness bands and wearable technology in the market.
              </p>
            </div>

            <div className="border p-4 sm:p-6 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">
                Best Wellness & Spa Category 2024
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Honoring exceptional wellness centers and spas that provide outstanding services for physical and mental
                wellbeing.
              </p>
            </div>

            <div className="border p-4 sm:p-6 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">
                Best Fitness app category 2024
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Celebrating the most user-friendly, innovative, and effective fitness applications.
              </p>
            </div>

            <div className="border p-4 sm:p-6 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">
                Best fitness Dance Schools 2024
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Recognizing dance schools that excel in fitness-oriented dance programs and instruction.
              </p>
            </div>

            <div className="border p-4 sm:p-6 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">
                Sexiest man and woman alive 2024
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Honoring individuals who embody fitness excellence and inspire others with their dedication to health
                and wellness.
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="#voting"
              className="bg-black text-white px-5 sm:px-6 py-2 sm:py-3 rounded-sm inline-flex items-center gap-1 hover:bg-black/80 transition text-sm sm:text-base"
            >
              Vote for your favorites
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="partners-section" className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="font-bebas-neue text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">OUR PARTNERS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white p-4 sm:p-8 w-full h-24 sm:h-32 flex items-center justify-center">
                <div className="text-gray-300 font-bold text-base sm:text-xl">SPONSOR {i}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="#sponsor"
              className="bg-black text-white px-5 sm:px-6 py-2 sm:py-3 rounded-sm inline-flex items-center gap-1 hover:bg-black/80 transition text-sm sm:text-base"
            >
              Become a sponsor
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-16 sm:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-bebas-neue text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                ABOUT <span className="text-[#D4AF37]">NFAWARD</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto">
                Celebrating excellence in Nigeria's fitness community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
              <div className="space-y-6">
                <p className="text-gray-300 text-sm sm:text-base text-justify">
                  The Nigerian Fitness Award (NFA) is an annual award ceremony designed to recognize and celebrate
                  excellence across Nigeria's fitness landscape. From dedicated enthusiasts to professional trainers,
                  from state-of-the-art gyms to innovative influencers, nutritionists, therapists, and wellness spas—NFA
                  honors those who elevate the standards of fitness in Nigeria.
                </p>
                <p className="text-gray-300 text-sm sm:text-base text-justify">
                  Founded with a vision to spotlight the transformative power of fitness, NFA has become the premier
                  platform for acknowledging outstanding contributions to physical wellness and healthy living
                  throughout the country. Our awards celebrate not just physical achievements, but the dedication,
                  innovation, and passion that drive Nigeria's fitness revolution forward.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-gray-300 text-sm sm:text-base text-justify">
                  Through our annual ceremony and year-round initiatives, NFA is committed to promoting healthy living,
                  physical wellness, and mental fitness. We believe in the power of recognition to inspire excellence
                  and foster a competitive spirit that elevates the entire fitness community.
                </p>
                <p className="text-gray-300 text-sm sm:text-base text-justify">
                  By highlighting success stories and innovative approaches to fitness, we aim to motivate individuals
                  across Nigeria to embrace healthier lifestyles. NFA serves as both a celebration of current excellence
                  and a catalyst for future growth in Nigeria's vibrant and expanding fitness ecosystem.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-gray-900 p-6 rounded-lg text-center hover:bg-gray-800 transition">
                <div className="text-[#D4AF37] mb-4 flex justify-center">
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg mb-2">Recognition</h3>
                <p className="text-gray-400 text-sm">
                  Celebrating excellence across all fitness disciplines and specialties
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg text-center hover:bg-gray-800 transition">
                <div className="text-[#D4AF37] mb-4 flex justify-center">
                  <Heart className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg mb-2">Wellness</h3>
                <p className="text-gray-400 text-sm">
                  Promoting physical health and mental wellbeing through fitness awareness
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg text-center hover:bg-gray-800 transition">
                <div className="text-[#D4AF37] mb-4 flex justify-center">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg mb-2">Community</h3>
                <p className="text-gray-400 text-sm">
                  Building a stronger, more connected fitness community across Nigeria
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg text-center hover:bg-gray-800 transition">
                <div className="text-[#D4AF37] mb-4 flex justify-center">
                  <Trophy className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg mb-2">Excellence</h3>
                <p className="text-gray-400 text-sm">
                  Inspiring competition and innovation in fitness practices and services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 ml-6">
            <div>
              <div className="mb-4">
                <Image
                  src="/nfawards-logo.png"
                  alt="Nigeria Fitness Awards"
                  width={180}
                  height={50}
                  className="h-8 sm:h-10 w-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-1 lg:gap-0">
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                  <li>
                    <Link href="#top" className="hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#nominees-section" className="hover:text-white">
                      Nominees
                    </Link>
                  </li>
                  <li>
                    <Link href="#categories" className="hover:text-white">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="#about-section" className="hover:text-white">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Media</h3>
                <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                  <li>
                    <Link href="#" className="hover:text-white">
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Campaigns
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Influencers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      Asset Guide
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email: info@nfaward.com
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    +2348033704704
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <Link
                    href="https://www.instagram.com/nfawards?igsh=c3czZ21yMDBtYjQ0"
                    className="text-gray-400 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Twitter className="w-5 h-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Facebook className="w-5 h-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    <Linkedin className="w-5 h-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-400 text-xs sm:text-sm">
            <p className="flex items-center justify-center gap-2">
              © 2025 Nigeria Fitness Awards. All rights reserved.
              <Link
                href="https://iamcraig.com.ng"
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Computer className="w-4 h-4" />
                <span>i_am_craig</span>
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {typeof window !== "undefined" && <ScrollToTopButton />}

      {/* Voting Popup */}
      {showVotingPopup && <VotingPopup onClose={() => setShowVotingPopup(false)} />}

      {/* Pass Popup */}
      {showPassPopup && <PassPopup onClose={() => setShowPassPopup(false)} />}
    </main>
  )
}

const VotingPopup = ({ onClose }: { onClose: () => void }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop, not the popup content
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
      <div className="bg-white text-black rounded-md max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="mb-4 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Voting session is currently on pause</h3>
          <p className="text-gray-600 mb-6">Click our Nominee list to nominate your categories.</p>
          <Link
            href="#nominees-section"
            className="bg-[#D4AF37] text-black px-5 py-2 rounded-sm inline-flex items-center gap-1 hover:bg-[#C4A030] transition"
            onClick={onClose}
          >
            View Nominees
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Get the height of the first section (hero section)
      const firstSectionHeight = document.getElementById("top")?.offsetHeight || 800

      // Show button when user scrolls past the first section
      if (window.scrollY > firstSectionHeight) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    // Initial check
    toggleVisibility()

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return isVisible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 bg-[#D4AF37] text-black p-2 rounded-full shadow-lg hover:bg-[#C4A030] transition-all z-50"
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevron-up"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  ) : null
}

const PassPopup = ({ onClose }: { onClose: () => void }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop, not the popup content
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
      <div className="bg-white text-black rounded-md max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="mb-6 h-48 flex items-center justify-center">
            <div className="relative">
              <CookingPot className="w-20 h-20 text-[#D4AF37] cooking-animation" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full spinner"></div>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">Will be available soon</h3>
          <p className="text-gray-600 mb-6">We are cooking things up!</p>
        </div>
      </div>
    </div>
  )
}
