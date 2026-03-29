type JsonLdProps = {
  id?: string;
  data: unknown;
};

export function JsonLd({ id, data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  const script = `<script${id ? ` id="${id}"` : ""} type="application/ld+json">${json}</script>`;

  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: script }} />;
}
