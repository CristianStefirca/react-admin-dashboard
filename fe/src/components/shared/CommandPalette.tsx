import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, Users, CreditCard, ChevronUp, ChevronDown, CornerDownLeft, Command } from 'lucide-react'
import type { Project, FlowCategory } from '../../services/workspace'
import { fetchFlows } from '../../services/workspace'
import {
  FlowsIcon,
  DashboardIcon,
  SettingsIcon,
  AutomateIcon,
  RunIcon,
  DataIcon,
  ReportsIcon,
} from '../workspace/navIcons'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  projects: Project[]
}

interface PaletteItem {
  id: string
  section: string
  title: string
  path: string
  icon: React.ReactNode
  keywords?: string
  action: () => void
}

const NAV_ITEMS: Array<{
  id: string
  title: string
  to: string
  icon: React.ReactNode
  keywords?: string
}> = [
  { id: 'dashboard', title: 'Dashboard',        to: 'dashboard',        icon: <DashboardIcon />, keywords: 'home overview metrics' },
  { id: 'flows',     title: 'Flows',            to: 'flows',            icon: <FlowsIcon />,     keywords: 'library tests all flows' },
  { id: 'automate',  title: 'Automate',         to: 'automate',         icon: <AutomateIcon />,  keywords: 'ai agent generate editor build' },
  { id: 'run',       title: 'Run',              to: 'run',              icon: <RunIcon />,       keywords: 'execute tests runs results' },
  { id: 'data',      title: 'Data & Variables', to: 'profile',          icon: <DataIcon />,      keywords: 'fixtures selectors variables credentials profile' },
  { id: 'reports',   title: 'Reports',          to: 'reports/failures', icon: <ReportsIcon />,   keywords: 'failures compare docs analytics' },
  { id: 'settings',  title: 'Settings',         to: 'integrations',     icon: <SettingsIcon />,  keywords: 'integrations runners tools github slack' },
]

const ACCOUNT_ITEMS: Array<{
  title: string
  path: string
  to: string
  icon: React.ReactNode
  keywords?: string
}> = [
  { title: 'Dashboard', path: '/ Account',            to: '/account',          icon: <DashboardIcon />,                                 keywords: 'home overview metrics' },
  { title: 'Settings',  path: '/ Account / Settings', to: '/account/settings', icon: <SettingsIcon />,                                  keywords: 'profile preferences' },
  { title: 'Team',      path: '/ Account / Settings', to: '/account/settings?tab=organization', icon: <Users className="w-5 h-5" fill="currentColor" />, keywords: 'team members people organization invite' },
  { title: 'Billing',   path: '/ Account / Billing',  to: '/account/billing',  icon: <CreditCard className="w-5 h-5" />,                keywords: 'invoice plan subscription card' },
]

const STATUS_FILTERS: Array<{ id: string; label: string; statuses: string[]; keywords: string }> = [
  { id: 'failed',  label: 'Failed',  statuses: ['fail', 'bug', 'failed_real_bug', 'selectors_fix_needed'], keywords: 'failed failing fail broken bug' },
  { id: 'passed',  label: 'Passed',  statuses: ['pass'],    keywords: 'passed passing pass green' },
  { id: 'flaky',   label: 'Flaky',   statuses: ['flake'],   keywords: 'flaky flake unstable' },
  { id: 'running', label: 'Running', statuses: ['running'], keywords: 'running in progress' },
]

function flowStatusKeywords(status: string): string {
  const f = STATUS_FILTERS.find((s) => s.statuses.includes(status))
  return f ? f.keywords : status
}

