import { allArticles, allTags, allSeries, getArticleBySlug } from "../data/articleData";
import { hubs } from "../data/taxonomy";

export const slugify = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getHub = (hubSlug) => hubs.find((hub) => hub.slug === hubSlug || hub.id === hubSlug);

export const getTagLabelFromSlug = (tagSlug) =>
  allTags.find((tag) => slugify(tag) === tagSlug) || tagSlug;

export const getSeriesFromSlug = (seriesSlug) =>
  allSeries.find((series) => series.slug === seriesSlug);

export const filterArticles = ({
  query = "",
  hub = "",
  category = "",
  tag = "",
  series = "",
} = {}) => {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedTag = tag.trim().toLowerCase();

  return allArticles.filter((article) => {
    const searchText = [
      article.title,
      article.excerpt,
      article.quickAnswer,
      article.hubLabel,
      article.category,
      article.lifeStage,
      article.difficultyLevel,
      ...(article.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !normalizedQuery || searchText.includes(normalizedQuery);
    const matchesHub = !hub || article.hub === hub;
    const matchesCategory = !category || article.category === category;
    const matchesTag =
      !normalizedTag ||
      article.tags.some((item) => item.toLowerCase() === normalizedTag) ||
      slugify(article.category) === slugify(normalizedTag);
    const matchesSeries = !series || article.seriesSlug === series;

    return matchesQuery && matchesHub && matchesCategory && matchesTag && matchesSeries;
  });
};

export const getFallbackRelated = (article, count = 4) => {
  const explicit = (article.relatedArticles || []).map(getArticleBySlug).filter(Boolean);
  const fallback = allArticles.filter(
    (item) =>
      item.slug !== article.slug &&
      (item.hub === article.hub || item.tags.some((tag) => article.tags.includes(tag)))
  );

  return Array.from(new Map([...explicit, ...fallback].map((item) => [item.slug, item])).values()).slice(
    0,
    count
  );
};

export const getRecommendedNext = (article) =>
  getArticleBySlug(article.recommendedNext) ||
  getFallbackRelated(article, 1)[0] ||
  allArticles.find((item) => item.slug !== article.slug) ||
  null;

export const getEditorPicks = () =>
  [
    "the-first-7-days-with-a-labrador-puppy",
    "complete-labrador-feeding-guide-sri-lanka",
    "before-you-get-a-labrador-in-sri-lanka",
    "complete-labrador-grooming-guide-sri-lanka",
    "common-labrador-health-problems",
    "labrador-joint-care",
  ]
    .map(getArticleBySlug)
    .filter(Boolean);

