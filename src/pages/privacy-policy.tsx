import React from 'react';
import Head from 'next/head';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>Privacy Policy | Sahil Ali</title>
        <meta
          name="description"
          content="Privacy Policy for Sahil Ali's professional portfolio website."
        />
      </Head>

      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-foreground">
          Privacy Policy
        </h1>

        <p className="text-muted-foreground mb-8 italic">
          Last updated: {new Date().toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              When you visit this website, we automatically collect certain information sent by your browser, such as your IP address, browser type and version, and the pages you access. This data helps us understand how visitors use our site and improve your experience.
            </p>
          </section>

          <section>
            <h2>2. Use of Data</h2>
            <p>
              The collected data is used to operate and maintain the website, inform you about updates, enable interactive features, and analyze site usage to enhance functionality.
            </p>
          </section>

          <section>
            <h2>3. Cookies</h2>
            <p>
              Cookies are used to gather information and improve website performance. You can choose to disable cookies through your browser settings, though some features may not function properly without them.
            </p>
          </section>

          <section>
            <h2>4. Security</h2>
            <p>
              We prioritize the protection of your data but acknowledge that no internet transmission or electronic storage method is completely secure. We strive to use commercially acceptable means to safeguard your information.
            </p>
          </section>

          <section>
            <h2>5. Changes to This Privacy Policy</h2>
            <p>
              This policy may be updated periodically. Any changes will be posted here, and we encourage you to review this page regularly for updates.
            </p>
          </section>

          <section>
            <h2>6. Contact Us</h2>
            <p>
              For any questions or concerns about this Privacy Policy, please <a href="mailto:sahilkhan36985@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">contact me</a>.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
