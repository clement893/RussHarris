/**
 * Blog Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { BlogListing, BlogPost } from '@/components/blog';
import type { BlogPost as BlogPostType } from '@/components/content';
import { useState } from 'react';

export default function BlogComponentsContent() {
  const [selectedPost] = useState<BlogPostType | null>(null);

  const samplePosts: BlogPostType[] = [
    {
      id: 1,
      slug: 'getting-started',
      title: 'Getting Started with Our Platform',
      excerpt: 'Learn how to get started with our platform in just a few simple steps.',
      content: 'Full content here...',
      author_id: 1,
      author_name: 'John Doe',
      status: 'published',
      published_at: '2024-01-15',
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
      tags: ['tutorial', 'getting-started'],
    },
    {
      id: 2,
      slug: 'advanced-features',
      title: 'Advanced Features Guide',
      excerpt: 'Discover the advanced features that make our platform powerful.',
      content: 'Full content here...',
      author_id: 2,
      author_name: 'Jane Smith',
      status: 'published',
      published_at: '2024-01-20',
      created_at: '2024-01-20T00:00:00Z',
      updated_at: '2024-01-20T00:00:00Z',
      tags: ['features', 'guide'],
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Composants Blog"
        description="Composants pour créer et gérer un blog avec articles et catégories"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Blog' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Blog Listing">
          <BlogListing
            posts={samplePosts}
          />
        </Section>

        {selectedPost && (
          <Section title="Blog Post">
            <BlogPost
              post={selectedPost}
            />
          </Section>
        )}
      </div>
    </PageContainer>
  );
}

