import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, ThemeToggle, useTheme } from '../components/theme';

/**
 * `ThemeToggle` 은 `<ThemeProvider>` 내부에서만 동작한다.
 * 이 스토리들은 자체 `ThemeProvider` 로 감싸 Storybook toolbar 와 독립적으로 동작한다.
 *
 * 토글을 누르면 `localStorage['wireweave-theme']` 에 영속되며 페이지 새로고침에도 유지된다.
 * 다크모드일 때 `html.dark` 클래스가 붙어 모든 `--color-*` 시맨틱 토큰이 인버전된다.
 */
const meta: Meta<typeof ThemeToggle> = {
  title: 'Theme/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    withSystem: {
      control: 'boolean',
      description: 'true 면 light → dark → system 3-way cycle. false 면 light ↔ dark 2-way 토글.',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const TwoWay: Story = {
  args: {
    withSystem: false,
    size: 'md',
  },
};

export const ThreeWay: Story = {
  args: {
    withSystem: true,
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    withSystem: true,
    size: 'sm',
  },
};

function ThemeReadout() {
  const { theme, resolvedTheme } = useTheme();
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-sm">
      <div>
        <span className="text-[var(--color-muted-foreground)]">user mode:</span>{' '}
        <code className="font-mono text-[var(--color-foreground)]">{theme}</code>
      </div>
      <div>
        <span className="text-[var(--color-muted-foreground)]">resolved:</span>{' '}
        <code className="font-mono text-[var(--color-foreground)]">{resolvedTheme}</code>
      </div>
    </div>
  );
}

export const SideBySide: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-8 text-[var(--color-foreground)]">
      <div className="flex items-center gap-3">
        <span className="text-sm text-[var(--color-muted-foreground)]">2-way</span>
        <ThemeToggle />
        <span className="text-sm text-[var(--color-muted-foreground)]">3-way</span>
        <ThemeToggle withSystem />
      </div>
      <ThemeReadout />
      <p className="max-w-xs text-center text-xs text-[var(--color-muted-foreground)]">
        토글을 누르면 `localStorage` 에 영속되며 페이지를 새로고침해도 유지된다.
      </p>
    </div>
  ),
};
