import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../../lib/cn';
import type { Project } from '../../services/workspace';
import { NAV_ICONS } from './navIcons';

export type NavSection =
  | 'dashboard'
  | 'flows'
  | 'automate'
  | 'visual'
  | 'run'
  | 'repo'
  | 'data'
  | 'tests'
  | 'reports'
  | 'settings';

export function sectionToNavItem(section: string): NavSection {
  switch (section) {
    case 'dashboard': return 'dashboard';
    case 'flows': return 'flows';
    case 'newflow': return 'flows';
    case 'map':
    case 'automate':
    case 'manual': return 'automate';
    case 'visual':
    case 'newvisual': return 'visual';
    case 'run': return 'run';
    case 'repo': return 'repo';
    case 'profile': return 'data';
    case 'tests': return 'tests';
    case 'reports': return 'reports';
    case 'settings':
    case 'integrations':
    case 'runners':
    case 'tools': return 'settings';
    default: return 'dashboard';
  }
}

interface NavItem {
  id: NavSection;
  label: string;
  to: string;
}

const ITEMS: { group: string; items: NavItem[] }[] = [
  {
    group: 'Main',
    items: [
      { id: 'dashboard', label: 'DASHBOARD', to: 'dashboard' },
      { id: 'flows',     label: 'FLOWS',     to: 'flows' },
      { id: 'automate',  label: 'AUTOMATE',  to: 'automate' },
      { id: 'run',       label: 'RUN',       to: 'run' },
      { id: 'repo',      label: 'IMPORT REPOSITORY', to: 'repo' },
      { id: 'visual',    label: 'VISUAL REGRESSION', to: 'visual' },
    ],
  },
  {
    group: 'Assets',
    items: [
      { id: 'tests', label: 'TESTS',              to: 'tests' },
      { id: 'data',  label: 'DATA & VARIABLES', to: 'profile' },
    ],
  },
  {
    group: 'System',
    items: [
      { id: 'reports',  label: 'REPORTS',  to: 'reports/failures' },
      { id: 'settings', label: 'SETTINGS', to: 'settings' },
    ],
  },
];

interface Props {
  section: string;
  projects: Project[];
  currentProject: Project | null;
  onProjectSelect: (p: Project) => void;
}

function InspiceMark() {
  return (
    <svg width="26" height="51" viewBox="0 0 25.3112 50" fill="none" aria-hidden>
      <circle cx="15" cy="13" r="3" fill="#C5FFEB" />
      <path d="M10.294 27.3447H12.6453H13.8209L14.9966 27.3447V46.8468H10.294V27.3447Z" fill="#292929" />
      <path d="M9.7407 31.4249L11.193 29.3502H12.6453H14.0976L15.5498 31.4249V46.8468H9.7407V31.4249Z" fill="#292929" />
      <path d="M25.3112 15.7264C25.3112 22.7159 19.6451 28.382 12.6556 28.382C5.66611 28.382 0 22.7159 0 15.7264C0 8.73694 5.66611 3.07084 12.6556 3.07084C19.6451 3.07084 25.3112 8.73694 25.3112 15.7264ZM3.25848 15.7264C3.25848 20.9163 7.46571 25.1236 12.6556 25.1236C17.8455 25.1236 22.0527 20.9163 22.0527 15.7264C22.0527 10.5366 17.8455 6.32932 12.6556 6.32932C7.46571 6.32932 3.25848 10.5366 3.25848 15.7264Z" fill="#292929" />
      <circle cx="12.645" cy="15.727" r="2.07469" fill="#292929" />
    </svg>
  );
}

function SlashSlash() {
  return (
    <svg width="26" height="28" viewBox="0 0 26 28" fill="none" aria-hidden>
      <path d="M2 26 L14 2" stroke="#363636" strokeWidth="2" strokeLinecap="butt" />
      <path d="M12 26 L24 2" stroke="#363636" strokeWidth="2" strokeLinecap="butt" />
    </svg>
  );
}

