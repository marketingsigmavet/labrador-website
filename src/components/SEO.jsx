import { useEffect } from "react";
import { absoluteUrl, defaultShareImage, siteName } from "../utils/seo";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(path) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", absoluteUrl(path));
}

function setJsonLd(id, data) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function SEO({ title, description, path = "/", image = defaultShareImage, jsonLd = [] }) {
  useEffect(() => {
    const pageTitle = title || siteName;
    const shareImage = absoluteUrl(image || defaultShareImage);
    document.title = title ? `${title} | ${siteName}` : `${siteName} - Labrador education hub`;
    setMeta("description", description);
    setMeta("og:site_name", siteName, "property");
    setMeta("og:type", path.startsWith("/articles/") ? "article" : "website", "property");
    setMeta("og:title", pageTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", absoluteUrl(path), "property");
    setMeta("og:image", shareImage, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", pageTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", shareImage);
    setCanonical(path);
    jsonLd.forEach((item, index) => setJsonLd(`llk-jsonld-${index}`, item));
    for (let index = jsonLd.length; index < 4; index += 1) {
      const stale = document.getElementById(`llk-jsonld-${index}`);
      if (stale) stale.remove();
    }
  }, [title, description, path, image, JSON.stringify(jsonLd)]);

  return null;
}
