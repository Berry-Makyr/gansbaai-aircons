"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { isPlaceholder } from "@/data/business";
import type { SiteSettingsContent } from "@/lib/cms/types";

type ContactFormProps = {
  siteSettings: SiteSettingsContent;
  serviceOptions: string[];
};

export default function ContactForm({
  siteSettings,
  serviceOptions,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);

    if (formData.get("bot-field")) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "Failed to send message. Please check your connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-slate-900 text-white relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-sm font-bold text-sky-400 tracking-wider uppercase mb-2">
              Get In Touch
            </p>
            <h2
              id="contact-heading"
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to upgrade your comfort?
            </h2>
            <p className="text-slate-200 mb-10 text-lg">
              Contact us today for a free quote or to schedule a service. We
              respond to all inquiries promptly.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="contact-glow-icon">
                  <Phone className="w-6 h-6 text-sky-300" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Phone</h3>
                  <a
                    href={`tel:${siteSettings.phone.tel}`}
                    className="text-slate-200 hover:text-sky-400 transition-colors"
                  >
                    {siteSettings.phone.display}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="contact-glow-icon contact-glow-icon--emergency">
                  <Phone className="w-6 h-6 text-red-300" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    24-Hour Emergency
                  </h3>
                  <a
                    href={`tel:${siteSettings.emergencyPhone.tel}`}
                    className="text-slate-200 hover:text-red-400 transition-colors"
                  >
                    {siteSettings.emergencyPhone.display}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="contact-glow-icon">
                  <Mail className="w-6 h-6 text-sky-300" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  {isPlaceholder(siteSettings.email) ? (
                    <span className="placeholder-marker text-sm">
                      {siteSettings.email}
                    </span>
                  ) : (
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="text-slate-200 hover:text-sky-400 transition-colors"
                    >
                      {siteSettings.email}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="contact-glow-icon">
                  <MapPin
                    className="w-6 h-6 text-sky-300"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Service Area</h3>
                  <p className="text-slate-200">
                    {siteSettings.address.line2}
                    <br />
                    {siteSettings.serviceArea}, Western Cape, South Africa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="contact-glow-icon">
                  <svg
                    className="w-6 h-6 text-sky-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Facebook</h3>
                  <a
                    href={siteSettings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-sky-400 transition-colors"
                  >
                    Follow us on Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

            <form
              id="enquiry-form"
              onSubmit={handleSubmit}
              className="space-y-4 scroll-mt-28"
            >
              <input
                type="text"
                name="bot-field"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-200"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-slate-200"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="+27..."
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="service"
                    className="text-sm font-medium text-slate-200"
                  >
                    Service Required
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-500 hover:bg-sky-400 text-white rounded-xl px-6 py-4 font-semibold text-lg transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      className="w-5 h-5 animate-spin"
                      aria-hidden="true"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-200 text-sm text-center"
                >
                  Thank you! Your message has been sent successfully. We will be
                  in touch soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center"
                >
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
