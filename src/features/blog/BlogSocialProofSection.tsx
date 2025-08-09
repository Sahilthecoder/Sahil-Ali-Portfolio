import React from 'react';
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
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">What People Are Saying</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what colleagues and clients have to say about working with me.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {testimonial.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
