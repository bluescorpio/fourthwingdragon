type BreadcrumbItem = {
  name: string;
  path: string;
};

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

type TestListItem = {
  name: string;
  description: string;
  path?: string;
};

type HowToStep = {
  name: string;
  text: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleJsonLd({
  headline,
  description,
  url,
  siteName,
  siteUrl,
}: {
  headline: string;
  description: string;
  url: string;
  siteName: string;
  siteUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    author: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function organizationJsonLd({
  name,
  url,
  logo,
}: {
  name: string;
  url: string;
  logo: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function webApplicationJsonLd({
  name,
  description,
  url,
  siteName,
  siteUrl,
}: {
  name: string;
  description: string;
  url: string;
  siteName: string;
  siteUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "BrowserApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function softwareApplicationJsonLd({
  name,
  description,
  url,
  siteName,
  siteUrl,
}: {
  name: string;
  description: string;
  url: string;
  siteName: string;
  siteUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function itemListJsonLd({
  name,
  description,
  items,
  siteUrl,
}: {
  name: string;
  description: string;
  items: TestListItem[];
  siteUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      ...(item.path
        ? {
            item: {
              "@type": "WebApplication",
              name: item.name,
              description: item.description,
              url: `${siteUrl}${item.path}`,
            },
          }
        : {}),
    })),
  };
}

export function howToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
