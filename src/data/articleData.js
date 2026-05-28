// Labrador.lk master article index. Individual article files remain hub-separated;
// this module normalizes them into the publish-ready schema used by routes.

import { hubs } from "./taxonomy";

// Puppy Care
import { article as theFirst7Days } from "./articles/puppy-care/the-first-7-days-with-a-labrador-puppy";
import { article as puppyFeedingSchedule } from "./articles/puppy-care/labrador-puppy-feeding-schedule";
import { article as toiletTrain } from "./articles/puppy-care/how-to-toilet-train-a-labrador-puppy";
import { article as puppyBiting } from "./articles/puppy-care/why-labrador-puppies-bite-so-much";
import { article as puppyGrowthStages } from "./articles/puppy-care/labrador-puppy-growth-stages";
import { article as puppyExercise } from "./articles/puppy-care/how-much-exercise-does-a-labrador-puppy-need";
import { article as puppySocialization } from "./articles/puppy-care/labrador-puppy-socialization";
import { article as whatToBuy } from "./articles/puppy-care/what-to-buy-before-bringing-home-a-labrador-puppy";
import { article as puppySleepRoutine } from "./articles/puppy-care/labrador-puppy-sleep-routine";
import { article as commonMistakes } from "./articles/puppy-care/common-mistakes-new-puppy-owners";
import { article as groomingIntro } from "./articles/puppy-care/how-to-introduce-grooming-to-a-labrador-puppy";
import { article as whenAdult } from "./articles/puppy-care/when-does-a-labrador-puppy-become-an-adult";

// Nutrition
import { article as alwaysHungry } from "./articles/nutrition/why-labradors-always-act-hungry";
import { article as completeFeedingGuide } from "./articles/nutrition/complete-labrador-feeding-guide-sri-lanka";
import { article as howMuchFood } from "./articles/nutrition/how-much-food-should-a-labrador-eat-per-day";
import { article as isOverweight } from "./articles/nutrition/is-your-labrador-overweight";
import { article as chubbyNotHealthy } from "./articles/nutrition/why-a-chubby-labrador-is-not-always-healthy";
import { article as canEatRice } from "./articles/nutrition/can-labradors-eat-rice";
import { article as homemadeVsComplete } from "./articles/nutrition/homemade-food-vs-complete-dog-food";
import { article as treatsAndFamily } from "./articles/nutrition/treats-snacks-and-family-feeding";
import { article as royalCaninBreedNutrition } from "./articles/nutrition/royal-canin-labrador-food-breed-specific-nutrition";
import { article as changeFood } from "./articles/nutrition/how-to-change-your-labradors-food";
import { article as puppyVsAdultFeeding } from "./articles/nutrition/feeding-a-labrador-puppy-vs-adult";
import { article as feedingMistakes } from "./articles/nutrition/feeding-mistakes-that-make-labradors-gain-weight";

// Breed
import { article as whatMakesDifferent } from "./articles/breed/what-makes-a-labrador-retriever-different";
import { article as temperamentExplained } from "./articles/breed/labrador-temperament-explained";
import { article as goodFamilyDogs } from "./articles/breed/are-labradors-good-family-dogs-sri-lanka";
import { article as workingHistory } from "./articles/breed/labrador-working-history";
import { article as colorsExplained } from "./articles/breed/labrador-colors-explained";
import { article as maleVsFemale } from "./articles/breed/male-vs-female-labrador";
import { article as firstTimeOwners } from "./articles/breed/is-a-labrador-right-for-first-time-owners";
import { article as bodyStructure } from "./articles/breed/labrador-body-structure";
import { article as easyToLove } from "./articles/breed/why-labradors-easy-to-love-hard-to-manage";
import { article as coatAndTail } from "./articles/breed/labrador-coat-and-tail-breed-standard";
import { article as englishVsAmerican } from "./articles/breed/english-vs-american-labrador";
import { article as beforeYouGet } from "./articles/breed/before-you-get-a-labrador-in-sri-lanka";

