export const site = {
  name: "Tawakul Foundation",
  tagline: "Where Faith Meets Compassion",
  email: "foundationtawakul@gmail.com",
  phone: "+254 743 562009",
  whatsappNumber: "254743562009",
  location: "Busia, Western Kenya",
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];
