import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_POSTS } from "@/components/blog/blogData";
import { Link } from "@/i18n/navigation";

const post = BLOG_POSTS.find(
  (p) => p.slug === "test-speech-recognition-real-business-calls"
)!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getT();
  const title = t(post.seoTitle ?? post.title);
  const description = t(post.metaDescription ?? post.description);
  return {
    title,
    description,
    alternates: alternatesFor(loc, `/blog/${post.slug}`),
    robots: robotsFor(loc),
    openGraph: {
      type: "article",
      title: `${title} | Fill System`,
      description,
      publishedTime: post.date,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function TestSpeechRecognition({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();

  return (
    <>
      <BreadcrumbJsonLd title={t(post.seoTitle ?? post.title)} path={`/blog/${post.slug}`} parent={{ title: "Blog", path: "/blog" }} locale={locale as Locale} />
    <BlogPostLayout
      slug={post.slug}
      locale={locale}
      title={t(post.title)}
      description={t(post.description)}
      date={post.date}
      readTime={post.readTime}
      author={post.author}
      heroImage={post.heroImage}
      heroAlt={post.heroAlt}
    >
      {/* -- Intro ------------------------------------------------- */}
      <p>
        {t(
          "A speech-recognition model can perform extremely well on a public benchmark and still fail on the calls that matter to your business."
        )}
      </p>
      <p>
        {t(
          "The reason is simple: most benchmark scores compress many different failure modes into one number. They may not reflect your microphones, telephone compression, accents, overlapping speakers, product names, pricing language, silent segments, or the difference between a harmless punctuation error and a false contractual commitment."
        )}
      </p>
      <p>
        {t("For a B2B team, the relevant question is not:")}
      </p>
      <blockquote>
        {t(
          "Which speech-to-text model has the lowest published Word Error Rate?"
        )}
      </blockquote>
      <p>
        {t("It is:")}
      </p>
      <blockquote>
        {t(
          "Which system produces usable, attributable, and sufficiently accurate evidence from our real audio, within our latency, cost, privacy, and review constraints?"
        )}
      </blockquote>
      <p>
        {t(
          "That decision requires a business-specific acceptance test - not a vendor leaderboard."
        )}
      </p>
      <p>
        {t(
          "Before selecting or deploying a voice AI system, evaluate it across seven dimensions: Transcription accuracy on representative recordings; Speaker attribution when several people talk; Business-critical accuracy for prices, dates, names, obligations, and identifiers; Hallucination behavior during silence, noise, or missing speech; Latency and correction behavior in streaming versus batch processing; Operating cost, including review and rework; and Traceability and governance, including source audio, timestamps, confidence, access, and retention."
        )}
      </p>
      <p>
        {t(
          "A model should not pass because its average transcript looks readable. It should pass because the errors that remain are acceptable for the business process in which the transcript will be used."
        )}
      </p>

      {/* -- Why public benchmarks are useful and incomplete -------- */}
      <h2>
        {t(
          "Why public speech-recognition benchmarks are useful - and incomplete"
        )}
      </h2>
      <p>
        {t(
          "Public datasets and leaderboards help identify candidate models. They make controlled comparison possible and show how architectures perform under shared conditions."
        )}
      </p>
      <p>
        {t(
          "LibriSpeech, for example, separates relatively clean recordings from more difficult speech. The Open ASR Leaderboard expands reproducible comparison across models and datasets. The CHiME challenges go further by testing distant, spontaneous conversations with reverberation, multiple microphones, background noise, and overlapping speakers."
        )}
      </p>
      <p>
        {t("These sources are valuable because they expose an important pattern:")}
      </p>
      <blockquote>
        {t(
          "Performance on clean, prepared speech does not reliably predict performance in a real meeting room, call center, warehouse, vehicle, or field-service environment."
        )}
      </blockquote>
      <p>
        {t(
          "But no public benchmark reproduces your exact operating conditions."
        )}
      </p>
      <p>
        {t(
          "Your audio may include compressed phone calls; headset changes during a conversation; customers switching languages; non-native accents; product codes and uncommon names; several people speaking at once; long pauses and hold music; background television or machinery; legal, medical, financial, or technical vocabulary; and weak network segments and packet loss."
        )}
      </p>
      <p>
        {t(
          "A leaderboard can answer which systems deserve to enter the test. It cannot determine which system should become part of your production workflow."
        )}
      </p>

      {/* -- What Word Error Rate measures -------------------------- */}
      <h2>{t("What Word Error Rate measures")}</h2>
      <p>
        {t(
          "Word Error Rate, or WER, is commonly calculated as:"
        )}
      </p>
      <p>
        {t(
          "WER = (S + D + I) / N"
        )}
      </p>
      <p>
        {t(
          "Where S is the number of substitutions; D is the number of deletions; I is the number of insertions; and N is the number of words in the human reference transcript."
        )}
      </p>
      <p>
        {t(
          "WER is useful because it provides a consistent measure of textual difference."
        )}
      </p>
      <p>
        {t("It is not a complete measure of business usefulness.")}
      </p>
      <p>
        {t(
          "Consider two errors: \"Please send the file tomorrow\" becomes \"Please send the file today.\" and \"Thank you for the call\" becomes \"Thanks for the call.\""
        )}
      </p>
      <p>
        {t(
          "Both may contribute a similar number of word errors. Their consequences are not similar."
        )}
      </p>
      <p>
        {t(
          "The first can create an operational failure. The second is largely harmless."
        )}
      </p>
      <p>
        {t(
          "A production evaluation therefore needs more than average WER."
        )}
      </p>

      {/* -- Where speech recognition fails in practice ------------ */}
      <h2>{t("Where speech recognition fails in practice")}</h2>

      <h3>{t("Deletions under noise")}</h3>
      <p>
        {t(
          "A system may stop recognizing speech when the signal becomes weak or noisy. Entire phrases disappear."
        )}
      </p>
      <p>
        {t(
          "This is dangerous when the omitted phrase contains a price; a date; a customer objection; a compliance statement; a promised action; and a condition attached to approval."
        )}
      </p>
      <p>
        {t("A readable transcript can still be materially incomplete.")}
      </p>

      <h3>{t("Insertions and hallucinated speech")}</h3>
      <p>
        {t(
          "Some systems interpret noise, music, breathing, or silence as language and generate words that were never spoken."
        )}
      </p>
      <p>
        {t(
          "Hallucinated text is more dangerous than an obvious blank because it creates false evidence."
        )}
      </p>
      <p>
        {t(
          "Your test set should include silent audio; long pauses; hold music; background conversations; non-speech sounds; and recordings that end abruptly."
        )}
      </p>
      <p>
        {t("The correct result may be no transcript at all.")}
      </p>

      <h3>{t("Substitutions in business-critical entities")}</h3>
      <p>
        {t(
          "Names, brands, addresses, part numbers, currencies, percentages, dates, and acronyms are frequent points of failure."
        )}
      </p>
      <p>
        {t(
          "A system may understand the sentence while changing the entity that gives the sentence operational meaning."
        )}
      </p>
      <p>
        {t(
          "Examples include \"fifteen\" versus \"fifty\"; \"Q4\" versus \"Q2\"; \"$1.5 million\" versus \"$5 million\"; one customer name replaced by a more common one; and a product code normalized into an ordinary word."
        )}
      </p>
      <p>
        {t(
          "These errors should be scored separately from ordinary language differences."
        )}
      </p>

      <h3>{t("Speaker-attribution errors")}</h3>
      <p>
        {t(
          "A transcript may contain the right words but assign them to the wrong person."
        )}
      </p>
      <p>
        {t(
          "For meetings, interviews, sales calls, and investigations, attribution can be as important as transcription."
        )}
      </p>
      <p>
        {t(
          "This is why multi-speaker evaluation may include metrics such as DER - Diarization Error Rate; DA-WER - Diarization-Attributed Word Error Rate; and tcpWER - a time-constrained, speaker-aware error measure."
        )}
      </p>
      <p>
        {t(
          "If the system attributes a discount approval to the customer instead of the sales manager, the transcript is not operationally reliable even when the wording is correct."
        )}
      </p>

      <h3>{t("Overlapping speech")}</h3>
      <p>
        {t(
          "When two people speak simultaneously, a single-channel model may merge, omit, or invent content."
        )}
      </p>
      <p>
        {t(
          "Overlap is common in natural conversation: interruptions; confirmations; objections; group meetings; and customer-service escalations."
        )}
      </p>
      <p>
        {t(
          "A vendor demonstration with one speaker at a time does not test this condition."
        )}
      </p>

      <h3>{t("Formatting and normalization errors")}</h3>
      <p>
        {t(
          "Raw recognition and final business text are different products."
        )}
      </p>
      <p>
        {t(
          "The system may need to normalize numbers; dates; currency; capitalization; punctuation; acronyms; email addresses; and domain-specific terms."
        )}
      </p>
      <p>
        {t(
          "A transcript can have acceptable raw WER but still be difficult to use in CRM notes, legal review, analytics, or search."
        )}
      </p>

      <h3>{t("Streaming instability")}</h3>
      <p>
        {t(
          "Real-time transcription must make decisions before the full sentence is available."
        )}
      </p>
      <p>
        {t(
          "Partial text may change as new context arrives. Speaker labels may be corrected later. Punctuation and numbers may shift."
        )}
      </p>
      <p>
        {t("This creates a design question:")}
      </p>
      <blockquote>
        {t(
          "Is the partial transcript only a user-interface aid, or will downstream systems act on it?"
        )}
      </blockquote>
      <p>
        {t(
          "A live caption can tolerate correction. A workflow that updates a CRM or triggers an alert may not."
        )}
      </p>

      <h3>{t("Semantic usefulness after transcription")}</h3>
      <p>
        {t(
          "Some workflows do not require a perfect verbatim transcript. They require: a reliable summary; action items; decisions; objections; structured fields; and searchable evidence."
        )}
      </p>
      <p>
        {t(
          "A language model may recover the general meaning of a noisy transcript, but it must not be allowed to hide uncertainty or invent missing details."
        )}
      </p>
      <p>
        {t(
          "Semantic quality should therefore be evaluated separately from transcript fidelity."
        )}
      </p>

      {/* -- A practical acceptance framework ---------------------- */}
      <h2>{t("A practical acceptance framework")}</h2>
      <p>
        {t(
          "A practical evaluation should proceed in eight stages."
        )}
      </p>

      <h3>{t("Define the business task")}</h3>
      <p>
        {t("Do not begin with the model.")}
      </p>
      <p>
        {t("Define what the system is expected to produce.")}
      </p>
      <p>
        {t(
          "Examples: searchable meeting transcripts; call summaries; CRM notes; compliance review; quality assurance; live agent assistance; action-item extraction; and voice-controlled workflows."
        )}
      </p>
      <p>
        {t(
          "For each task, document who uses the output; what decision it supports; how quickly it is needed; which errors are unacceptable; whether a human reviews it; and how the source audio is retained and accessed."
        )}
      </p>

      <h3>{t("Build a representative audio set")}</h3>
      <p>
        {t(
          "A useful test set should represent the operating environment, not the ideal environment."
        )}
      </p>
      <p>
        {t("Include a matrix such as:")}
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Dimension")}</th>
              <th>{t("Examples to include")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("Channel")}</td>
              <td>
                {t(
                  "Mobile call, VoIP, conference platform, uploaded recording"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Acoustic condition")}</td>
              <td>
                {t(
                  "Quiet room, office noise, street, vehicle, warehouse"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Speakers")}</td>
              <td>
                {t(
                  "One, two, group, interruptions, overlapping speech"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Language")}</td>
              <td>
                {t(
                  "Primary language, accents, code-switching, multilingual calls"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Vocabulary")}</td>
              <td>
                {t(
                  "Names, products, acronyms, prices, dates, technical terms"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Signal quality")}</td>
              <td>
                {t(
                  "Clean, compressed, clipped, low volume, packet loss"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Non-speech")}</td>
              <td>
                {t(
                  "Silence, music, hold audio, keyboard, machinery"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Duration")}</td>
              <td>
                {t("Short request, normal call, long meeting")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t(
          "Do not create the test set only from recordings that are easy to transcribe."
        )}
      </p>

      <h3>{t("Create a controlled reference transcript")}</h3>
      <p>
        {t(
          "Human reference transcripts must follow a consistent policy."
        )}
      </p>
      <p>
        {t(
          "Define whether filler words are included; how numbers and dates are written; how incomplete words are handled; how overlapping speech is marked; how speaker labels are assigned; how inaudible segments are represented; and whether punctuation is evaluated separately."
        )}
      </p>
      <p>
        {t(
          "Without a normalization policy, differences between systems may reflect formatting rather than recognition quality."
        )}
      </p>

      <h3>{t("Score at three levels")}</h3>

      <h3>{t("Text accuracy")}</h3>
      <p>
        {t("Measure raw and normalized WER.")}
      </p>
      <p>
        {t(
          "This gives a baseline for substitutions, deletions, and insertions."
        )}
      </p>

      <h3>{t("Attribution and timing")}</h3>
      <p>
        {t(
          "Measure speaker-label accuracy; timestamp accuracy; overlap handling; segmentation quality; and delayed corrections in streaming mode."
        )}
      </p>

      <h3>{t("Business-critical accuracy")}</h3>
      <p>
        {t("Create a weighted error model.")}
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Error category")}</th>
              <th>{t("Example")}</th>
              <th style={{ textAlign: "right" }}>
                {t("Illustrative weight")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("Ordinary wording")}</td>
              <td>{t("\"purchase\" versus \"buy\"")}</td>
              <td style={{ textAlign: "right" }}>1</td>
            </tr>
            <tr>
              <td>{t("Name or company")}</td>
              <td>{t("Wrong customer identity")}</td>
              <td style={{ textAlign: "right" }}>3</td>
            </tr>
            <tr>
              <td>{t("Date or deadline")}</td>
              <td>{t("Tomorrow versus next week")}</td>
              <td style={{ textAlign: "right" }}>5</td>
            </tr>
            <tr>
              <td>{t("Price or quantity")}</td>
              <td>{t("15 versus 50")}</td>
              <td style={{ textAlign: "right" }}>7</td>
            </tr>
            <tr>
              <td>{t("Obligation or approval")}</td>
              <td>
                {t("\"Can\" versus \"cannot\"; wrong approver")}
              </td>
              <td style={{ textAlign: "right" }}>10</td>
            </tr>
            <tr>
              <td>{t("Hallucinated commitment")}</td>
              <td>{t("Statement never spoken")}</td>
              <td style={{ textAlign: "right" }}>12</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t("The exact weights must reflect your process.")}
      </p>
      <p>
        {t(
          "The purpose is not to create a universal metric. It is to stop harmless wording differences from hiding high-impact errors."
        )}
      </p>

      <h3>{t("Compare streaming and batch modes separately")}</h3>
      <p>
        {t(
          "Do not assume that a model's batch score applies to real-time use."
        )}
      </p>
      <p>
        {t(
          "Evaluate first-token latency; stable-transcript latency; correction frequency; final transcript accuracy; speaker-label stability; connection failures; cost of continuous streaming; and behavior after reconnects."
        )}
      </p>
      <p>
        {t(
          "A practical hybrid architecture may use streaming text for the live interface; batch reprocessing for the final transcript; and a verified final transcript for analytics, search, and records."
        )}
      </p>

      <h3>{t("Test no-speech and adversarial conditions")}</h3>
      <p>
        {t(
          "Include cases in which the system should stop, abstain, or mark uncertainty."
        )}
      </p>
      <p>
        {t(
          "Test silence; irrelevant background audio; unsupported language; unintelligible segments; multiple simultaneous speakers; conflicting context prompts; corrupted files; repeated uploads; and extremely long recordings."
        )}
      </p>
      <p>
        {t(
          "A system that always returns confident text is not necessarily robust."
        )}
      </p>

      <h3>{t("Measure complete operating cost")}</h3>
      <p>
        {t("The API or compute price is only one component.")}
      </p>
      <p>
        {t("A practical model is:")}
      </p>
      <p>
        {t(
          "Cost per usable hour = Transcription + Storage + Post-processing + Human review + Rework + Integration + Monitoring"
        )}
      </p>
      <p>
        {t(
          "A cheaper model may be more expensive when employees spend additional time correcting names, speakers, and critical facts."
        )}
      </p>
      <p>
        {t(
          "Measure cost per audio hour; cost per accepted transcript; reviewer minutes per hour of audio; percentage of records requiring correction; cost of failed or repeated processing; and cost of downstream errors."
        )}
      </p>

      <h3>{t("Run a shadow pilot")}</h3>
      <p>
        {t(
          "Before allowing transcripts to trigger business actions, run the system in parallel with the existing process."
        )}
      </p>
      <p>
        {t(
          "Compare what the model produced; what employees accepted or corrected; which errors were missed; how often escalation was needed; whether the output saved time; and whether employees trusted the evidence."
        )}
      </p>
      <p>
        {t(
          "Only then decide whether the system should remain assistive or receive limited automation authority."
        )}
      </p>

      {/* -- Acceptance criteria should match the workflow ---------- */}
      <h2>{t("Acceptance criteria should match the workflow")}</h2>
      <p>
        {t("Different use cases require different standards.")}
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Use case")}</th>
              <th>{t("Primary acceptance concern")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("Meeting archive")}</td>
              <td>
                {t(
                  "Searchability, speaker attribution, final transcript quality"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Sales-call summary")}</td>
              <td>
                {t(
                  "Objections, commitments, next steps, CRM-field accuracy"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Live agent assist")}</td>
              <td>
                {t(
                  "Latency, stable partial results, safe recommendations"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Compliance review")}</td>
              <td>
                {t(
                  "Complete evidence, timestamps, attribution, auditability"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Contact-center analytics")}</td>
              <td>
                {t(
                  "Consistency at scale, category accuracy, cost per call"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Legal or financial evidence")}</td>
              <td>
                {t(
                  "Human verification, source traceability, critical-entity accuracy"
                )}
              </td>
            </tr>
            <tr>
              <td>{t("Voice-controlled action")}</td>
              <td>
                {t(
                  "Confirmation, authorization, replay protection, rollback"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t("There is no single acceptable WER for every scenario.")}
      </p>
      <p>
        {t(
          "A transcript used for informal search can tolerate errors that would be unacceptable in a workflow that updates prices, commitments, access, or compliance records."
        )}
      </p>

      {/* -- Where selection projects go wrong --------------------- */}
      <h2>{t("Where selection projects go wrong")}</h2>

      <h3>{t("Choosing the lowest public WER")}</h3>
      <p>
        {t(
          "A public average may hide poor performance on your vocabulary, speakers, or channels."
        )}
      </p>

      <h3>{t("Testing only clean audio")}</h3>
      <p>
        {t("This measures the easiest part of the problem.")}
      </p>

      <h3>
        {t(
          "Comparing vendor-normalized outputs without a shared policy"
        )}
      </h3>
      <p>
        {t(
          "One system may write \"$1,500\" while another writes \"fifteen hundred dollars.\" That is not automatically a recognition difference."
        )}
      </p>

      <h3>{t("Ignoring diarization")}</h3>
      <p>
        {t(
          "Correct words assigned to the wrong speaker can invalidate the result."
        )}
      </p>

      <h3>
        {t(
          "Using a language model to silently repair missing evidence"
        )}
      </h3>
      <p>
        {t(
          "Post-processing may improve readability, but reconstructed text must not be presented as verbatim speech."
        )}
      </p>

      <h3>{t("Sending partial streaming text into automation")}</h3>
      <p>
        {t(
          "Unstable text should not trigger irreversible actions."
        )}
      </p>

      <h3>{t("Excluding human review from ROI")}</h3>
      <p>
        {t(
          "The system may appear inexpensive only because correction time is not measured."
        )}
      </p>

      <h3>{t("Treating privacy and access as a later problem")}</h3>
      <p>
        {t(
          "Audio and transcripts may contain customer, employee, financial, or confidential information. Access, retention, deletion, vendor handling, and audit requirements should be defined before production ingestion."
        )}
      </p>

      {/* -- What the decision comes down to ----------------------- */}
      <h2>{t("What the decision comes down to")}</h2>
      <p>
        {t("Do not ask which model is \"99% accurate.\"")}
      </p>
      <p>
        {t(
          "Ask: Which audio conditions represent our real workload? Which errors change a business decision? What evidence must remain traceable to the source recording? Is streaming actually required, or is final accuracy more valuable? How much human review remains after deployment? What is the cost per accepted business output? Can the system abstain, escalate, and fail safely?"
        )}
      </p>
      <p>
        {t(
          "The right speech-recognition system is not the one that looks best on a clean benchmark."
        )}
      </p>
      <p>
        {t(
          "It is the one that meets a documented acceptance threshold on your calls, your vocabulary, your speakers, and your operating process."
        )}
      </p>

      <p>
        {t("Through our")}{" "}
        <Link href="/services/ai-process-automation">
          {t("AI & Process Automation consulting")}
        </Link>
        {t(", Fill System can help define the test corpus, error taxonomy, acceptance criteria, and operating economics for voice AI — so the production decision is based on evidence from your calls, not vendor benchmarks.")}
      </p>
      <p>
        <strong>
          <Link href="/#diagnostic-request-form">
            {t("Request a free diagnostic")}
          </Link>
        </strong>{" "}
        {t("to assess whether your voice workflow is ready for production — or where the gaps are.")}
      </p>
    </BlogPostLayout>
    </>
  );
}
