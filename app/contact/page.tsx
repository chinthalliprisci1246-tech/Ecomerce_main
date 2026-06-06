"use client";

import Container from "@/components/Container";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔌 Connect your email service here (e.g. Resend, EmailJS, Nodemailer)
    console.log("Form submitted:", form);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container className="py-10 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            Have a question or need help? Reach out to us and we will get back to you as soon as possible.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Mail size={18} className="text-shop-dark-green" />
              <span>support@shopkart.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Phone size={18} className="text-shop-dark-green" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <MapPin size={18} className="text-shop-dark-green" />
              <span>Vijayawada, Andhra Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {sent && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
              ✅ Message sent! We will get back to you soon.
            </div>
          )}

          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded-lg px-4 py-3 text-sm outline-none focus:border-shop-dark-green transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border rounded-lg px-4 py-3 text-sm outline-none focus:border-shop-dark-green transition"
          />
          <textarea
            placeholder="Your Message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="border rounded-lg px-4 py-3 text-sm outline-none focus:border-shop-dark-green transition resize-none"
          />
          <button
            type="submit"
            className="bg-shop-dark-green text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>

      </div>
    </Container>
  );
};

export default ContactPage;