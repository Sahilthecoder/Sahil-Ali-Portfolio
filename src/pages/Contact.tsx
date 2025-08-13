import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import ContactForm from '@/features/contact/ContactForm';
import ContactHero from '@/features/contact/ContactHero';
import ContactLocation from '@/features/contact/ContactLocation';
import FAQ from '@/features/contact/FAQ';
import WorkingHours from '@/features/contact/WorkingHours';
import ContactServices from '@/features/contact/ContactServices';
import ContactCard from '@/features/contact/ContactCard';
import { SectionDivider } from '@/features/contact/components/SectionDivider';

// Styles
import { gradientText } from '@/features/contact/config/styles';

export const Contact = () => {
  const location = useLocation();

  // Handle smooth scroll on initial load
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);



  return (
    <div className="min-h-screen w-full bg-background">
      <title>Contact | Sahil Ali</title>
      <meta
        name="description"
        content="Get in touch with Sahil Ali for professional collaborations, project discussions, and technical consultations."
      />

      {/* Hero Section */}
      <section className="w-full">
        <ContactHero />
      </section>

      {/* Connect Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
            Let&apos;s Connect
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Start a <span className={gradientText}>Conversation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether it&apos;s a project, consultation, or collaboration – I&apos;d love to hear from you! 
            Let&apos;s create something amazing together.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full py-8">
        <div className="w-full max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Contact Form & Info Section */}
          <section id="contact-form">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column - Form and Map */}
              <div className="lg:col-span-7 space-y-8">
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border/50">
                  <div className="space-y-1 mb-8 text-center">
                    <h2 className="text-3xl font-bold mb-2 text-primary">
                      Send Me a Message
                    </h2>
                    <p className="text-muted-foreground">
                      Fill out the form and I&apos;ll get back to you as soon as possible
                    </p>
                  </div>
                  <ContactForm />
                </div>
                <div className="rounded-2xl overflow-hidden">
                  <ContactLocation />
                </div>
              </div>

              {/* Right Column - Contact Card and Working Hours */}
              <div className="lg:col-span-5 space-y-8">
                <ContactCard />
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border/50">
                  <WorkingHours />
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />
          
          {/* Services Section */}
          <section id="services">
            <ContactServices />
          </section>
          
          <SectionDivider />
          
          {/* FAQ Section */}
          <section id="faq">
            <FAQ />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;
