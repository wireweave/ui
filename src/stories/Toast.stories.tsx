import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, useToast } from '../components/toast';
import { Button } from '../components/button';

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Wireframe saved',
            description: 'login.wf was committed to main.',
            variant: 'success',
          })
        }
      >
        Success toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Heads up',
            description: 'You are editing a published wireframe.',
            variant: 'warning',
          })
        }
      >
        Warning toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Render failed',
            description: 'Unknown component "buton" on line 12.',
            variant: 'error',
          })
        }
      >
        Error toast
      </Button>
    </div>
  );
}

const meta: Meta<typeof ToastDemo> = {
  title: 'Components/Toast',
  component: ToastDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <ToastDemo />
      <Toaster />
    </>
  ),
};
