'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-t">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h2
              className="text-2xl md:text-3xl font-medium mt-12 mb-4"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h3
              className="text-xl md:text-2xl font-medium mt-10 mb-3 accent"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h4
              className="text-lg md:text-xl font-medium mt-8 mb-3"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            // line-height intentionally not set here — defers to
            // .prose-t p { line-height: 1.75 } in globals.css for
            // long-form readability tuning.
            <p className="my-5 pretty" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="accent underline underline-offset-4 decoration-1 hover:no-underline"
              target={
                props.href?.startsWith('http') ? '_blank' : undefined
              }
              rel={
                props.href?.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
              }
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="prose-t-ul my-5 space-y-2 list-none pl-0" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="my-5 space-y-2 list-decimal pl-6 marker:text-[color:var(--t-fg-dim)] marker:font-mono"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="pl-1" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-6 border-l-2 border-[color:var(--t-accent)]/60 pl-4 italic font-serif-feature text-[color:var(--t-fg)]/90"
              {...props}
            />
          ),
          code: ({ node, className, children, ...props }) => {
            // react-markdown v9: inline `code` has no className; block has `language-*`
            const isBlock = /language-/.test(className ?? '');
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className="px-1.5 py-0.5 bg-[color:var(--t-accent-soft)] text-[color:var(--t-accent)] text-[0.95em]"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => (
            <pre
              className="my-6 p-4 border border-[color:var(--t-bg-rule)] bg-[color:var(--t-bg-elev)] overflow-x-auto text-[0.9375rem] leading-[1.7]"
              {...props}
            />
          ),
          hr: () => (
            <hr className="my-10 border-0 dim text-xs text-center select-none">
              ───────────────────────────────────────
            </hr>
          ),
          table: ({ node, ...props }) => (
            <div className="my-6 overflow-x-auto border border-[color:var(--t-bg-rule)]">
              <table className="w-full text-sm" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="text-left dim uppercase tracking-widest text-[0.7rem] px-3 py-2 border-b border-[color:var(--t-bg-rule)]"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-3 py-2 border-b border-[color:var(--t-bg-rule)]/50"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="text-[color:var(--t-fg)]" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="font-serif-feature italic" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
