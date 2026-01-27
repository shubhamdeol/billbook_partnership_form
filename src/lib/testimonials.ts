export interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sanjay Jadoun",
    title: "Founder",
    company: "YoloBus",
    quote:
      "We were losing money to cash leaks with no real-time spending data. CashBook channels fuel and toll payments through manager wallets, letting us track spend per kilometre. We've cut waste by 30% and plugged leaks fast with auditable digital payments.",
  },
  {
    id: 2,
    name: "Arun Agarwal",
    title: "Founder",
    company: "Janitri",
    quote:
      "In our clinical trials, administrative work is a distraction. CashBook lets our clinicians buy consumables via UPI while finance auto-tags each cost to the right study. Our admin time is halved, so we stay focused on protecting mothers and babies, not chasing receipts.",
  },
  {
    id: 3,
    name: "Suchita Choudhury",
    title: "CEO",
    company: "ISIT",
    quote:
      "CashBook UPI lets our site teams scan a QR and pay carpenters or suppliers in seconds. Every receipt lands on our dashboard, so finance and project leads see all spending as it happens. It has meant faster payouts and much cleaner books for us.",
  },
  {
    id: 4,
    name: "Yagyarth Srivastava",
    title: "HR Lead",
    company: "Zingbus",
    quote:
      "Our route managers need to pay for hotels and supplies on the go. CashBook UPI puts spending power in their hands, and our finance team sees every rupee live. Reconciliation that took days now takes just minutes, keeping our buses rolling.",
  },
];
