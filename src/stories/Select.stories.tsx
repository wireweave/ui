import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[260px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose a project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="checkout">Checkout flow</SelectItem>
          <SelectItem value="onboarding">Onboarding</SelectItem>
          <SelectItem value="dashboard">Dashboard</SelectItem>
          <SelectItem value="settings">Settings</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