function ProjectLogo({ name, appUrl, size = 22 }: { name?: string; appUrl?: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initial = (name ?? '?').trim().charAt(0).toUpperCase() || '?';
  let domain: string | null = null;
  if (appUrl) {
    try { domain = new URL(appUrl.startsWith('http') ? appUrl : `https://${appUrl}`).hostname; } catch { /* ignore */ }
  }
  if (domain && !failed) {
    return (
      <img
        src={'https://www.google.com/s2/favicons?domain=' + domain + '&sz=64'}
        alt="" width={size} height={size}
        className="shrink-0 object-contain"
        onError={() => setFailed(true)}
        aria-hidden
      />
    );
  }
  return (
    <span className="text-ink-900 font-bold leading-none shrink-0 text-center" style={{ fontSize: size - 3, width: size }}>
      {initial}
    </span>
  );
}

function CaretDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 6" className={className} fill="currentColor" aria-hidden>
      <path d="M0 0h10L5 6z" />
    </svg>
  );
}

/* Figma-exact collapse/expand handle SVG — 16×48, #42B38D stroke */
function CollapseHandle({ flipped }: { flipped: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16" height="48"
      viewBox="0 0 16 48"
      fill="none"
      aria-hidden
      style={{ display: 'block', transform: flipped ? 'scaleX(-1)' : 'scaleX(1)', transition: 'transform 300ms' }}
    >
      <path d="M15 44.6973L6.16504 31.4453L1.20117 24L6.16504 16.5547L15 3.30176V44.6973Z" stroke="#42B38D" strokeWidth="2"/>
      <path d="M11 28L9 23.9998L11 20" stroke="#42B38D" strokeWidth="2"/>
    </svg>
  );
}

