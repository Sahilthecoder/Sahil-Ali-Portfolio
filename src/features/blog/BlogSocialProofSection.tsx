import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export const BlogSocialProofSection = () => {
  const testimonials = [
    {
      quote: "Sahil's data analysis transformed our inventory management. His insights helped us reduce waste by 25% while maintaining optimal stock levels.",
      author: "Sarah Johnson",
      role: "Operations Manager",
      rating: 5
    },
    {
      quote: "Working with Sahil was a game-changer for our analytics team. His expertise in Python and data visualization helped us uncover hidden patterns in our sales data.",
      author: "Michael Chen",
      role: "Head of Analytics",
      rating: 5
    },
    {
      quote: "Clear, actionable advice that's immediately applicable. Sahil makes complex topics accessible to everyone.",
      author: "David Kim",
      role: "Data Analyst",
      rating: 5
    }
  ];

  return (
    <section className="py-10 sm:py-14 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">What People Are Saying</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what colleagues and clients have to say about working with me.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-card rounded-xl p-4 sm:p-5 border border-border hover:shadow-sm transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground italic mb-4 sm:mb-5">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm sm:text-base">
                  {testimonial.author.charAt(0)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
