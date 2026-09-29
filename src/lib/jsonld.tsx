type JsonLdObject = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdObject }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped so a payload containing "<" can never
      // terminate the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function JsonLdGraph({ nodes }: { nodes: JsonLdObject[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": nodes,
      }}
    />
  );
}
