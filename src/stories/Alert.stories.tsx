import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertInline } from '../components/alert';
import { useState } from 'react';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please review your settings before proceeding.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'An error occurred while processing your request.',
  },
};

export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Getting Started',
    children: 'Use your API key to authenticate requests to the Wireweave MCP server. Include your key in the request headers.',
  },
};

export const Dismissible: StoryObj = {
  render: function DismissibleAlert() {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)]"
        >
          Show Alert
        </button>
      );
    }

    return (
      <Alert
        variant="warning"
        title="Attention Required"
        dismissible
        onDismiss={() => setVisible(false)}
      >
        Your API key will expire in 7 days. Please renew it to continue using the service.
      </Alert>
    );
  },
};

export const AllVariants: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Information">
        This is an informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Operation completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review before proceeding.
      </Alert>
      <Alert variant="error" title="Error">
        Something went wrong.
      </Alert>
    </div>
  ),
};

export const InlineAlerts: StoryObj = {
  render: () => (
    <div className="space-y-2">
      <AlertInline variant="error">This field is required</AlertInline>
      <AlertInline variant="warning">Password is too weak</AlertInline>
      <AlertInline variant="success">Username is available</AlertInline>
      <AlertInline variant="info">Enter at least 8 characters</AlertInline>
    </div>
  ),
};
