import type { Meta, StoryObj } from '@storybook/react';
import { StatCard, StatCardGrid } from '../components/stat-card';
import { Key, TrendingUp, Activity, Users, DollarSign, ShoppingCart } from 'lucide-react';

const meta: Meta<typeof StatCard> = {
  title: 'Data Display/StatCard',
  component: StatCard,
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
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    title: 'Active API Keys',
    value: 5,
    icon: Key,
    iconColor: 'blue',
  },
};

export const WithChange: Story = {
  args: {
    title: "This Month's Requests",
    value: 12500,
    icon: TrendingUp,
    iconColor: 'green',
    change: {
      value: '+12%',
      trend: 'up',
    },
  },
};

export const DownTrend: Story = {
  args: {
    title: "Today's Usage",
    value: 342,
    icon: Activity,
    iconColor: 'red',
    change: {
      value: '-5%',
      trend: 'down',
    },
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Total Users',
    value: '2,438',
    icon: Users,
    iconColor: 'purple',
    footer: <a href="#" className="text-sm text-[var(--color-blue-600)] hover:underline">View all users →</a>,
  },
};

export const AllColors: StoryObj = {
  render: () => (
    <StatCardGrid columns={3}>
      <StatCard title="Blue" value={100} icon={Key} iconColor="blue" />
      <StatCard title="Green" value={200} icon={TrendingUp} iconColor="green" />
      <StatCard title="Purple" value={300} icon={Activity} iconColor="purple" />
      <StatCard title="Amber" value={400} icon={Users} iconColor="amber" />
      <StatCard title="Red" value={500} icon={DollarSign} iconColor="red" />
      <StatCard title="Gray" value={600} icon={ShoppingCart} iconColor="gray" />
    </StatCardGrid>
  ),
};

export const DashboardExample: StoryObj = {
  render: () => (
    <StatCardGrid columns={3}>
      <StatCard
        title="Active API Keys"
        value={5}
        icon={Key}
        iconColor="blue"
      />
      <StatCard
        title="This Month's Requests"
        value="45,231"
        icon={TrendingUp}
        iconColor="green"
        change={{ value: '+20%', trend: 'up' }}
      />
      <StatCard
        title="Today's Requests"
        value="1,024"
        icon={Activity}
        iconColor="purple"
        change={{ value: '+5%', trend: 'up' }}
      />
    </StatCardGrid>
  ),
};
