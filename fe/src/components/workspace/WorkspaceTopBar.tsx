import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Compass, ArrowLeft, Check, Search } from 'lucide-react';
import { Tabs } from '../ui/Tabs';
import { cn } from '../../lib/cn';
import type { Project } from '../../services/workspace';
import UserAvatarMenu from '../shared/UserAvatarMenu';
import { useCommandPalette } from '../../providers/CommandPaletteProvider';

/**
 * The QA-Wolf-inspired workspace header:
 *   [logo]  /project-name         [ Map | Automate | Run ]         [avatar]
 *
 * The navy-gradient side accents are rendered by the page container,
 * so this bar only owns its own white pill + tabs.
 */

export type WorkspaceTab = 'flows' | 'map' | 'automate' | 'run';

interface WorkspaceTopBarProps {
  projectName: string;
  activeTab: WorkspaceTab;
  projects: Project[];
  currentProjectSlug?: string;
  onProjectSelect: (project: Project) => void;
  isProjectMenuOpen: boolean;
  onProjectMenuOpenChange: (open: boolean) => void;
  userName?: string;
  userAvatarUrl?: string;
  className?: string;
  canAccessMap?: boolean;
}

export function WorkspaceTopBar({
  projectName,
  activeTab,
  projects,
  currentProjectSlug,
  onProjectSelect,
  isProjectMenuOpen,
  onProjectMenuOpenChange,
  className,
  canAccessMap = true,
}: WorkspaceTopBarProps) {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const projectMenuRef = useRef<HTMLDivElement | null>(null);
  const { open: openPalette } = useCommandPalette();

  useEffect(() => {
    if (!isProjectMenuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!projectMenuRef.current?.contains(event.target as Node)) {
        onProjectMenuOpenChange(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [isProjectMenuOpen, onProjectMenuOpenChange]);

  const go = (tab: WorkspaceTab) => {
    if (tab === 'map' && !canAccessMap) {
      navigate(`/workspace/${projectId}/flows`);
      return;
    }
    navigate(`/workspace/${projectId}/${tab}`);
  };

  const tabs: Array<{ id: WorkspaceTab; label: string }> = [
    { id: 'flows', label: 'Flows' },
    ...(canAccessMap ? [{ id: 'map' as WorkspaceTab, label: 'Map' }] : []),
    { id: 'automate', label: 'Automate' },
    { id: 'run', label: 'Run' },
  ];

  return (
    <header
      className={cn(
        'relative w-full bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700',
        'px-6 pt-4 pb-0',
        className,
      )}
    >
      <div className="mx-auto max-w-[1680px] grid grid-cols-[1fr_auto_1fr] items-center gap-3 min-h-12">
        {/* Left: logo + project breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-white/95 text-brand-600 shadow-card hover:bg-white transition-colors"
            aria-label="Projects"
            title="Back to projects"
          >
            <Compass className="w-4 h-4" strokeWidth={2} />
          </button>
          <button
            onClick={() => navigate('/projects')}
            className="h-8 px-3 rounded-md bg-white/95 text-ink-800 border border-ink-200 text-[13px] font-medium shadow-card hover:bg-white inline-flex items-center gap-1.5"
            aria-label="Back to projects"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
          </button>
          <div ref={projectMenuRef} className="relative">
            <button
              type="button"
              onClick={() => onProjectMenuOpenChange(!isProjectMenuOpen)}
              className="flex items-center gap-2 bg-white/95 rounded-md h-8 px-3 text-[13px] shadow-card hover:bg-white"
              aria-label="Switch project"
              aria-expanded={isProjectMenuOpen}
              aria-haspopup="listbox"
            >
              <span className="text-ink-400">/</span>
              <span className="font-semibold text-ink-900 truncate max-w-[220px]">{projectName}</span>
              <ChevronDown className={cn('w-3.5 h-3.5 text-ink-400 transition-transform', isProjectMenuOpen && 'rotate-180')} strokeWidth={2} />
            </button>
            {isProjectMenuOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[300px] max-w-[420px] rounded-lg border border-ink-200 bg-white shadow-pop overflow-hidden">
                <div className="max-h-80 overflow-auto py-1" role="listbox" aria-label="Projects">
                  {projects.map((p) => {
                    const active = p.slug === currentProjectSlug;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          onProjectSelect(p);
                          onProjectMenuOpenChange(false);
                        }}
                        className={cn(
                          'w-full px-3 py-2.5 text-left hover:bg-ink-50 flex items-center gap-2',
                          active && 'bg-brand-50/70',
                        )}
                      >
                        <span className="w-4 inline-flex items-center justify-center text-brand-600">
                          {active ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : null}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-ink-900 truncate">{p.name}</span>
                          <span className="block text-xs text-ink-500 truncate">/{p.slug}</span>
                        </span>
                      </button>
                    );
                  })}
                  {projects.length === 0 && (
                    <div className="px-3 py-3 text-xs text-ink-500">No projects available.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: pill card with the three tabs */}
        <div className="justify-self-center h-full flex items-end">
          <div data-tour-tabs className="bg-white/95 rounded-t-xl shadow-card px-6 pt-2">
            <Tabs
              tabs={tabs}
              active={activeTab}
              onChange={(id) => go(id as WorkspaceTab)}
              variant="underline"
            />
          </div>
        </div>

        {/* Right: search + user */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="h-8 px-2.5 rounded-md bg-white/95 hover:bg-white shadow-card border border-ink-200 inline-flex items-center gap-2 text-[12px] text-ink-500"
            aria-label="Open quick switcher (Cmd+K)"
            title="Quick switcher (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono border border-ink-200 rounded px-1 py-0.5 text-ink-400">⌘K</span>
          </button>
          <UserAvatarMenu
            projects={projects}
            currentProjectSlug={currentProjectSlug}
            variant="onPurple"
            onOpenCommandPalette={openPalette}
          />
        </div>
      </div>
    </header>
  );
}

export default WorkspaceTopBar;
