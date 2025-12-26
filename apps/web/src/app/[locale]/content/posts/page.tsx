/**
 * Blog Posts Management Page
 * 
 * Page for managing blog posts with CRUD operations.
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/lib/store';
import { PostsManager } from '@/components/content';
import type { BlogPost } from '@/components/content';
import { PageHeader, PageContainer } from '@/components/layout';
import { Loading, Alert } from '@/components/ui';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { logger } from '@/lib/logger';

export default function PostsManagementPage() {
  const router = useRouter();
  const t = useTranslations('content.posts');
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    loadPosts();
  }, [isAuthenticated, router]);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Load posts from API when backend endpoints are ready
      // For now, use empty array
      setPosts([]);
      setIsLoading(false);
    } catch (error) {
      logger.error('Failed to load posts', error instanceof Error ? error : new Error(String(error)));
      setError(t('errors.loadFailed') || 'Failed to load posts. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePostCreate = async (postData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // TODO: Create post via API
      logger.info('Creating post', postData);
      await loadPosts();
    } catch (error) {
      logger.error('Failed to create post', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  };

  const handlePostUpdate = async (id: number, postData: Partial<BlogPost>) => {
    try {
      // TODO: Update post via API
      logger.info('Updating post', { id, postData });
      await loadPosts();
    } catch (error) {
      logger.error('Failed to update post', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  };

  const handlePostDelete = async (id: number) => {
    try {
      // TODO: Delete post via API
      logger.info('Deleting post', { id });
      await loadPosts();
    } catch (error) {
      logger.error('Failed to delete post', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <PageContainer>
          <div className="flex items-center justify-center min-h-[400px]">
            <Loading />
          </div>
        </PageContainer>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <PageContainer>
        <PageHeader
          title={t('title') || 'Blog Posts Management'}
          description={t('description') || 'Create and manage your blog posts'}
          breadcrumbs={[
            { label: t('breadcrumbs.dashboard') || 'Dashboard', href: '/dashboard' },
            { label: t('breadcrumbs.content') || 'Content', href: '/content' },
            { label: t('breadcrumbs.posts') || 'Posts' },
          ]}
        />

        {error && (
          <div className="mt-6">
            <Alert variant="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        <div className="mt-8">
          <PostsManager
            posts={posts}
            onPostCreate={handlePostCreate}
            onPostUpdate={handlePostUpdate}
            onPostDelete={handlePostDelete}
          />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}

