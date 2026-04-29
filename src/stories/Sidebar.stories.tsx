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
import { Home, FolderOpen, FileCode, Key, BarChart3, CreditCard, Settings, LogOut, Menu } from 'lucide-react';

const meta: Meta = {
  title: 'Layout/Sidebar',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
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
          </SidebarContent>
          <SidebarFooter>
            <SidebarUser
              name="John Doe"
              email="john@example.com"
              avatarFallback="JD"
            />
            <SidebarItem href="#" icon={LogOut}>
              Sign out
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>
        <SidebarMain>
          <div className="p-8">
            <h1 className="text-2xl font-bold">Main Content</h1>
            <p className="mt-2 text-gray-600">
              This is the main content area. The sidebar can be collapsed using the toggle button.
            </p>
          </div>
        </SidebarMain>
      </div>
    </SidebarProvider>
  ),
};

export const Collapsed: StoryObj = {
  render: () => (
    <SidebarProvider defaultCollapsed>
      <div className="flex h-screen bg-gray-100">
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
            <p className="mt-2 text-gray-600">
              The sidebar starts in collapsed state. Click the expand button to show full content.
            </p>
          </div>
        </SidebarMain>
      </div>
    </SidebarProvider>
  ),
};

export const WithAvatar: StoryObj = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
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
            <p className="mt-2 text-gray-600">
              The sidebar shows user information with an avatar at the bottom.
            </p>
          </div>
        </SidebarMain>
      </div>
    </SidebarProvider>
  ),
};
