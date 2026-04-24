import type { Components } from 'react-markdown';

export function getMarkdownComponents(): Components {
  return {
    h1: (props) => <h1 className="text-4xl font-semibold mt-12 mb-6 tracking-tight" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold mt-10 mb-4 tracking-tight" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold mt-8 mb-3" {...props} />,
    p: (props) => <p className="leading-[1.75] my-5" {...props} />,
    a: (props) => (
      <a
        className="underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground transition"
        {...props}
      />
    ),
    ul: (props) => <ul className="list-disc pl-6 my-5 space-y-2 marker:text-muted-foreground" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 my-5 space-y-2 marker:text-muted-foreground" {...props} />,
    blockquote: (props) => (
      <blockquote className="border-l-2 border-border pl-4 my-5 text-muted-foreground" {...props} />
    ),
    hr: () => <hr className="my-10 border-border" />,
    code: ({ className, children, ...props }) => {
      const isBlock = typeof className === 'string' && className.startsWith('language-');
      if (isBlock) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      return (
        <code {...props}>
          {children}
        </code>
      );
    },
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th className="border border-border bg-muted px-3 py-2 text-left font-semibold" {...props} />
    ),
    td: (props) => <td className="border border-border px-3 py-2" {...props} />,
  };
}
