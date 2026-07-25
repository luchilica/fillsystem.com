import {
  ArrowRight,
  Boxes,
  Workflow,
  Map,
  Compass,
  Database,
  GitBranch,
  Share2,
  Cable,
  Cpu,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import PlusMark from "@/components/ui/PlusMark";
import { getT } from "@/i18n/t";
import styles from "./DeliveryModel.module.css";

// Copy from docs/texts.md → "Delivery Model". Role-only cards (no names, photos,
// or invented credentials); responsibilities are the exact terms from the Focus
// lines. Initials tile + role subtitle + icon bullets. v2 ink block.
const ROLES = [
  {
    title: "Managing Partner",
    initials: "MP",
    subtitle: "Operating model & diagnostic lead",
    tone: "paper",
    art: "/photos/role-mp.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwX/xAAfEAABBAEFAQAAAAAAAAAAAAABAAIDBBESITJBUZH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AWxcMRc0bnrKnmaUknU76ms8ijwPEH//Z",
    responsibilities: [
      { Icon: Boxes, text: "Operating model design" },
      { Icon: Workflow, text: "Diagnostic methodology" },
      { Icon: Map, text: "Roadmap prioritization" },
      { Icon: Compass, text: "Executive decision support" },
    ],
  },
  {
    title: "Solution Architect",
    initials: "SA",
    subtitle: "CRM / RevOps & data flow",
    tone: "paper",
    art: "/photos/role-sa.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgME/8QAHRAAAgIBBQAAAAAAAAAAAAAAAAECIREiQlFSof/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDAqkpZrgWrt6T2CToD/9k=",
    responsibilities: [
      { Icon: Database, text: "CRM architecture" },
      { Icon: GitBranch, text: "RevOps pipeline design" },
      { Icon: Share2, text: "Data flow mapping" },
      { Icon: Cable, text: "Integrations" },
      { Icon: Cpu, text: "Automation design" },
      { Icon: Shield, text: "Implementation risk review" },
    ],
  },
] as const;

const ENVIRONMENTS = [
  "HubSpot",
  "Salesforce",
  "Pipedrive",
  "Asana",
  "Monday",
  "Notion",
  "QuickBooks",
  "Zapier",
  "Make",
];

export default async function DeliveryModel() {
  const t = await getT();
  return (
    <div className="container">
      <PlusMark size={220} className={styles.plusTop} />
      <PlusMark size={120} className={styles.plusBottom} />

      <div className={styles.inner}>
        <p className={styles.badge}>{t("DELIVERY MODEL")}</p>
        <h2 className={styles.intro}>{t("Senior attention without a handoff chain.")}</h2>
        <p className={`lead ${styles.text}`}>
          {t(
            "Opsfield Systems works with 4–6 active clients at a time so senior advisors remain involved from problem framing through scope and delivery."
          )}
        </p>

        <div className={styles.roles}>
          {ROLES.map(({ title, initials, subtitle, responsibilities, art, blur }) => (
            <Card key={title} tone="paper" soft hover={false}>
              {/* Duotone corner watermark — abstract, no faces (role-only ethos):
                  MP = structure/architecture, SA = data/systems. */}
              <span className={styles.cardArt} aria-hidden="true">
                <Image
                  src={art}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 300px, 60vw"
                  placeholder="blur"
                  blurDataURL={blur}
                  className={styles.cardArtImg}
                />
              </span>
              <div className={styles.role}>
                <div className={styles.roleHead}>
                  <span className={styles.avatar} aria-hidden="true">
                    {initials}
                  </span>
                  <div>
                    <h3 className={styles.roleTitle}>{t(title)}</h3>
                    <p className={styles.roleSub}>{t(subtitle)}</p>
                  </div>
                </div>

                <div className={styles.respDivider}>
                  <span className={styles.respLabel}>{t("Focus")}</span>
                </div>

                <ul className={styles.respList}>
                  {responsibilities.map(({ Icon, text }) => (
                    <li key={text} className={styles.resp}>
                      <span className={styles.respIcon}>
                        <Icon size={15} aria-hidden="true" />
                      </span>
                      <span>{t(text)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.envBlock}>
          <p className={styles.envLabel}>{t("Relevant environments")}</p>
          <ul className={styles.envList}>
            {ENVIRONMENTS.map((e) => (
              <li key={e} className={styles.envItem}>
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.cta}>
          <a href="#areas-of-work" className={styles.textLink}>
            {t("Book a Senior Advisory Session")}
            <ArrowRight size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
