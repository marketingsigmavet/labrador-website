export const fallbackArticleImage = "/assets/img/logo/logo.png";

export const getArticleImage = (article) =>
  article?.coverImage?.src || article?.image || fallbackArticleImage;

export const getArticleImageAlt = (article) =>
  article?.coverImage?.alt || article?.title || "Labrador.lk article image";

export const getArticleImageWidth = (article) => article?.coverImage?.width || 1200;

export const getArticleImageHeight = (article) => article?.coverImage?.height || 800;

export const handleArticleImageError = (event) => {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === "true") return;
  image.dataset.fallbackApplied = "true";
  image.src = fallbackArticleImage;
};
