import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/card';
import { Button } from '../components/button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area. You can put any content here.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px] p-4">
      <p>Simple card with just content.</p>
    </Card>
  ),
};

export const WithStats: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Card className="p-5">
        <div className="text-sm text-muted-foreground mb-2">Total Revenue</div>
        <div className="text-2xl font-bold">$124,500</div>
        <div className="text-xs text-[var(--color-green-600)] mt-1">+12.5% from last month</div>
      </Card>
      <Card className="p-5">
        <div className="text-sm text-muted-foreground mb-2">Active Deals</div>
        <div className="text-2xl font-bold">48</div>
        <div className="text-xs text-[var(--color-green-600)] mt-1">+8 new this week</div>
      </Card>
      <Card className="p-5">
        <div className="text-sm text-muted-foreground mb-2">Conversion Rate</div>
        <div className="text-2xl font-bold">24.5%</div>
        <div className="text-xs text-[var(--color-red-600)] mt-1">-2.3% from last month</div>
      </Card>
      <Card className="p-5">
        <div className="text-sm text-muted-foreground mb-2">Active Users</div>
        <div className="text-2xl font-bold">1,234</div>
        <div className="text-xs text-[var(--color-green-600)] mt-1">+5.2% from last month</div>
      </Card>
    </div>
  ),
};
