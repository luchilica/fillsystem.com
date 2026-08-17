import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { BLOG_POSTS } from "@/components/blog/blogData";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { Link } from "@/i18n/navigation";

const post = BLOG_POSTS.find((p) => p.slug === "choose-embedding-model-enterprise-rag")!;

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

export default async function ChooseEmbeddingModel({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();

  return (
    <>
      <BreadcrumbJsonLd title={t(post.seoTitle ?? post.title)} path={`/blog/${post.slug}`} parent={{ title: "Blog", path: "/blog" }} />
    <BlogPostLayout
      slug={post.slug}
      title={t(post.title)}
      description={t(post.description)}
      date={post.date}
      readTime={post.readTime}
      heroImage={post.heroImage}
      heroAlt={post.heroAlt}
      author={post.author}
    >
      {/* ── Intro ────────────────────────────────────────────── */}
      <p>
        {t(
          "Teams often choose an embedding model by opening a public leaderboard, selecting one of the top names, and starting to index their documents."
        )}
      </p>
      <p>{t("Six months later, the problems appear.")}</p>
      <p>
        {t(
          "Exact product codes are missing from search results. Multilingual queries retrieve the wrong policy. Similar but legally different clauses are placed next to each other. Infrastructure costs rise as the index grows. Then the team discovers that changing the model means embedding the entire corpus again and rebuilding the vector index."
        )}
      </p>
      <p>
        {t("The original model may not have been bad. The decision process was incomplete.")}
      </p>
      <p>
        <strong>
          {t(
            "The right embedding model is not the model with the highest general benchmark score. It is the model that retrieves the correct evidence from your data, within your latency, cost, security, and operational constraints."
          )}
        </strong>
      </p>

      {/* ── What an embedding model actually controls ─────────── */}
      <h2>{t("What an embedding model actually controls")}</h2>
      <p>
        {t(
          "An embedding model converts text, code, images, or other content into numerical vectors. A retrieval system compares these vectors to identify content that is semantically related to a user's query."
        )}
      </p>
      <p>
        {t("In a typical RAG pipeline, the embedding model sits inside a larger sequence:")}
      </p>
      <blockquote>
        {t(
          "Document ingestion - parsing - chunking - embedding - indexing - retrieval - reranking - generation"
        )}
      </blockquote>
      <p>
        {t(
          "A weak embedding model can prevent the right evidence from reaching the language model. But a strong model cannot compensate for every other architectural problem."
        )}
      </p>
      <p>
        {t(
          "For example: poor parsing can remove headings and table relationships; oversized chunks can combine unrelated facts; undersized chunks can destroy necessary context; missing metadata can make access filtering impossible; weak reranking can place superficially similar content above the correct answer; and an LLM can still misinterpret properly retrieved evidence."
        )}
      </p>
      <p>
        {t(
          "This is why embedding selection should be treated as an architecture decision, not a model-shopping exercise."
        )}
      </p>

      {/* ── Why public leaderboards are useful-and insufficient ── */}
      <h2>{t("Why public leaderboards are useful-and insufficient")}</h2>
      <p>
        {t(
          "MTEB was created because embedding models were previously evaluated on narrow, incompatible sets of tasks. It covers retrieval, clustering, classification, reranking, semantic similarity and other workloads. The benchmark's original findings showed that no single method dominated every task. MMTEB later expanded multilingual and domain coverage significantly."
        )}{" "}
        (
        <a
          href="https://arxiv.org/abs/2210.07316"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("arXiv")}
        </a>
        )
      </p>
      <p>{t("A leaderboard can answer:")}</p>
      <blockquote>
        {t("Which models deserve to enter our test?")}
      </blockquote>
      <p>{t("It cannot reliably answer:")}</p>
      <blockquote>
        {t("Which model should run our production system?")}
      </blockquote>
      <p>
        {t(
          "A public dataset rarely reproduces your combination of: internal terminology; abbreviations; product identifiers; document structure; languages; duplicate content; incomplete user questions; access restrictions; and industry-specific distinctions."
        )}
      </p>
      <p>
        {t(
          "For RAG, the relevant benchmark category is usually retrieval. Even then, an average retrieval score can conceal serious weaknesses in the exact query types that matter to your business."
        )}
      </p>

      {/* ── What should drive the model decision ─────────────── */}
      <h2>{t("What should drive the model decision")}</h2>

      {/* Retrieval quality on your corpus */}
      <h3>{t("Retrieval quality on your corpus")}</h3>
      <p>
        {t(
          "The model must find the evidence required to answer the actual question - not merely a document with similar vocabulary."
        )}
      </p>
      <p>{t("Your evaluation set should include several query classes:")}</p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Query class")}</th>
              <th>{t("Example failure")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("Direct fact")}</td>
              <td>{t("Correct policy exists but is not retrieved")}</td>
            </tr>
            <tr>
              <td>{t("Paraphrase")}</td>
              <td>{t("User wording differs from the document")}</td>
            </tr>
            <tr>
              <td>{t("Exact identifier")}</td>
              <td>{t("Part number or contract code is ignored")}</td>
            </tr>
            <tr>
              <td>{t("Ambiguous query")}</td>
              <td>{t("Popular but incorrect document ranks first")}</td>
            </tr>
            <tr>
              <td>{t("Negative condition")}</td>
              <td>{t("\"When is a refund not available?\"")}</td>
            </tr>
            <tr>
              <td>{t("Cross-document")}</td>
              <td>{t("Answer requires two related sources")}</td>
            </tr>
            <tr>
              <td>{t("No-answer")}</td>
              <td>{t("System should not retrieve weak evidence as fact")}</td>
            </tr>
            <tr>
              <td>{t("Multilingual")}</td>
              <td>{t("Query and source use different languages")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t(
          "A model that performs well on common questions but fails on negative conditions or identifiers may be unsuitable for legal, financial or operational search."
        )}
      </p>

      {/* Domain and language fit */}
      <h3>{t("Domain and language fit")}</h3>
      <p>{t("\"Multilingual\" is not a binary property.")}</p>
      <p>
        {t(
          "A model may support a language technically while performing poorly on: specialist vocabulary; inflected forms; transliterated names; mixed-language documents; industry abbreviations; and queries written in one language against documents in another."
        )}
      </p>
      <p>
        {t(
          "For multilingual systems, include native-language and cross-language queries in the gold set. Do not infer performance from English MTEB results."
        )}
      </p>
      <p>
        {t(
          "Qwen3 Embedding supports more than 100 languages and configurable dimensions up to 4096. BGE-M3 supports dense, sparse and multi-vector retrieval and processes inputs up to 8192 tokens. Snowflake Arctic Embed 2.0 was designed for multilingual retrieval under an Apache 2.0 licence. These are useful shortlist candidates, not automatic winners."
        )}{" "}
        (
        <a
          href="https://huggingface.co/Qwen/Qwen3-Embedding-8B"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Hugging Face")}
        </a>
        )
      </p>

      {/* Query and document behavior */}
      <h3>{t("Query and document behavior")}</h3>
      <p>
        {t(
          "Some models support separate query and document modes or task-specific instructions."
        )}
      </p>
      <p>
        {t(
          "This matters because a search query and a source passage serve different functions: the query expresses an information need and the document contains potential evidence."
        )}
      </p>
      <p>
        {t(
          "Using the wrong input mode can reduce retrieval quality even when the model itself is strong."
        )}
      </p>
      <p>
        {t(
          "The evaluation must therefore replicate the exact production configuration: correct query prefix or instruction; correct document mode; same normalization; same output dimension; and same similarity metric."
        )}
      </p>
      <p>
        {t(
          "Testing a model with default settings and deploying it with another configuration invalidates the comparison."
        )}
      </p>

      {/* Vector dimensions and index cost */}
      <h3>{t("Vector dimensions and index cost")}</h3>
      <p>{t("Larger vectors are not automatically better.")}</p>
      <p>
        {t(
          "They can increase: raw storage; index memory; network transfer; distance-computation cost; backup size; and re-indexing time."
        )}
      </p>
      <p>
        {t(
          "Several managed models now support flexible dimensions. OpenAI's third-generation embedding models default to 1536 and 3072 dimensions, while the API can shorten their output. Cohere Embed v4 supports 256-1536 dimensions, and Voyage 4 supports 256-2048."
        )}{" "}
        (
        <a
          href="https://platform.openai.com/docs/guides/embeddings"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("OpenAI Platform")}
        </a>
        )
      </p>
      <p>
        {t(
          "For one million float32 vectors, the raw storage difference is material:"
        )}
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "right" }}>{t("Dimension")}</th>
              <th style={{ textAlign: "right" }}>{t("Approximate raw storage")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "right" }}>256</td>
              <td style={{ textAlign: "right" }}>{t("1.0 GB")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}>512</td>
              <td style={{ textAlign: "right" }}>{t("2.0 GB")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}>1024</td>
              <td style={{ textAlign: "right" }}>{t("4.1 GB")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}>1536</td>
              <td style={{ textAlign: "right" }}>{t("6.1 GB")}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}>3072</td>
              <td style={{ textAlign: "right" }}>{t("12.3 GB")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t(
          "These figures exclude the vector index, metadata, replicas and backups."
        )}
      </p>
      <p>{t("The correct question is not:")}</p>
      <blockquote>
        {t("What is the largest dimension available?")}
      </blockquote>
      <p>{t("It is:")}</p>
      <blockquote>
        {t(
          "At what dimension does additional retrieval quality stop justifying additional infrastructure cost?"
        )}
      </blockquote>
      <p>
        {t(
          "Test at least two supported dimensions before committing to the index schema."
        )}
      </p>

      {/* Context length and chunking strategy */}
      <h3>{t("Context length and chunking strategy")}</h3>
      <p>
        {t(
          "A large context limit is useful, but it does not eliminate document design."
        )}
      </p>
      <p>
        {t(
          "Cohere Embed v4 supports a 128K context, Voyage 4 supports 32K, and OpenAI's current third-generation embedding models accept up to 8192 tokens."
        )}{" "}
        (
        <a
          href="https://docs.cohere.com/docs/cohere-embed"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Cohere Documentation")}
        </a>
        )
      </p>
      <p>
        {t(
          "That does not mean an entire 100-page report should become one vector."
        )}
      </p>
      <p>
        {t(
          "A useful chunk must preserve enough context to answer the question while remaining narrow enough to represent one coherent subject."
        )}
      </p>
      <p>
        {t(
          "Your test should therefore evaluate model and chunking combinations:"
        )}
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Configuration")}</th>
              <th>{t("What it tests")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("250-400-token chunks")}</td>
              <td>{t("Precise fact retrieval")}</td>
            </tr>
            <tr>
              <td>{t("500-800-token chunks")}</td>
              <td>{t("Balanced context")}</td>
            </tr>
            <tr>
              <td>{t("1000+ token chunks")}</td>
              <td>{t("Long reasoning context")}</td>
            </tr>
            <tr>
              <td>{t("Parent-child retrieval")}</td>
              <td>{t("Local detail plus document context")}</td>
            </tr>
            <tr>
              <td>{t("Contextualized chunks")}</td>
              <td>{t("Whether surrounding text improves retrieval")}</td>
            </tr>
            <tr>
              <td>{t("Semantic chunking")}</td>
              <td>{t("Whether topic boundaries outperform fixed length")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t(
          "A weaker model with an effective chunking and reranking strategy can outperform a stronger model in a poor pipeline."
        )}
      </p>

      {/* Deployment, governance and licensing */}
      <h3>{t("Deployment, governance and licensing")}</h3>
      <p>
        {t(
          "The model shortlist should change when the system handles: confidential client data; regulated records; intellectual property; jurisdiction-restricted information; documents with granular user permissions; and workloads that must remain on-premises."
        )}
      </p>
      <p>
        {t(
          "A managed API reduces model-serving work but introduces a vendor, data-transfer and availability dependency."
        )}
      </p>
      <p>
        {t(
          "An open-weight model increases control but transfers responsibility for infrastructure; scaling; patching; monitoring; model serving; security; licence compliance; and performance optimisation."
        )}
      </p>
      <p>
        {t(
          "Open weights also do not guarantee commercial permission. Jina Embeddings v5 Text Small, for example, is published under CC BY-NC 4.0, while BGE-M3 uses MIT and Qwen3 Embedding uses Apache 2.0."
        )}{" "}
        (
        <a
          href="https://huggingface.co/jinaai/jina-embeddings-v5-text-small"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Hugging Face")}
        </a>
        )
      </p>
      <p>
        {t(
          "Licence review must happen before performance testing turns into production adoption."
        )}
      </p>

      {/* Migration and vendor resilience */}
      <h3>{t("Migration and vendor resilience")}</h3>
      <p>
        {t(
          "Embedding spaces are model-specific. Vectors generated by unrelated models cannot normally be compared inside the same index."
        )}
      </p>
      <p>
        {t(
          "Switching models may require: re-embedding the complete corpus; creating a second index; synchronising new and updated documents to both indexes; running A/B retrieval tests; migrating traffic; and retiring the old index."
        )}
      </p>
      <p>
        {t(
          "The larger and more frequently changing the corpus, the more important this migration cost becomes."
        )}
      </p>
      <p>
        {t(
          "Voyage's fourth-generation model family is unusual because its large, standard and lite variants produce compatible embeddings, which can reduce some model-tier migration friction inside that family."
        )}{" "}
        (
        <a
          href="https://docs.voyageai.com/docs/embeddings"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Voyage AI")}
        </a>
        )
      </p>
      <p>
        {t(
          "Compatibility inside one vendor family still does not remove broader vendor dependency. Production architecture should preserve: original source documents; deterministic chunk IDs; model and dimension metadata; re-embedding queues; versioned indexes; and rollback capability."
        )}
      </p>

      {/* ── A decision score for embedding models ────────────── */}
      <h2>{t("A decision score for embedding models")}</h2>
      <p>
        {t(
          "A model should be scored as part of the full operating system, not in isolation."
        )}
      </p>
      <p>
        {t(
          "The following default weighting can be adapted to the business case:"
        )}
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Decision area")}</th>
              <th style={{ textAlign: "right" }}>{t("Default weight")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("Retrieval quality on representative data")}</td>
              <td style={{ textAlign: "right" }}>35%</td>
            </tr>
            <tr>
              <td>{t("Domain and language fit")}</td>
              <td style={{ textAlign: "right" }}>15%</td>
            </tr>
            <tr>
              <td>{t("Security, deployment and licensing")}</td>
              <td style={{ textAlign: "right" }}>15%</td>
            </tr>
            <tr>
              <td>{t("Latency and throughput")}</td>
              <td style={{ textAlign: "right" }}>10%</td>
            </tr>
            <tr>
              <td>{t("Storage and serving cost")}</td>
              <td style={{ textAlign: "right" }}>10%</td>
            </tr>
            <tr>
              <td>{t("Migration and vendor risk")}</td>
              <td style={{ textAlign: "right" }}>10%</td>
            </tr>
            <tr>
              <td>{t("Monitoring and operational simplicity")}</td>
              <td style={{ textAlign: "right" }}>5%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t(
          "A model that wins a public benchmark but fails a mandatory data-residency requirement receives a failing score, not a small penalty."
        )}
      </p>
      <p>
        {t(
          "Similarly, a low-cost model that reduces evidence retrieval below the business acceptance threshold is not economical. It merely moves cost from infrastructure to incorrect answers, manual checking and user distrust."
        )}
      </p>

      {/* ── How to run the evaluation ────────────────────────── */}
      <h2>{t("How to run the evaluation")}</h2>

      <h3>{t("Define the operating problem")}</h3>
      <p>
        {t(
          "Document who will use the system; which decisions it supports; source types; languages; corpus size and growth; acceptable response time; data sensitivity; cost ceiling; and consequences of incorrect retrieval."
        )}
      </p>
      <p>
        {t(
          "Without this step, the team is evaluating technology without defining success."
        )}
      </p>

      <h3>{t("Build a representative gold set")}</h3>
      <p>
        {t(
          "Create approximately 100-300 validated questions for an initial production-oriented evaluation."
        )}
      </p>
      <p>
        {t(
          "Each question should contain expected source document; expected evidence passage; acceptable alternative passages; query category; language; difficulty; and whether the correct result is \"no evidence found.\""
        )}
      </p>
      <p>
        {t(
          "Synthetic questions can help expand the set, but subject-matter experts should verify the critical examples."
        )}
      </p>

      <h3>{t("Test a deliberately small shortlist")}</h3>
      <p>
        {t(
          "A reasonable shortlist might contain one lower-cost managed model; one higher-quality managed model; one multilingual option; one commercially permitted open-weight model; and one hybrid retrieval configuration."
        )}
      </p>
      <p>
        {t(
          "Current examples include OpenAI text-embedding-3-small and text-embedding-3-large, Voyage 4, Cohere Embed v4, BGE-M3, Qwen3 Embedding and Snowflake Arctic Embed 2.0. Their official documentation shows materially different dimensions, context windows, modalities, licences and deployment characteristics."
        )}{" "}
        (
        <a
          href="https://platform.openai.com/docs/guides/embeddings"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("OpenAI Platform")}
        </a>
        )
      </p>
      <p>
        {t("The shortlist should remain small enough to evaluate properly.")}
      </p>

      <h3>{t("Measure quality and operating cost")}</h3>
      <p>{t("At minimum, record:")}</p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Metric")}</th>
              <th>{t("Why it matters")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("Hit Rate / Recall@K")}</td>
              <td>{t("Whether the correct evidence appears")}</td>
            </tr>
            <tr>
              <td>{t("MRR")}</td>
              <td>{t("How early the first correct passage appears")}</td>
            </tr>
            <tr>
              <td>{t("nDCG@K")}</td>
              <td>{t("Whether the full ranking is useful")}</td>
            </tr>
            <tr>
              <td>{t("P50 and P95 latency")}</td>
              <td>{t("Typical and worst-case user experience")}</td>
            </tr>
            <tr>
              <td>{t("Index size")}</td>
              <td>{t("Storage and memory implications")}</td>
            </tr>
            <tr>
              <td>{t("Embedding throughput")}</td>
              <td>{t("Re-indexing and update speed")}</td>
            </tr>
            <tr>
              <td>{t("Cost per million documents")}</td>
              <td>{t("Initial ingestion economics")}</td>
            </tr>
            <tr>
              <td>{t("Cost per 1,000 queries")}</td>
              <td>{t("Ongoing operating economics")}</td>
            </tr>
            <tr>
              <td>{t("Failure rate by query class")}</td>
              <td>{t("Hidden weaknesses behind the average")}</td>
            </tr>
            <tr>
              <td>{t("No-answer precision")}</td>
              <td>{t("Resistance to unsupported answers")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t(
          "Do not combine all results into one average before inspecting failure slices. Ten failures involving obscure internal news may be acceptable. Ten failures involving contractual exclusions may not be."
        )}
      </p>

      <h3>{t("Run an end-to-end acceptance test")}</h3>
      <p>
        {t("Retrieval metrics are necessary but not sufficient.")}
      </p>
      <p>
        {t(
          "Connect the selected retrieval configurations to the intended: vector database; filters; reranker; prompt; LLM; and access-control layer."
        )}
      </p>
      <p>
        {t(
          "Then evaluate whether the final response: uses the correct evidence; attributes it accurately; distinguishes fact from inference; refuses unsupported conclusions; preserves document-level permissions; and meets the required latency."
        )}
      </p>
      <p>
        {t("Only then should the team approve full-corpus indexing.")}
      </p>

      {/* ── Which model class fits which situation? ───────────── */}
      <h2>{t("Which model class fits which situation?")}</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Situation")}</th>
              <th>{t("Likely starting direction")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("Fast English-language pilot")}</td>
              <td>{t("Managed API with a smaller dimension")}</td>
            </tr>
            <tr>
              <td>{t("Complex multilingual knowledge base")}</td>
              <td>{t("Multilingual API or tested open-weight model")}</td>
            </tr>
            <tr>
              <td>{t("Scanned PDFs, diagrams and mixed content")}</td>
              <td>{t("Multimodal embedding pipeline")}</td>
            </tr>
            <tr>
              <td>{t("Confidential on-premises deployment")}</td>
              <td>{t("Commercially permitted open-weight model")}</td>
            </tr>
            <tr>
              <td>{t("Product codes and semantic questions")}</td>
              <td>{t("Hybrid lexical + dense retrieval")}</td>
            </tr>
            <tr>
              <td>{t("Legal, financial or code search")}</td>
              <td>{t("Domain-specific model or domain evaluation")}</td>
            </tr>
            <tr>
              <td>{t("Very large corpus with strict cost target")}</td>
              <td>{t("Dimension and quantisation testing")}</td>
            </tr>
            <tr>
              <td>{t("Rapidly changing product")}</td>
              <td>{t("Architecture designed for re-embedding")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t(
          "Cohere Embed v4 supports text, images and mixed PDF content. BGE-M3 can produce dense, sparse and multi-vector representations in one model. These capabilities are valuable only when the corresponding retrieval problem exists."
        )}{" "}
        (
        <a
          href="https://docs.cohere.com/docs/multimodal-embeddings"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Cohere Documentation")}
        </a>
        )
      </p>

      {/* ── Where selection projects go wrong ─────────────────── */}
      <h2>{t("Where selection projects go wrong")}</h2>

      <h3>{t("Selecting the highest leaderboard score")}</h3>
      <p>
        {t(
          "A benchmark winner may fail on internal acronyms, identifiers or multilingual queries."
        )}
      </p>

      <h3>{t("Selecting by API price alone")}</h3>
      <p>
        {t(
          "Embedding generation may be cheap relative to vector storage, model serving, human review and future re-indexing."
        )}
      </p>

      <h3>{t("Selecting by context window")}</h3>
      <p>
        {t(
          "Long input support does not prove precise retrieval from long documents."
        )}
      </p>

      <h3>{t("Assuming open source means free operations")}</h3>
      <p>
        {t(
          "The API invoice disappears, but GPU capacity, deployment, monitoring, upgrades and engineering labour remain."
        )}
      </p>

      <h3>{t("Testing models with different pipelines")}</h3>
      <p>
        {t(
          "Changing chunk size, reranker or top-K together with the model makes it impossible to identify the cause of improvement."
        )}
      </p>

      <h3>{t("Ignoring the no-answer case")}</h3>
      <p>
        {t(
          "A system that always retrieves something will eventually present irrelevant evidence as support."
        )}
      </p>

      <h3>{t("Treating access control as a later feature")}</h3>
      <p>
        {t(
          "Document and chunk permissions must be designed before indexing. Otherwise the vector store can become a second data repository whose access rules diverge from the source systems."
        )}
      </p>

      {/* ── What to decide before selecting a model ──────────── */}
      <h2>{t("What to decide before selecting a model")}</h2>
      <p>{t("Do not begin with:")}</p>
      <blockquote>
        {t("Which embedding model should we use?")}
      </blockquote>
      <p>{t("Begin with:")}</p>
      <blockquote>
        {t(
          "What evidence must this system retrieve, for whom, under which constraints, and what happens when retrieval is wrong?"
        )}
      </blockquote>
      <p>
        {t(
          "Once those questions are answered, the model shortlist becomes smaller and the evaluation becomes measurable."
        )}
      </p>
      <p>
        {t(
          "The costliest embedding decision is rarely choosing the second-best public model. It is indexing a large corpus before defining the acceptance criteria, migration path and operating constraints."
        )}
      </p>

      <p>
        {t("Through")}{" "}
        <Link href="/services/ai-process-automation">
          {t("AI & Process Automation consulting")}
        </Link>
        {t(", Fill System evaluates retrieval requirements, data sources, security constraints, and expected business value before an embedding architecture is committed — so the model decision is grounded in your operating reality, not a leaderboard.")}
      </p>
      <p>
        <strong>
          <Link href="/#diagnostic-request-form">
            {t("Request a free diagnostic")}
          </Link>
        </strong>{" "}
        {t("to validate the retrieval decision before paying to embed and maintain the wrong system.")}
      </p>
    </BlogPostLayout>
    </>
  );
}
