import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';
// External links don't need React Router's Link
import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  getGoogleMapsDirectionsUrl,
  getGoogleMapsEmbedUrl,
  locationConfig,
} from '@/features/contact/config/location.config';

interface ContactLocationProps {
  className?: string;
  showMap?: boolean;
  showAddress?: boolean;
  showDirectionsButton?: boolean;
}

const ContactLocation: React.FC<ContactLocationProps> = ({
  className = '',
  showMap = true,
  showAddress = true,
  showDirectionsButton = true,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [mapUrl, setMapUrl] = useState('');
  const [directionsUrl, setDirectionsUrl] = useState('');
  const { address } = locationConfig;
  const fullAddress = `${address.line1}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`;

  useEffect(() => {
    setIsMounted(true);
    setMapUrl(getGoogleMapsEmbedUrl(locationConfig));
    setDirectionsUrl(getGoogleMapsDirectionsUrl(locationConfig));
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn('w-full group', className)}
    >
      <Card className="overflow-hidden h-full flex flex-col bg-card border border-border/50 hover:border-primary/30 transition-colors duration-200">
        {showMap && (
          <div className="relative h-56 md:h-64 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            <iframe
              title="Location on Google Maps"
              src={mapUrl}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0 scale-100 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              aria-label="Google Maps location"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent pointer-events-none" />
          </div>
        )}

        {showAddress && (
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-foreground text-lg">My Location</span>
            </CardTitle>
          </CardHeader>
        )}

        <CardContent className="flex-1">
          {showAddress && (
            <div className="space-y-2.5">
              <p className="text-foreground font-medium flex items-center text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                {address.line1}
              </p>
              {address.line2 && (
                <p className="text-muted-foreground text-sm pl-3.5 border-l border-border/30">
                  {address.line2}
                </p>
              )}
              <p className="text-muted-foreground text-sm pl-3.5 border-l border-border/30">
                {address.city}, {address.state} {address.postalCode}
              </p>
              <p className="text-muted-foreground text-sm pl-3.5 border-l border-border/30">
                {address.country}
              </p>
            </div>
          )}
        </CardContent>

        {showDirectionsButton && (
          <CardFooter className="pt-2">
            <a 
              href={directionsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center w-full h-9 px-4 py-2 text-sm font-medium transition-colors rounded-md border border-border/50 hover:border-primary/50 hover:bg-accent/50 text-foreground"
              aria-label={`Get directions to ${fullAddress}`}
            >
              <Navigation className="w-3.5 h-3.5 mr-2" />
              Get Directions
              <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default ContactLocation;
