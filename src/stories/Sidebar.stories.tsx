import type { Meta, StoryObj } from '@storybook/react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  SidebarUser,
  SidebarMain,
} from '../components/sidebar';
import { ThemeProvider, ThemeToggle } from '../components/theme';
import {
  Home,
  FolderOpen,
  FileCode,
  Key,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
} from 'lucide-react';

/**
 * Storybook toolbar 의 라이트/다크 토글로 사이드바가 페이지 배경 반대 톤으로 인버전 되는지 확인할 수 있다.
 * 모든 색상은 `--color-sidebar-*` 시맨틱 토큰을 거치며, 컴포넌트 내부에서 팔레트를 직접 참조하지 않는다.
 */
const meta: Meta = {
  title: 'Layout/Sidebar',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

const navItems = (
  <>
    <SidebarSection title="Workspace">
      <SidebarItem href="#" icon={Home} active>
        Overview
      </SidebarItem>
      <SidebarItem href="#" icon={FolderOpen}>
        Projects
      </SidebarItem>
      <SidebarItem href="#" icon={FileCode}>
        Wireframes
      </SidebarItem>
    </SidebarSection>
    <SidebarSection title="Developer">
      <SidebarItem href="#" icon={Key}>
        API Keys
      </SidebarItem>
      <SidebarItem href="#" icon={BarChart3}>
        Usage
      </SidebarItem>
    </SidebarSection>
    <SidebarSection title="Account">
      <SidebarItem href="#" icon={CreditCard}>
        Billing
      </SidebarItem>
      <SidebarItem href="#" icon={Settings}>
        Settings
      </SidebarItem>
    </SidebarSection>
  </>
);

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
    {children}
  </div>
);

export const Default: StoryObj = {
  render: () => (
    <SidebarProvider>
      <Frame>
        <Sidebar>
          <SidebarHeader title="Wireweave" />
          <SidebarContent>{navItems}</SidebarContent>
          <SidebarFooter>
            <SidebarUser name="John Doe" email="john@example.com" avatarFallback="JD" />
            <SidebarItem href="#" icon={LogOut}>
              Sign out
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>
        <SidebarMain>
          <header className="flex items-center justify-between border-b border-[var(--color-border)] px-8 py-4">
            <h1 className="text-xl font-semibold">Main Content</h1>
            <ThemeToggle withSystem />
          </header>
          <div className="p-8 space-y-4">
            <p className="text-[var(--color-muted-foreground)]">
              Storybook 의 Light/Dark 토글로 페이지 배경을 바꿔보세요. 사이드바 톤이 자동으로
              반대 방향으로 인버전됩니다 (라이트 페이지 → 다크 사이드바, 다크 페이지 → 라이트 사이드바).
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
                <p className="text-sm font-medium">Card</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                  bg-[var(--color-card)] / border-[var(--color-border)]
                </p>
              </div>
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] p-4">
                <p className="text-sm font-medium">Muted</p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                  bg-[var(--color-muted)]
                </p>
              </div>
            </div>
          </div>
        </SidebarMain>
      </Frame>
    </SidebarProvider>
  ),
};

export const Collapsed: StoryObj = {
  render: () => (
    <SidebarProvider defaultCollapsed>
      <Frame>
        <Sidebar>
          <SidebarHeader title="Wireweave" />
          <SidebarContent>
            <SidebarSection title="Workspace">
              <SidebarItem href="#" icon={Home} active>
                Overview
              </SidebarItem>
              <SidebarItem href="#" icon={FolderOpen}>
                Projects
              </SidebarItem>
              <SidebarItem href="#" icon={FileCode}>
                Wireframes
              </SidebarItem>
            </SidebarSection>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem href="#" icon={LogOut}>
              Sign out
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>
        <SidebarMain>
          <div className="p-8">
            <h1 className="text-2xl font-bold">Collapsed Sidebar</h1>
            <p className="mt-2 text-[var(--color-muted-foreground)]">
              The sidebar starts collapsed. Click the expand button on the right edge.
            </p>
          </div>
        </SidebarMain>
      </Frame>
    </SidebarProvider>
  ),
};

export const WithAvatar: StoryObj = {
  render: () => (
    <SidebarProvider>
      <Frame>
        <Sidebar>
          <SidebarHeader title="Wireweave" />
          <SidebarContent>
            <SidebarSection title="Navigation">
              <SidebarItem href="#" icon={Home} active>
                Dashboard
              </SidebarItem>
              <SidebarItem href="#" icon={Settings}>
                Settings
              </SidebarItem>
            </SidebarSection>
          </SidebarContent>
          <SidebarFooter>
            <SidebarUser
              name="Jane Smith"
              email="jane.smith@example.com"
              avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=jane"
            />
          </SidebarFooter>
        </Sidebar>
        <SidebarMain>
          <div className="p-8">
            <h1 className="text-2xl font-bold">User Avatar</h1>
            <p className="mt-2 text-[var(--color-muted-foreground)]">
              사이드바 아바타와 유저 정보 표시.
            </p>
          </div>
        </SidebarMain>
      </Frame>
    </SidebarProvider>
  ),
};
