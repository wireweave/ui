import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader, PageSection } from '../components/page-header';
import { Button } from '../components/button';
import { Plus } from 'lucide-react';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-50 p-6 min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'API Keys',
    description: 'Manage your API keys for accessing Wireweave services',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Projects',
    description: 'Manage your wireframe projects',
    actions: (
      <Button>
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    ),
  },
};

export const WithMultipleActions: Story = {
  args: {
    title: 'Wireframes',
    description: 'All your wireframe designs in one place',
    actions: (
      <>
        <Button variant="outline">Import</Button>
        <Button>
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </>
    ),
  },
};

export const PageSectionExample: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences"
      />
      <PageSection title="Profile" description="Update your personal information">
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-600">Profile settings form would go here</p>
        </div>
      </PageSection>
      <PageSection title="Notifications" description="Configure how you receive notifications">
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-600">Notification settings would go here</p>
        </div>
      </PageSection>
    </div>
  ),
};
