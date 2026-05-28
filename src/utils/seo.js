export const siteName = "Labrador.lk";
export const siteUrl = "https://labrador.lk";
export const defaultShareImage = "/assets/img/logo/logo.png";

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

const toIsoDate = (value) => {
  if (!value) return undefined;
  const parsed = Date.parse(value.replace(",", ""));
  if (Number.isNaN(parsed)) return undefined;
  return new Date(parsed).toISOString().slice(0, 10);
};

export const getSeoImage = (article) => {
  const src = article?.coverImage?.src || article?.image || defaultShareImage;
  return {
    "@type": "ImageObject",
    url: absoluteUrl(src),
    width: article?.coverImage?.width || 1200,
    height: article?.coverImage?.height || 800,
    caption: article?.coverImage?.caption || article?.title || siteName,
  };
};

export const articleJsonLd = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.seoDescription,
  image: getSeoImage(article),
  datePublished: toIsoDate(article.date),
  dateModified: toIsoDate(article.updatedAt || article.date),
  author: {
    "@type": "Organization",
    name: siteName,
  },
  publisher: {
    "@type": "Organization",
    name: siteName,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/assets/img/logo/logo.png"),
    },
  },
  mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
  articleSection: article.category,
  keywords: article.tags.join(", "),
});

export const faqJsonLd = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

export const breadcrumbJsonLd = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const itemListJsonLd = (items = [], path = "/articles") => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  url: absoluteUrl(path),
  numberOfItems: items.length,
  itemListElement: items.map((article, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(`/articles/${article.slug}`),
    name: article.title,
  })),
});
