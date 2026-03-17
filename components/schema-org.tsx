interface SchemaOrgProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function SchemaOrg({ data }: SchemaOrgProps) {
  const output = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(output) }}
    />
  );
}
