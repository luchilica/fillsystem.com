# Opsfield Systems — Seven Articles for the Company Blog

**Market:** United States  
**Audience:** B2B companies with approximately 50–250 employees  
**Editorial model:** Diagnostic-first IT and business consulting  
**Language of publication:** English

**Editorial note.** The proposed keywords and search intent are working hypotheses. Before publication, check the current U.S. search results, demand, title competition, vendor specifications, protocol versions, prices, benchmark data, and external links. Illustrative calculations must not be presented as verified client results.

## Contents

[Voice AI Benchmarks Lie by Omission](#voice-ai-benchmarks-lie-by-omission-how-to-test-speech-recognition-on-your-calls)  
[The Best Embedding Model for RAG Is the One That Wins on Your Data](#the-best-embedding-model-for-rag-is-the-one-that-wins-on-your-data)  
[Investors Don’t Fund Ideas. They Fund Operating Evidence.](#investors-dont-fund-ideas-they-fund-operating-evidence)  
[AI Agents Are Not Automation](#ai-agents-are-not-automation-what-must-exist-before-you-let-software-act)  
[How to Evaluate an AI Agent Before Production](#how-to-evaluate-an-ai-agent-before-production-a-practical-b2b-framework)  
[MCP vs. A2A](#mcp-vs-a2a-what-enterprise-teams-must-standardize-before-connecting-ai-agents)  
[AI Governance for Mid-Market B2B](#ai-governance-for-mid-market-b2b-the-minimum-controls-before-production)

---

## SEO and publication brief

**SEO title:** How to Test Speech Recognition on Real Business Calls

**H1:** Voice AI Benchmarks Lie by Omission: How to Test Speech Recognition on Your Calls

**Slug:** `/blog/test-speech-recognition-real-business-calls/`

**Meta description:** Build a business-specific voice AI benchmark for noise, accents, overlapping speech, diarization, critical entities, latency, hallucinations, and review cost.

**Primary keyword hypothesis:** `speech recognition testing`

**Secondary topics:** voice AI benchmark, ASR evaluation, speech-to-text accuracy, WER, speaker diarization, streaming vs batch transcription

**Search intent:** Technical and commercial decision support

**Target reader:** CTO, Solution Architect, AI Lead, Contact Center Director, Operations Leader

**Suggested next step:** Voice AI Architecture Assessment / Business & IT Diagnostic

## Recommended hero image

**Suggested file name:** `voice-ai-real-call-benchmark.webp`

**Image brief:** A clean enterprise editorial illustration showing the same business call passing through two environments: a controlled studio waveform on the left and a noisy real-world call center or meeting room on the right. In the center, a diagnostic layer compares transcription, speaker attribution, critical entities, latency, and hallucination risk. Use the Opsfield visual language: white space, dark navy, electric blue accents, fine data lines, no vendor logos, no embedded headline text.

**Recommended alt text:** Voice AI benchmark comparing clean audio with noisy real business calls and speaker-attribution errors.

# Voice AI Benchmarks Lie by Omission: How to Test Speech Recognition on Your Calls

A speech-recognition model can perform extremely well on a public benchmark and still fail on the calls that matter to your business.

The reason is simple: most benchmark scores compress many different failure modes into one number. They may not reflect your microphones, telephone compression, accents, overlapping speakers, product names, pricing language, silent segments, or the difference between a harmless punctuation error and a false contractual commitment.

For a B2B team, the relevant question is not:

> Which speech-to-text model has the lowest published Word Error Rate?

It is:

> Which system produces usable, attributable, and sufficiently accurate evidence from our real audio, within our latency, cost, privacy, and review constraints?

That decision requires a business-specific acceptance test—not a vendor leaderboard.

Before selecting or deploying a voice AI system, evaluate it across seven dimensions: **Transcription accuracy** on representative recordings; **Speaker attribution** when several people talk; **Business-critical accuracy** for prices, dates, names, obligations, and identifiers; **Hallucination behavior** during silence, noise, or missing speech; **Latency and correction behavior** in streaming versus batch processing; **Operating cost**, including review and rework; and **Traceability and governance**, including source audio, timestamps, confidence, access, and retention.

A model should not pass because its average transcript looks readable. It should pass because the errors that remain are acceptable for the business process in which the transcript will be used.

## Why public speech-recognition benchmarks are useful—and incomplete

Public datasets and leaderboards help identify candidate models. They make controlled comparison possible and show how architectures perform under shared conditions.

LibriSpeech, for example, separates relatively clean recordings from more difficult speech. The Open ASR Leaderboard expands reproducible comparison across models and datasets. The CHiME challenges go further by testing distant, spontaneous conversations with reverberation, multiple microphones, background noise, and overlapping speakers.

These sources are valuable because they expose an important pattern:

> Performance on clean, prepared speech does not reliably predict performance in a real meeting room, call center, warehouse, vehicle, or field-service environment.

But no public benchmark reproduces your exact operating conditions.

Your audio may include compressed phone calls; headset changes during a conversation; customers switching languages; non-native accents; product codes and uncommon names; several people speaking at once; long pauses and hold music; background television or machinery; legal, medical, financial, or technical vocabulary; and weak network segments and packet loss.

A leaderboard can answer which systems deserve to enter the test. It cannot determine which system should become part of your production workflow.

## What Word Error Rate measures

Word Error Rate, or WER, is commonly calculated as:

$$
\text{WER} = \frac{S + D + I}{N}
$$

Where **S** is the number of substitutions; **D** is the number of deletions; **I** is the number of insertions; and **N** is the number of words in the human reference transcript.

WER is useful because it provides a consistent measure of textual difference.

It is not a complete measure of business usefulness.

Consider two errors: “Please send the file tomorrow” becomes “Please send the file today.” and “Thank you for the call” becomes “Thanks for the call.”

Both may contribute a similar number of word errors. Their consequences are not similar.

The first can create an operational failure. The second is largely harmless.

A production evaluation therefore needs more than average WER.

## Where speech recognition fails in practice

### Deletions under noise

A system may stop recognizing speech when the signal becomes weak or noisy. Entire phrases disappear.

This is dangerous when the omitted phrase contains a price; a date; a customer objection; a compliance statement; a promised action; and a condition attached to approval.

A readable transcript can still be materially incomplete.

### Insertions and hallucinated speech

Some systems interpret noise, music, breathing, or silence as language and generate words that were never spoken.

Hallucinated text is more dangerous than an obvious blank because it creates false evidence.

Your test set should include silent audio; long pauses; hold music; background conversations; non-speech sounds; and recordings that end abruptly.

The correct result may be no transcript at all.

### Substitutions in business-critical entities

Names, brands, addresses, part numbers, currencies, percentages, dates, and acronyms are frequent points of failure.

A system may understand the sentence while changing the entity that gives the sentence operational meaning.

Examples include “fifteen” versus “fifty”; “Q4” versus “Q2”; “$1.5 million” versus “$5 million”; one customer name replaced by a more common one; and a product code normalized into an ordinary word.

These errors should be scored separately from ordinary language differences.

### Speaker-attribution errors

A transcript may contain the right words but assign them to the wrong person.

For meetings, interviews, sales calls, and investigations, attribution can be as important as transcription.

This is why multi-speaker evaluation may include metrics such as **DER** — Diarization Error Rate; **DA-WER** — Diarization-Attributed Word Error Rate; and **tcpWER** — a time-constrained, speaker-aware error measure.

If the system attributes a discount approval to the customer instead of the sales manager, the transcript is not operationally reliable even when the wording is correct.

### Overlapping speech

When two people speak simultaneously, a single-channel model may merge, omit, or invent content.

Overlap is common in natural conversation: interruptions; confirmations; objections; group meetings; and customer-service escalations.

A vendor demonstration with one speaker at a time does not test this condition.

### Formatting and normalization errors

Raw recognition and final business text are different products.

The system may need to normalize numbers; dates; currency; capitalization; punctuation; acronyms; email addresses; and domain-specific terms.

A transcript can have acceptable raw WER but still be difficult to use in CRM notes, legal review, analytics, or search.

### Streaming instability

Real-time transcription must make decisions before the full sentence is available.

Partial text may change as new context arrives. Speaker labels may be corrected later. Punctuation and numbers may shift.

This creates a design question:

> Is the partial transcript only a user-interface aid, or will downstream systems act on it?

A live caption can tolerate correction. A workflow that updates a CRM or triggers an alert may not.

### Semantic usefulness after transcription

Some workflows do not require a perfect verbatim transcript. They require: a reliable summary; action items; decisions; objections; structured fields; and searchable evidence.

A language model may recover the general meaning of a noisy transcript, but it must not be allowed to hide uncertainty or invent missing details.

Semantic quality should therefore be evaluated separately from transcript fidelity.

## A practical acceptance framework

A practical evaluation should proceed in eight stages.

### Define the business task

Do not begin with the model.

Define what the system is expected to produce.

Examples: searchable meeting transcripts; call summaries; CRM notes; compliance review; quality assurance; live agent assistance; action-item extraction; and voice-controlled workflows.

For each task, document who uses the output; what decision it supports; how quickly it is needed; which errors are unacceptable; whether a human reviews it; and how the source audio is retained and accessed.

### Build a representative audio set

A useful test set should represent the operating environment, not the ideal environment.

Include a matrix such as:

| Dimension | Examples to include |
|---|---|
| Channel | Mobile call, VoIP, conference platform, uploaded recording |
| Acoustic condition | Quiet room, office noise, street, vehicle, warehouse |
| Speakers | One, two, group, interruptions, overlapping speech |
| Language | Primary language, accents, code-switching, multilingual calls |
| Vocabulary | Names, products, acronyms, prices, dates, technical terms |
| Signal quality | Clean, compressed, clipped, low volume, packet loss |
| Non-speech | Silence, music, hold audio, keyboard, machinery |
| Duration | Short request, normal call, long meeting |

Do not create the test set only from recordings that are easy to transcribe.

### Create a controlled reference transcript

Human reference transcripts must follow a consistent policy.

Define whether filler words are included; how numbers and dates are written; how incomplete words are handled; how overlapping speech is marked; how speaker labels are assigned; how inaudible segments are represented; and whether punctuation is evaluated separately.

Without a normalization policy, differences between systems may reflect formatting rather than recognition quality.

### Score at three levels

#### Text accuracy

Measure raw and normalized WER.

This gives a baseline for substitutions, deletions, and insertions.

#### Attribution and timing

Measure speaker-label accuracy; timestamp accuracy; overlap handling; segmentation quality; and delayed corrections in streaming mode.

#### Business-critical accuracy

Create a weighted error model.

| Error category | Example | Illustrative weight |
|---|---|---:|
| Ordinary wording | “purchase” versus “buy” | 1 |
| Name or company | Wrong customer identity | 3 |
| Date or deadline | Tomorrow versus next week | 5 |
| Price or quantity | 15 versus 50 | 7 |
| Obligation or approval | “Can” versus “cannot”; wrong approver | 10 |
| Hallucinated commitment | Statement never spoken | 12 |

The exact weights must reflect your process.

The purpose is not to create a universal metric. It is to stop harmless wording differences from hiding high-impact errors.

### Compare streaming and batch modes separately

Do not assume that a model’s batch score applies to real-time use.

Evaluate first-token latency; stable-transcript latency; correction frequency; final transcript accuracy; speaker-label stability; connection failures; cost of continuous streaming; and behavior after reconnects.

A practical hybrid architecture may use streaming text for the live interface; batch reprocessing for the final transcript; and a verified final transcript for analytics, search, and records.

### Test no-speech and adversarial conditions

Include cases in which the system should stop, abstain, or mark uncertainty.

Test silence; irrelevant background audio; unsupported language; unintelligible segments; multiple simultaneous speakers; conflicting context prompts; corrupted files; repeated uploads; and extremely long recordings.

A system that always returns confident text is not necessarily robust.

### Measure complete operating cost

The API or compute price is only one component.

A practical model is:

$$
\text{Cost per usable hour} =
\text{Transcription} +
\text{Storage} +
\text{Post-processing} +
\text{Human review} +
\text{Rework} +
\text{Integration} +
\text{Monitoring}
$$

A cheaper model may be more expensive when employees spend additional time correcting names, speakers, and critical facts.

Measure cost per audio hour; cost per accepted transcript; reviewer minutes per hour of audio; percentage of records requiring correction; cost of failed or repeated processing; and cost of downstream errors.

### Run a shadow pilot

Before allowing transcripts to trigger business actions, run the system in parallel with the existing process.

Compare what the model produced; what employees accepted or corrected; which errors were missed; how often escalation was needed; whether the output saved time; and whether employees trusted the evidence.

Only then decide whether the system should remain assistive or receive limited automation authority.

## Acceptance criteria should match the workflow

Different use cases require different standards.

| Use case | Primary acceptance concern |
|---|---|
| Meeting archive | Searchability, speaker attribution, final transcript quality |
| Sales-call summary | Objections, commitments, next steps, CRM-field accuracy |
| Live agent assist | Latency, stable partial results, safe recommendations |
| Compliance review | Complete evidence, timestamps, attribution, auditability |
| Contact-center analytics | Consistency at scale, category accuracy, cost per call |
| Legal or financial evidence | Human verification, source traceability, critical-entity accuracy |
| Voice-controlled action | Confirmation, authorization, replay protection, rollback |

There is no single acceptable WER for every scenario.

A transcript used for informal search can tolerate errors that would be unacceptable in a workflow that updates prices, commitments, access, or compliance records.

## Where selection projects go wrong

### Choosing the lowest public WER

A public average may hide poor performance on your vocabulary, speakers, or channels.

### Testing only clean audio

This measures the easiest part of the problem.

### Comparing vendor-normalized outputs without a shared policy

One system may write “$1,500” while another writes “fifteen hundred dollars.” That is not automatically a recognition difference.

### Ignoring diarization

Correct words assigned to the wrong speaker can invalidate the result.

### Using a language model to silently repair missing evidence

Post-processing may improve readability, but reconstructed text must not be presented as verbatim speech.

### Sending partial streaming text into automation

Unstable text should not trigger irreversible actions.

### Excluding human review from ROI

The system may appear inexpensive only because correction time is not measured.

### Treating privacy and access as a later problem

Audio and transcripts may contain customer, employee, financial, or confidential information. Access, retention, deletion, vendor handling, and audit requirements should be defined before production ingestion.

## What the decision comes down to

Do not ask which model is “99% accurate.”

Ask: Which audio conditions represent our real workload? Which errors change a business decision? What evidence must remain traceable to the source recording? Is streaming actually required, or is final accuracy more valuable? How much human review remains after deployment? What is the cost per accepted business output? Can the system abstain, escalate, and fail safely?

The right speech-recognition system is not the one that looks best on a clean benchmark.

It is the one that meets a documented acceptance threshold on your calls, your vocabulary, your speakers, and your operating process.

## Before deployment

Opsfield Systems can help define the test corpus, error taxonomy, acceptance criteria, architecture, review workflow, and operating economics through a **Voice AI Architecture Assessment or Business & IT Diagnostic**.

The objective is not to select the most impressive model.

It is to validate whether the complete voice workflow is accurate, governable, and economically useful before it becomes part of production operations.

### Selected research basis

The review should cover [LibriSpeech dataset](https://huggingface.co/datasets/openslr/librispeech_asr); [Open ASR Leaderboard research](https://arxiv.org/html/2510.06961v1); [Review of CHiME-7 and CHiME-8 distant conversational speech recognition](https://www.merl.com/publications/docs/TR2026-008.pdf); [Evaluating Speech-to-Text Systems with PennSound](https://arxiv.org/html/2504.05702v1); and [AssemblyAI benchmark methodology](https://www.assemblyai.com/benchmarks).

*Version-sensitive model claims, vendor specifications, prices, and benchmark results should be rechecked on the publication date.*

---

## SEO and publication brief

**SEO title:** How to Choose an Embedding Model for Enterprise RAG

**H1:** The Best Embedding Model for RAG Is the One That Wins on Your Data

**Slug:** `/blog/choose-embedding-model-enterprise-rag/`

**Meta description:** Compare embedding models for enterprise RAG by retrieval quality, cost, latency, multilingual support, governance, and migration risk before re-indexing your data.

**Primary keyword hypothesis:** `how to choose an embedding model for RAG`

**Secondary topics:** enterprise RAG embedding model, embedding model evaluation, MTEB benchmark, open-source vs API embeddings, embedding dimensions, multilingual embeddings

**Search intent:** Commercial investigation + technical decision support

**Target reader:** CTO, Head of AI, Data Lead, Solution Architect, Operations Executive

**Suggested next step:** Business & IT Diagnostic / AI Readiness and Architecture Assessment

## Recommended hero image

**Suggested file name:** `enterprise-rag-embedding-decision.webp`

**Image brief:** An enterprise architecture illustration of a RAG pipeline: documents and tables enter a parsing and chunking layer, move into several alternative embedding paths, then converge on a vector index and evidence retrieval panel. One path is highlighted as selected after testing; another shows the cost of re-indexing. Use precise technical diagram aesthetics, dark navy and blue gradients, spacious layout, no model logos and no embedded body text.

**Recommended alt text:** Enterprise RAG pipeline comparing embedding models, vector dimensions, retrieval quality, and re-indexing risk.

# The Best Embedding Model for RAG Is the One That Wins on Your Data

Teams often choose an embedding model by opening a public leaderboard, selecting one of the top names, and starting to index their documents.

Six months later, the problems appear.

Exact product codes are missing from search results. Multilingual queries retrieve the wrong policy. Similar but legally different clauses are placed next to each other. Infrastructure costs rise as the index grows. Then the team discovers that changing the model means embedding the entire corpus again and rebuilding the vector index.

The original model may not have been bad. The decision process was incomplete.

**The right embedding model is not the model with the highest general benchmark score. It is the model that retrieves the correct evidence from your data, within your latency, cost, security, and operational constraints.**

## What an embedding model actually controls

An embedding model converts text, code, images, or other content into numerical vectors. A retrieval system compares these vectors to identify content that is semantically related to a user’s query.

In a typical RAG pipeline, the embedding model sits inside a larger sequence:

> Document ingestion → parsing → chunking → embedding → indexing → retrieval → reranking → generation

A weak embedding model can prevent the right evidence from reaching the language model. But a strong model cannot compensate for every other architectural problem.

For example: poor parsing can remove headings and table relationships; oversized chunks can combine unrelated facts; undersized chunks can destroy necessary context; missing metadata can make access filtering impossible; weak reranking can place superficially similar content above the correct answer; and an LLM can still misinterpret properly retrieved evidence.

This is why embedding selection should be treated as an **architecture decision**, not a model-shopping exercise.

## Why public leaderboards are useful—and insufficient

MTEB was created because embedding models were previously evaluated on narrow, incompatible sets of tasks. It covers retrieval, clustering, classification, reranking, semantic similarity and other workloads. The benchmark’s original findings showed that no single method dominated every task. MMTEB later expanded multilingual and domain coverage significantly. ([arXiv](https://arxiv.org/abs/2210.07316?utm_source=chatgpt.com))

A leaderboard can answer:

> Which models deserve to enter our test?

It cannot reliably answer:

> Which model should run our production system?

A public dataset rarely reproduces your combination of: internal terminology; abbreviations; product identifiers; document structure; languages; duplicate content; incomplete user questions; access restrictions; and industry-specific distinctions.

For RAG, the relevant benchmark category is usually retrieval. Even then, an average retrieval score can conceal serious weaknesses in the exact query types that matter to your business.

## What should drive the model decision

### Retrieval quality on your corpus

The model must find the evidence required to answer the actual question—not merely a document with similar vocabulary.

Your evaluation set should include several query classes:

| Query class | Example failure |
|---|---|
| Direct fact | Correct policy exists but is not retrieved |
| Paraphrase | User wording differs from the document |
| Exact identifier | Part number or contract code is ignored |
| Ambiguous query | Popular but incorrect document ranks first |
| Negative condition | “When is a refund not available?” |
| Cross-document | Answer requires two related sources |
| No-answer | System should not retrieve weak evidence as fact |
| Multilingual | Query and source use different languages |

A model that performs well on common questions but fails on negative conditions or identifiers may be unsuitable for legal, financial or operational search.

### Domain and language fit

“Multilingual” is not a binary property.

A model may support a language technically while performing poorly on: specialist vocabulary; inflected forms; transliterated names; mixed-language documents; industry abbreviations; and queries written in one language against documents in another.

For multilingual systems, include native-language and cross-language queries in the gold set. Do not infer performance from English MTEB results.

Qwen3 Embedding supports more than 100 languages and configurable dimensions up to 4096. BGE-M3 supports dense, sparse and multi-vector retrieval and processes inputs up to 8192 tokens. Snowflake Arctic Embed 2.0 was designed for multilingual retrieval under an Apache 2.0 licence. These are useful shortlist candidates, not automatic winners. ([Hugging Face](https://huggingface.co/Qwen/Qwen3-Embedding-8B?utm_source=chatgpt.com))

### Query and document behavior

Some models support separate query and document modes or task-specific instructions.

This matters because a search query and a source passage serve different functions: the query expresses an information need and the document contains potential evidence.

Using the wrong input mode can reduce retrieval quality even when the model itself is strong.

The evaluation must therefore replicate the exact production configuration: correct query prefix or instruction; correct document mode; same normalization; same output dimension; and same similarity metric.

Testing a model with default settings and deploying it with another configuration invalidates the comparison.

### Vector dimensions and index cost

Larger vectors are not automatically better.

They can increase: raw storage; index memory; network transfer; distance-computation cost; backup size; and re-indexing time.

Several managed models now support flexible dimensions. OpenAI’s third-generation embedding models default to 1536 and 3072 dimensions, while the API can shorten their output. Cohere Embed v4 supports 256–1536 dimensions, and Voyage 4 supports 256–2048. ([OpenAI Platform](https://platform.openai.com/docs/guides/embeddings))

For one million float32 vectors, the raw storage difference is material:

| Dimension | Approximate raw storage |
|---:|---:|
| 256 | 1.0 GB |
| 512 | 2.0 GB |
| 1024 | 4.1 GB |
| 1536 | 6.1 GB |
| 3072 | 12.3 GB |

These figures exclude the vector index, metadata, replicas and backups.

The correct question is not:

> What is the largest dimension available?

It is:

> At what dimension does additional retrieval quality stop justifying additional infrastructure cost?

Test at least two supported dimensions before committing to the index schema.

### Context length and chunking strategy

A large context limit is useful, but it does not eliminate document design.

Cohere Embed v4 supports a 128K context, Voyage 4 supports 32K, and OpenAI’s current third-generation embedding models accept up to 8192 tokens. ([Cohere Documentation](https://docs.cohere.com/docs/cohere-embed?utm_source=chatgpt.com))

That does not mean an entire 100-page report should become one vector.

A useful chunk must preserve enough context to answer the question while remaining narrow enough to represent one coherent subject.

Your test should therefore evaluate model and chunking combinations:

| Configuration | What it tests |
|---|---|
| 250–400-token chunks | Precise fact retrieval |
| 500–800-token chunks | Balanced context |
| 1000+ token chunks | Long reasoning context |
| Parent-child retrieval | Local detail plus document context |
| Contextualized chunks | Whether surrounding text improves retrieval |
| Semantic chunking | Whether topic boundaries outperform fixed length |

A weaker model with an effective chunking and reranking strategy can outperform a stronger model in a poor pipeline.

### Deployment, governance and licensing

The model shortlist should change when the system handles: confidential client data; regulated records; intellectual property; jurisdiction-restricted information; documents with granular user permissions; and workloads that must remain on-premises.

A managed API reduces model-serving work but introduces a vendor, data-transfer and availability dependency.

An open-weight model increases control but transfers responsibility for infrastructure; scaling; patching; monitoring; model serving; security; licence compliance; and performance optimisation.

Open weights also do not guarantee commercial permission. Jina Embeddings v5 Text Small, for example, is published under CC BY-NC 4.0, while BGE-M3 uses MIT and Qwen3 Embedding uses Apache 2.0. ([Hugging Face](https://huggingface.co/jinaai/jina-embeddings-v5-text-small?utm_source=chatgpt.com))

Licence review must happen before performance testing turns into production adoption.

### Migration and vendor resilience

Embedding spaces are model-specific. Vectors generated by unrelated models cannot normally be compared inside the same index.

Switching models may require: re-embedding the complete corpus; creating a second index; synchronising new and updated documents to both indexes; running A/B retrieval tests; migrating traffic; and retiring the old index.

The larger and more frequently changing the corpus, the more important this migration cost becomes.

Voyage’s fourth-generation model family is unusual because its large, standard and lite variants produce compatible embeddings, which can reduce some model-tier migration friction inside that family. ([Voyage AI](https://docs.voyageai.com/docs/embeddings?utm_source=chatgpt.com))

Compatibility inside one vendor family still does not remove broader vendor dependency. Production architecture should preserve: original source documents; deterministic chunk IDs; model and dimension metadata; re-embedding queues; versioned indexes; and rollback capability.

## A decision score for embedding models

A model should be scored as part of the full operating system, not in isolation.

The following default weighting can be adapted to the business case:

| Decision area | Default weight |
|---|---:|
| Retrieval quality on representative data | 35% |
| Domain and language fit | 15% |
| Security, deployment and licensing | 15% |
| Latency and throughput | 10% |
| Storage and serving cost | 10% |
| Migration and vendor risk | 10% |
| Monitoring and operational simplicity | 5% |

A model that wins a public benchmark but fails a mandatory data-residency requirement receives a failing score, not a small penalty.

Similarly, a low-cost model that reduces evidence retrieval below the business acceptance threshold is not economical. It merely moves cost from infrastructure to incorrect answers, manual checking and user distrust.

## How to run the evaluation

### Define the operating problem

Document who will use the system; which decisions it supports; source types; languages; corpus size and growth; acceptable response time; data sensitivity; cost ceiling; and consequences of incorrect retrieval.

Without this step, the team is evaluating technology without defining success.

### Build a representative gold set

Create approximately 100–300 validated questions for an initial production-oriented evaluation.

Each question should contain expected source document; expected evidence passage; acceptable alternative passages; query category; language; difficulty; and whether the correct result is “no evidence found.”

Synthetic questions can help expand the set, but subject-matter experts should verify the critical examples.

### Test a deliberately small shortlist

A reasonable shortlist might contain one lower-cost managed model; one higher-quality managed model; one multilingual option; one commercially permitted open-weight model; and one hybrid retrieval configuration.

Current examples include OpenAI `text-embedding-3-small` and `text-embedding-3-large`, Voyage 4, Cohere Embed v4, BGE-M3, Qwen3 Embedding and Snowflake Arctic Embed 2.0. Their official documentation shows materially different dimensions, context windows, modalities, licences and deployment characteristics. ([OpenAI Platform](https://platform.openai.com/docs/guides/embeddings))

The shortlist should remain small enough to evaluate properly.

### Measure quality and operating cost

At minimum, record:

| Metric | Why it matters |
|---|---|
| Hit Rate / Recall@K | Whether the correct evidence appears |
| MRR | How early the first correct passage appears |
| nDCG@K | Whether the full ranking is useful |
| P50 and P95 latency | Typical and worst-case user experience |
| Index size | Storage and memory implications |
| Embedding throughput | Re-indexing and update speed |
| Cost per million documents | Initial ingestion economics |
| Cost per 1,000 queries | Ongoing operating economics |
| Failure rate by query class | Hidden weaknesses behind the average |
| No-answer precision | Resistance to unsupported answers |

Do not combine all results into one average before inspecting failure slices. Ten failures involving obscure internal news may be acceptable. Ten failures involving contractual exclusions may not be.

### Run an end-to-end acceptance test

Retrieval metrics are necessary but not sufficient.

Connect the selected retrieval configurations to the intended: vector database; filters; reranker; prompt; LLM; and access-control layer.

Then evaluate whether the final response: uses the correct evidence; attributes it accurately; distinguishes fact from inference; refuses unsupported conclusions; preserves document-level permissions; and meets the required latency.

Only then should the team approve full-corpus indexing.

## Which model class fits which situation?

| Situation | Likely starting direction |
|---|---|
| Fast English-language pilot | Managed API with a smaller dimension |
| Complex multilingual knowledge base | Multilingual API or tested open-weight model |
| Scanned PDFs, diagrams and mixed content | Multimodal embedding pipeline |
| Confidential on-premises deployment | Commercially permitted open-weight model |
| Product codes and semantic questions | Hybrid lexical + dense retrieval |
| Legal, financial or code search | Domain-specific model or domain evaluation |
| Very large corpus with strict cost target | Dimension and quantisation testing |
| Rapidly changing product | Architecture designed for re-embedding |

Cohere Embed v4 supports text, images and mixed PDF content. BGE-M3 can produce dense, sparse and multi-vector representations in one model. These capabilities are valuable only when the corresponding retrieval problem exists. ([Cohere Documentation](https://docs.cohere.com/docs/multimodal-embeddings?utm_source=chatgpt.com))

## Where selection projects go wrong

### Selecting the highest leaderboard score

A benchmark winner may fail on internal acronyms, identifiers or multilingual queries.

### Selecting by API price alone

Embedding generation may be cheap relative to vector storage, model serving, human review and future re-indexing.

### Selecting by context window

Long input support does not prove precise retrieval from long documents.

### Assuming open source means free operations

The API invoice disappears, but GPU capacity, deployment, monitoring, upgrades and engineering labour remain.

### Testing models with different pipelines

Changing chunk size, reranker or top-K together with the model makes it impossible to identify the cause of improvement.

### Ignoring the no-answer case

A system that always retrieves something will eventually present irrelevant evidence as support.

### Treating access control as a later feature

Document and chunk permissions must be designed before indexing. Otherwise the vector store can become a second data repository whose access rules diverge from the source systems.

## What to decide before selecting a model

Do not begin with:

> Which embedding model should we use?

Begin with:

> What evidence must this system retrieve, for whom, under which constraints, and what happens when retrieval is wrong?

Once those questions are answered, the model shortlist becomes smaller and the evaluation becomes measurable.

The costliest embedding decision is rarely choosing the second-best public model. It is indexing a large corpus before defining the acceptance criteria, migration path and operating constraints.

---

## Before indexing the full corpus

Opsfield Systems evaluates the process, data sources, retrieval requirements, security constraints and expected business value before an AI architecture is committed.

A Business & IT Diagnostic can determine whether the next step should be a limited retrieval benchmark; an AI readiness assessment; a data and permissions review; a RAG architecture roadmap; a small controlled implementation; and or no implementation yet.

**Validate the retrieval decision before paying to embed and maintain the wrong system.**

---

## SEO and publication brief

**SEO title:** Investor Readiness Checklist for Scaling B2B Companies

**H1:** Investors Don’t Fund Ideas. They Fund Operating Evidence.

**Slug:** `/blog/investor-readiness-operating-evidence/`

**Meta description:** Before approaching investors, validate your revenue data, sales process, operating model, systems, risks, and use-of-funds plan.

**Primary keyword hypothesis:** `investor readiness checklist`

**Secondary topics:** what investors look for before funding, operational due diligence checklist, preparing a company for investment, B2B fundraising readiness

**Search intent:** Informational + commercial investigation

**Target reader:** Founder, CEO, or COO of a scaling B2B company preparing for funding or strategic diligence

**Suggested next step:** Request a Business & IT Diagnostic

## Recommended hero image

**Suggested file name:** `investor-readiness-operating-evidence.webp`

**Image brief:** A sophisticated due-diligence scene with a founder and advisor reviewing a connected evidence system rather than a pitch deck: revenue dashboard, process map, CRM flow, risk register, and milestone roadmap arranged as one coherent operating model. Avoid money piles, handshakes, rockets, and generic startup clichés. Use a clean B2B consulting aesthetic with white, navy, and blue.

**Recommended alt text:** Founder reviewing revenue data, processes, systems, risks, and operating evidence before investor due diligence.

# Investors Don’t Fund Ideas. They Fund Operating Evidence.

A strong idea can earn attention. A polished pitch deck can earn a meeting.

Neither one is enough to carry an investor through diligence.

Once the conversation becomes serious, the business behind the presentation starts to matter more than the presentation itself. Investors begin looking at how the company acquires customers, defines revenue, manages delivery, produces reports, controls risk, and turns additional capital into measurable operating progress.

At that point, the question is no longer:

> Is this an interesting idea?

It becomes:

> Is there enough reliable evidence to justify taking the next risk?

For a scaling B2B company, investor readiness is therefore not only a fundraising task. It is an operating-system test.

Before approaching investors, a company should be able to demonstrate seven things: the customer problem is supported by evidence; Revenue and core metrics can be reconciled; Customer acquisition is becoming repeatable; Delivery does not depend entirely on the founder; Processes, ownership, and systems can support growth; Material risks are understood rather than hidden; and The use of funds is connected to specific operating milestones.

A pitch deck tells the story.

Operating evidence shows whether the story can survive contact with reality.

## An idea is only the first hypothesis

Every company begins with assumptions: a problem exists; a specific customer experiences it; the customer will pay for a solution; the company can acquire that customer economically; the solution can be delivered consistently; and the model can expand without breaking operations.

The idea itself is not the problem. Treating the idea as proven is.

A strong founder can explain not only what the company believes, but also: which assumptions have been tested; what evidence supports them; which assumptions remain uncertain; what changed after contradictory evidence appeared; and what the company will test next.

This is a more credible signal than confidence alone.

Confidence describes the founder’s emotional position. Evidence describes the state of the business.

## Evidence that the problem is real

Customer interest is not the same as problem validation.

Prospects may praise a concept and still refuse to buy it. Existing customers may purchase for reasons different from those described in the deck. Usage may concentrate around one feature while the company continues investing in another.

Before an investor conversation, the company should be able to show how it knows the problem matters.

Useful evidence may include recurring customer complaints; current manual workarounds; time or money already spent on alternatives; paid pilots; product usage; renewal or expansion behavior; reasons customers buy; reasons customers leave; and situations in which the product is not a fit.

The last point matters.

A company that knows where its product does **not** work often appears more credible than one claiming that every business is a potential customer.

### A useful test

> Can the team distinguish customer enthusiasm from purchasing behavior?

If the answer is no, the company may have market interest without validated demand.

## Revenue quality, not only revenue growth

A growing top-line number can conceal weak operating visibility.

For example, different systems may use different definitions of: booked revenue; recurring revenue; recognized revenue; pipeline value; renewals; active customers; gross margin; and churn.

If CRM, billing, accounting, and management reporting produce conflicting numbers, investors may not know which version of the business to trust.

This does not automatically mean fraud or poor management. It often means the company grew faster than its reporting rules.

But the risk remains.

Before diligence, leadership should know which system is the source of truth for each core metric; who owns each definition; how numbers are reconciled; where estimates are used; which figures are still unreliable; and what is being done to correct them.

The goal is not to present perfect numbers.

The goal is to present numbers that can be explained and reproduced.

## A revenue process that is becoming repeatable

Founder-led sales can be an effective way to validate demand. It becomes a risk when it remains the only reliable way to close business.

Investors may examine whether customer acquisition depends on: the founder’s personal network; one large customer; one referral partner; one paid channel; undocumented sales judgment; custom pricing for every deal; and manual follow-up outside the CRM.

A repeatable revenue process does not require the company to have solved every acquisition problem. It requires the company to understand how opportunities actually move.

At minimum, the business should be able to map:

> Lead source → qualification → ownership → sales stage → proposal → close → onboarding → expansion or renewal

For each transition, leadership should know what triggers the handoff; who owns the next action; what information must be present; how long the step normally takes; where prospects most often stall; and which exceptions require human judgment.

Without this map, adding salespeople or marketing spend may scale confusion rather than revenue.

## An operating model that can work without constant founder intervention

A founder can compensate for weak processes during the early stage.

They answer every escalation, approve every exception, rescue delayed projects, remember every customer promise, and connect information that is fragmented across systems.

This can make the company appear more organized than it is.

The problem becomes visible when growth adds more customers, employees, products, and decisions.

Common signs of founder-dependent operations include approvals waiting for one person; undocumented customer commitments; employees asking the founder how standard work should be handled; critical information stored in private messages; different teams following different versions of the same process; and no clear owner for cross-functional handoffs.

Capital does not automatically solve this problem.

Hiring more people into an unclear operating model can increase coordination cost, approval queues, and duplicated work.

Before raising, leadership should identify critical decisions that still depend on the founder; processes that exist only as tribal knowledge; recurring exceptions; unclear ownership; and roles that would fail if one employee left.

This does not mean the founder must leave daily operations. It means the company should understand where the founder is creating unique value and where they are compensating for missing structure.

## Systems and data that support the operating model

Investors do not need every company to have an enterprise technology stack.

They do need confidence that the business can track customers; measure pipeline; deliver consistently; control access; produce credible reports; retain operational knowledge; integrate new employees; and manage critical dependencies.

The relevant question is not whether the company uses Salesforce, HubSpot, spreadsheets, or custom software.

The relevant question is whether the systems represent how the company actually works.

A basic systems review should identify:

| Area | What to verify |
|---|---|
| CRM | Pipeline stages, ownership, required data and reporting definitions |
| Finance | Reconciliation between contracts, invoices, cash and reported revenue |
| Delivery | Capacity, workload, commitments and customer status |
| Integrations | Which systems exchange data and how failures are detected |
| Access | Who controls critical accounts, API keys and administrative permissions |
| Documentation | Whether essential knowledge remains usable when employees change |
| Reporting | Whether management dashboards can be reproduced from source data |

A modern interface does not create operating maturity.

Reliable information flow does.

## Risks that are visible before the investor discovers them

An investor does not expect a growing company to have no risks.

A claim of having no meaningful risks can itself become a warning signal.

Mature preparation means leadership can explain: what might fail; what would trigger the failure; what the business impact would be; who owns the risk; what mitigation already exists; and what additional capital would change.

A simple risk register may include:

| Risk | Evidence | Potential impact | Current mitigation | Owner |
|---|---|---|---|---|
| Customer concentration | High share of revenue from one account | Revenue volatility | Expansion of qualified pipeline | CEO |
| Founder-dependent sales | Most major deals require founder involvement | Limited sales scalability | Documented qualification and handoff process | Head of Sales |
| Reporting inconsistency | CRM and finance use different revenue definitions | Low confidence in forecasts | Metric reconciliation project | Finance lead |
| Critical system ownership | One employee controls integrations and credentials | Operational interruption | Access review and documentation | Operations lead |

The purpose of this table is not to make the company look risk-free.

It is to show that management understands the business it is asking investors to fund.

## A use-of-funds plan connected to operating milestones

“Hire more people and spend more on marketing” is a budget category, not an investment thesis.

A credible use-of-funds plan explains the causal chain:

> Capital → capability → operating change → measurable milestone → reduced business risk

For example:

| Weak explanation | Stronger explanation |
|---|---|
| Hire salespeople | Add sales capacity after qualification criteria, pipeline stages, and ownership are standardized |
| Increase marketing | Scale the channel only after source attribution and conversion definitions are reliable |
| Build AI features | Validate the workflow, data quality, error cost, and human-review requirements before implementation |
| Upgrade the CRM | Correct the process and data model before approving migration |
| Hire operations staff | Define decision rights and process ownership before adding coordination capacity |

The critical question is:

> What becomes true after the capital is spent that is not true today?

If the answer is only “we will be bigger,” the plan is incomplete.

## A practical operating-evidence self-assessment

Use the following score only as an internal preparation tool. It is not an investor rating and does not predict fundraising success.

Score each category: **0 — Undocumented:** the answer depends on individual memory or opinion; **1 — Partially defined:** the company understands the issue, but evidence or ownership is inconsistent; and **2 — Reproducible:** definitions, evidence, owners, and source data are documented.

| Category | Score 0–2 |
|---|---:|
| Customer-problem evidence |  |
| Revenue and metric reliability |  |
| Repeatability of customer acquisition |  |
| Process and ownership clarity |  |
| System and data reliability |  |
| Risk visibility |  |
| Use-of-funds logic |  |
| **Total** | **/14** |

### How to interpret the result

**0–5: Narrative-led**

The fundraising story depends heavily on confidence and future assumptions. Core evidence should be developed before broad outreach.

**6–10: Partially evidenced**

The company has real signals but may face problems during diligence because metrics, ownership, or systems are inconsistent.

**11–14: Operationally explainable**

The company can reproduce much of the evidence behind its story. Remaining risks should still be disclosed and tested.

A high score does not guarantee investment.

A low score does not mean the company is uninvestable.

The score identifies where an investor conversation may expose uncertainty that management has not yet structured.

## Five red flags to resolve before the first serious meeting

### The number changes depending on who opens the dashboard

This usually indicates conflicting definitions, data sources, filters, or reporting dates.

### Only one person knows how a critical process works

That person may be an expert. They are also a single point of failure.

### The growth plan assumes that more people will fix an unclear process

Additional headcount often increases the cost of unclear ownership.

### The use-of-funds plan is disconnected from current bottlenecks

Capital should address a validated constraint, not a generic growth ambition.

### The investor identifies a material risk before management mentions it

The risk itself may be acceptable. The lack of visibility is harder to explain.

## What to prepare before investor outreach

A practical preparation package may include **Problem and evidence summary**.
   What has been validated, what remains uncertain, and what changed after customer feedback.

The review should cover **Metric-definition register**.
   Clear definitions, source systems, owners, and reconciliation rules for core numbers.

The review should cover **Revenue-process map**.
   Acquisition channels, qualification, pipeline stages, handoffs, onboarding, and renewal.

The review should cover **Operating-model map**.
   Major decisions, process owners, recurring exceptions, and founder dependencies.

The review should cover **Critical-systems map**.
   CRM, finance, delivery, reporting, integrations, permissions, and system ownership.

The review should cover **Risk register**.
   Material commercial, operational, technological, and organizational risks.

The review should cover **Use-of-funds dependency map**.
   Which bottleneck each investment addresses and which milestone should follow.

The review should cover **Prioritized remediation roadmap**.
   What must be fixed before outreach, during diligence, and after financing.

These materials do more than support fundraising.

They help management determine whether the business is ready to absorb additional capital without amplifying existing weaknesses.

## Capital is a multiplier

Investment can accelerate a repeatable customer-acquisition system.

It can also accelerate an unreliable one.

It can expand a clear operating model.

It can also add more people, tools, and approvals to a system that nobody fully understands.

The strongest preparation is therefore not a more confident presentation. It is a business whose central claims can be traced to customers, contracts, processes, systems, and reproducible data.

An idea can begin the conversation.

Operating evidence gives the conversation somewhere to go.

## Before entering diligence

If your leadership team cannot determine whether the main readiness gap is in revenue reporting, process ownership, CRM structure, system risk, or operational capacity, begin with a Business & IT Diagnostic.

The objective is not to manufacture a better fundraising story.

It is to identify which parts of the story the business can already prove—and which parts still require operational work.

**Request a Business & IT Diagnostic**

*This article provides general business and operational information. It does not constitute investment, legal, financial, accounting, or tax advice.*

---

## SEO and publication brief

**SEO title:** AI Agents Are Not Automation: A B2B Readiness Framework

**H1:** AI Agents Are Not Automation: What Must Exist Before You Let Software Act

**Slug:** `/blog/ai-agents-are-not-automation/`

**Meta description:** Learn what processes, permissions, controls, data, and approval rules must exist before an AI agent can safely act inside your business.

**Primary keyword hypothesis:** `AI agent readiness`

**Secondary topics:** AI agents for business, AI workflow automation, agentic AI governance, AI agent implementation, human-in-the-loop

**Search intent:** Commercial investigation + decision support

**Target reader:** CEO, COO, CTO, Head of Operations, Head of Automation

**Suggested next step:** AI & Process Automation Review

## Recommended hero image

**Suggested file name:** `ai-agent-readiness-framework.webp`

**Image brief:** A central AI agent represented as a controlled decision node connected to eight clearly separated enterprise layers: process, ownership, data, permissions, decision boundaries, human approval, logging, and rollback. Show a human approval gate before high-impact actions and a visible stop or recovery path. Use an architectural editorial style, not a humanoid robot.

**Recommended alt text:** AI agent readiness framework with process, data, permissions, human approval, logging, and rollback controls.

# AI Agents Are Not Automation: What Must Exist Before You Let Software Act

A traditional automation follows instructions.

When a form is submitted, create a CRM record. When an invoice is paid, update the account status. When a contract reaches its renewal date, notify the account manager.

An AI agent works differently.

It may interpret an objective, decide which information it needs, select tools, choose a sequence of actions, evaluate intermediate results, and change its approach before completing the task.

That difference sounds technical. It is actually operational.

The moment software can decide **how** to complete a task rather than merely execute a predefined step, the company must answer a new set of questions: What is the agent allowed to decide? Which systems can it access? Which actions require approval? What happens when information is incomplete? Who owns the result? How can an incorrect action be reversed?

An agent is not simply a smarter version of Zapier.

It is a new participant in the operating model.

Before allowing an AI agent to act inside a business process, eight conditions should exist: the process is understood; A human owner is accountable for the outcome; The required data is accessible and sufficiently reliable; Permissions are limited to the minimum necessary; Decision boundaries are explicit; High-impact actions require approval; Actions and failures are logged; and The company can stop and reverse the agent’s work.

If several of these conditions are missing, the immediate task is not agent development.

It is process and system remediation.

## Automation, copilots, workflows, and agents are not the same thing

The market uses the term “AI agent” for almost every workflow containing a language model. That makes architecture decisions harder than they need to be.

Anthropic distinguishes workflows, where models and tools follow predefined execution paths, from agents, where the model dynamically directs its own process and tool use. The company also recommends beginning with the simplest architecture that can reliably solve the problem rather than adding autonomy by default. ([Anthropic](https://www.anthropic.com/research/building-effective-agents?trk=public_post_comment-text&utm_source=chatgpt.com))

A practical business distinction looks like this:

| System type | How it works | Example | Operational risk |
|---|---|---|---|
| **Rule-based automation** | Executes fixed rules | Create a task after a deal changes stage | Low when rules are correct |
| **Copilot** | Produces a recommendation or draft | Draft a reply to a customer | Human remains responsible |
| **LLM workflow** | Uses AI inside a predefined sequence | Classify request, draft response, route for review | Moderate and relatively traceable |
| **AI agent** | Selects actions and tools dynamically | Investigate an account and determine the next action | Higher because behavior can vary |
| **Multi-agent system** | Several agents delegate or coordinate tasks | Research, analysis, compliance review, and execution | Highest coordination and trust complexity |

The distinction matters because each step toward autonomy increases the number of possible execution paths.

A fixed workflow may fail in three predictable places.

An agent may fail during interpretation, planning, retrieval, tool selection, argument generation, permission handling, verification, retry, escalation, or execution.

More autonomy creates more potential value—but also more ways to be wrong.

## The most common mistake: giving an agent an unclear process

Consider a company that wants an agent to qualify inbound leads.

The requested workflow sounds simple:

> Review each lead, determine whether it is qualified, update the CRM, and prepare the next communication.

But discovery reveals that: marketing and sales use different definitions of a qualified lead; several CRM fields are optional or outdated; account ownership rules contain undocumented exceptions; strategic leads are handled differently; the current process depends on a sales manager’s judgment; and nobody measures how many qualified leads are incorrectly rejected.

The agent cannot solve this ambiguity.

It will turn ambiguity into automated inconsistency.

If trained or prompted using historical CRM decisions, it may also reproduce the same undocumented habits that created the problem.

Model capability is not the limiting factor here.

The company has not yet defined what a correct decision looks like.

## What agent readiness looks like

Agent readiness should be assessed across eight connected areas.

### Process

The current workflow must be visible before it can be delegated.

Document the trigger; the expected output; the normal path; common exceptions; required inputs; completion criteria; and upstream and downstream dependencies.

A process does not need to be perfect. It does need to be understandable.

**Red flag:** two experienced employees describe materially different versions of the same workflow.

### Ownership

Every automated process needs one accountable business owner.

This person does not have to review every action. They must own: the definition of success; exception policy; approval rules; performance review; incident escalation; and decisions about changing or disabling the agent.

“IT owns the system” is not sufficient when the agent performs a sales, finance, HR, or customer-service process.

IT may own the platform.

The business function owns the outcome.

### Data

The agent must know: which sources are authoritative; which fields are required; how recent the data must be; how conflicting records are handled; what information the agent must not use; and what happens when evidence is missing.

Giving an agent access to more data does not automatically improve performance.

Access to duplicated, outdated, contradictory, or permission-inappropriate information can make results worse.

**Red flag:** the team cannot identify a source of truth for the main decision the agent is expected to make.

### Permissions

An agent should receive the minimum access required for its task.

OWASP’s current agent-security guidance emphasizes least privilege, isolation of tools and contexts, human approval for high-risk actions, structured validation, execution limits, and separation between decision-making and irreversible operations. ([OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html?utm_source=chatgpt.com))

Do not give an agent broad administrator credentials because narrowing permissions takes additional engineering effort.

Instead, separate tools by capability: read customer record; create draft; update non-critical field; request approval; send approved communication; and issue refund within a defined limit.

The agent should not receive a generic tool named `manage_customer_account` when the business can expose narrower, auditable operations.

### Decision boundaries

The company must distinguish between: what the agent may infer; what it may recommend; what it may change; what requires confirmation; and what it must never do.

For example, an agent may be allowed to classify an inquiry; identify missing information; recommend the next step; and draft a response.

It may be prohibited from: changing contractual terms; approving credit; deleting records; making employment decisions; sending legally significant communications; and overriding access restrictions.

Decision boundaries should be enforced in tools and permissions, not merely written into the prompt.

### Human approval

“Human-in-the-loop” is not a button.

The company must define who reviews the action; what information the reviewer sees; how much time they have; whether approval expires; whether changed parameters require new approval; what happens when nobody responds; and how urgent cases are escalated.

A reviewer who receives a vague message saying “Approve agent action?” is not exercising meaningful oversight.

The approval interface should show: the proposed action; the relevant evidence; the affected record; material consequences; confidence or uncertainty; and the exact parameters that will be executed.

### Logging and observability

A production agent should leave enough evidence to reconstruct what happened.

Useful records include user or system request; agent and model version; instructions and policy version; retrieved sources; selected tool; tool arguments; permission scope; approval event; output; retries; errors; duration; estimated cost; and final status.

Agent platforms increasingly treat traces, execution logs, token usage, errors, and latency as core lifecycle controls rather than optional debugging features. ([Google Cloud Documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents?utm_source=chatgpt.com))

A final text response is not an adequate audit trail.

### Rollback and shutdown

Before deployment, the team should know how to suspend the agent; revoke its credentials; stop active executions; identify affected records; reverse reversible changes; isolate failed integrations; restore the previous workflow; and notify process owners.

A kill switch that requires an engineer to deploy new code is not an effective operational control.

## Choosing the right level of autonomy

The right question is not whether a process should be “automated with an agent.”

The right question is how much autonomy the process can safely support.

| Level | Agent behavior | Appropriate use |
|---|---|---|
| **1. Recommend** | Analyzes information and proposes an action | New, ambiguous, high-risk, or poorly measured processes |
| **2. Act after approval** | Prepares and executes an action only after confirmation | Repeatable processes with material but reviewable consequences |
| **3. Bounded autonomy** | Executes independently within explicit limits | Stable, high-volume, reversible, measurable tasks |

A company can begin at Level 1 and increase autonomy only after collecting evidence.

That is usually safer than starting with broad autonomy and removing permissions after an incident.

## Example: an AI agent for inbound leads

Suppose the goal is to shorten lead-response time.

A weak implementation might give the agent full CRM and email access and ask it to “qualify and contact new leads.”

A stronger architecture separates the workflow: Read the new lead and permitted CRM data; Check whether required information is present; Apply documented qualification criteria; Identify uncertainty or conflicting evidence; Assign one of three outcomes: clearly unqualified; review required; and likely qualified; Prepare a CRM update; Draft a personalized email; Request approval before sending; Log the evidence, decision, and reviewer; and Escalate strategic or unusual accounts.

Only after the team demonstrates reliable performance might the agent receive permission to send communications for a narrow category of routine leads.

The process becomes more autonomous because evidence justifies the change—not because the model vendor released a new version.

## When an agent is the wrong solution

Do not begin with an agent when: a deterministic rule can solve the task; the process changes every week; nobody owns the outcome; exceptions are handled through undocumented judgment; required data is unavailable; actions cannot be reversed; the team cannot define a correct result; errors would remain invisible; and the expected task volume does not justify the operating cost.

An agent should earn its complexity.

A fixed workflow is often cheaper, easier to test, easier to secure, and easier to maintain.

## Calculate value at the level of the completed task

Do not evaluate agent economics using token price alone.

A practical model is:

$$
\text{Annual Value} =
(\text{Task Volume} \times \text{Time Saved} \times \text{Loaded Labor Cost})
+ \text{Recovered Revenue}
+ \text{Avoided Error Cost}

The review should cover \text{AI Operating Cost}; \text{Human Review Cost}; \text{Maintenance Cost}; and \text{Expected Failure Cost}.
$$

A lower-cost model is not economical when it creates more corrections, escalations, retries, or customer-facing errors.

Similarly, saving employee time creates value only when the released capacity is used productively.

## Agent readiness checklist

Before approving development, answer the following:

| Question | If the answer is “no” |
|---|---|
| Can the team map the current process? | The agent will automate an incomplete understanding |
| Is one business owner accountable? | Failures will become an IT-versus-business dispute |
| Is the expected outcome measurable? | Performance cannot be evaluated |
| Are normal cases and exceptions documented? | Unusual cases will produce unpredictable actions |
| Are authoritative data sources identified? | The agent may act on outdated or conflicting information |
| Can permissions be limited by tool and action? | The potential impact of failure is too broad |
| Are approval rules explicit? | Human oversight will be inconsistent |
| Are actions traceable? | Failures cannot be investigated reliably |
| Can changes be reversed? | A small error may become a major operational incident |
| Is expected value higher than full operating cost? | The agent is a technology expense, not a business improvement |

## What the decision comes down to

An AI agent should not be approved because the demonstration looked intelligent.

It should be approved when: the process is understood; the boundaries are enforceable; the data is suitable; the economics are credible; the risk is controlled; and the result can be measured.

The safest first question is not:

> Which agent platform should we buy?

It is:

> Which business decision are we prepared to let software make—and what evidence shows that we are ready?

**Before connecting an agent to production systems, Opsfield Systems can assess the process, data, permissions, decision boundaries, and expected ROI through an AI & Process Automation Review.**

---

## SEO and publication brief

**SEO title:** How to Evaluate an AI Agent Before Production

**H1:** How to Evaluate an AI Agent Before Production: A Practical B2B Framework

**Slug:** `/blog/evaluate-ai-agent-before-production/`

**Meta description:** Test AI agents for task success, tool use, safety, cost, resilience, and operational control before allowing them to act in production.

**Primary keyword hypothesis:** `AI agent evaluation`

**Secondary topics:** AI agent testing, agent production readiness, agent evaluation metrics, AI agent observability, agentic AI testing

**Search intent:** Technical and commercial decision support

**Target reader:** CTO, Solution Architect, AI Lead, Head of Automation, IT Director

**Suggested next step:** Extended Diagnostic / Agent Production Readiness Review

## Recommended hero image

**Suggested file name:** `ai-agent-production-evaluation.webp`

**Image brief:** A production test harness for an AI agent. The agent moves through normal, ambiguous, adversarial, missing-data, duplicate-event, and tool-failure test lanes. A scorecard measures task success, tool accuracy, safety, cost, latency, escalation, and rollback. Use a rigorous enterprise QA visual rather than a futuristic robot scene.

**Recommended alt text:** AI agent production evaluation across normal, adversarial, tool-failure, cost, and rollback scenarios.

# How to Evaluate an AI Agent Before Production: A Practical B2B Framework

An AI agent completes the demo successfully.

It finds the correct account, summarizes the history, updates the CRM, and drafts a useful response.

The team approves the pilot.

Then production introduces conditions that were absent from the demonstration: a required field is missing; two systems disagree; the API times out; the same event is delivered twice; the customer asks an ambiguous question; a document contains a malicious instruction; approval expires while the process continues; and the agent retries an action that already succeeded.

The agent was not necessarily evaluated incorrectly.

It may not have been evaluated at all.

A successful demonstration proves that one execution path can work.

Production readiness requires evidence that the system behaves acceptably across normal, ambiguous, adversarial, and partially failed conditions.

An AI agent should be evaluated at five levels: **Task outcome** — did it complete the business task correctly? **Execution trace** — did it choose the right tools and actions? **Safety and policy** — did it remain inside its permissions? **Economics** — did it complete the task at an acceptable cost and speed? **Operational resilience** — did it handle missing data, failures, retries, and escalation correctly?

The unit of evaluation should be the **completed business task**, not the quality of a single model response.

## Why standard LLM evaluation is not enough

A chatbot may be evaluated mainly on its final answer.

An agent can produce a good final answer while behaving incorrectly during execution.

It may retrieve restricted data; use the wrong tool; send invalid arguments; update the wrong account; repeat an irreversible action; conceal uncertainty; exceed its cost limit; and reach the correct result through an unsafe path.

Agent evaluation therefore has to inspect both the result and the trace that produced it.

Current official evaluation guidance increasingly describes the process as a combination of test-case design, execution, trace generation, scoring, simulation, and failure analysis. Google’s agent-evaluation documentation, for example, includes multi-turn scenarios and simulated tool failures such as service errors and latency spikes. ([Google Cloud Documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation?utm_source=chatgpt.com))

## Start with a written task contract

Before creating a test suite, define the task precisely.

A useful task contract includes:

| Component | Question |
|---|---|
| **Trigger** | What starts the task? |
| **Goal** | What business outcome is expected? |
| **Allowed inputs** | Which information may the agent use? |
| **Allowed actions** | Which tools and operations are permitted? |
| **Prohibited actions** | What must never happen? |
| **Approval requirement** | Which actions require confirmation? |
| **Completion criteria** | How do we know the task is finished? |
| **Escalation criteria** | When must the agent stop and involve a person? |
| **Time limit** | How long may the task run? |
| **Cost limit** | How much may one execution consume? |
| **Rollback path** | How can changes be reversed? |

Without this contract, a team may disagree about whether the same agent run was successful.

One person evaluates answer quality.

Another evaluates speed.

Another assumes that updating the CRM was permitted.

The agent cannot be measured against requirements that were never defined.

## Evaluate the business result first

The primary metric is not “the response sounded good.”

It is task success.

Examples: Was the correct customer identified? Was the correct invoice matched? Was the ticket routed to the right queue? Was the requested report generated from the approved data source? Was the record updated accurately? Was the task escalated when evidence was insufficient?

A task should be marked successful only when all mandatory conditions are satisfied.

For high-impact workflows, partial success may still be failure.

An agent that prepares the correct refund amount but applies it to the wrong account has not achieved 90% success.

It has created an incident.

## Metrics that reveal whether the agent works

### Task success rate

$$
\text{Task Success Rate} =
\frac{\text{Correctly Completed Tasks}}
{\text{Total Evaluated Tasks}}
$$

Success criteria should be deterministic where possible.

For example: correct record; correct field value; correct route; correct approval state; no prohibited action; and required evidence attached.

### Tool-selection accuracy

Did the agent choose the appropriate tool?

An agent may have access to CRM search; billing lookup; knowledge retrieval; email draft; customer update; and approval request.

Selecting a semantically related but operationally incorrect tool should be counted as an error even when the final output appears reasonable.

### Tool-argument validity

A correct tool with incorrect parameters is still a failed action.

Evaluate required arguments; account identifiers; dates; amounts; status values; scope; recipient; idempotency key; and approval token.

Structured outputs and schema validation reduce risk, but validation must also verify business meaning.

A syntactically valid amount of `$100,000` may still violate the agent’s approval limit.

### Policy-compliance rate

Measure whether the agent: stayed within permitted systems; avoided restricted information; obtained required approval; respected action limits; stopped when evidence was insufficient; avoided prohibited actions; and handled external instructions as untrusted content.

OWASP recommends least privilege, human oversight for high-risk actions, limits on recursion and retries, validation of external inputs, and structured adversarial testing before production. ([OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html?utm_source=chatgpt.com))

For a prohibited irreversible action, the acceptable unauthorized-execution count in testing should be zero.

### Human-correction rate

$$
\text{Correction Rate} =
\frac{\text{Tasks Requiring Material Human Changes}}
{\text{Tasks Reviewed}}
$$

Do not count formatting preferences as material corrections.

Track changes that affect: decision; recipient; amount; classification; evidence; system action; and customer commitment.

A high correction rate means the agent may be shifting work rather than eliminating it.

### Escalation quality

An agent should not attempt to solve every case.

Evaluate whether it escalates: when required information is missing; when records conflict; when confidence is insufficient; when the action exceeds its authority; when the request is unusual; when tools fail; and when policy interpretation is required.

Both under-escalation and over-escalation matter.

Under-escalation creates risk.

Over-escalation eliminates the economic value of automation.

### Duplicate-execution rate

Agents must be tested against repeated messages, retries, and delayed responses.

The system should not: issue two refunds; create two invoices; send duplicate emails; create duplicate CRM records; and reopen a completed task.

Idempotency is not only an integration concern. It is part of agent correctness.

### Latency and task duration

Measure time to first useful action; total task duration; tool waiting time; number of model iterations; human approval delay; and retry delay.

A task may be accurate but operationally unusable when it takes longer than the manual process.

### Cost per completed task

$$
\text{Cost per Successful Task} =
\frac{\text{Model + Tool + Infrastructure + Review Cost}}
{\text{Successfully Completed Tasks}}
$$

Include model calls; retrieval; reranking; external APIs; observability; human review; failed attempts; retries; and engineering support.

Cost per request hides failures.

Cost per completed task exposes them.

## Build the test suite around failure, not only success

A representative evaluation suite should contain several scenario classes.

### Normal cases

Routine tasks with complete, consistent data.

Purpose: establish baseline performance.

### Ambiguous cases

Requests with multiple plausible interpretations.

Expected behavior: ask for clarification or apply a documented rule.

### Missing-data cases

Required information is absent.

Expected behavior: identify the missing evidence and stop or escalate.

### Conflicting-data cases

CRM, billing, and support systems disagree.

Expected behavior: follow the source-of-truth policy rather than selecting the most convenient answer.

### Tool-failure cases

Simulate: timeout; authentication failure; rate limit; malformed response; partial update; and temporary service outage.

Expected behavior: retry only where safe, preserve state, avoid duplicates, and escalate when limits are reached.

### Duplicate-event cases

Deliver the same trigger more than once.

Expected behavior: recognize that the task has already been completed.

### Stale-state cases

Change a record after the agent begins but before it acts.

Expected behavior: revalidate critical data before execution.

### Adversarial cases

Place malicious or misleading instructions inside: email; PDF; CRM note; webpage; support ticket; and retrieved document.

Expected behavior: treat external content as data, not as authority to override system policy.

### Unauthorized-request cases

Ask the agent to perform an action outside its permissions.

Expected behavior: refuse or route for authorized approval.

### Partial-failure cases

The first action succeeds and the second fails.

Expected behavior: preserve an accurate state, avoid repeating the successful action, and provide a recoverable escalation.

## Create risk-based acceptance criteria

There should not be one universal performance threshold for every agent.

Classify tasks by potential impact.

| Risk class | Example | Evaluation priority |
|---|---|---|
| **Low** | Internal draft or summary | Usefulness, speed, correction rate |
| **Moderate** | CRM classification or task creation | Accuracy, traceability, duplicate prevention |
| **High** | Customer communication or account change | Approval, evidence, permissions, rollback |
| **Critical** | Payment, legal commitment, employment or access decision | Strong human control or exclusion from autonomy |

A high average task-success rate cannot compensate for one critical unauthorized action.

Results should therefore be reported by scenario and severity—not only as one blended percentage.

## Log the complete execution trace

For every evaluated run, retain: Scenario ID; Input and relevant context; Agent version; Model and configuration; Instruction and policy version; Retrieved evidence; Tool calls and parameters; Permission decisions; Approval requests and responses; Errors and retries; Final action; Duration and cost; Evaluation result; and Failure category.

This creates three benefits: failed behavior can be reproduced; releases can be compared; and previously fixed failures can become regression tests.

NIST’s Generative AI profile organizes risk management around the functions **Govern, Map, Measure, and Manage**. For an agent program, evaluation is the bridge between mapping intended behavior and managing actual production risk. ([NIST](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence?utm_source=chatgpt.com))

## Use a staged production rollout

Passing an offline test suite is not the end of evaluation.

Production introduces real users, changing data, integrations, latency, unexpected wording, and organizational behavior.

A safer rollout uses four stages.

### Shadow mode

The agent evaluates live tasks but cannot act.

Compare its proposed decisions with actual human decisions.

Measure agreement; false positives; false negatives; missing evidence; and escalation behavior.

### Recommendation mode

The agent presents recommendations to employees.

Humans perform the action.

This reveals whether the recommendation is useful and whether the agent provides enough evidence.

### Approval mode

The agent prepares the action and executes it after explicit approval.

Measure approval rate; correction rate; reviewer time; expired approvals; rejected actions; and post-execution errors.

### Bounded production

The agent acts autonomously only for a narrow, low-risk category.

Use account allowlists; amount limits; tool limits; rate limits; time limits; spend limits; automatic escalation; and immediate shutdown controls.

Autonomy should expand one boundary at a time.

## Production monitoring is continuous evaluation

After launch, monitor: task success; correction and reversal; escalation; tool failure; retries; duplicate actions; unauthorized attempts; average task cost; latency; abnormal behavior; performance by scenario type; and performance by model or agent version.

Averages can conceal important failures.

For example, a 95% success rate may include 99% on routine cases; 60% on ambiguous cases; and 40% when one system is unavailable.

The aggregate number looks healthy.

The operating system is not.

## A production-readiness scorecard

Use the following structure to reach a go, limited-go, or no-go decision.

| Area | Weight | What is evaluated |
|---|---:|---|
| Business-task success | 25% | Correct completion of the full outcome |
| Tool and argument accuracy | 15% | Correct tool, parameters, record, and state |
| Safety and policy compliance | 20% | Permissions, approvals, prohibited actions |
| Exception handling | 15% | Missing, ambiguous, conflicting, and adversarial cases |
| Resilience | 10% | Tool failure, retries, duplicates, partial execution |
| Economics | 10% | Cost, latency, human review, rework |
| Observability and rollback | 5% | Traceability, incident response, reversibility |

Mandatory controls should operate as gates.

For example, an agent should not pass because its weighted score is high when: it performed an unauthorized action; a critical execution cannot be reconstructed; duplicate payments are possible; the agent cannot be disabled quickly; and no accountable process owner exists.

## Why a convincing demo can still fail in production

### The test set contains only ideal cases

The agent learns nothing about incomplete, contradictory, or malicious inputs.

### The final answer is evaluated but the trace is ignored

Unsafe or incorrect tool use remains hidden.

### The same team builds and grades the agent

Assumptions in the implementation are repeated in the evaluation.

### Human review cost is excluded

The agent appears economical only because employee correction time is unmeasured.

### The model changes without regression testing

A provider or configuration update changes behavior in previously stable scenarios.

### Production permissions are broader than test permissions

The evaluation does not represent the deployed risk.

### Failure criteria are negotiated after the test

The team redefines success to justify the investment already made.

## The production decision in practice

An agent is ready for production when the organization has evidence that it can complete the task; choose valid actions; remain within policy; handle uncertainty; fail safely; preserve traceability; produce enough economic value; and be stopped and reversed.

A successful demo answers:

> Can the agent work?

A production evaluation answers:

> Under which conditions can the company trust it to act?

**Opsfield Systems can review the process, test design, permissions, observability, failure controls, economics, and rollout plan through an Agent Production Readiness Review or Extended Diagnostic.**

---

## SEO and publication brief

**SEO title:** MCP vs. A2A for Enterprise AI Agents

**H1:** MCP vs. A2A: What Enterprise Teams Must Standardize Before Connecting AI Agents

**Slug:** `/blog/mcp-vs-a2a-enterprise-ai-agents/`

**Meta description:** Learn how MCP and A2A connect AI agents to tools and other agents—and what identity, permissions, approvals, and controls enterprises must design themselves.

**Primary keyword hypothesis:** `MCP vs A2A`

**Secondary topics:** Model Context Protocol enterprise, Agent2Agent protocol, AI agent architecture, MCP security, multi-agent systems

**Search intent:** Technical comparison + commercial decision support

**Target reader:** CTO, Solution Architect, IT Director, Head of Automation

**Suggested next step:** AI Architecture Review / IT Stack Assessment

## Recommended hero image

**Suggested file name:** `mcp-vs-a2a-enterprise-architecture.webp`

**Image brief:** A clear enterprise architecture diagram with an orchestrating agent in the center. MCP connections lead vertically to CRM, documents, databases, and business tools; A2A connections lead horizontally to specialized pricing, policy, and research agents. An identity, authorization, approval, observability, and recovery layer surrounds the full system. No protocol logos are required; the relationship should be understandable visually.

**Recommended alt text:** Enterprise AI architecture showing MCP connections to tools and A2A communication between specialized agents.

# MCP vs. A2A: What Enterprise Teams Must Standardize Before Connecting AI Agents

Connecting an AI agent to one business system is relatively simple.

Connecting several agents to dozens of tools, data sources, vendors, approval flows, and business processes is where the architecture begins to fragment.

One team creates a custom connector to Salesforce. Another builds a separate integration for SharePoint. A vendor deploys its own agent with broad API access. A second agent begins delegating tasks to the first. Soon, nobody can clearly explain: which agent can access which data; who authorized each action; which system owns the final result; how failed tasks are retried; whether the same action can run twice; and how an incorrect change can be reversed.

MCP and A2A address parts of this problem.

They do not address all of it.

**MCP can standardize how an AI application accesses tools, resources, and reusable prompts. A2A can standardize how independent agents discover each other, delegate work, exchange information, and manage tasks. Neither protocol defines your business process, authorization policy, data ownership, approval rules, or accountability model.**

The protocol is infrastructure.

The operating model is still your responsibility.

Use the two protocols for different relationships:

| Protocol | Standardizes | Practical role |
|---|---|---|
| **MCP** | AI application-to-tool and application-to-context communication | Gives an agent controlled access to APIs, files, databases, services, and reusable capabilities |
| **A2A** | Agent-to-agent communication | Allows independent agents to discover capabilities, exchange messages, delegate tasks, and return artifacts |

The official MCP architecture defines hosts, clients, and servers, with servers exposing tools, resources, and prompts through a common protocol. A2A is designed for collaboration between independent and potentially opaque agents without requiring them to disclose their internal memory, implementation, or tools. ([Model Context Protocol](https://modelcontextprotocol.io/docs/learn/architecture?utm_source=chatgpt.com))

They are complementary:

> **MCP equips an agent. A2A connects that agent to other agents.**

But standardizing communication does not make the connected system correct, secure, or economically justified.

## What MCP actually changes

Before MCP, every AI application typically needed a custom integration for every external capability: one connector for a CRM; another for a document repository; another for a database; another for an internal service; and another for a ticketing system.

Each integration could use different authentication, error handling, schemas, and discovery logic.

MCP introduces a shared protocol through which a server can expose three main categories: **Tools** — executable operations; **Resources** — contextual data the application can read; and **Prompts** — reusable interaction templates.

This can reduce the amount of application-specific integration code and make capabilities easier to discover and reuse. The protocol, however, explicitly focuses on context exchange and capability access; it does not define the AI application’s business logic or how the application should govern those capabilities. ([Model Context Protocol](https://modelcontextprotocol.io/specification/draft?utm_source=chatgpt.com))

### In practice

A revenue-operations agent might use separate MCP servers to search CRM accounts; read approved sales documentation; retrieve product-pricing rules; create a draft task; and request a pipeline update.

The agent does not need a unique integration design for every capability. It interacts through a common interface.

That is valuable.

But it creates a new question:

> Who decides which of those capabilities the agent should receive?

MCP standardizes the connection. It does not decide the permission model.

## What A2A actually changes

A2A addresses a different problem.

An enterprise may have several specialized agents: a sales-research agent; a pricing agent; a compliance-review agent; a customer-support agent; and a project-delivery agent.

These agents may be built by different teams, use different frameworks, or run on different vendor platforms.

A2A provides a common model through which agents can publish their capabilities; discover other agents; send and receive messages; manage collaborative tasks; return structured results or artifacts; and support synchronous, streaming, and long-running interactions.

The protocol is designed so that an agent can collaborate without exposing its internal reasoning, memory, or implementation details. ([A2A Protocol](https://a2a-protocol.org/latest/specification/?utm_source=chatgpt.com))

### In practice

A sales agent receives a request:

> Prepare a proposal for this account and verify that the pricing is permitted.

The sales agent may Use MCP to retrieve the account and opportunity from the CRM; Delegate the pricing check to a pricing agent through A2A; Receive a structured pricing artifact; Delegate a policy review to another agent; Combine the approved results; Prepare a proposal draft; and Request human approval before any external communication.

Here, MCP and A2A solve different integration layers.

```text
User or business event
        ↓
Orchestrating agent
        ├── MCP → CRM tools and data
        ├── MCP → document repository
        ├── A2A → pricing agent
        │           └── MCP → pricing system
        └── A2A → policy-review agent
                    └── MCP → approved policy sources
```

The architecture is interoperable.

It is not yet governed.

## What the protocols leave unresolved

Most implementation plans miss this distinction.

MCP and A2A do not automatically define the following.

### Business meaning

A tool may expose an operation named:

`update_opportunity_stage`

The protocol does not determine: what each pipeline stage means; whether entry and exit criteria are documented; who owns the opportunity; whether the change is financially significant; and whether a manager must approve it.

A standardized tool can still execute a poorly defined business process.

### Accountability

If Agent A delegates work to Agent B, which party owns an incorrect result?

Possible answers include Agent A’s business owner; Agent B’s product owner; the platform team; the employee who initiated the task; and the vendor operating the remote agent.

The protocol transports the task. It does not assign managerial accountability.

### Enterprise identity

Authentication proves that a system or user has presented a valid identity.

Authorization determines what that identity may do.

The difficult part is mapping: the human user; the initiating application; the orchestrating agent; the remote agent; the tool credential; and the final business operation.

A remote agent should not inherit broad privileges merely because a trusted orchestrator contacted it.

### Approval policy

A protocol can carry an approval request.

It cannot determine which actions should require approval.

That depends on: financial impact; reversibility; customer consequences; data sensitivity; legal significance; employee or vendor policy; and the reliability of the specific use case.

### Data quality

MCP can make inaccurate CRM data easier to access.

A2A can make it easier for several agents to distribute the resulting error.

Neither protocol resolves: duplicate records; conflicting policies; obsolete documents; missing owners; undefined metrics; and incorrect source-of-truth rules.

### Service-level expectations

A2A can support long-running tasks, but the enterprise must still decide: how long a task may run; when it is considered abandoned; what happens after a timeout; whether partial output can be used; how a task is cancelled; and whether the operation is safe to retry.

### Unit economics

Interoperability can increase the number of agent interactions.

A single business request may trigger: several model calls; multiple retrieval operations; remote agent tasks; retries; validation calls; and human review.

A technically successful multi-agent workflow can still be economically irrational.

## What the enterprise still has to standardize

Before connecting production agents, define the architecture across eight layers.

| Layer | Required decision |
|---|---|
| **1. Process** | What business outcome is being produced? |
| **2. Ownership** | Which person is accountable for that outcome? |
| **3. Identity** | Which user, agent, service, and credential initiated each operation? |
| **4. Capabilities** | Which tools, resources, and agents are allowed? |
| **5. Authorization** | What may each identity read, recommend, change, or execute? |
| **6. Approval** | Which operations require explicit human confirmation? |
| **7. Observability** | What messages, tool calls, artifacts, costs, and failures are recorded? |
| **8. Recovery** | How are tasks stopped, credentials revoked, and changes reversed? |

Skipping the upper layers and starting with servers, SDKs, and protocols creates integration without control.

## MCP security: the tool is part of the trust boundary

An MCP server is not simply a neutral connector.

Its tool definitions can influence what the model believes the capability does. The server may also receive data, execute code, access files, or call remote systems.

OWASP’s current MCP security guidance recommends: least-privilege access; separate and scoped credentials; validation of tool inputs and outputs; isolation of servers; confirmation for destructive or sensitive actions; central logging; verification of server sources and dependencies; and protection against changes to tool definitions. ([OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html?utm_source=chatgpt.com)).

### A risky design

One MCP server receives: full CRM administration; access to the shared drive; email-send permission; billing credentials; and unrestricted network access.

The agent is then told through its prompt to “use these responsibly.”

The prompt is acting as the primary security boundary.

That is not sufficient.

### A safer design

Capabilities are separated: `crm.read_account`; `crm.create_update_draft`; `crm.apply_approved_update`; `email.create_draft`; `email.send_approved_draft`; and `billing.read_invoice_status`.

Each operation has: a narrow schema; an explicit side effect; scoped credentials; validation; an audit event; and an approval policy where required.

The model is allowed to choose among safe capabilities.

It is not given unrestricted authority and asked to self-regulate.

## A2A security: delegation must not expand authority

Multi-agent architecture introduces **trust transitivity**.

Agent A is allowed to perform a task.

Agent A calls Agent B.

Agent B calls a tool or another agent.

A common but dangerous assumption is:

> Because Agent A was trusted, everything it delegates should also be trusted.

That can expand privileges beyond the original user’s authority.

A stronger delegation contract should carry: the initiating identity; the business purpose; the permitted scope; the allowed data classification; the task expiration; the approval state; the maximum cost or effort; the expected artifact; and the prohibition on further delegation, where appropriate.

Every downstream participant should remain inside the original trust boundary.

## Prevent duplicate and irreversible execution

Agent systems often operate over asynchronous infrastructure.

Messages may be retried. Connections may fail after an operation succeeds. A client may not know whether the remote action completed.

This creates a critical problem:

> Retrying the task may repeat the business action.

For read operations, this may be harmless.

For refunds, orders, customer messages, access changes, or CRM updates, it may create a material incident.

Production design should include unique task and operation identifiers; idempotency keys; explicit task states; confirmation of side effects; separation between preparation and execution; parameter-bound approvals; and compensating actions for reversible changes.

A status of “agent completed” is insufficient.

The system must know **which business operation completed**.

## API, webhook, MCP, or A2A?

Not every integration should use the newest protocol.

| Option | Best fit | Avoid when |
|---|---|---|
| **Direct API** | Stable, tightly controlled system-to-system operation | Many agent applications must independently rebuild the same connector |
| **Webhook/event** | A known event should trigger a predictable workflow | Dynamic discovery or interactive task management is required |
| **MCP** | AI applications need reusable access to tools and contextual resources | One simple deterministic integration is sufficient |
| **A2A** | Independent agents must discover, delegate, collaborate, or exchange long-running tasks | A single agent or ordinary service call can perform the work |
| **Fixed workflow** | Execution path is known and measurable | The task genuinely requires dynamic planning |
| **Multi-agent system** | Work must be divided across independent domains or trust boundaries | Additional agents add coordination without measurable value |

### Practical rule

Use the least complex architecture that meets the requirement.

A webhook is not obsolete because MCP exists.

A direct API is not inferior because A2A exists.

A second agent should not be created merely to make the system appear more agentic.

## Enterprise implementation checklist

Before allowing MCP or A2A traffic in production, confirm:

| Question | Failure consequence |
|---|---|
| Is every capability connected to a defined process? | Integration exists without a justified business outcome |
| Does every agent have a named owner? | Incidents become nobody’s responsibility |
| Are credentials scoped per server and capability? | One compromise gains excessive access |
| Are tool side effects clearly declared? | A read-looking operation may change production data |
| Are external inputs treated as untrusted? | Documents or messages may manipulate agent behavior |
| Are approvals tied to exact parameters? | A changed action may reuse an old approval |
| Are task retries idempotent? | Actions may execute more than once |
| Can delegation be limited? | Authority may expand across an agent chain |
| Are artifacts traceable to their sources? | The final output cannot be verified |
| Are cost, depth, and retry limits enforced? | Multi-agent loops can consume uncontrolled resources |
| Can every agent and server be disabled independently? | Incident containment becomes slow or incomplete |
| Is there a non-agent fallback process? | Business operations stop when the agent platform fails |

## What the decision comes down to

The strategic issue is broader than:

> Should we adopt MCP or A2A?

The better sequence is Which business process are we changing? Does it require agent access to tools, collaboration with other agents, or both? What is the minimum architecture that can solve it? Which trust boundaries will the architecture cross? What controls remain outside the protocol? How will the company prove that the new design is safer or more economical than the current process?

MCP and A2A can reduce integration inconsistency.

They can also make it easier to connect an unclear process to more systems at greater speed.

**Standardize the process, ownership, identity, permissions, approvals, and audit model before standardizing the communication layer.**

Opsfield Systems can assess the process, existing integrations, trust boundaries, and production controls through an independent **AI Architecture Review or IT Stack Assessment** before an agent ecosystem is connected to live business systems.

---

## SEO and publication brief

**SEO title:** AI Governance for Mid-Market B2B Companies

**H1:** AI Governance for Mid-Market B2B: The Minimum Controls Before Production

**Slug:** `/blog/ai-governance-mid-market-b2b/`

**Meta description:** Build a practical AI governance model covering ownership, data, vendors, evaluation, approvals, incidents, and model changes—without enterprise bureaucracy.

**Primary keyword hypothesis:** `AI governance for business`

**Secondary topics:** AI governance framework, generative AI policy, AI risk management, enterprise AI controls, AI system inventory

**Search intent:** Informational + commercial investigation

**Target reader:** CEO, COO, CTO, IT Director, Security Lead, Head of Operations

**Suggested next step:** IT Risk & Security Review / Extended Diagnostic

## Recommended hero image

**Suggested file name:** `mid-market-ai-governance-controls.webp`

**Image brief:** A lightweight AI governance operating model for a mid-market company. Show a central AI system inventory connected to named owners, risk tiers, approved data, vendor review, evaluation, human approval, monitoring, incident response, and change control. The scene should feel practical and lean—not like a government bureaucracy or a large committee.

**Recommended alt text:** Mid-market AI governance model with system inventory, ownership, risk tiers, testing, monitoring, and incident controls.

# AI Governance for Mid-Market B2B: The Minimum Controls Before Production

Most growing companies make one of two AI-governance mistakes.

The first is to create almost no governance.

Employees open individual AI accounts, upload documents, connect browser extensions, generate customer communications, and automate work without a shared inventory or review process.

The second is to copy an enterprise governance framework designed for a global regulated organization.

A committee is created. Every experiment requires several approvals. Documentation grows faster than implementation. Teams eventually bypass the process because it cannot support normal operating speed.

Neither approach is effective.

A B2B company with 50–250 employees does not need a thirty-person AI council.

It does need to know: which AI systems are being used; who owns each system; which data enters it; what decisions or actions it affects; how it was tested; which failures require escalation; and what happens when the model, vendor, or workflow changes.

**AI governance is not a document that says employees should use AI responsibly. It is the operating system through which the company approves, controls, measures, changes, and retires AI use cases.**

A practical minimum governance model contains ten controls: an inventory of AI systems and use cases; One accountable business owner per system; Risk classification based on impact and autonomy; Rules for data and vendor use; Defined evaluation before production; Permissions and human-approval boundaries; Monitoring of quality, cost, and incidents; An escalation and shutdown process; Change control for models, prompts, tools, and data; and Periodic review and retirement of obsolete systems.

NIST structures AI risk management around four functions: **Govern, Map, Measure, and Manage**. Its framework is voluntary and designed to be adaptable to organizations of different sizes and sectors. The Generative AI Profile extends that approach with attention to governance, pre-deployment testing, provenance, and incident disclosure. ([NIST Publications](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf?isid=enterprisehub_us&utm_source=chatgpt.com))

For a mid-market company, these principles should be translated into lightweight operating controls rather than copied as a large compliance program.

## Start with an inventory

A company cannot govern systems it does not know exist.

The inventory should include more than centrally purchased platforms. It should cover embedded AI inside existing SaaS; employee-created assistants; API-based automations; customer-facing chat or search; AI-generated reporting; agents connected to business tools; document-processing workflows; scoring and recommendation systems; and experimental pilots using company information.

### What the inventory should contain

| Field | What to record |
|---|---|
| **System or use case** | What the AI does |
| **Business owner** | Who is accountable for the outcome |
| **Technical owner** | Who operates or supports it |
| **Users** | Employees, customers, vendors, or the public |
| **Provider and model** | Which external or internal components are used |
| **Data** | What information is sent, retrieved, stored, or generated |
| **Output** | Draft, recommendation, decision, or autonomous action |
| **Integrations** | Systems the AI can read or change |
| **Risk tier** | Operational impact if it is wrong or unavailable |
| **Approval status** | Pilot, restricted production, production, suspended |
| **Last review** | When the system was last reassessed |
| **Fallback** | How the process operates without the AI |

A spreadsheet may be sufficient initially.

The value comes from ownership and review, not from purchasing a governance platform.

## Classify the use case, not only the model

The same model can create very different levels of risk.

Using an LLM to rewrite an internal meeting note is not equivalent to using it to approve a refund; rank job applicants; change customer entitlements; send contractual language; modify financial records; and provide customer-specific advice.

Risk depends on the complete use case:

> **Model + data + user + decision + integration + autonomy + consequence**

### A proportionate risk model

| Tier | Typical use | Minimum control |
|---|---|---|
| **Tier 1: Assistive** | Internal drafts, brainstorming, non-sensitive summarization | Approved tools, basic data rules, employee accountability |
| **Tier 2: Operational support** | Classification, search, routing, customer-response drafts | Named owner, evaluation set, logging, human review |
| **Tier 3: Material recommendation** | Pricing recommendations, qualification, financial or contractual analysis | Formal approval, documented evidence, restricted access, recurring testing |
| **Tier 4: Autonomous high-impact action** | Payments, access changes, binding communication, employment or safety-critical action | Executive risk acceptance, strong technical controls, explicit human approval or prohibition |

The classification should consider impact of an incorrect result; reversibility; number of affected people or records; data sensitivity; degree of autonomy; visibility of failure; dependence on third parties; and ability to fall back to a manual process.

A high-performing model does not make a high-impact use case low-risk.

## Assign one business owner

The AI team may build the solution.

IT may operate the infrastructure.

Security may assess technical controls.

A vendor may provide the model.

None of these automatically owns the business result.

For every system, one person should be accountable for intended use; success criteria; acceptable error; exception handling; approval rules; user training; incident response; continued business value; and the decision to change or stop the system.

### In practice

For an AI system that qualifies leads: **Sales Operations** may own the business outcome; **IT** may own platform access; **Security** may review permissions; **Data or RevOps** may own the evaluation dataset; and **The vendor** may operate the underlying model.

But one named business owner must decide what “qualified” means and accept responsibility for the resulting process.

“AI owns the decision” is never an accountability model.

## Establish data-handling rules

Employees frequently interpret an approved AI tool as approval to enter any company information into it.

These are separate decisions.

The policy should distinguish public information; ordinary internal information; confidential business information; personal information; customer-controlled information; credentials and secrets; and legally restricted or contractually protected information.

For each category, state whether it may be entered manually; uploaded; retrieved through an integration; retained in logs; used to improve a provider’s services; processed only under a separate agreement; and prohibited entirely.

The policy must also reflect what the system actually does.

A chatbot used through a browser and an API integration connected to a CRM may have different data flows even when they use the same provider.

## Vendor review is more than reading the security page

A provider’s marketing material does not replace due diligence.

The review should address:

| Area | Question |
|---|---|
| **Data flow** | What data leaves the company and where does it go? |
| **Retention** | How long are inputs, outputs, files, and logs retained? |
| **Training and improvement** | Under which product terms may data be used? |
| **Subprocessors** | Which other parties participate? |
| **Access** | Can provider personnel access customer data? |
| **Security** | What controls and independent assessments exist? |
| **Model changes** | Can behavior change without customer approval? |
| **Availability** | What happens when the service fails or rate-limits requests? |
| **Portability** | Can prompts, outputs, configurations, and source data be exported? |
| **Termination** | What happens to data and workflows when the contract ends? |

Not every low-risk tool requires a months-long procurement process.

But high-impact systems should not enter production because a vendor gave a convincing demonstration.

## Define success before the pilot

A pilot without acceptance criteria usually produces an ambiguous result.

Participants say: the outputs looked useful; the model felt intelligent; several tasks were faster; and some responses needed correction.

None of these statements supports a production decision.

Define the business task; the baseline; the evaluation dataset; required quality; prohibited failures; human-review effort; latency; operating cost; escalation criteria; pilot duration; and production decision rule.

### What to measure

| Metric | What it shows |
|---|---|
| **Task success rate** | Percentage of business tasks completed correctly |
| **Human correction rate** | How often employees must repair the output |
| **Escalation rate** | How often the system cannot complete the task safely |
| **Unsupported-claim rate** | Frequency of statements not grounded in approved evidence |
| **Prohibited-action rate** | Whether the system crosses policy boundaries |
| **Cost per completed task** | Full AI and review cost per useful outcome |
| **Cycle-time reduction** | Whether the business process actually became faster |
| **Failure visibility** | Whether incorrect results are detected before impact |

A system that saves ten minutes but creates twelve minutes of review has not automated the task.

It has relocated the work.

## Human oversight must be operational

“Human-in-the-loop” often appears in governance documents without specifying how the human participates.

A functioning review model answers: who reviews; which actions they review; what evidence they see; what constitutes approval; whether parameters may change after approval; what happens when the reviewer does not respond; how urgent cases are escalated; and how review quality is measured.

OWASP’s agent-security guidance recommends explicit approval for high-impact or irreversible actions, action previews, risk-based autonomy boundaries, audit trails, interruption, and rollback capabilities. ([OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html?utm_source=chatgpt.com))

### Oversight that exists only on paper

> A manager reviews AI decisions when necessary.

### Oversight that works in practice

> Refund recommendations above $250 require approval from the account owner. The approval view must show the customer, amount, source transaction, policy rule, supporting evidence, and exact execution parameters. Approval expires after two hours and cannot be reused if the amount or recipient changes.

The second model can be implemented and audited.

The first cannot.

## Separate recommendation from execution

For material operations, the AI should not be the only component deciding and executing the action.

A safer pattern is:

```text
AI analysis
    ↓
Structured proposed action
    ↓
Policy and schema validation
    ↓
Human or deterministic approval
    ↓
Restricted execution service
    ↓
Audit event
```

This creates independent control points.

It also prevents a prompt, retrieved document, or model error from directly becoming a production action.

The system prompt should guide behavior.

It should not serve as the sole authorization mechanism.

## Log enough to investigate—but not everything

Governance requires traceability, but indiscriminate logging creates another risk.

Useful records may include use case and task ID; user and agent identity; model and configuration version; approved data sources; retrieved references; selected operation; structured parameters; approval; output status; latency; cost; error; and escalation or override.

Do not automatically store: credentials; complete confidential documents; sensitive customer data; unrestricted prompt histories; and unnecessary personal information.

Logs should make an incident reconstructable without becoming an uncontrolled duplicate of the company’s sensitive data.

## Prepare for incidents before production

An AI incident is not limited to a security breach.

It may include repeated incorrect customer communications; inappropriate data exposure; unexpected autonomous actions; material reporting errors; systematic bias in routing or scoring; uncontrolled cost; model degradation; unavailable vendor service; and corrupted memory or retrieval sources.

The response plan should define Who receives the alert; Who may suspend the system; How credentials and integrations are revoked; How affected records are identified; Whether actions can be reversed; Who communicates with customers or partners; What evidence must be preserved; and What conditions allow the system to return.

The NIST Generative AI Profile treats incident disclosure and lifecycle risk management as important parts of responsible deployment rather than post-project administrative work. ([NIST Publications](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf?utm_source=chatgpt.com))

## Govern changes, not only initial launch

An AI system can change without the business workflow appearing to change.

Performance may be affected by: a different model version; a changed system prompt; a new tool; modified permissions; a revised knowledge base; a new embedding or reranking model; changes to business definitions; provider-side updates; new user groups; and expanded autonomy.

Every material change should answer: Does the risk tier change? Must the evaluation suite be rerun? Are previous approvals still valid? Did the data flow change? Did the cost model change? Can the previous version be restored?

A production approval applies to a tested configuration—not to every future system that carries the same name.

## A workable governance model

A mid-market organization does not need a large permanent committee.

It needs clear roles.

| Role | Responsibility |
|---|---|
| **Executive sponsor** | Sets risk tolerance and resolves high-impact decisions |
| **Business owner** | Owns the process, outcome, and continued value |
| **Technical owner** | Operates the system, integrations, versions, and fallback |
| **Security/privacy reviewer** | Reviews access, data flow, vendors, and incident controls |
| **Evaluator or data owner** | Maintains test cases, evidence, and performance thresholds |
| **Human reviewer** | Approves or corrects defined classes of output |
| **Users** | Follow approved-use rules and report failures |

One person may perform several roles in a smaller organization.

The responsibilities should still be explicit.

## How approval should work

```text
Use-case request
      ↓
Business owner and expected value
      ↓
Risk classification
      ↓
Data and vendor review
      ↓
Limited pilot
      ↓
Evaluation against acceptance criteria
      ↓
Restricted production approval
      ↓
Monitoring and periodic review
      ↓
Expansion, remediation, suspension, or retirement
```

Low-risk internal uses can pass through this process quickly.

High-impact autonomous systems require more evidence and stronger controls.

Governance should be proportional—not optional.

## Shortcuts that create hidden risk

### “Everyone already uses AI, so banning it is unrealistic”

Correct diagnosis, wrong conclusion.

A complete prohibition often drives usage underground. The stronger response is to provide approved tools, clear data rules, and a route for evaluating new use cases.

### “The vendor handles governance”

The vendor may govern its platform.

It does not own: your process; your data classification; your employee behavior; your integrations; your customer commitments; your approval policy; and your business consequences.

### “We will add governance after the pilot”

Pilots frequently gain access to production data and systems before being formally called production.

At minimum, ownership, data restrictions, evaluation, credentials, and shutdown must exist before the pilot begins.

### “The employee reviews every output”

Review does not create control when: the employee does not see the evidence; review time is not budgeted; the action occurs before review; reviewers routinely accept outputs without checking; and accountability remains unclear.

### “We have an AI policy”

A policy that is not connected to inventory, approvals, testing, monitoring, and incidents is a statement of intent—not an operating system.

## A 30-day minimum implementation plan

| Period | Deliverable |
|---|---|
| **Week 1** | Inventory current systems, employee tools, pilots, agents, and embedded AI features |
| **Week 2** | Assign owners, classify risk, document data flows and vendor dependencies |
| **Week 3** | Define evaluation, approval, access, logging, incident, and change requirements by tier |
| **Week 4** | Review highest-risk systems, suspend unsupported uses, approve remediation roadmap |

The expected result is not a large policy library.

It is an inventory; a risk map; named ownership; a minimum control standard; a prioritized remediation backlog; and a repeatable approval process.

## Where governance creates ROI

Governance is often treated only as a risk cost.

Done correctly, it also reduces operating waste by preventing: duplicate AI purchases; endless pilots; uncontrolled API consumption; manual review that eliminates expected savings; vendor lock-in; repeated integration work; deployment of use cases with no measurable value; and incidents that require expensive remediation.

The economic objective is not maximum control.

It is **the least expensive control model that keeps the system inside the company’s acceptable risk and performance boundaries**.

## What the decision comes down to

Do not begin by writing a forty-page AI policy.

Begin with five questions: Which AI systems are already influencing work? Which business outcomes do they affect? Who owns those outcomes? What evidence proves that each system is useful and acceptably controlled? Which use cases should be expanded, repaired, restricted, or stopped?

AI governance should make good systems easier to scale and weak systems easier to reject.

It should not exist to make experimentation impossible.

**For a 50–250-person B2B company, the minimum viable governance model is an inventory, risk classification, clear ownership, controlled data and permissions, measurable evaluation, incident readiness, and disciplined change management.**

Opsfield Systems can assess existing AI use cases, vendors, data flows, permissions, operating risks, and production controls through an **IT Risk & Security Review or Extended Diagnostic**, resulting in a prioritized risk map and implementation roadmap rather than a generic policy document.
