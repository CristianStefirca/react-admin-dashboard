import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth, usePermissions } from '../hooks/useAuth';
import { WorkspaceSideNav } from '../components/workspace/WorkspaceSideNav';
import { WorkspaceHeader } from '../components/workspace/WorkspaceHeader';
import { DashboardView } from '../components/workspace/DashboardView';
import { FlowsView }    from '../components/workspace/FlowsView';
import { MapView }      from '../components/workspace/MapView';
import { AutomateMapperView } from '../components/workspace/AutomateMapperView';
import { AutomateView } from '../components/workspace/AutomateView';
import { NewFlowWizard } from '../components/workspace/NewFlowWizard';
import { RunView }      from '../components/workspace/RunView';
import { RepoBrowser }  from '../components/workspace/RepoBrowser';
import { VisualRegressionView } from '../components/visual/VisualRegressionView';
import { NewVisualTestWizard } from '../components/visual/NewVisualTestWizard';
import { CreateProjectModal } from '../components/workspace/CreateProjectModal';
import { Button } from '../components/ui/Button';
import { fetchProjects, type Project } from '../services/workspace';
import { NotificationsProvider } from '../providers/NotificationsProvider';

import IntegrationsPage from './IntegrationsPage';
import RunnersPage from './RunnersPage';
import FailureClusteringPage from './FailureClusteringPage';
import DualReportsPage from './DualReportsPage';
import TestDocsPage from './TestDocsPage';
import TestsLibraryPage from './TestsLibraryPage';
import PlaywrightImportPage from './PlaywrightImportPage';
import { RepoImportView } from '../components/workspace/RepoImportView';
import GithubReorgPage from './GithubReorgPage';
import WorkspaceProfilePage from './WorkspaceProfilePage';
import SettingsPage from './SettingsPage';

const ManualModeWizard = lazy(() => import('../components/workspace/manual/ManualModeWizard'));

/**
 * The core app page — a unified left-nav shell (Inspice // Dashboard design).
 * Every client (workspace) lands on its Dashboard, then navigates the rest of
 * the workspace from the left nav.
 *
 * URL shapes:
 *   /workspace/:projectId/:tab            (tab = dashboard|flows|map|automate|run|profile|integrations|runners)
 *   /workspace/:projectId/reports/:sub    (sub = failures|compare|docs)
 *   /workspace/:projectId/tools/:sub      (sub = import-playwright|github-reorg)
 */

type Section =
  | 'dashboard' | 'flows' | 'newflow' | 'map' | 'automate' | 'manual' | 'visual' | 'newvisual' | 'run'
  | 'integrations' | 'runners' | 'profile' | 'reports' | 'tools' | 'tests' | 'settings' | 'repo';

const VALID_TABS = new Set<string>([
  'dashboard', 'flows', 'newflow', 'map', 'automate', 'manual', 'visual', 'run',
  'integrations', 'runners', 'profile', 'fixtures', 'reports', 'tools', 'tests', 'settings', 'repo',
]);

const PAGE_LABEL: Record<Section, string> = {
  dashboard: 'Dashboard',
  flows: 'Flows',
  newflow: 'Flows',
  map: 'Automate',
  automate: 'Automate',
  manual: 'Manual Mode',
  visual: 'Visual Regression',
  newvisual: 'Visual Regression',
  run: 'Run',
  profile: 'Data & Variables',
  integrations: 'Settings',
  runners: 'Settings',
  tools: 'Settings',
  reports: 'Reports',
  tests: 'Tests',
  settings: 'Settings',
  repo: 'Import Repository',
};

