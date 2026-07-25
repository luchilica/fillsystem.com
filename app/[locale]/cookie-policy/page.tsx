import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: "Cookie Policy",
    description:
      "Learn how Opsfield Systems uses necessary and optional analytics cookies and how website visitors can manage their preferences.",
    alternates: alternatesFor(loc, "/cookie-policy"),
    robots: robotsFor(loc),
  };
}

export default async function CookiePolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
    <BreadcrumbJsonLd title="Cookie Policy" path="/cookie-policy" />
    <LegalPageLayout title="Cookie Policy" lastUpdated="June 13, 2026">
      <p>
        This Cookie Policy explains how Opsfield Systems uses cookies and similar
        technologies on its website. It should be read together with the{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>What Cookies Are</h2>
      <p>
        Cookies are small text files stored on a browser or device. Similar
        technologies may include local storage, pixels, and software identifiers.
        These technologies can support website operation, security, consent
        preferences, and aggregate analytics.
      </p>

      <h2>Cookie Categories</h2>

      <h3>Strictly Necessary</h3>
      <p>
        These technologies support core website functions such as security,
        network delivery, form operation, fraud prevention, and storage of cookie
        preferences. They cannot be disabled through the website preference tool
        when they are required for the service to function.
      </p>
      <p>
        Current providers include Vercel for hosting and Resend for email
        notifications. Actual cookies depend on the deployed configuration.
      </p>

      <h3>Analytics</h3>
      <p>
        Google Analytics 4 may be used to understand aggregate website usage, such
        as page views, referral sources, device categories, and form-funnel
        events. Analytics must remain disabled until the visitor affirmatively
        accepts analytics cookies. The MVP configuration must not send form
        content, names, email addresses, company names, or free-form challenge
        text to analytics.
      </p>
      <p>
        Advertising personalization, Google Signals, remarketing, and ad-platform
        cookies are not enabled for the MVP.
      </p>

      <h2>Consent Choices</h2>
      <p>
        The consent banner must provide equally accessible options to accept or
        decline optional analytics. Visitors can reopen the cookie-preference
        control to withdraw or change consent. Withdrawing consent prevents future
        optional analytics collection but does not automatically delete
        information already processed lawfully.
      </p>

      <h2>Retention</h2>
      <p>
        Consent preferences may be retained for up to 12 months so the website can
        remember the visitor’s choice. Google Analytics event-data retention must
        be configured for no more than 14 months for the MVP. Strictly necessary
        cookies and security logs may have shorter or provider-controlled
        durations based on technical requirements.
      </p>

      <h2>Browser Controls</h2>
      <p>
        Most browsers allow users to block or delete cookies. Blocking strictly
        necessary technologies may prevent forms or security features from working
        correctly.
      </p>

      <h2>Do Not Track and Global Privacy Control</h2>
      <p>
        There is no uniform standard for responding to browser Do Not Track
        signals. Because optional analytics is disabled until consent, a visitor
        who declines analytics will not receive optional analytics cookies. Where
        technically supported and legally required, a recognized Global Privacy
        Control signal will be treated as a request to keep optional analytics
        disabled.
      </p>

      <h2>Changes to This Cookie Policy</h2>
      <p>
        We may update this Cookie Policy when technologies, providers, legal
        requirements, or website practices change. The current version will
        display the latest update date.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions or requests, email{" "}
        <a href="mailto:privacy@opsfieldsystems.com">
          privacy@opsfieldsystems.com
        </a>{" "}
        with enough information for us to locate the relevant inquiry. You may
        also use the website{" "}
        <Link href="/#diagnostic-request-form">diagnostic request form</Link> and begin
        the Main Challenge field with <code>Privacy Request</code>.
      </p>
    </LegalPageLayout>
    </>
  );
}
