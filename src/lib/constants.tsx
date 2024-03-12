import {
  CircleFadingPlus,
  ImageUp,
  MessageSquareMore,
  Share2,
  ShieldCheck,
  Wand,
} from "lucide-react";

export const navigation = [
  { title: "Features", href: "#features" },
  { title: "Pricing", href: "#pricing" },
  { title: "Customers", href: "#testimonial" },
];

export const pricingPlans = [
  {
    priceId: "",
    name: "Basic Plan",
    desc: "Perfect for new videographers",
    price: 0,
    isMostPop: false,
    features: [
      "Unlimited video uploads",
      "Customizable Templates",
      "Basic Analytics",
      "Public Galleries",
      "Download Permissions",
      "Email Support",
    ],
  },
  {
    priceId: "price_1OYxkqFj9oKEERu1KfJGWxgN",
    name: "Pro Plan",
    desc: "Ideal for professionals",
    price: 12,
    isMostPop: true,
    features: [
      "Unlimited video uploads",
      "Advanced Customization",
      "Detailed Analytics",
      "Private Galleries",
      "Client Feedback Tools",
      "Priority Email Support",
    ],
  },
  {
    priceId: "price_1OYxkqFj9oKEERu1NbKUxXxN",
    name: "Business Plan",
    desc: "Built for studios and agencies",
    price: 32,
    isMostPop: false,
    features: [
      "All features in Pro Plan",
      "Branded Client Portals",
      "Multi-User Access",
      "Cloud Storage",
      "Custom Domain",
      "Dedicated Support",
    ],
  },
];

export const testimonials = [
  {
    avatar: "/testimonial/user4.webp",
    name: "Mark Zuckerberg",
    title: "Founder of Meta",
    quote:
      "We've been using Vowsuite for almost a year now and are thoroughly impressed. Setting up video galleries is straightforward, and the analytics provide deep insights into viewer engagement.",
  },
  {
    avatar: "/testimonial/user4.webp",
    name: "Guillermo Rauch",
    title: "Founder of Vercel",
    quote:
      "Vowsuite has revolutionized how we share project videos with clients. Its user-friendly interface makes managing our video content a breeze.",
  },
  {
    avatar: "/testimonial/user4.webp",
    name: "Sidi Jeddou",
    title: "Founder of Float UI",
    quote:
      "For anyone seeking a powerful yet intuitive video sharing platform, I highly recommend Vowsuite. It has significantly streamlined our video sharing process.",
  },
  {
    avatar: "/testimonial/user4.webp",
    name: "Ghazbel",
    title: "Founder of ForceY",
    quote:
      "I'm extremely impressed with Vowsuite's intuitive platform and the seamless experience it offers. The customization options for video galleries are a game-changer.",
  },
  {
    avatar: "/testimonial/user4.webp",
    name: "Ana Khan",
    title: "Founder of Larax",
    quote:
      "Vowsuite is the best video hosting service I've ever used. It's incredibly simple to navigate, yet packed with powerful features for video management.",
  },
  {
    avatar: "/testimonial/user4.webp",
    name: "Ahmed Khasem",
    title: "Founder of Let's Code",
    quote:
      "Vowsuite is definitely the way to go for professional video sharing. I can't recommend it enough for its ease of use and comprehensive video management tools.",
  },
];

export const visualFeaturesList = [
  {
    title: "Showcase unlimited videos",
    desc: "Display an unlimited number of videos seamlessly. Tailor each gallery to reflect your unique brand and the essence of every event.",
    img: "/images/Feature-1.svg",
  },
  {
    title: "Seamless viewing, anywhere",
    desc: "Offer your clients a professional, ad-free viewing experience, from mobile to 4K TV, ensuring their cherished moments are always a tap away.",
    img: "/images/Feature-2.svg",
  },
];

export const featuresList = [
  {
    icon: <Wand className="h-8 w-8 text-white" />,
    title: "Customized Galleries",
    desc: "Craft galleries tailored to each event, ensuring a unique and personalized showcase for your clients.",
  },
  {
    icon: <ImageUp className="h-8 w-8 text-white" />,
    title: "Branded Experience",
    desc: "Incorporate your logo and brand colors, providing a cohesive viewing experience across all videos.",
  },
  {
    icon: <MessageSquareMore className="h-8 w-8 text-white" />,
    title: "Direct Feedback Channels",
    desc: "Enable real-time feedback on your videos, allowing for immediate client interaction and satisfaction.",
  },
  {
    icon: <Share2 className="h-8 w-8 text-white" />,
    title: "Easy Sharing & Downloads",
    desc: "Effortlessly share galleries with clients and enable easy video downloads for personal use.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-white" />,
    title: "Client-Specific Access",
    desc: "Control who sees your work with client-specific access, ensuring privacy and exclusivity.",
  },
  {
    icon: <CircleFadingPlus className="h-8 w-8 text-white" />,
    title: "Integrate with Social Platforms",
    desc: "Easily share your video galleries on social media, expanding your reach and engagement.",
  },
];