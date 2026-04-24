import type { Components } from 'react-markdown';

export function getMarkdownComponents(): Components {
  return {
    h1: (props) => <h1 className="text-4xl font-semibold mt-12 mb-6 tracking-tight" {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold mt-10 mb-4 tracking-tight" {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold mt-8 mb-3" {...props} />,
    p: (props) => <p className="leading-[1.75] my-5" {...props} />,
    a: (props) => (
      <a
        className="underline decoration-zinc-400 underline-offset-4 hover:decoration-foreground"
        {...props}
      />
    ),
    ul: (props) => <ul className="list-disc pl-6 my-5 space-y-2" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 my-5 space-y-2" {...props} />,
    blockquote: (props) => (
      <blockquote className="border-l-2 border-zinc-300 pl-4 my-5 text-zinc-600" {...props} />
    ),
    hr: () => <hr className="my-10 border-zinc-200" />,
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
        <code className="font-mono text-[0.9em] bg-zinc-100 px-1 py-0.5 rounded" {...props}>
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
      <th className="border border-zinc-200 bg-zinc-50 px-3 py-2 text-left font-semibold" {...props} />
    ),
    td: (props) => <td className="border border-zinc-200 px-3 py-2" {...props} />,
  };
}
