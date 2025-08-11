import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/utils/cn';
import { colorVariants, services, type Service } from '@/features/contact/config/services-new';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isSelected,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { title, description, icon, features, color } = service;
  const colorClass = colorVariants[color];
  const [textColor, bgColor] = colorClass
    .split(' ')
    .filter((cls) => cls.startsWith('text-') || cls.startsWith('bg-'));

  return (
    <div 
      className="relative h-full group" 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
    >
      <Card
        className={cn(
          'h-full flex flex-col transition-all duration-500 border border-border/50 bg-card/50 backdrop-blur-sm',
          isSelected 
            ? 'ring-2 ring-primary/50 ring-offset-2 -translate-y-1 shadow-xl' 
            : 'hover:shadow-lg hover:border-primary/30 hover:bg-card/70'
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className={cn(
              'p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110', 
              bgColor, 
              textColor
            )}>
              {React.createElement(icon, { className: 'w-5 h-5' })}
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-start group/item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="p-0.5 mr-3 mt-0.5 rounded-full bg-primary/10 group-hover/item:bg-primary/20 transition-colors">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-foreground/90 group-hover/item:text-foreground transition-colors">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="pt-0">
          <Link 
            to="contact" 
            className="relative z-10 w-full group border border-border/50 hover:border-primary/50 hover:bg-accent/20 transition-all duration-300 overflow-hidden inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md"
          >
            <span className="relative">Get Started</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

const ContactServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleServiceHover = (index: number | null) => {
    setSelectedService(index);
  };

  return (
    <section id="services" className="w-full pb-16 md:pb-24 lg:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      </div>
      
      <div className="w-full max-w-[95rem] mx-auto px-4 md:px-8 relative">
        <motion.div 
          className="flex flex-col items-center text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors bg-primary/10 text-primary">
            What We Offer
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Our Services
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Don&apos;t see what you&apos;re looking for? Let&apos;s chat about your unique project needs to elevate your digital presence and drive business growth.
          </p>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative"
              >
                <ServiceCard
                  service={service}
                  isSelected={selectedService === index}
                  onMouseEnter={() => handleServiceHover(index)}
                  onMouseLeave={() => handleServiceHover(null)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Let&apos;s optimize your operations and drive efficiency through data-driven solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactServices;
