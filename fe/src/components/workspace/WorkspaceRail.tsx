import {
  LayoutGrid,
  Compass,
  Sparkles,
  Play,
  Plus,
  HelpCircle,
  Filter,
  Plug,
  Server,
  BarChart3,
  Wrench,
  FolderGit2,
  Bug,
  Database,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '../ui/IconButton';
import type { WorkspaceTab } from './WorkspaceTopBar';

export type WorkspaceSection =
  | 'flows'
  | 'map'
  | 'automate'
  | 'run'
  | 'integrations'
  | 'runners'
  | 'profile'
  | 'reports'
  | 'tools';

interface WorkspaceRailProps {
  activeTab: WorkspaceTab;
  section?: WorkspaceSection;
  canAccessMap?: boolean;
  onOpenTour?: () => void;
  onOpenRepo?: () => void;
}

export function WorkspaceRail({ activeTab, section, canAccessMap = true, onOpenTour, onOpenRepo }: WorkspaceRailProps) {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const go = (tab: WorkspaceTab, search = '') => {
    if (tab === 'map' && !canAccessMap) {
      navigate(`/workspace/${projectId}/flows`);
      return;
    }
    navigate(`/workspace/${projectId}/${tab}${search}`);
  };

  const goPath = (sub: string) => {
    navigate(`/workspace/${projectId}/${sub}`);
  };

  const active = section ?? (activeTab as WorkspaceSection);

  return (
    <div className="w-12 shrink-0 bg-ink-50 border-r border-ink-100 flex flex-col items-center py-3 gap-1.5">
      {/* Primary workflow tabs */}
      <IconButton type="button" label="Flows"    tone={active === 'flows'    ? 'brand' : 'neutral'} onClick={() => go('flows')}>
        <LayoutGrid className="w-4 h-4" />
      </IconButton>
      {canAccessMap && (
        <IconButton type="button" label="Map"      tone={active === 'map'      ? 'brand' : 'neutral'} onClick={() => go('map')}>
          <Compass className="w-4 h-4" />
        </IconButton>
      )}
      <IconButton type="button" label="Automate" tone={active === 'automate' ? 'brand' : 'neutral'} onClick={() => go('automate')}>
        <Sparkles className="w-4 h-4" />
      </IconButton>
      <IconButton type="button" label="Runs"     tone={active === 'run'      ? 'brand' : 'neutral'} onClick={() => go('run')}>
        <Play className="w-4 h-4" />
      </IconButton>

      <div className="w-6 h-px bg-ink-200 my-1" />

      {/* Project-scoped settings */}
      <IconButton type="button" label="Integrations" tone={active === 'integrations' ? 'brand' : 'neutral'} onClick={() => goPath('integrations')}>
        <Plug className="w-4 h-4" />
      </IconButton>
      <IconButton type="button" label="Runners"      tone={active === 'runners'      ? 'brand' : 'neutral'} onClick={() => goPath('runners')}>
        <Server className="w-4 h-4" />
      </IconButton>
      <IconButton type="button" label="Project settings" tone={active === 'profile' ? 'brand' : 'neutral'} onClick={() => goPath('profile')}>
        <Database className="w-4 h-4" />
      </IconButton>
      <IconButton type="button" label="Reports"      tone={active === 'reports'      ? 'brand' : 'neutral'} onClick={() => goPath('reports/failures')}>
        <BarChart3 className="w-4 h-4" />
      </IconButton>
      <IconButton type="button" label="Tools"        tone={active === 'tools'        ? 'brand' : 'neutral'} onClick={() => goPath('tools/import-playwright')}>
        <Wrench className="w-4 h-4" />
      </IconButton>

      <div className="w-6 h-px bg-ink-200 my-1" />

      <IconButton type="button" label="Envs" onClick={() => go('flows', '?action=open-envs')}>
        <Bug className="w-4 h-4" />
      </IconButton>
      <IconButton type="button" label="All projects" onClick={() => navigate('/projects')}>
        <FolderGit2 className="w-4 h-4" />
      </IconButton>

      {active === 'map' && (
        <>
          <IconButton type="button" label="Add flow" onClick={() => go('map', '?action=create-flow')}>
            <Plus className="w-4 h-4" />
          </IconButton>
          <IconButton type="button" label="Guide" onClick={onOpenTour}>
            <HelpCircle className="w-4 h-4" />
          </IconButton>
        </>
      )}

      {active === 'run' && (
        <IconButton type="button" label="Blocking" onClick={() => go('run', '?action=filter-blocking')}>
          <Filter className="w-4 h-4" />
        </IconButton>
      )}

      <div className="mt-auto" />
      {onOpenRepo && (
        <IconButton type="button" label="Repo" onClick={onOpenRepo}>
          <FolderGit2 className="w-4 h-4" />
        </IconButton>
      )}
    </div>
  );
}

export default WorkspaceRail;
