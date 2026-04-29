import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components/switch';
import { Label } from '../components/label';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Switch id="notify-default" />
        <Label htmlFor="notify-default">Email notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="notify-on" defaultChecked />
        <Label htmlFor="notify-on">Weekly digest</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="notify-disabled" disabled />
        <Label htmlFor="notify-disabled">Beta features (locked)</Label>
      </div>
    </div>
  ),
};
