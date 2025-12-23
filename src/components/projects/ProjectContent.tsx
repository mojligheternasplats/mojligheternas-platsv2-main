import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProjectContent({ content }: { content: string }) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto">
        <article className="prose prose-lg sm:prose-xl max-w-none 
          prose-headings:font-headline prose-headings:tracking-tight prose-headings:text-gray-900
          prose-h1:text-3xl sm:prose-h1:text-4xl lg:prose-h1:text-5xl prose-h1:mb-6 prose-h1:mt-0
          prose-h2:text-2xl sm:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:font-bold
          prose-h3:text-xl sm:prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:mb-4 prose-h3:mt-8
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
          prose-p:text-base sm:prose-p:text-lg
          prose-a:text-primary prose-a:font-semibold prose-a:transition-colors prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-bold
          prose-ul:my-8 prose-ul:space-y-3 prose-ul:list-none prose-ul:pl-0
          prose-li:text-gray-700 prose-li:leading-relaxed prose-li:pl-6 prose-li:relative
          prose-li:before:content-['•'] prose-li:before:absolute prose-li:before:left-0 
          prose-li:before:text-primary prose-li:before:font-bold prose-li:before:text-xl
          prose-hr:my-12 prose-hr:border-gray-200
          prose-img:rounded-lg prose-img:shadow-md
          [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
        >
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
                    className="inline-flex items-center gap-1.5 underline underline-offset-4 
                      hover:no-underline hover:text-primary/80 transition-all duration-200"
                  >
                    {children}
                    {isExternal && (
                      <span aria-hidden className="text-sm">↗</span>
                    )}
                  </a>
                );
              },
              p: ({ children }) => (
                <p className="mb-6 leading-relaxed text-gray-700">{children}</p>
              ),
              h1: ({ children }) => (
                <h1 className="scroll-mt-20 text-gray-900 font-bold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="scroll-mt-20 text-gray-900 font-bold border-b-2 border-gray-100 pb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="scroll-mt-20 text-gray-900 font-semibold">{children}</h3>
              ),
              ul: ({ children }) => (
                <ul className="my-8 space-y-3">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="pl-6 relative text-gray-700 leading-relaxed before:content-['→'] before:absolute before:left-0 before:text-primary before:font-bold">
                  {children}
                </li>
              ),
              hr: ({ children }) => (
                <hr className="my-12 border-t-2 border-gray-200" />
              ),
              
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}