export function WorkspaceSideNav({ section, projects, currentProject, onProjectSelect }: Props) {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const active = sectionToNavItem(section);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('nav-collapsed') === '1'; } catch { return false; }
  });

  const toggleCollapsed = () => {
    setCollapsed(v => {
      const next = !v;
      try { localStorage.setItem('nav-collapsed', next ? '1' : '0'); } catch {}
      return next;
    });
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => { if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false); };
    const onKey  = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  const go = (to: string) => navigate(`/workspace/${projectId}/${to}`);

  return (
    <nav
      className={cn(
        'relative shrink-0 h-full flex flex-col font-display transition-all duration-300 overflow-visible',
        collapsed ? 'w-[64px]' : 'w-[248px]',
      )}
      style={{ background: '#F4F4F4', borderRight: '1px solid #DBDBDB' }}
    >
      {/* Collapse/expand handle — Figma: Group 225, x=232 y=91 (74px from nav top), 16×48, inside nav at right:0 */}
      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        style={{ position: 'absolute', top: 110, right: 0, width: 16, height: 48, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', zIndex: 10 }}
      >
        <CollapseHandle flipped={collapsed} />
      </button>

      {/* Brand lockup — pt-9 (36px) top, logo row ~40px tall → bottom of row ≈ 76px from nav top */}
      <div
        className={cn('flex items-center shrink-0 transition-all duration-300', collapsed ? 'justify-center px-3 pt-9 pb-8' : 'pt-9 pb-8 pl-10 gap-11')}
      >
        <InspiceMark />
        {!collapsed && <SlashSlash />}
        {!collapsed && <ProjectLogo name={currentProject?.name} appUrl={currentProject?.appUrl} size={36} />}
      </div>

      {/* Nav groups */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {ITEMS.map(({ group, items }, gi) => (
          <div key={group}>
            {/* Section label */}
            {!collapsed && (
              <div
                className="px-10 mb-1"
                style={{ fontFamily: "'Now', 'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: '#606060', letterSpacing: '1.2px', lineHeight: '14.4px' }}
              >
                {group}
              </div>
            )}

            {/* Items */}
            <div>
              {items.map((item) => {
                const isActive = active === item.id;
                const IconCmp  = NAV_ICONS[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.to)}
                    aria-current={isActive ? 'page' : undefined}
                    title={collapsed ? item.label : undefined}
                    className="w-full transition-colors relative nav-item-btn"
                    style={{
                      display: 'flex',
                      paddingLeft:  collapsed ? 0 : 48,
                      paddingRight: collapsed ? 0 : 12,
                      paddingTop: 16,
                      paddingBottom: 16,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      alignItems: 'flex-start',
                      gap: collapsed ? 0 : 8,
                      background: isActive ? '#CEFCEC' : 'transparent',
                      fontFamily: "'Now', 'Inter', sans-serif",
                      fontSize: '16px',
                      lineHeight: '16px',
                      fontWeight: 500,
                      letterSpacing: collapsed ? undefined : '1.6px',
                      textAlign: 'left',
                      color: isActive ? '#1E7D68' : '#8E8E8E',
                    }}
                  >
                    {/* 3px left accent on active */}
                    {isActive && !collapsed && (
                      <span
                        style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: '#42B38D' }}
                      />
                    )}
                    <span style={{ width: 16, height: 16, minWidth: 16, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', color: isActive ? '#1E7D68' : '#42B28C' }}>
                      <IconCmp />
                    </span>
                    {!collapsed && (
                      <span style={{ lineHeight: '16px', fontSize: '16px' }}>{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Section divider — gradient line, not after last section */}
            {gi < ITEMS.length - 1 && !collapsed && (
              <div
                className="my-5"
                style={{
                  height: 1,
                  marginLeft: 24,
                  marginRight: 24,
                  background: 'linear-gradient(to right, transparent, #A4A4A4 20%, #A4A4A4 80%, transparent)',
                }}
              />
            )}
            {gi < ITEMS.length - 1 && collapsed && <div className="my-3" />}
          </div>
        ))}
      </div>

      {/* Project selector */}
      <div ref={menuRef} style={{ paddingTop: 12, paddingBottom: 24 }} className={cn(collapsed ? 'flex justify-center px-2' : 'px-[34px]')}>
        {collapsed ? (
          <button
            type="button"
            onClick={() => navigate('/projects')}
            title="Switch project"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          >
            <ProjectLogo name={currentProject?.name} appUrl={currentProject?.appUrl} size={32} />
          </button>
        ) : (
          <>
            <div style={{ fontFamily: "'Now', 'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: '#8E8E8E', letterSpacing: '1.2px', marginBottom: 6 }}>Project:</div>
            <div className="relative" style={{ height: 48 }}>
              <div
                className="absolute top-0 left-0 right-0 z-20 flex items-stretch"
                style={{ border: '2px solid #929292', background: '#F4F4F4' }}
              >
                <button
                  type="button"
                  onClick={() => setMenuOpen(v => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={menuOpen}
                  aria-label={menuOpen ? 'Close project list' : 'Open project list'}
                  className="shrink-0 flex justify-center items-start"
                  style={{ width: 34 }}
                >
                  <div style={{ width: 18, height: 11, marginTop: 17 }}>
                    <CaretDown
                      className={cn('text-[#929292] transition-transform duration-300', menuOpen && 'rotate-180')}
                    />
                  </div>
                </button>
                <span className="self-stretch my-1 shrink-0" style={{ width: 1, background: '#A4A4A4' }} />
                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(v => !v)}
                    className="w-full flex items-center gap-2.5 text-left"
                    style={{ minHeight: 44, paddingLeft: 9, paddingRight: 8, paddingTop: 6, paddingBottom: 6 }}
                  >
                    <ProjectLogo name={currentProject?.name} appUrl={currentProject?.appUrl} />
                    <span className="min-w-0 line-clamp-2" style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9F9F9F', lineHeight: 1.3 }}>
                      {currentProject?.name ?? 'Select project'}
                    </span>
                  </button>

                  <div style={{ display: 'grid', gridTemplateRows: menuOpen ? '1fr' : '0fr', transition: 'grid-template-rows 450ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
                    <div className="overflow-hidden min-h-0">
                      <div className="max-h-60 overflow-y-auto" role="listbox" aria-label="Switch workspace">
                        {projects
                          .filter(p => p.id !== currentProject?.id && p.slug !== currentProject?.slug)
                          .map(p => (
                            <button
                              key={p.id}
                              type="button"
                              role="option"
                              aria-selected={false}
                              tabIndex={menuOpen ? 0 : -1}
                              onClick={() => { onProjectSelect(p); setMenuOpen(false); }}
                              className="w-full flex items-center gap-2.5 text-left transition-colors duration-150"
                              style={{ minHeight: 44, paddingLeft: 9, paddingRight: 8, paddingTop: 6, paddingBottom: 6 }}
                              onMouseEnter={e => (e.currentTarget.style.background = '#E2E2E2')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                              <ProjectLogo name={p.name} appUrl={p.appUrl} />
                              <span className="min-w-0 line-clamp-2" style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9F9F9F', lineHeight: 1.3 }}>
                                {p.name}
                              </span>
                            </button>
                          ))}
                        {projects.length <= 1 && (
                          <div style={{ padding: '8px 10px', fontSize: 11, color: '#9F9F9F' }}>No other workspaces.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default WorkspaceSideNav;
