"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin, Share2, Send, Clock, Shield, CheckCircle } from "lucide-react";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "support@shoewebsite.com",
      action: "Send us an email",
    },
    {
      icon: Phone,
      title: "Phone",
      description: "+1 (555) 123-4567",
      action: "Call us now",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Available 24/7",
      action: "Start chatting",
    },
    {
      icon: MapPin,
      title: "Visit Store",
      description: "Find a location near you",
      action: "Find stores",
    },
  ];

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn items in their original packaging.",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping times and rates vary by destination.",
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships. You can also track it in your account.",
    },
  ];

  const locations = [
    {
      name: "New York Flagship",
      address: "123 Fifth Avenue, New York, NY 10001",
      hours: "Mon-Sat: 10AM-9PM, Sun: 11AM-6PM",
    },
    {
      name: "Los Angeles Store",
      address: "456 Rodeo Drive, Los Angeles, CA 90210",
      hours: "Mon-Sat: 10AM-9PM, Sun: 11AM-6PM",
    },
    {
      name: "Chicago Store",
      address: "789 Michigan Avenue, Chicago, IL 60611",
      hours: "Mon-Sat: 10AM-8PM, Sun: 12PM-5PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white py-20 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's Connect</h1>
            <p className="text-xl text-gray-300 mb-8">
              We're here to help you find the perfect pair. Reach out to our team for any questions or assistance.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeader
            title="Get in Touch"
            description="Choose the way that works best for you"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center mb-4">
                    <method.icon size={24} className="text-black" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <span className="text-sm font-medium text-black">{method.action} →</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form & Locations */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                title="Send us a message"
                description="We'll get back to you within 24 hours"
                className="mb-8"
              />
              <Card className="p-8">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input label="First Name" placeholder="John" />
                    <Input label="Last Name" placeholder="Doe" />
                  </div>
                  <Input label="Email" type="email" placeholder="john@example.com" />
                  <Input label="Subject" placeholder="How can we help?" />
                  <Textarea
                    label="Message"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    showCharCount
                    maxLength={500}
                  />
                  <Button type="submit" className="w-full">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Store Locations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                title="Visit Our Stores"
                description="Experience our products in person"
                className="mb-8"
              />
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                    <p className="text-gray-600 mb-2 flex items-start gap-2">
                      <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                      {location.address}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <Clock size={16} />
                      {location.hours}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeader
            title="Frequently Asked Questions"
            description="Quick answers to common questions"
            className="mb-12"
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Social Links */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <SectionHeader
              title="Follow Us"
              description="Stay connected for the latest updates and exclusive offers"
              className="mb-8"
            />
            <div className="flex justify-center gap-4">
              {[Share2, Share2, Share2].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <Icon size={24} className="text-gray-700" />
                </motion.a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Live Chat CTA */}
      <section className="py-16 bg-black text-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <MessageCircle size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-gray-300 mb-8">
              Start a live chat with our support team. We're available 24/7 to assist you.
            </p>
            <Button variant="secondary" size="lg">
              Start Live Chat
            </Button>
          </div>
        </Container>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <Clock size={32} className="mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Always here to help</p>
            </div>
            <div>
              <Shield size={32} className="mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">100% protected transactions</p>
            </div>
            <div>
              <CheckCircle size={32} className="mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
