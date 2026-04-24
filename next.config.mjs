import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypeShiki,
        {
          themes: { light: 'github-light', dark: 'github-dark' },
        },
      ],
    ],
  },
});

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: { unoptimized: true },
  trailingSlash: true,
};

export default withMDX(nextConfig);
