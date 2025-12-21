import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProjectContent({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        /* Paragraphs */
        p: ({ children }) => (
          <p className="mb-6 leading-relaxed text-muted-foreground">
            {children}
          </p>
        ),

        /* Headings */
        h2: ({ children }) => (
          <h2 className="mt-12 mb-4 text-2xl font-headline font-bold">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-10 mb-3 text-xl font-headline font-semibold">
            {children}
          </h3>
        ),

        /* Lists */
        ul: ({ children }) => (
          <ul className="mb-6 ml-6 list-disc space-y-2">
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed text-muted-foreground">
            {children}
          </li>
        ),

        /* Links */
        a: ({ href, children }) => {
          const isExternal = href?.startsWith("http");

          return (
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4 hover:no-underline"
            >
              {children}
              {isExternal && <span aria-hidden>↗</span>}
            </a>
          );
        },

        /* Horizontal rule */
        hr: () => <hr className="my-12 border-border" />,
      }}
    >
        {content}
      </ReactMarkdown>
    </div>
  );
}
