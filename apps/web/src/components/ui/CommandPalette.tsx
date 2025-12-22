/**
 * Command Palette Component
 * Modern ⌘K command palette for SaaS applications
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';

export interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  keywords?: string[];
  action: () => void;
  category?: string;
  shortcut?: string;
}

export interface CommandPaletteProps {
  commands: Command[];
  isOpen: boolean;
  onClose: () => void;
  placeholder?: string;
  emptyState?: React.ReactNode;
  className?: string;
}

export default function CommandPalette({
  commands,
  isOpen,
  onClose,
  placeholder = 'Tapez une commande ou recherchez...',
  emptyState,
  className,
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Filter commands based on search
  const filteredCommands = commands.filter((command) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      command.label.toLowerCase().includes(searchLower) ||
      command.description?.toLowerCase().includes(searchLower) ||
      command.keywords?.some((keyword) => keyword.toLowerCase().includes(searchLower)) ||
      command.category?.toLowerCase().includes(searchLower)
    );
  });

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, command) => {
    const category = command.category || 'Autres';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(command);
    return acc;
  }, {} as Record<string, Command[]>);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle ⌘K shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle is handled by parent component
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
      onClick={onClose}
    >
      <div
        className={clsx(
          'bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl',
          'border border-gray-200 dark:border-gray-700',
          'max-h-[60vh] flex flex-col overflow-hidden',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            autoFocus
            aria-label="Search commands"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
            <span>⌘</span>K
          </kbd>
        </div>

        {/* Commands List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            emptyState || (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg
                  className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Aucune commande trouvée
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Essayez une autre recherche
                </p>
              </div>
            )
          ) : (
            <div className="space-y-1">
              {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                <div key={category}>
                  {Object.keys(groupedCommands).length > 1 && (
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {category}
                    </div>
                  )}
                  {categoryCommands.map((command, index) => {
                    const globalIndex = filteredCommands.indexOf(command);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={command.id}
                        onClick={() => {
                          command.action();
                          onClose();
                        }}
                        className={clsx(
                          'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                          isSelected
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100'
                            : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                        )}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                      >
                        {command.icon && (
                          <div className="flex-shrink-0 text-gray-400 dark:text-gray-500">
                            {command.icon}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{command.label}</div>
                          {command.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {command.description}
                            </div>
                          )}
                        </div>
                        {command.shortcut && (
                          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
                            {command.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
                ↑↓
              </kbd>
              <span>Naviguer</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
                ↵
              </kbd>
              <span>Sélectionner</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
                Esc
              </kbd>
              <span>Fermer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for using Command Palette
export function useCommandPalette(commands: Command[]) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };
}

