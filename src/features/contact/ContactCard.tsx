import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, MessageSquare, Phone, Share2 } from 'lucide-react';

import { CONTACT_INFO } from '@/features/contact/data/contact.data';

const ContactCard = () => {
  const contactInfo = `BEGIN:VCARD
VERSION:3.0
FN:Sahil Ali
TEL;type=CELL;type=VOICE;waid=918824054425:${CONTACT_INFO.phone}
EMAIL:${CONTACT_INFO.email}
END:VCARD`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    contactInfo
  )}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'contact-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Contact Me',
          text: 'Get in touch with me!',
          url: CONTACT_INFO.email,
        });
      }
    } catch (error) {
      console.error('Error sharing contact info:', error);
    }
  };

  return (
    <motion.div
      className="bg-card rounded-xl shadow-sm overflow-hidden w-full border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
          <div className="p-2 mr-3 rounded-lg bg-primary/10 text-primary">
            <MessageSquare className="w-5 h-5" />
          </div>
          Contact Information
        </h3>

        <div className="space-y-4">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="group flex items-center p-3 -mx-3 rounded-lg transition-colors hover:bg-accent/50"
          >
            <div className="p-2 mr-3 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-foreground group-hover:text-primary">{CONTACT_INFO.email}</span>
          </a>

          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="group flex items-center p-3 -mx-3 rounded-lg transition-colors hover:bg-accent/50"
          >
            <div className="p-2 mr-3 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-foreground group-hover:text-primary">{CONTACT_INFO.phone}</span>
          </a>

          <div className="pt-4 border-t border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-3">
              Connect with me
            </h4>
            <div className="flex space-x-2">
              <a
                href={CONTACT_INFO.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-accent text-foreground/80 hover:text-foreground transition-colors hover:shadow-sm"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-accent text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors hover:shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="pt-4">
            <div className="relative bg-background/50 p-5 rounded-xl border border-border/50 flex flex-col items-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={qrCodeUrl}
                alt="Contact QR Code"
                className="w-36 h-36 mb-4 rounded-lg border-2 border-border/50 group-hover:border-primary/30 transition-all duration-300"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-primary/5 hover:bg-primary/10 text-primary hover:shadow-sm transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-background border border-border hover:bg-accent/50 hover:shadow-sm transition-all duration-200"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;
