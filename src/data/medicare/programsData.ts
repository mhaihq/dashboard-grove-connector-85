
// Suggested Programs
export const suggestedPrograms = [
  {
    program: "Chronic Care Management (CCM)",
    match: "perfect" as const,
    status: "Enrolled" as const,
    description: "Ongoing support for chronic conditions",
    action: "Monitor BP 🩺",
    relevantAreas: ["Sleep", "Stress Management"]
  },
  {
    program: "Remote Patient Monitoring (RPM)",
    match: "perfect" as const,
    status: "Available" as const,
    description: "Track health metrics from home",
    action: "Enroll Now",
    relevantAreas: ["Sleep", "Energy Level"]
  },
  {
    program: "Behavioral Health Integration (BHI)",
    match: "possible" as const,
    status: "Eligible" as const,
    description: "Mental health support services",
    action: "Learn More",
    relevantAreas: ["Emotional Regulation"]
  },
  {
    program: "Principal Care Management (PCM)",
    match: "none" as const,
    status: "Not Eligible" as const,
    description: "Focused on single condition management"
  }
];

// Medicare Programs
export const medicarePrograms = [
  {
    name: "Care Coordination Support",
    originalName: "Chronic Care Management (CCM)",
    description: "Ongoing support for chronic conditions with regular monitoring and care coordination.",
    eligibility: "Medicare beneficiaries with 2+ chronic conditions expected to last at least 12 months.",
    coverage: "Medicare Part B covers 80% of the approved amount after you've met your Part B deductible.",
    benefits: [
      "24/7 access to healthcare providers for urgent care needs",
      "Regular review of medications to prevent interactions",
      "Coordination between all your healthcare providers",
      "Personalized care plan that's regularly updated"
    ],
    icon: "shield" as const,
    isEligible: true
  },
  {
    name: "Home Health Monitoring",
    originalName: "Remote Patient Monitoring (RPM)",
    description: "Track health metrics from home with devices that send data to your healthcare provider.",
    eligibility: "Medicare beneficiaries whose providers have ordered RPM services.",
    coverage: "Medicare Part B covers RPM services for patients with acute and chronic conditions.",
    benefits: [
      "Reduce need for in-person visits",
      "Early detection of health issues",
      "More consistent monitoring of vital signs",
      "Real-time alerts for concerning measurements"
    ],
    icon: "heart" as const,
    isEligible: true
  },
  {
    name: "Mental Health Integration",
    originalName: "Behavioral Health Integration (BHI)",
    description: "Mental health services integrated with your primary care.",
    eligibility: "Medicare beneficiaries with behavioral health conditions like depression or anxiety.",
    coverage: "Medicare Part B covers BHI services when provided by eligible professionals.",
    benefits: [
      "Regular assessment of your condition",
      "Care planning for behavioral health needs",
      "Brief interventions using evidence-based techniques",
      "Monitoring your progress with regular follow-ups"
    ],
    icon: "brain" as const,
    isEligible: false
  },
  {
    name: "Focused Condition Support",
    originalName: "Principal Care Management (PCM)",
    description: "Focused care management for a single high-risk condition.",
    eligibility: "Medicare beneficiaries with one complex chronic condition that's expected to last at least 3 months.",
    coverage: "Medicare Part B covers PCM services when provided by eligible professionals.",
    benefits: [
      "Dedicated focus on your most serious health concern",
      "Development of a disease-specific care plan",
      "Medication management for your condition",
      "Coordination with specialists for your condition"
    ],
    icon: "clipboard" as const,
    isEligible: false
  }
];
