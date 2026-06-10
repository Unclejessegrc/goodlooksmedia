import { Link } from "@tanstack/react-router";
import { Phone, MessageSquare, FileText } from "lucide-react";
import { CONTACT } from "@/data/contact";

export function MobileCtaBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border">
      <div className="grid grid-cols-3 divide-x divide-border">
        <a
          href={CONTACT.telHref}
          className="flex flex-col items-center py-3 text-foreground"
          data-track-event="click_call"
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span className="text-xs uppercase tracking-wider">Call</span>
        </a>
        <a
          href={CONTACT.smsHref}
          className="flex flex-col items-center py-3 text-foreground"
          data-track-event="click_text"
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span className="text-xs uppercase tracking-wider">Text</span>
        </a>
        <Link
          to="/contact"
          className="flex flex-col items-center py-3 bg-primary text-primary-foreground"
          data-track-event="cta_click_quote"
          data-service-lane="general"
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span className="text-xs uppercase tracking-wider font-semibold">Quote</span>
        </Link>
      </div>
    </div>
  );
}
