import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProjectContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-headline prose-a:text-primary prose-a:font-semibold">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        a: ({ href, children }) => {
          const isExternal = href?.startsWith("http");

          return (
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 underline underline-offset-4 hover:no-underline"
            >
              {children}
              {isExternal && <span aria-hidden>↗</span>}
            </a>
          );
        },
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