// Grooming
import { article as completeGroomingGuide } from "./articles/grooming/complete-labrador-grooming-guide-sri-lanka";
import { article as whyShedSoMuch } from "./articles/grooming/why-labradors-shed-so-much";
import { article as howOftenBathe } from "./articles/grooming/how-often-should-you-bathe-a-labrador-sri-lanka";
import { article as bestShampoo } from "./articles/grooming/best-shampoo-type-for-labradors";
import { article as labSmell } from "./articles/grooming/labrador-smell-why-it-happens";
import { article as howToBrush } from "./articles/grooming/how-to-brush-a-labrador-correctly";
import { article as earCleaning } from "./articles/grooming/labrador-ear-cleaning-guide";
import { article as pawCare } from "./articles/grooming/labrador-paw-care";
import { article as overBathe } from "./articles/grooming/can-you-overbathe-a-labrador";
import { article as coatHumidWeather } from "./articles/grooming/labrador-coat-care-hot-humid-weather";
import { article as puppyGroomingIntro } from "./articles/grooming/puppy-grooming-introduction";
import { article as groomingChecklist } from "./articles/grooming/grooming-checklist-for-labrador-owners";

// Health
import { article as commonHealthProblems } from "./articles/health/common-labrador-health-problems";
import { article as jointCare } from "./articles/health/labrador-joint-care";
import { article as obesityWhyHappens } from "./articles/health/labrador-obesity-why-it-happens";
import { article as heatSafety } from "./articles/health/heat-safety-for-labradors-sri-lanka";
import { article as skinProblems } from "./articles/health/labrador-skin-problems-sri-lanka";
import { article as earProblems } from "./articles/health/labrador-ear-problems";
import { article as digestiveIssues } from "./articles/health/digestive-issues-in-labradors";
import { article as vaccineSchedule } from "./articles/health/labrador-vaccine-schedule-sri-lanka";
import { article as parasites } from "./articles/health/parasites-ticks-fleas-worms-labradors";
import { article as dentalCare } from "./articles/health/labrador-dental-care";
import { article as dentalCareBadBreath } from "./articles/health/labrador-dental-care-bad-breath";
import { article as seniorHealth } from "./articles/health/labrador-senior-health-guide";
import { article as annualHealthCheck } from "./articles/health/labrador-annual-health-check-guide";
import { article as neutering } from "./articles/health/neutering-a-labrador-guide";

const rawArticles = [
  theFirst7Days,
  puppyFeedingSchedule,
  toiletTrain,
  puppyBiting,
  puppyGrowthStages,
  puppyExercise,
  puppySocialization,
  whatToBuy,
  puppySleepRoutine,
  commonMistakes,
  groomingIntro,
  whenAdult,
  alwaysHungry,
  completeFeedingGuide,
  howMuchFood,
  isOverweight,
  chubbyNotHealthy,
  canEatRice,
  homemadeVsComplete,
  treatsAndFamily,
  royalCaninBreedNutrition,
  changeFood,
  puppyVsAdultFeeding,
  feedingMistakes,
  whatMakesDifferent,
  temperamentExplained,
  goodFamilyDogs,
  workingHistory,
  colorsExplained,
  maleVsFemale,
  firstTimeOwners,
  bodyStructure,
  easyToLove,
  coatAndTail,
  englishVsAmerican,
  beforeYouGet,
  completeGroomingGuide,
  whyShedSoMuch,
  howOftenBathe,
  bestShampoo,
  labSmell,
  howToBrush,
  earCleaning,
  pawCare,
  overBathe,
  coatHumidWeather,
  puppyGroomingIntro,
  groomingChecklist,
  commonHealthProblems,
  jointCare,
  obesityWhyHappens,
  heatSafety,
  skinProblems,
  earProblems,
  digestiveIssues,
  vaccineSchedule,
  parasites,
  dentalCare,
  dentalCareBadBreath,
  seniorHealth,
  annualHealthCheck,
  neutering,
];

