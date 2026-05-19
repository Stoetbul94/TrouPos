export const pricingPackages = [
  {
    id: "essential",
    name: "Essential",
    price: "R1 490",
    period: "once-off",
    description: "A beautiful digital invite for intimate celebrations.",
    features: [
      "1 premium template",
      "RSVP form",
      "WhatsApp-ready link",
      "Event details & map",
      "7-day support",
    ],
    highlighted: false,
  },
  {
    id: "signature",
    name: "Signature",
    price: "R2 890",
    period: "once-off",
    description: "Our most popular package for unforgettable weddings.",
    features: [
      "All premium templates",
      "Unlimited RSVP guests",
      "Photo gallery section",
      "Custom colour accents",
      "Countdown & story timeline",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    id: "couture",
    name: "Couture",
    price: "R4 990",
    period: "once-off",
    description: "Bespoke cinematic experience for luxury celebrations.",
    features: [
      "Everything in Signature",
      "Custom section layout",
      "Video hero background",
      "Dedicated design session",
      "Guest list export ready",
      "White-glove onboarding",
    ],
    highlighted: false,
  },
] as const;

export const platformFeatures = [
  {
    id: "cinematic",
    title: "Cinematic motion",
    description:
      "Elegant Framer Motion reveals crafted for mobile — smooth on WhatsApp browsers.",
    icon: "film",
  },
  {
    id: "rsvp",
    title: "Effortless RSVP",
    description:
      "Guests respond in seconds with meal preferences and dietary notes built in.",
    icon: "mail",
  },
  {
    id: "whatsapp",
    title: "WhatsApp-first",
    description:
      "Share a single link with rich previews that look stunning when forwarded.",
    icon: "share",
  },
  {
    id: "za",
    title: "Made for South Africa",
    description:
      "en-ZA dates, +27 phone validation, and venues from Cape Town to Joburg.",
    icon: "map",
  },
  {
    id: "fast",
    title: "Lightning fast",
    description:
      "Optimised images, lazy-loaded templates, and minimal JavaScript on first paint.",
    icon: "zap",
  },
  {
    id: "templates",
    title: "Curated templates",
    description:
      "Luxury themes designed by specialists — no generic wedding-site look.",
    icon: "layout",
  },
] as const;

export const howItWorksSteps = [
  {
    step: "01",
    title: "Choose your template",
    description:
      "Browse cinematic designs and pick the mood that matches your celebration.",
  },
  {
    step: "02",
    title: "Personalise your story",
    description:
      "Add your names, dates, venues, gallery, and dress code in minutes.",
  },
  {
    step: "03",
    title: "Share with guests",
    description:
      "Send your unique link via WhatsApp — RSVPs arrive as guests respond.",
  },
] as const;

export const testimonials = [
  {
    id: "1",
    quote:
      "Our guests kept saying it felt like opening a film, not a PDF. The RSVP flow was seamless on mobile.",
    name: "Nomsa & David",
    location: "Johannesburg",
  },
  {
    id: "2",
    quote:
      "We shared the link on WhatsApp and had 80% of RSVPs within two days. Absolutely worth it.",
    name: "Leila & James",
    location: "Cape Town",
  },
  {
    id: "3",
    quote:
      "The classic template matched our Winelands wedding perfectly. Elegant, fast, and stress-free.",
    name: "Amara & Thabo",
    location: "Stellenbosch",
  },
] as const;

export const navLinks = [
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "#pricing" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
] as const;
