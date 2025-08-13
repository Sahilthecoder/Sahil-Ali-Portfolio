import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail, MessageSquare, Phone, Share2, Copy, Check, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { CONTACT_INFO } from '@/features/contact/data/contact.data';

const ContactCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [qrError, setQrError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Standard vCard format — cleaner and more compatible
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${CONTACT_INFO.name}
TEL;TYPE=CELL:${CONTACT_INFO.phone}
EMAIL:${CONTACT_INFO.email}
END:VCARD`;

  const generateQr = () => {
    setIsLoading(true);
    setQrError(false);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(vCardData)}`;
    setQrCodeUrl(url);
  };

  useEffect(() => {
    generateQr();
  }, []);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(qrCodeUrl, { mode: 'cors' });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `contact-${CONTACT_INFO.name.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
      toast.success('QR code downloaded!');
    } catch (err) {
      console.error(err);
      toast.error('Download failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `Name: ${CONTACT_INFO.name}\nEmail: ${CONTACT_INFO.email}\nPhone: ${CONTACT_INFO.phone}`
      );
      setIsCopied(true);
      toast.success('Contact info copied!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error('Copy failed');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${CONTACT_INFO.name}'s Contact`,
          text: `Contact ${CONTACT_INFO.name} at ${CONTACT_INFO.email} or ${CONTACT_INFO.phone}`,
          url: window.location.href
        });
      } else {
        await handleCopyToClipboard();
      }
    } catch (err) {
      if (!(err instanceof Error && err.name === 'AbortError')) {
        toast.error('Share failed');
      }
    }
  };

  return (
    <motion.div
      className="bg-card rounded-xl shadow-sm overflow-hidden w-full border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
          <div className="p-2 mr-3 rounded-lg bg-primary/10 text-primary">
            <MessageSquare className="w-5 h-5" />
          </div>
          Contact Information
        </h3>

        <div className="space-y-4">
          {/* Email */}
          <a 
            href={`mailto:${CONTACT_INFO.email}`} 
            className="group flex items-center p-3 -mx-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="p-2 mr-3 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-foreground group-hover:text-primary transition-colors">
              {CONTACT_INFO.email}
            </span>
          </a>

          {/* Phone */}
          <a 
            href={`tel:${CONTACT_INFO.phone}`} 
            className="group flex items-center p-3 -mx-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="p-2 mr-3 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-foreground group-hover:text-primary transition-colors">
              {CONTACT_INFO.phone}
            </span>
          </a>

          {/* Social Links */}
          <div className="pt-4 border-t border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-3">Connect with me</h4>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 rounded-full hover:bg-accent/50"
              >
                <a href={CONTACT_INFO.socialLinks.github} target="_blank" rel="noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 rounded-full hover:bg-accent/50"
              >
                <a href={CONTACT_INFO.socialLinks.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                </a>
              </Button>
            </div>
          </div>

          {/* QR Code */}
          <div className="pt-4">
            <div className="relative bg-background/50 p-5 rounded-xl border border-border/50 flex flex-col items-center group">
              {qrError ? (
                <div className="text-center p-4 text-sm text-red-500">
                  <p>Failed to load QR code</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={generateQr}
                    className="mt-2 text-primary"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              ) : (
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  )}
                  <img
                    src={qrCodeUrl}
                    alt="Contact QR Code"
                    className={`w-full h-full object-contain transition-opacity duration-300 ${
                      isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false);
                      setQrError(true);
                    }}
                  />
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Scan to save my contact
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  disabled={isLoading || qrError}
                  className="gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  Save
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  disabled={isLoading || qrError}
                  className="gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyToClipboard}
                  disabled={isCopied || isLoading || qrError}
                  className="gap-1.5"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {isCopied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;
