export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  tag: string;
  priceEstimate: string;
  iconName: string;
  bullets: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  verified: boolean;
  service: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const BUSINESS_DATA = {
  name: "Mr Perfect Home Services",
  tagline: "Austin's Home Safety & Clean Air Experts",
  phone: "(737) 299-7300",
  phoneRaw: "7372997300",
  phoneAlt: "(512) 991-9192",
  phoneAltRaw: "5129919192",
  rating: 4.6,
  reviewsCount: 92,
  hours: "7:00 AM - 7:00 PM Daily",
  serviceArea: "Austin & Greater Austin Metro Area",
  guarantee: "100% Zero-Mess & Certified Safety Guarantee",
  city: "Austin",
  state: "Texas",
  description:
    "Austin's premier residential chimney sweep, internal video camera safety inspections, fireplace restoration, and whole-home air duct sanitization specialists. 4.6★ Google rated across 92 local verified reviews.",
  services: [
    {
      id: "chimney-sweep",
      title: "Chimney Sweep & Creosote Removal",
      shortDesc: "Triple-stage negative air HEPA vacuum containment with deep rotary brush flue cleaning.",
      longDesc: "Eliminates dangerous flammable creosote, soot deposits, and draft blockages. Guaranteed 100% zero mess in your living space.",
      tag: "Most Popular",
      priceEstimate: "From $149",
      iconName: "Sparkles",
      bullets: [
        "Rotary whip creosote scrubbing",
        "Triple-layer floor protection tarps",
        "HEPA negative air soot containment",
        "Full draft & airflow verification"
      ]
    },
    {
      id: "camera-inspection",
      title: "Level 1 & 2 Camera Inspections",
      shortDesc: "High-definition 360° internal camera video scan of flue liners, smoke chambers, and crowns.",
      longDesc: "Crucial for annual fire safety, home purchases, insurance audits, or after smoke backdraft incidents.",
      tag: "Safety Critical",
      priceEstimate: "From $129",
      iconName: "SearchCheck",
      bullets: [
        "360° HD robotic camera flue scan",
        "Hidden liner crack & joint inspection",
        "NFPA 211 fire code safety evaluation",
        "Written photo/video inspection report"
      ]
    },
    {
      id: "fireplace-repair",
      title: "Fireplace Masonry & Damper Repair",
      shortDesc: "Firebox tuckpointing, refractory panel replacement, crown sealing, and top-mount damper fixes.",
      longDesc: "Restore cracked mortar joints, damaged refractory walls, and faulty dampers to preserve structural safety and prevent heat loss.",
      tag: "Restoration",
      priceEstimate: "Free Custom Estimate",
      iconName: "ShieldCheck",
      bullets: [
        "High-temp firebrick & mortar tuckpointing",
        "Energy-efficient top sealing dampers",
        "Waterproof CrownSeal crown coating",
        "Smoke shelf & firebox rebuilding"
      ]
    },
    {
      id: "air-duct-cleaning",
      title: "Whole-Home Air Duct Sanitization",
      shortDesc: "Medical-grade negative air extraction with botanical sanitization for pristine indoor breathing air.",
      longDesc: "Extract dust, allergens, pet dander, and mold spores from your HVAC supply and return lines to improve indoor air quality.",
      tag: "Clean Air / IAQ",
      priceEstimate: "From $199",
      iconName: "Wind",
      bullets: [
        "High-CFM negative air vacuum extraction",
        "Plant-based EPA botanical sanitizing",
        "Supply & return register scrub",
        "Blower compartment & coil check"
      ]
    },
    {
      id: "dryer-vent",
      title: "Dryer Vent Fire Prevention Cleaning",
      shortDesc: "Clear accumulated lint blockages that trigger appliance overheating and house fires.",
      longDesc: "Shortens laundry cycle times, prevents hazardous dryer fires, and cuts monthly electrical consumption.",
      tag: "Fire Prevention",
      priceEstimate: "From $99",
      iconName: "FlameKindling",
      bullets: [
        "Full run rotary lint clearing",
        "Exterior roof/wall booster hood check",
        "Airflow velocity CFM measurement",
        "Transition duct fire safety check"
      ]
    },
    {
      id: "chimney-caps",
      title: "Chimney Cap & Animal Screen Installations",
      shortDesc: "Heavy-gauge stainless steel & copper spark arrestors and critter exclusion barriers.",
      longDesc: "Keep Texas rainwater, birds, raccoons, squirrels, and downdrafts out of your home with lifetime warrantied caps.",
      tag: "Protection",
      priceEstimate: "From $189",
      iconName: "Home",
      bullets: [
        "100% Rust-proof stainless steel caps",
        "Heavy-duty animal exclusion mesh",
        "Rain & downdraft wind deflectors",
        "Precision custom flue sizing"
      ]
    }
  ] as ServiceItem[],
  serviceZones: [
    { name: "Downtown Austin", zip: "78701, 78703" },
    { name: "Westlake Hills & Rollingwood", zip: "78746" },
    { name: "Lakeway & Lake Travis", zip: "78734, 78738" },
    { name: "Round Rock", zip: "78664, 78665" },
    { name: "Cedar Park & Leander", zip: "78613, 78641" },
    { name: "Pflugerville", zip: "78660" },
    { name: "Georgetown", zip: "78626, 78628" },
    { name: "Buda & Kyle", zip: "78610, 78640" },
    { name: "South Congress & Sunset Valley", zip: "78704, 78745" },
    { name: "Bee Cave & Steiner Ranch", zip: "78732, 78736" }
  ],
  reviews: [
    {
      id: "1",
      author: "Marcus Sterling",
      location: "Westlake Hills, Austin",
      rating: 5,
      date: "2 days ago",
      review: "Called Mr Perfect after smelling soot during the cold snap. The technician arrived on time, wore shoe covers, set up clean tarps, and showed us a high-def camera feed of our flue before fixing the damper. 100% zero dust in our living room!",
      verified: true,
      service: "Chimney Sweep & Camera Scan"
    },
    {
      id: "2",
      author: "Elena Vasquez",
      location: "Round Rock, TX",
      rating: 5,
      date: "1 week ago",
      review: "We booked the whole-home air duct sanitization along with a chimney safety check. The air in our home feels noticeably fresher and cleaner, and the crew was extremely respectful of our hardwood floors.",
      verified: true,
      service: "Air Duct & Chimney Package"
    },
    {
      id: "3",
      author: "David K.",
      location: "Lakeway, TX",
      rating: 5,
      date: "2 weeks ago",
      review: "Top notch! They installed a heavy-duty stainless steel chimney cap after birds tried nesting in the flue. Quick turnaround, transparent pricing, and wonderful communication throughout.",
      verified: true,
      service: "Chimney Cap & Animal Screen"
    },
    {
      id: "4",
      author: "Sarah Jenkins",
      location: "Central Austin (78703)",
      rating: 5,
      date: "3 weeks ago",
      review: "The dryer vent cleaning was a game-changer! Our dryer now finishes in 35 minutes instead of 90. Friendly, knowledgeable technicians who explained everything thoroughly.",
      verified: true,
      service: "Dryer Vent Safety Cleaning"
    }
  ] as ReviewItem[],
  faqs: [
    {
      question: "How does your 100% Zero-Mess Guarantee work?",
      answer: "We treat your home with total respect. Before starting any work, our technicians lay heavy-duty floor runners, seal off the fireplace opening with magnetic static containment barriers, and connect high-capacity HEPA negative air vacuums to capture 99.97% of airborne particulate matter."
    },
    {
      question: "How often should I clean my chimney and air ducts in Austin?",
      answer: "The National Fire Protection Association (NFPA Standard 211) recommends an annual chimney inspection and cleaning. For air ducts, the EPA suggests cleaning every 2 to 3 years, or immediately following home remodeling, moving into a new residence, or if family members suffer from allergies."
    },
    {
      question: "What is included in a Level 2 Camera Safety Inspection?",
      answer: "A Level 2 inspection involves a specialized 360° internal camera that traverses the entire chimney flue from firebox to crown. We inspect all internal flue joints, check for combustible clearances, and generate a written report with photos."
    },
    {
      question: "Do you offer same-day emergency dispatch across Austin?",
      answer: "Yes! We operate 7:00 AM - 7:00 PM Daily across Austin, Westlake, Round Rock, Cedar Park, Lakeway, and surrounding suburbs. For urgent smoke drafts, animal intrusions, or escrow deadlines, call us directly at (737) 299-7300."
    }
  ] as FaqItem[]
};