export default function WorkspacePage() {
  const navigate = useNavigate();
  const { projectId: slugParam, tab, sub } = useParams<{ projectId: string; tab: string; sub: string }>();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  // Automate shows the code-editor IDE when a flow/scenario is opened, else the composer.
  const automateIde = !!(searchParams.get('ide') || searchParams.get('flowId'));
  const { user } = useAuth();
  const { canAccessMap } = usePermissions();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadedProjects, setLoadedProjects] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [showRepo, setShowRepo] = useState(false);

  // Which high-level section of the workspace are we in?
  const section = useMemo<Section>(() => {
    if (pathname.includes('/visual/new')) return 'newvisual';
    if (pathname.includes('/visual')) return 'visual';
    if (pathname.includes('/manual')) return 'manual';
    if (pathname.includes('/reports/')) return 'reports';
    if (pathname.includes('/tools/')) return 'tools';
    if (tab === 'map' && !canAccessMap) return 'flows';
    if (tab === 'fixtures') return 'profile';
    if (tab === 'tests') return 'tests';
    if (tab && VALID_TABS.has(tab)) return tab as Section;
    return 'dashboard';
  }, [pathname, tab, canAccessMap]);

  const loadProjects = async () => {
    const list = await fetchProjects();
    setProjects(list);
    const byMatch = list.find(p => p.slug === slugParam || p.id === slugParam);
    setProject(byMatch ?? list[0] ?? null);
    setLoadedProjects(true);
  };

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugParam]);

  // Bare /workspace/:id (or an unknown tab) → land on the Dashboard.
  useEffect(() => {
    if (!slugParam) return;
    if (pathname.includes('/visual')) return; // visual/new + visual/run/:runId use a literal segment
    if (pathname.includes('/reports/') || pathname.includes('/tools/')) return;
    if (tab === 'map' && !canAccessMap) {
      navigate(`/workspace/${slugParam}/dashboard`, { replace: true });
      return;
    }
    if (tab && VALID_TABS.has(tab)) return;
    navigate(`/workspace/${slugParam}/dashboard`, { replace: true });
  }, [slugParam, tab, pathname, canAccessMap, navigate]);

  const handleProjectCreated = (p: Project) => {
    setProjects([p, ...projects]);
    setProject(p);
    navigate(`/workspace/${p.slug}/dashboard`, { replace: true });
  };

  // Switching client always returns to that client's Dashboard.
  const handleProjectSelect = (p: Project) => {
    navigate(`/workspace/${p.slug}/dashboard`);
  };

  const needsOnboarding = loadedProjects && projects.length === 0;
  const userName = (user?.name && !user.name.includes('@') ? user.name : user?.email?.split('@')[0]) ?? 'there';

  return (
    <NotificationsProvider projectId={project?.id}>
    <div className="flex h-screen w-full bg-[#F8F8F8]">
      <WorkspaceSideNav
        section={section}
        projects={projects}
        currentProject={project}
        onProjectSelect={handleProjectSelect}
      />

      {/* Content column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <WorkspaceHeader
          pageLabel={PAGE_LABEL[section]}
          projects={projects}
          currentProjectSlug={project?.slug}
        />

        <div className="relative flex-1 min-h-0 bg-white overflow-hidden">
          {project && section === 'dashboard'     && <DashboardView projectId={project.id} userName={userName} />}
          {project && section === 'flows'          && <FlowsView    key={`flows-${project.id}`} projectId={project.id} appUrl={project.appUrl} />}
          {project && section === 'newflow'        && <NewFlowWizard projectId={project.id} slug={project.slug} editFlowId={searchParams.get('editFlowId') || undefined} aiMode={searchParams.get('mode') === 'ai'} />}
          {project && section === 'map' && canAccessMap && <MapView projectId={project.id} appUrl={project.appUrl} mode="session" />}
          {project && section === 'automate' && automateIde && <AutomateView projectId={project.id} appUrl={project.appUrl} workspaceName={project.name || project.id} />}
          {project && section === 'automate' && !automateIde && <AutomateMapperView projectId={project.id} appUrl={project.appUrl} workspaceName={project.name || project.id} />}
          {project && section === 'manual' && (
            <Suspense fallback={<div className="flex items-center justify-center h-full text-fig-gray text-sm">Loading Manual Mode…</div>}>
              <ManualModeWizard projectId={project.id} startUrl={project.appUrl} onExit={() => navigate(`/workspace/${project.slug}/automate`)} />
            </Suspense>
          )}
          {project && section === 'run'            && <RunView      projectId={project.id} />}
          {project && section === 'repo'           && <RepoImportView projectId={project.id} />}
          {project && section === 'visual'         && <VisualRegressionView projectId={project.id} appUrl={project.appUrl} />}
          {project && section === 'newvisual'      && <NewVisualTestWizard projectId={project.id} slug={project.slug} appUrl={project.appUrl} onDone={() => navigate(`/workspace/${project.slug}/visual`)} onCancel={() => navigate(`/workspace/${project.slug}/visual`)} />}
          {project && section === 'tests'          && <TestsLibraryPage projectId={project.id} />}
          {project && section === 'integrations'   && <IntegrationsPage />}
          {project && section === 'settings'       && <SettingsPage projectId={project.id} />}
          {project && section === 'runners'        && <RunnersPage />}
          {project && section === 'profile'        && <WorkspaceProfilePage project={project} />}
          {project && section === 'reports' && sub === 'failures' && <FailureClusteringPage />}
          {project && section === 'reports' && sub === 'compare'  && <DualReportsPage />}
          {project && section === 'reports' && sub === 'docs'     && <TestDocsPage />}
          {project && section === 'tools' && sub === 'import-playwright' && <PlaywrightImportPage />}
          {project && section === 'tools' && sub === 'github-reorg'      && <GithubReorgPage />}

          {/* Repo browser drawer */}
          {showRepo && (
            <div className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm z-50 flex animate-fade-in">
              <div className="ml-auto h-full w-[min(1100px,92vw)] bg-white shadow-pop animate-slide-up flex flex-col">
                <div className="h-12 px-4 border-b border-ink-100 flex items-center">
                  <h3 className="font-semibold text-ink-900">Full repository</h3>
                  <Button className="ml-auto" size="sm" variant="ghost" onClick={() => setShowRepo(false)}>Close</Button>
                </div>
                <div className="flex-1 p-3 min-h-0">
                  <RepoBrowser defaultBranch={project?.defaultBranch ?? 'main'} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {needsOnboarding && (
        <CreateProjectModal blocking onCreated={handleProjectCreated} />
      )}
    </div>
    </NotificationsProvider>
  );
}