const hubByTag = Object.fromEntries(hubs.map((hub) => [hub.tag, hub]));

const slugify = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const properCaseWords = new Map(
  [
    "ai",
    "american",
    "beaphar",
    "dhppil",
    "english",
    "faq",
    "faqs",
    "fci",
    "gdv",
    "lab",
    "lab's",
    "labrador",
    "labrador's",
    "labrador.lk",
    "labradors",
    "pomc",
    "royal",
    "seo",
    "sri",
  ].map((word) => [word, word.toUpperCase()])
);

properCaseWords.set("american", "American");
properCaseWords.set("beaphar", "Beaphar");
properCaseWords.set("dhppil", "DHPPiL");
properCaseWords.set("english", "English");
properCaseWords.set("lab", "Lab");
properCaseWords.set("lab's", "Lab's");
properCaseWords.set("labrador", "Labrador");
properCaseWords.set("labrador's", "Labrador's");
properCaseWords.set("labrador.lk", "Labrador.lk");
properCaseWords.set("labradors", "Labradors");
properCaseWords.set("royal", "Royal");
properCaseWords.set("sri", "Sri");
properCaseWords.set("lanka", "Lanka");
properCaseWords.set("lanka's", "Lanka's");
properCaseWords.set("lankan", "Lankan");
properCaseWords.set("canin", "Canin");

const toSentenceCase = (value) => {
  if (typeof value !== "string") return value;
  return value.replace(/Labrador\.lk|[A-Za-z][A-Za-z'-]*/g, (word, offset, text) => {
    const lower = word.toLowerCase();
    if (properCaseWords.has(lower)) return properCaseWords.get(lower);

    const previous = text.slice(0, offset).trimEnd();
    const previousChar = previous.slice(-1);
    const shouldCapitalize = offset === 0 || [".", "?", "!", ":"].includes(previousChar);
    const normalized = lower;
    return shouldCapitalize ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : normalized;
  });
};

const normalizeSectionsCase = (sections = []) =>
  sections.map((section) => ({
    ...section,
    heading: toSentenceCase(section.heading),
  }));

const normalizeFaqsCase = (faqs = []) =>
  faqs.map((faq) => ({
    ...faq,
    q: toSentenceCase(faq.q),
    question: toSentenceCase(faq.question),
  }));

const inferLifeStage = (article) => {
  const text = `${article.title} ${(article.tags || []).join(" ")} ${article.slug}`.toLowerCase();
  if (text.includes("puppy")) return "Puppy";
  if (text.includes("senior")) return "Senior";
  return "All Life Stages";
};

const inferDifficulty = (article) => {
  const text = `${article.title} ${(article.tags || []).join(" ")}`.toLowerCase();
  if (text.includes("disease") || text.includes("genetic") || text.includes("dysplasia")) return "Advanced";
  if (text.includes("guide") || text.includes("complete") || text.includes("science")) return "Intermediate";
  return "Beginner";
};

const normalizeProductBlock = (block) => {
  if (!block || !["Royal Canin", "Beaphar"].includes(block.brand)) return null;
  return {
    brand: block.brand,
    text: block.text
      .replace(/\bdramatically\b/gi, "noticeably")
      .replace(/\bvital\b/gi, "helpful")
      .replace(/\brebuild\b/gi, "support")
      .replace(/\bbest way\b/gi, "one practical way"),
  };
};

const contentToSections = (content = []) => {
  const sections = [];
  let current = null;

  content.forEach((block) => {
    if (typeof block !== "string") return;
    const headingMatch = block.match(/^\*\*(.+)\*\*$/);
    if (headingMatch) {
      current = {
        id: slugify(headingMatch[1]),
        heading: headingMatch[1],
        body: [],
      };
      sections.push(current);
      return;
    }
    if (!current) {
      current = { id: "overview", heading: "Overview", body: [] };
      sections.push(current);
    }
    current.body.push(block);
  });

  return sections;
};

