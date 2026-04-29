import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from '../components/code-block';

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

const sample = `screen "Login" {
  card {
    title "Welcome back"
    input email
    input password
    button "Sign in" primary
  }
}`;

export const Default: Story = {
  render: () => (
    <div className="w-[520px]">
      <CodeBlock filename="login.wf">
        <pre className="text-[13px] text-[#e1e4e8] p-4 leading-relaxed">{sample}</pre>
      </CodeBlock>
    </div>
  ),
};