function KeyChip({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex h-8 items-center justify-center rounded-[8px] border border-[#A4A4A4] text-[#A4A4A4] ${className}`}
    >
      {children}
    </span>
  )
}

export default function CommandPalette({ open, onClose, projects }: CommandPaletteProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [flowCats, setFlowCats] = useState<FlowCategory[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const currentProject = useMemo(() => {
    const match = location.pathname.match(/^\/workspace\/([^/]+)/)
    if (!match) return null
    return projects.find((p) => p.slug === match[1] || p.id === match[1]) ?? projects[0] ?? null
  }, [location.pathname, projects])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])

  useEffect(() => {
    if (!open || !currentProject) {
      setFlowCats([])
      return
    }
    let cancelled = false
    fetchFlows(currentProject.id).then((cats) => { if (!cancelled) setFlowCats(cats ?? []) }).catch(() => {})
    return () => { cancelled = true }
  }, [open, currentProject])

  const items = useMemo(() => {
    const list: PaletteItem[] = []
    const q = query.trim().toLowerCase()

    if (currentProject) {
      for (const n of NAV_ITEMS) {
        list.push({
          id: `nav:${n.id}`,
          section: 'Go To',
          title: n.title,
          path: `/ ${currentProject.name} / ${n.title}`,
          icon: n.icon,
          keywords: `navigate go ${n.keywords ?? ''}`,
          action: () => {
            navigate(`/workspace/${currentProject.slug}/${n.to}`)
            onClose()
          },
        })
      }

      if (q) {
        for (const cat of flowCats) {
          for (const f of cat.flows) {
            list.push({
              id: `flow:${f.id}`,
              section: 'Flows',
              title: f.name,
              path: `/ ${currentProject.name} / Flows / ${f.category}`,
              icon: <FlowsIcon />,
              keywords: `flow ${f.category} ${f.status} ${flowStatusKeywords(f.status)}`,
              action: () => {
                navigate(`/workspace/${currentProject.slug}/automate?flowId=${f.id}`)
                onClose()
              },
            })
          }
        }
      }
    }

    for (const p of projects) {
      list.push({
        id: `switch:${p.id}`,
        section: 'Switch Workspace',
        title: p.name,
        path: `/ ${p.name} / Flows`,
        icon: <FlowsIcon />,
        keywords: `project workspace switch open ${p.slug}`,
        action: () => {
          navigate(`/workspace/${p.slug}/flows`)
          onClose()
        },
      })
    }
    for (const a of ACCOUNT_ITEMS) {
      list.push({
        id: `acc:${a.to}`,
        section: 'Account',
        title: a.title,
        path: a.path,
        icon: a.icon,
        keywords: a.keywords,
        action: () => {
          navigate(a.to)
          onClose()
        },
      })
    }
    return list
  }, [projects, currentProject, flowCats, query, navigate, onClose])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) =>
      `${it.section} ${it.title} ${it.path} ${it.keywords ?? ''}`.toLowerCase().includes(q),
    )
  }, [items, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (activeIndex >= filtered.length) setActiveIndex(0)
  }, [filtered.length, activeIndex])

  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        filtered[activeIndex]?.action()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, activeIndex, onClose])

  if (!open) return null

  const sections = ['Go To', 'Flows', 'Switch Workspace', 'Account']

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[15vh] font-display"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" />
      <div
        className="relative flex w-full max-w-[640px] max-h-[80vh] flex-col overflow-hidden rounded-[16px] border border-[#CCCCCC]/60 bg-[#F8F8F8] shadow-pop font-medium"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className="flex h-16 shrink-0 items-center border-b border-[#CCCCCC] pl-6 pr-4">
          <Search className="h-6 w-6 shrink-0 text-[#1C1C1C]" strokeWidth={2} />
          <span className="mx-3 h-6 w-px shrink-0 bg-[#1C1C1C]" />
          <div className="mr-4 flex-1 self-center border-b border-[#A4A4A4]">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="block w-full h-[31px] leading-[31px] !bg-transparent !border-0 !shadow-none focus:!shadow-none text-[16px] !text-[#1C1C1C] outline-none placeholder:!text-[#1C1C1C]/60"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-14 shrink-0 items-center justify-center rounded-[8px] border border-[#CCCCCC] bg-[#A4A4A4] text-[12px] text-white"
          >
            ESC
          </button>
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto px-3 pb-3">
          {filtered.length === 0 && (
            <div className="px-3 py-8 text-center text-[12px] text-[#606060]">
              No results{query ? ` for "${query}"` : ''}
            </div>
          )}
          {sections.map((section) => {
            const sectionItems = filtered.filter((it) => it.section === section)
            if (!sectionItems.length) return null
            return (
              <div key={section}>
                <div className="px-3 pt-4 pb-2 text-[12px] tracking-wide text-[#606060]">{section}</div>
                {sectionItems.map((it) => {
                  const idx = filtered.indexOf(it)
                  const active = idx === activeIndex
                  return (
                    <button
                      key={it.id}
                      type="button"
                      data-active={active}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => it.action()}
                      className={`flex w-full items-center gap-3 rounded-[8px] px-3 py-3 text-left ${active ? 'bg-accent-200' : ''}`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center text-[#1C1C1C]">
                        {it.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[16px] leading-5 text-[#1C1C1C]">{it.title}</span>
                        <span className="block truncate text-[12px] leading-4 text-ink-500">{it.path}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className="flex h-14 shrink-0 items-center gap-3 border-t border-[#CCCCCC] px-4 text-[16px] text-[#A4A4A4]">
          <KeyChip className="w-12 gap-0.5">
            <ChevronUp className="h-4 w-4" />
            <ChevronDown className="h-4 w-4" />
          </KeyChip>
          <span>navigation</span>
          <KeyChip className="w-8">
            <CornerDownLeft className="h-4 w-4" />
          </KeyChip>
          <span>open</span>
          <span className="flex-1" />
          <KeyChip className="w-16 gap-1 text-[13px]">
            <Command className="h-3.5 w-3.5" />
            <span>+</span>
            <span>K</span>
          </KeyChip>
          <span>toggle</span>
        </div>
      </div>
    </div>
  )
}