const normalizeArticle = (article, index) => {
  const hub = hubByTag[article.tag] || hubs.find((item) => item.id === article.hub) || hubs[0];
  const sections = normalizeSectionsCase(article.sections?.length ? article.sections : contentToSections(article.content));
  const relatedArticles = article.relatedArticles || [];
  const recommendedNext = article.recommendedNext || relatedArticles[0] || null;
  const productBlock = normalizeProductBlock(article.productBlock);
  const title = toSentenceCase(article.title);
  const subtitle = toSentenceCase(article.subtitle);
  const seoTitle = toSentenceCase(article.seoTitle || article.title);
  const series = toSentenceCase(article.series || null);

  return {
    ...article,
    title,
    subtitle,
    hub: hub.id,
    hubLabel: hub.label,
    category: toSentenceCase(article.category || hub.category),
    readingTime: article.readingTime || article.readTime || "5 Mins",
    readTime: article.readTime || article.readingTime || "5 Mins",
    difficultyLevel: article.difficultyLevel || inferDifficulty(article),
    lifeStage: toSentenceCase(article.lifeStage || inferLifeStage(article)),
    tags: Array.from(new Set([...(article.tags || []), hub.label].map(toSentenceCase))),
    relatedArticles,
    recommendedNext,
    series,
    seriesSlug: article.series ? slugify(article.series) : null,
    productsMentioned: article.productsMentioned || (productBlock ? [productBlock.brand] : []),
    productBlock,
    seoTitle,
    seoDescription: article.seoDescription || article.excerpt,
    aiSummary:
      article.aiSummary ||
      `${title}. ${article.quickAnswer || article.excerpt}`.slice(0, 420),
    quickAnswer: article.quickAnswer || article.excerpt,
    sections,
    faqs: normalizeFaqsCase(article.faqs || []),
    sortOrder: index,
  };
};

export const allArticles = rawArticles.map(normalizeArticle);

export const articleData = allArticles;
export const hubCategories = hubs;

export const getArticleBySlug = (slug) =>
  allArticles.find((article) => article.slug === slug || article.id === slug) || null;

export const getArticlesByHub = (hubSlug) =>
  allArticles.filter((article) => article.hub === hubSlug);

export const getArticlesByTag = (tag) => {
  const normalized = tag?.toLowerCase();
  return allArticles.filter((article) =>
    article.tags.some((item) => item.toLowerCase() === normalized) ||
    article.category.toLowerCase() === normalized ||
    article.hubLabel.toLowerCase() === normalized
  );
};

export const getFeaturedArticles = () => allArticles.filter((article) => article.featured);

export const getSeriesArticles = (seriesNameOrSlug) =>
  allArticles
    .filter(
      (article) =>
        article.series === seriesNameOrSlug || article.seriesSlug === seriesNameOrSlug
    )
    .sort((a, b) => (a.seriesOrder || 999) - (b.seriesOrder || 999));

export const getArticlesBySeries = getSeriesArticles;

export const getRelatedArticles = (slugs = []) =>
  slugs.map((slug) => getArticleBySlug(slug)).filter(Boolean).slice(0, 4);

export const getRecentArticles = (count = 8) => allArticles.slice(0, count);

export const getArticlesBySecondaryTag = (tag) =>
  allArticles.filter((article) => article.secondaryTags?.includes(tag));

export const allTags = Array.from(new Set(allArticles.flatMap((article) => article.tags))).sort();

export const allSeries = Array.from(
  new Map(
    allArticles
      .filter((article) => article.series)
      .map((article) => [
        article.seriesSlug,
        { title: article.series, slug: article.seriesSlug },
      ])
  ).values()
);

export const sitemapRoutes = [
  "/",
  "/articles",
  "/about",
  "/ask",
  ...hubs.map((hub) => `/hubs/${hub.slug}`),
  ...allArticles.map((article) => `/articles/${article.slug}`),
  ...allSeries.map((series) => `/series/${series.slug}`),
  ...allTags.map((tag) => `/tags/${slugify(tag)}`),
];
