import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState, EmptyStateAction } from '../components/empty-state';
import { Button } from '../components/button';
import { Key, FolderOpen, FileCode, Search, Inbox, Plus } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-50 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: Key,
    title: 'No API keys yet',
    description: 'Create your first API key to start using Wireweave services',
  },
};

export const WithAction: Story = {
  args: {
    icon: FolderOpen,
    title: 'No projects',
    description: 'Get started by creating a new project',
    action: (
      <Button>
        <Plus className="h-4 w-4" />
        Create Project
      </Button>
    ),
  },
};

export const CardVariant: Story = {
  args: {
    variant: 'card',
    icon: FileCode,
    title: 'No wireframes',
    description: 'Create your first wireframe to get started',
    action: (
      <Button>
        <Plus className="h-4 w-4" />
        New Wireframe
      </Button>
    ),
  },
};

export const DashedVariant: Story = {
  args: {
    variant: 'dashed',
    icon: Inbox,
    title: 'Drop files here',
    description: 'or click to browse from your computer',
  },
};

export const SearchNoResults: Story = {
  args: {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for',
    action: (
      <Button variant="outline">Clear filters</Button>
    ),
  },
};

export const AllVariants: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <EmptyState
        icon={Key}
        title="Default variant"
        description="Simple empty state without any wrapper styling"
      />
      <EmptyState
        variant="card"
        icon={FolderOpen}
        title="Card variant"
        description="Empty state with card shadow"
        action={<Button>Take Action</Button>}
      />
      <EmptyState
        variant="dashed"
        icon={Inbox}
        title="Dashed variant"
        description="Commonly used for drop zones"
      />
    </div>
  ),
};

export const WithCustomAction: StoryObj = {
  render: () => (
    <EmptyState
      variant="card"
      icon={Key}
      title="No API keys"
      description="Create an API key to authenticate your requests"
      action={
        <EmptyStateAction icon={Plus}>
          Create API Key
        </EmptyStateAction>
      }
    />
  ),
};
