import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../components/separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[320px]">
      <p className="text-sm font-medium">Project settings</p>
      <p className="text-sm text-[var(--color-muted-foreground)]">
        Manage workspace defaults and access.
      </p>
      <Separator className="my-4" />
      <div className="flex items-center gap-4 text-sm text-[var(--color-muted-foreground)]">
        <span>Docs</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Releases</span>
        <Separator orientation="vertical" className="h-4" />
        <span>Pricing</span>
      </div>
    </div>
  ),
};
