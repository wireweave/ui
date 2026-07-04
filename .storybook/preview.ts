import type { Preview, Decorator } from '@storybook/react'
import React from 'react'
import '../src/styles/index.css'

// The hook lives in a real PascalCase component so react-hooks/rules-of-hooks
// recognizes it as a component (Storybook decorators are render functions but
// are invoked as components in the React tree).
const ThemeDecorator: React.FC<{ theme: 'light' | 'dark'; Story: React.ComponentType }> = ({
  theme,
  Story,
}) => {
  React.useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    document.body.style.background = 'var(--color-background)'
  }, [theme])

  return React.createElement(
    'div',
    {
      className: `${theme} min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-6`,
    },
    React.createElement(Story, null),
  )
}

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as 'light' | 'dark'
  return React.createElement(ThemeDecorator, { theme, Story })
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light / Dark theme toggle',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
  decorators: [withTheme],
}

export default preview
