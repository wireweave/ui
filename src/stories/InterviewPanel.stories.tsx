import type { Meta, StoryObj } from '@storybook/react'
import {
  InterviewPanel,
  InterviewPanelHeader,
  InterviewMessageList,
  InterviewMessage,
  InterviewQuestionCard,
  InterviewPanelInput,
} from '../components/interview-panel'
import { Button } from '../components/button'
import { Textarea } from '../components/textarea'

const meta: Meta<typeof InterviewPanel> = {
  title: 'Panels/InterviewPanel',
  component: InterviewPanel,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="h-[640px] max-w-lg">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof InterviewPanel>

export const InProgress: Story = {
  render: () => (
    <InterviewPanel label="Product interview">
      <InterviewPanelHeader title="Product interview" progress={{ answered: 5, total: 12 }} />
      <InterviewMessageList>
        <InterviewMessage from="agent">
          Let&apos;s map out your billing domain. Who are the primary users of the invoicing
          feature?
        </InterviewMessage>
        <InterviewMessage from="user">
          Workspace owners and finance managers. Owners create invoices, finance managers review and
          export them.
        </InterviewMessage>
        <InterviewMessage from="agent">
          Got it. Do finance managers need approval rights before an invoice is sent?
        </InterviewMessage>
        <InterviewMessage from="user">
          Yes — invoices above a configurable threshold require a second approval.
        </InterviewMessage>
        <InterviewMessage from="agent">
          That sounds like an invariant. Should the threshold be per-workspace or per-plan?
        </InterviewMessage>
        <InterviewMessage from="user">Per-workspace, with a plan-level default.</InterviewMessage>
        <InterviewQuestionCard
          question="Which screens does the approval flow need?"
          hint="Think about where the approver sees pending invoices and where the requester tracks status."
          actions={
            <>
              <Button variant="ghost" size="sm">
                Skip
              </Button>
              <Button variant="primary" size="sm">
                Next
              </Button>
            </>
          }
        >
          <Textarea placeholder="e.g. Pending approvals list, invoice detail with approve action…" />
        </InterviewQuestionCard>
      </InterviewMessageList>
      <InterviewPanelInput>
        <div className="flex items-end gap-2">
          <Textarea placeholder="Type your answer…" className="min-h-[44px]" rows={1} />
          <Button variant="primary">Send</Button>
        </div>
      </InterviewPanelInput>
    </InterviewPanel>
  ),
}

export const EmptyStart: Story = {
  render: () => (
    <InterviewPanel label="Product interview">
      <InterviewPanelHeader title="Product interview" progress={{ answered: 0, total: 12 }} />
      <InterviewMessageList>
        <InterviewQuestionCard
          question="What product or feature are we mapping today?"
          hint="A one-line summary is enough to get started."
        >
          <Textarea placeholder="Describe it in a sentence…" />
        </InterviewQuestionCard>
      </InterviewMessageList>
      <InterviewPanelInput>
        <div className="flex items-end gap-2">
          <Textarea placeholder="Type your answer…" className="min-h-[44px]" rows={1} />
          <Button variant="primary">Send</Button>
        </div>
      </InterviewPanelInput>
    </InterviewPanel>
  ),
}

export const MessageVariants: Story = {
  render: () => (
    <InterviewPanel label="Message variants" className="h-auto">
      <InterviewMessageList className="flex-none">
        <InterviewMessage from="agent">Agent message — left, card tone.</InterviewMessage>
        <InterviewMessage from="user">User message — right, primary tone.</InterviewMessage>
      </InterviewMessageList>
    </InterviewPanel>
  ),
}
