export const siteName = "Labrador.lk";
export const siteUrl = "https://labrador.lk";

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const articleJsonLd = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.seoDescription,
  image: absoluteUrl(article.image || "/assets/img/logo/logo.png"),
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

