import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="contacts">Contacts</TabsTrigger>
        <TabsTrigger value="deals">Deals</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-muted-foreground">
          Tabs are a horizontal navigation primitive used to switch between
          panels of related content within the same view.
        </p>
      </TabsContent>
      <TabsContent value="contacts">
        <p className="text-muted-foreground">Each tab renders a single panel.</p>
      </TabsContent>
      <TabsContent value="deals">
        <p className="text-muted-foreground">Pair Tabs with cards or tables for dense layouts.</p>
      </TabsContent>
      <TabsContent value="activity">
        <p className="text-muted-foreground">Use Tabs for content shifting, not navigation between pages.</p>
      </TabsContent>
    </Tabs>
  ),
};
