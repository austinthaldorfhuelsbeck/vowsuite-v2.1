import Image from "next/image";
import Link from "next/link";
import ModeToggle from "~/components/global/mode-toggle";

// Footer links configuration
const footerLinks = [
  {
    title: "Learn",
    links: [
      { name: "About us", href: "/" },
      { name: "Pricing", href: "/site/#pricing" },
      { name: "Getting Started", href: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Contact us", href: "/" },
      { name: "Help center", href: "/" },
      { name: "Accessibility", href: "/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms & privacy", href: "/" },
      { name: "Security", href: "/" },
    ],
  },
];

// Social links configuration
const socialLinks = [
  { href: "#", icon: "/social/github.svg", alt: "GitHub" },
  { href: "#", icon: "/social/facebook.svg", alt: "Facebook" },
  { href: "#", icon: "/social/instagram.svg", alt: "Instagram" },
  { href: "#", icon: "/social/x.svg", alt: "X (Twitter)" },
  { href: "#", icon: "/social/youtube.svg", alt: "YouTube" },
  { href: "#", icon: "/social/reddit.svg", alt: "Reddit" },
  { href: "#", icon: "/social/tiktok.svg", alt: "TikTok" },
];

const Footer = () => (
  <footer className="border-t bg-card p-4 sm:p-6">
    <div className="mx-auto max-w-screen-xl">
      <div className="md:flex md:justify-between">
        <div className="mb-6 flex items-center gap-2 md:mb-0">
          <Link href="/" className="flex gap-2">
            <Image
              src={"/assets/logo.svg"}
              alt="Vowsuite"
              width={24}
              height={24}
            />
            <h1 className="font-bold">Vowsuite</h1>
          </Link>
          <ModeToggle />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h2 className="mb-6 text-sm font-semibold uppercase">
                {section.title}
              </h2>
              <ul className="text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.name} className="mb-4">
                    <Link className="text-sm hover:underline" href={link.href}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-6 sm:mx-auto lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex gap-5">
          <span className="text-sm sm:text-center">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              Vowsuite™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          {socialLinks.map((social) => (
            <Link key={social.alt} href={social.href} className="">
              <Image
                src={social.icon}
                alt={social.alt}
                width={16}
                height={16}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
