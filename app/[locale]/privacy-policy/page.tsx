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
    title: "Privacy Policy",
    description:
      "Learn how Fill System collects, uses, protects, and retains personal information submitted through its website and diagnostic request form.",
    alternates: alternatesFor(loc, "/privacy-policy"),
    robots: robotsFor(loc),
  };
}

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
    <BreadcrumbJsonLd title="Privacy Policy" path="/privacy-policy" locale={locale as Locale} />
    <LegalPageLayout title="Privacy Policy" lastUpdated="June 13, 2026">
      <p>
        Fill System (“Fill System,” “we,” “us,” or “our”) operates this
        website and provides diagnostic-first IT and business consulting
        services. This Privacy Policy explains what personal information we
        collect through the website, how we use it, when we disclose it, and the
        choices available to you.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect the information required to review a diagnostic request: your
        name, work email, company, and main challenge. If you choose to add more
        context, we may also collect your company website, role, company size,
        timeline, and selected request type. Please do not submit passwords,
        financial account details, health information, government identification
        numbers, immigration documents, confidential credentials, or other
        sensitive information through the form.
      </p>
      <p>
        We may also collect limited technical information automatically,
        including IP address, browser and device type, referring page, pages
        viewed, approximate location derived from IP address, timestamps, consent
        preferences, and campaign parameters.
      </p>

      <h2>How We Use Information</h2>
      <p>We use personal information to:</p>
      <ul>
        <li>review and respond to diagnostic or service inquiries;</li>
        <li>evaluate fit, scope, and the safest next step;</li>
        <li>prepare proposals and manage business communications;</li>
        <li>operate, secure, troubleshoot, and improve the website;</li>
        <li>
          measure website performance and aggregate usage after analytics
          consent;
        </li>
        <li>prevent fraud, abuse, and security incidents;</li>
        <li>comply with applicable legal and recordkeeping obligations.</li>
      </ul>
      <p>
        We do not use form submissions to make solely automated decisions that
        produce legal or similarly significant effects.
      </p>

      <h2>Sources of Information</h2>
      <p>
        We collect information directly from you, automatically from your browser
        or device, and from referral or business contacts when they introduce you
        to Fill System. We do not purchase consumer data.
      </p>

      <h2>Service Providers and Disclosures</h2>
      <p>
        We may disclose information to service providers that support website
        hosting, form processing, cybersecurity, analytics, email, document
        management, and professional advisory services. The current
        infrastructure includes Vercel for hosting, Resend for email
        notifications, and Google Analytics 4 only after analytics consent.
      </p>
      <p>
        We may also disclose information when required by law, to protect rights
        or security, in connection with a business transaction, or with your
        direction or consent. Service providers may process information only for
        the services they perform for us and subject to applicable contractual
        restrictions.
      </p>

      <h2>Sale, Sharing, and Advertising</h2>
      <p>
        Fill System does not sell personal information. We do not use personal
        information for cross-context behavioral advertising or paid
        retargeting. If these practices change, we will update this policy and
        provide any legally required privacy choices before the change takes
        effect.
      </p>

      <h2>Cookies and Analytics</h2>
      <p>
        The website may use strictly necessary technologies for security, form
        operation, load balancing, and consent preferences. Google Analytics 4
        may load only after you accept analytics cookies. Advertising
        personalization and Google Signals are not enabled.
      </p>
      <p>
        See the <Link href="/cookie-policy">Cookie Policy</Link> for additional
        details and controls.
      </p>

      <h2>Retention</h2>
      <p>
        We retain non-client form submissions and related business communications
        for up to 24 months after the last meaningful interaction, unless a
        longer period is reasonably necessary for a requested service, dispute,
        security investigation, legal obligation, or establishment of a client
        relationship. Website security logs are retained only for the period
        reasonably required for security and troubleshooting. Consented analytics
        data is configured with a maximum event-data retention period of 14
        months.
      </p>
      <p>
        When information is no longer required, we take reasonable steps to
        delete, anonymize, or securely isolate it.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable administrative, technical, and organizational
        safeguards appropriate to the information processed. These measures
        include HTTPS, restricted access, access controls, secure hosting, and
        review of third-party services. No transmission or storage system can be
        guaranteed to be completely secure.
      </p>

      <h2>Your Choices and Requests</h2>
      <p>
        You may ask us to provide access to, correct, or delete personal
        information associated with your website inquiry. You may also withdraw
        analytics consent through the cookie-preference control.
      </p>
      <p>
        To submit a privacy request, use the website{" "}
        <Link href="/#diagnostic-request-form">diagnostic request form</Link> and begin
        the Main Challenge field with <code>Privacy Request</code>. Include enough
        information for us to identify the relevant inquiry. We may request
        reasonable verification before completing a request and may retain limited
        information when required by law or necessary to document the request.
      </p>
      <p>
        If the California Consumer Privacy Act and California Privacy Rights Act
        apply to Fill System, California residents may also have rights to
        know, correct, delete, opt out of sale or sharing, limit certain uses of
        sensitive personal information, and receive equal service without
        discrimination for exercising applicable rights. Fill System does not
        sell personal information and does not knowingly sell or share personal
        information of consumers under 16.
      </p>
      <p>
        An authorized agent may submit a request using the same process. We may
        require proof of authorization and verification of the consumer’s identity
        where permitted by law.
      </p>

      <h2>Do Not Track and Global Privacy Control</h2>
      <p>
        Browsers may offer Do Not Track signals, but there is no uniform industry
        response standard. This website does not load optional analytics before
        consent. Where technically supported and legally required, a recognized
        Global Privacy Control signal will be treated as a request to keep
        nonessential analytics disabled.
      </p>

      <h2>Children’s Privacy</h2>
      <p>
        The website and consulting services are intended for business
        professionals and are not directed to children under 13. We do not
        knowingly collect personal information from children through the website.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        The website may link to third-party services. Their privacy practices are
        governed by their own policies, and Fill System is not responsible
        for those practices.
      </p>

      <h2>Policy Changes</h2>
      <p>
        We may update this Privacy Policy to reflect changes in law, technology,
        vendors, or business practices. The revised policy will display a new
        “Last updated” date. Material changes will be communicated through a
        prominent website notice or another appropriate method before they take
        effect when required.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions or requests, email{" "}
        <a href="mailto:privacy@fillsystem.com">
          privacy@fillsystem.com
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
