export function RichContent({ content }: { content: string }) {
  return (
    <div
      className="content-flow"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
