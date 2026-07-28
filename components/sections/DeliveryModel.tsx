import {
  Plus,
  Boxes,
  Workflow,
  Users,
  Award,
} from "lucide-react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import PlusMark from "@/components/ui/PlusMark";
import { getT } from "@/i18n/t";
import styles from "./DeliveryModel.module.css";

const ROLES = [
  {
    title: "Founder & CEO",
    name: "Igor Saevets" as string | undefined,
    link: "https://www.linkedin.com/in/igorsaevets" as string | undefined,
    linkIsLinkedIn: true,
    initials: "IS",
    subtitle: "Operating model & diagnostic lead",
    bio: "Serial entrepreneur, 10+ companies founded. EB-1A green card holder. Leads diagnostic methodology and operating model design." as string | undefined,
    tone: "paper",
    art: "/photos/role-mp.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwX/xAAfEAABBAEFAQAAAAAAAAAAAAABAAIDBBESITJBUZH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AWxcMRc0bnrKnmaUknU76ms8ijwPEH//Z",
    responsibilities: [
      { Icon: Boxes, text: "Operating model design" },
      { Icon: Workflow, text: "Diagnostic methodology" },
    ],
  },
  {
    title: "Technology Partner",
    name: "GrowCluster" as string | undefined,
    link: "https://growcluster.com/" as string | undefined,
    linkIsLinkedIn: false,
    initials: "GC",
    subtitle: "International Association of IT Specialists",
    bio: "International IT professionals community providing certified talent, mentorship, and industry expertise for project teams and advisory engagements." as string | undefined,
    tone: "paper",
    art: "/photos/role-sa.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgME/8QAHRAAAgIBBQAAAAAAAAAAAAAAAAECIREiQlFSof/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDAqkpZrgWrt6T2CToD/9k=",
    responsibilities: [
      { Icon: Users, text: "Certified IT talent network" },
      { Icon: Award, text: "Professional standards & vetting" },
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
        <h2 className={styles.intro}>{t("Our Delivery Model: Senior Advisors, No Handoff Chain")}</h2>
        <p className={`lead ${styles.text}`}>
          {t(
            "Opsfield Systems works with 4-6 active clients at a time so senior advisors remain involved from problem framing through scope and delivery."
          )}
        </p>

        <div className={styles.roles}>
          {ROLES.map(({ title, name, link, linkIsLinkedIn, initials, subtitle, bio, responsibilities, art, blur }) => (
            <Card key={title} tone="paper" soft hover={false}>
              <span className={styles.cardArt} aria-hidden="true">
                <Image
                  src={art}
                  alt={name ? `${name} - ${t(title)} at Opsfield Systems` : `${t(title)} at Opsfield Systems`}
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
                    {name ? (
                      <>
                        <h3 className={styles.roleTitle}>
                          {link ? (
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.nameLink}
                            >
                              {name}
                              {linkIsLinkedIn ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              ) : (
                                <Plus size={14} aria-hidden="true" />
                              )}
                            </a>
                          ) : (
                            name
                          )}
                        </h3>
                        <p className={styles.roleSub}>{t(title)}</p>
                      </>
                    ) : (
                      <h3 className={styles.roleTitle}>{t(title)}</h3>
                    )}
                    <p className={styles.roleSub}>{t(subtitle)}</p>
                    {bio && <p className={styles.roleSub}>{t(bio)}</p>}
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
            
          </a>
        </div>
      </div>
    </div>
  );
}
