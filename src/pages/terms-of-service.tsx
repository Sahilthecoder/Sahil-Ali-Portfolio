import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Terms of Service | Sahil Ali</title>
        <meta name="description" content="Terms of Service for Sahil Ali's professional portfolio website." />
      </Helmet>

      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-foreground">
          Terms of Service
        </h1>

        <p className="text-muted-foreground mb-8 italic">
          Last updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to my portfolio website. By accessing or using this website, you agree to comply with and be bound by these Terms of Service. Please read them carefully.
            </p>
          </section>

          <section>
            <h2>2. Intellectual Property</h2>
            <p>
              All content on this site, including text, graphics, logos, images, and other materials, is the intellectual property of Sahil Ali and protected under applicable copyright and intellectual property laws.
            </p>
          </section>

          <section>
            <h2>3. Use License</h2>
            <p>
              You are granted a limited, non-exclusive license to access and temporarily download one copy of the materials for personal, non-commercial use only. Any unauthorized use may violate copyright laws.
            </p>
          </section>

          <section>
            <h2>4. Limitations of Liability</h2>
            <p>
              Sahil Ali shall not be held liable for any damages arising from the use or inability to use the materials provided on this website.
            </p>
          </section>

          <section>
            <h2>5. Revisions and Errors</h2>
            <p>
              While every effort is made to ensure accuracy, this website may contain technical, typographical, or photographic errors. Sahil Ali reserves the right to make corrections without prior notice.
            </p>
          </section>

          <section>
            <h2>6. Contact</h2>
            <p>
              If you have any questions or concerns regarding these Terms of Service, please feel free to <a href="mailto:sahilkhan36985@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">contact me</a>.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default TermsOfService;
