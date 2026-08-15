import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Loader2,
  CheckCircle2,
  Send,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollAnimation";

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: "7he.deependra.singh.01@gmail.com",
    href: "mailto:7he.deependra.singh.01@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Deependrasingh-7068",
    href: "https://github.com/Deependrasingh-7068",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/deependra-singh-872414260",
    href: "https://www.linkedin.com/in/deependra-singh-872414260/",
  },
  { icon: MapPin, label: "Location", value: "India", href: null },
];

const initialForm = { name: "", email: "", subject: "", message: "" };

// EmailJS config — from your EmailJS dashboard (dashboard.emailjs.com).
// TEMPLATE_ID is set from what you gave me. SERVICE_ID and PUBLIC_KEY are
// specific to your account, so drop yours in below:
//   SERVICE_ID   -> Email Services tab (e.g. "service_xxxxxxx")
//   PUBLIC_KEY   -> Account -> General -> Public Key
const EMAILJS_SERVICE_ID = "service_h9u9bvk";
const EMAILJS_TEMPLATE_ID = "template_e2k87wk";
const EMAILJS_PUBLIC_KEY = "9GamLPPho89asVRto";

export default function Contact() {
  const containerRef = useScrollReveal();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [errorDetail, setErrorDetail] = useState("");

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Please add a subject.";
    if (!form.message.trim()) next.message = "Please write a message.";
    else if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    // Catches the most common cause of "Something went wrong" — the
    // Service ID / Public Key placeholders at the top of this file were
    // never swapped for your real EmailJS values.
    if (
      EMAILJS_SERVICE_ID === "YOUR_EMAILJS_SERVICE_ID" ||
      EMAILJS_PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY"
    ) {
      setStatus("error");
      setErrorDetail(
        "EmailJS isn't configured yet — add your Service ID and Public Key at the top of Contact.jsx."
      );
      setTimeout(() => setStatus("idle"), 6000);
      return;
    }

    setStatus("loading");

    try {
      // Field names here (from_name, from_email, subject, message) need to
      // match the {{variable}} placeholders used inside your EmailJS
      // template (template_e2k87wk) — rename either side so they line up.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus("success");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      // Log + surface the actual EmailJS response so the real cause (bad
      // Service ID, bad Template ID, template variable mismatch, domain not
      // whitelisted, etc.) is visible instead of a generic failure.
      console.error("EmailJS send failed:", err);
      setStatus("error");
      setErrorDetail(
        err?.text || err?.message || "The email service didn't accept the request."
      );
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <div data-reveal="up" className="eyebrow mb-4">
          <span className="w-6 h-px bg-signal-orange" /> CONTACT
        </div>
        <h2 data-reveal="up" className="section-heading mb-4">
          Let's Build Something Together.
        </h2>
        <p data-reveal="up" data-delay="0.1" className="section-sub mb-14">
          I'm currently open to opportunities where I can contribute, learn and
          grow as a developer.
        </p>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          {/* Contact cards */}
          <div
            data-stagger
            className="grid grid-cols-2 lg:grid-cols-1 gap-4 content-start"
          >
            {CONTACT_CARDS.map((c) => {
              const Icon = c.icon;
              const content = (
                <>
                  <div className="w-10 h-10 rounded-xl bg-ink-700/70 border border-ink-border flex items-center justify-center text-signal-blueSoft shrink-0">
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-paper-500">
                      {c.label}
                    </div>
                    <div className="text-sm text-paper-100 truncate">
                      {c.value}
                    </div>
                  </div>
                </>
              );
              // ✅ Correct
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor-hover
                  className="glass-card p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-signal-blue/40"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={c.label}
                  className="glass-card p-5 flex items-center gap-4"
                >
                  {content}
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form
            data-reveal="right"
            onSubmit={handleSubmit}
            noValidate
            className="glass-card p-6 sm:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs text-paper-500 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full bg-ink-900/70 border rounded-xl px-4 py-3 text-sm text-paper-100 placeholder:text-paper-700 outline-none transition-colors ${
                    errors.name
                      ? "border-red-500/60"
                      : "border-ink-border focus:border-signal-blue/50"
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-400 mt-1.5">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs text-paper-500 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full bg-ink-900/70 border rounded-xl px-4 py-3 text-sm text-paper-100 placeholder:text-paper-700 outline-none transition-colors ${
                    errors.email
                      ? "border-red-500/60"
                      : "border-ink-border focus:border-signal-blue/50"
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-400 mt-1.5">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="subject"
                className="block font-mono text-xs text-paper-500 mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                type="text"
                placeholder="What's this about?"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={`w-full bg-ink-900/70 border rounded-xl px-4 py-3 text-sm text-paper-100 placeholder:text-paper-700 outline-none transition-colors ${
                  errors.subject
                    ? "border-red-500/60"
                    : "border-ink-border focus:border-signal-blue/50"
                }`}
              />
              {errors.subject && (
                <p id="subject-error" className="text-xs text-red-400 mt-1.5">
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="mb-7">
              <label
                htmlFor="message"
                className="block font-mono text-xs text-paper-500 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me a bit about the role or project..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full bg-ink-900/70 border rounded-xl px-4 py-3 text-sm text-paper-100 placeholder:text-paper-700 outline-none transition-colors resize-none ${
                  errors.message
                    ? "border-red-500/60"
                    : "border-ink-border focus:border-signal-blue/50"
                }`}
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-red-400 mt-1.5">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              data-cursor-hover
              className="btn-primary w-full sm:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {status === "success" && <CheckCircle2 size={16} />}
              {(status === "idle" || status === "error") && <Send size={16} />}
              {status === "loading"
                ? "Sending..."
                : status === "success"
                  ? "Message Sent"
                  : "Send Message"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-sm text-signal-blueSoft">
                Thanks for reaching out — I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">
                Something went wrong sending that
                {errorDetail ? <span className="block text-red-400/80 text-xs mt-1">{errorDetail}</span> : null}
                . Please try again, or email me directly at{" "}
                <a
                  href="mailto:7he.deependra.singh.01@gmail.com"
                  className="underline"
                >
                  7he.deependra.singh.01@gmail.com
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
