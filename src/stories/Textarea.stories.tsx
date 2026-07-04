import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '../components/textarea'
import { Label } from '../components/label'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[420px] space-y-1.5">
      <Label htmlFor="notes">Wireframe notes</Label>
      <Textarea id="notes" rows={4} placeholder="Describe what this screen should do…" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[420px]">
      <Textarea disabled value="Read-only review comment." />
    </div>
  ),
}
