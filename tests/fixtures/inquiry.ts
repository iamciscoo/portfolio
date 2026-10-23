import type { ContactInput } from "@/lib/contact-schema";

export const emailPreviewInquiry: ContactInput = {
  name: "Email Preview Visitor",
  email: "preview@example.com",
  phone: "+255 712 345 678",
  company: "Example shop",
  service: "business",
  budget: "medium",
  timeline: "soon",
  locale: "fr",
  description:
    "I'd like a website for my shop.\nPeople should be able to browse products on their phone and ask about delivery.\nI have photos and a logo ready.",
  consent: true,
  website: "",
  requestId: "05a8fb59-89ef-4987-afd0-604a5d642dd9",
};
