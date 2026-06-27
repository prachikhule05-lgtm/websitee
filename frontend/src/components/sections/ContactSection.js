import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import api, { formatApiError } from "@/utils/api";
import { PHONE_URL, PHONE_NUMBER, getWhatsAppLink, INSTAGRAM_URL } from "@/utils/whatsapp";
import { CONTACT } from "@/constants/testIds";
import { SERVICES_STATIC } from "@/constants/data";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("Please fill name, phone and message");
      return;
    }
    setLoading(true);
    try {
      await api.post("/leads", form);
      setSent(true);
      toast.success("Message sent! We'll contact you shortly.");
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#F8FAFC]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm font-semibold text-[#F97316] uppercase tracking-widest mb-2">Get In Touch</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A]">Contact Royal Cleaning Services</h2>
          <p className="font-body text-base text-[#475569] mt-3">Have questions? We're here to help 7 days a week.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card">
              <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-6">Reach Us Directly</h3>
              {[
                { icon: <Phone className="w-5 h-5" />, label: "Phone", value: PHONE_NUMBER, href: PHONE_URL, color: "bg-blue-50 text-[#2563EB]" },
                { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51c-.173-.008-.371-.01-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>, 
                  label: "WhatsApp", value: "Chat on WhatsApp", href: getWhatsAppLink(), color: "bg-green-50 text-[#22C55E]", target: "_blank" },
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "royalcleaning.pune@gmail.com", href: "mailto:royalcleaning.pune@gmail.com", color: "bg-orange-50 text-[#F97316]" },
                { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Serving all of Pune, Maharashtra", color: "bg-blue-50 text-[#2563EB]" },
                { icon: <Clock className="w-5 h-5" />, label: "Working Hours", value: "Mon - Sun: 8:00 AM – 7:00 PM", color: "bg-purple-50 text-purple-600" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-body text-xs text-[#94A3B8] uppercase tracking-wide">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} target={item.target} rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                        className="font-body text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-body text-sm font-semibold text-[#0F172A]">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card">
              <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-6">Send Us a Message</h3>
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#22C55E]" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-[#0F172A] mb-2">Message Sent!</h4>
                  <p className="font-body text-sm text-[#475569]">We'll get back to you within a few hours.</p>
                  <button onClick={() => setSent(false)} className="mt-4 font-body text-sm text-[#2563EB] hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-testid={CONTACT.form} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1.5 block">Name *</label>
                      <input data-testid={CONTACT.nameInput} type="text" placeholder="Your name" value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
                    </div>
                    <div>
                      <label className="font-body text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1.5 block">Phone *</label>
                      <input data-testid={CONTACT.phoneInput} type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1.5 block">Email</label>
                    <input data-testid={CONTACT.emailInput} type="email" placeholder="you@email.com" value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1.5 block">Service</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white">
                      <option value="">Select a service</option>
                      {SERVICES_STATIC.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-[#475569] uppercase tracking-wide mb-1.5 block">Message *</label>
                    <textarea data-testid={CONTACT.messageInput} rows={4} placeholder="Tell us about your cleaning needs..."
                      value={form.message} onChange={e => setForm({...form, message: e.target.value})} required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none" />
                  </div>
                  <button
                    type="submit"
                    data-testid={CONTACT.submitBtn}
                    disabled={loading}
                    className="btn-orange-glow w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3 rounded-xl font-bold font-body text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                  >
                    {loading ? <div className="spinner" /> : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
