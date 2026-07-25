import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
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
    title: "Terms of Use",
    description:
      "Review the terms governing access to the Opsfield Systems website, website content, diagnostic requests, and informational materials.",
    alternates: alternatesFor(loc, "/terms-of-use"),
    robots: robotsFor(loc),
  };
}

export default async function TermsOfUse({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated="June 13, 2026">
      <p>
        These Terms of Use govern your access to and use of the Opsfield Systems
        website. By using the website, you agree to these terms. If you do not
        agree, do not use the website.
      </p>

      <h2>Website Purpose</h2>
      <p>
        The website provides general information about Opsfield Systems, its
        diagnostic-first consulting approach, potential services, and ways to
        request an initial fit review. Website content is informational and may
        not describe every term, limitation, dependency, or deliverable of a
        future engagement.
      </p>

      <h2>No Client Relationship</h2>
      <p>
        Submitting a form, exchanging messages, receiving general information, or
        participating in an initial diagnostic conversation does not create a
        consulting, fiduciary, legal, employment, partnership, agency, or other
        professional relationship. A client relationship begins only after the
        parties sign a separate written agreement defining scope, fees,
        responsibilities, confidentiality, and applicable terms.
      </p>

      <h2>No Legal, Financial, Accounting, or Tax Advice</h2>
      <p>
        Opsfield Systems is not a law firm and does not provide legal, financial,
        accounting, or tax advice through this website. Users should consult
        appropriately licensed professionals for advice in those areas.
      </p>

      <h2>No Guaranteed Outcomes</h2>
      <p>
        Website examples, frameworks, deliverables, scenarios, timelines, and
        statements about possible improvements are illustrative and do not
        guarantee results. Outcomes depend on factors including data quality,
        scope, system constraints, stakeholder participation, adoption,
        implementation quality, and market conditions.
      </p>

      <h2>Diagnostic Requests and Proposals</h2>
      <p>
        Opsfield Systems may accept, decline, or redirect an inquiry at its
        discretion. An initial fit review is not a full audit, implementation
        plan, legal assessment, architecture design, or guaranteed proposal. Any
        paid work requires a separate written agreement or accepted proposal.
      </p>

      <h2>Acceptable Use</h2>
      <p>
        You may use the website only for lawful business and informational
        purposes. You may not:
      </p>
      <ul>
        <li>
          attempt unauthorized access to the website, forms, systems, or data;
        </li>
        <li>
          submit malicious code, spam, deceptive information, or unlawful content;
        </li>
        <li>interfere with website security, availability, or operation;</li>
        <li>
          scrape or reproduce website content at scale without written
          permission;
        </li>
        <li>
          use the website to infringe intellectual property, privacy, or other
          rights;
        </li>
        <li>misrepresent an affiliation with Opsfield Systems.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        Unless otherwise stated, the website, brand elements, text, diagrams,
        frameworks, layouts, and downloadable materials are owned by or licensed
        to Opsfield Systems and are protected by applicable intellectual-property
        laws. You may view and print limited portions for internal, noncommercial
        evaluation. No other license is granted without written permission.
      </p>

      <h2>User Submissions</h2>
      <p>
        You retain ownership of information you submit. You authorize Opsfield
        Systems and its service providers to process that information as
        reasonably necessary to review and respond to your request, maintain
        security, and comply with law. Do not submit confidential information that
        is not necessary for the initial fit review. Confidentiality obligations
        for a consulting engagement apply only under a separate written agreement
        or NDA.
      </p>

      <h2>Third-Party Services and Links</h2>
      <p>
        The website may rely on or link to third-party services. Opsfield Systems
        does not control and is not responsible for third-party content,
        availability, security, or terms. References to third-party tools do not
        imply endorsement, partnership, certification, or guaranteed
        compatibility.
      </p>

      <h2>Disclaimer of Warranties</h2>
      <p>
        The website and its content are provided on an “as is” and “as available”
        basis to the fullest extent permitted by law. Opsfield Systems disclaims
        warranties of accuracy, completeness, merchantability, fitness for a
        particular purpose, noninfringement, uninterrupted availability, and
        error-free operation. We may update or remove content without notice.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Opsfield Systems and its owners,
        personnel, contractors, and service providers will not be liable for
        indirect, incidental, special, consequential, exemplary, or punitive
        damages, or for lost profits, revenue, data, goodwill, or business
        opportunities arising from or related to website use. Where liability
        cannot be excluded, total liability arising from website use will not
        exceed one hundred U.S. dollars, unless applicable law requires otherwise.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Opsfield Systems and its owners,
        personnel, contractors, and service providers from claims, losses,
        liabilities, and reasonable costs arising from your unlawful use of the
        website, violation of these terms, or infringement of another person’s
        rights.
      </p>

      <h2>Governing Law and Disputes</h2>
      <p>
        These terms are governed by the laws of the State of California, without
        regard to conflict-of-law rules. Before filing a claim concerning website
        use, the parties should attempt in good faith to resolve the matter
        through written notice and reasonable discussion. Any unresolved dispute
        must be brought in a court of competent jurisdiction in California, unless
        applicable law requires another forum.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms of Use. The revised version will display a new
        “Last updated” date. Continued use after the effective date of revised
        terms constitutes acceptance of the revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about these terms, use the website{" "}
        <Link href="/#diagnostic-request-form">diagnostic request form</Link> and begin
        the Main Challenge field with <code>Terms Question</code>.
      </p>
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
  );
}
