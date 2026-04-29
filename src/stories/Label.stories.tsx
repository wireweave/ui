import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../components/label';
import { Input } from '../components/input';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-1.5 w-[320px]">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@wireweave.org" />
    </div>
  ),
};
