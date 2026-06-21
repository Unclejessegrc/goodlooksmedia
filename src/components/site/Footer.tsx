import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail, Phone, MessageSquare } from "lucide-react";
import { CONTACT } from "@/data/contact";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            <span className="font-display text-2xl tracking-wider">
              GOOD LOOKS<span className="text-primary">.</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            Good Looks Media Group is a strategic Rhode Island video marketing and production
            company creating business video, real estate media, wedding films, event recaps, and
            artist visuals with purpose.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Based in Warwick, RI. Serving Rhode Island and nearby New England.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border rounded-md hover:border-primary hover:text-primary transition"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={CONTACT.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border rounded-md hover:border-primary hover:text-primary transition"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={CONTACT.emailHref}
              className="p-2 border border-border rounded-md hover:border-primary hover:text-primary transition"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={CONTACT.telHref}
              className="p-2 border border-border rounded-md hover:border-primary hover:text-primary transition"
              aria-label="Phone"
              data-track-event="click_call"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={CONTACT.smsHref}
              className="p-2 border border-border rounded-md hover:border-primary hover:text-primary transition"
              aria-label="Text"
              data-track-event="click_text"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/business-video" className="hover:text-primary">
                Business Video
              </Link>
            </li>
            <li>
              <Link to="/real-estate-media" className="hover:text-primary">
                Real Estate
              </Link>
            </li>
            <li>
              <Link to="/weddings" className="hover:text-primary">
                Weddings & Events
              </Link>
            </li>
            <li>
              <Link to="/music-videos" className="hover:text-primary">
                Artist Visuals
              </Link>
            </li>
            <li>
              <Link to="/packages" className="hover:text-primary">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="hover:text-primary">
                Get a Project Quote
              </Link>
            </li>
            <li>
              <a href={CONTACT.smsHref} className="hover:text-primary" data-track-event="click_text">
                Text the Team
              </a>
            </li>
            <li>
              <a href={CONTACT.telHref} className="hover:text-primary" data-track-event="click_call">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className="hover:text-primary">
                {CONTACT.email}
              </a>
            </li>
            <li className="text-muted-foreground text-xs pt-2">
              Operational base: Warwick, RI. Service area: Rhode Island, Providence, Cranston,
              Newport, East Greenwich, Narragansett, South County, Massachusetts, Connecticut, and
              nearby New England by quote.
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>(c) {year} Good Looks Media Group - Warwick, Rhode Island video production</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link to="/portal" className="hover:text-primary">
              Business Login
            </Link>
            <p className="timecode">REC - 00:00:{String(year % 100).padStart(2, "0")}:18</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
