import type { Meta, StoryObj } from '@storybook/react';
import {
  FormField,
  FormInput,
  FormTextarea,
  InputWithIcon,
  SearchInput,
} from '../components/form-field';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import { Mail, Lock, User, Search, DollarSign } from 'lucide-react';

const meta: Meta = {
  title: 'Form/FormField',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const BasicFormField: StoryObj = {
  render: () => (
    <FormField label="Email" required>
      <Input type="email" placeholder="Enter your email" />
    </FormField>
  ),
};

export const WithDescription: StoryObj = {
  render: () => (
    <FormField
      label="API Key Name"
      description="Give your API key a memorable name to identify it later"
    >
      <Input placeholder="e.g., Production API Key" />
    </FormField>
  ),
};

export const WithError: StoryObj = {
  render: () => (
    <FormField
      label="Password"
      error="Password must be at least 8 characters"
      required
    >
      <Input type="password" placeholder="Enter password" />
    </FormField>
  ),
};

export const FormInputComponent: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <FormInput
        label="Full Name"
        placeholder="John Doe"
        required
      />
      <FormInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        description="We'll never share your email"
      />
      <FormInput
        label="Username"
        placeholder="johndoe"
        error="This username is already taken"
      />
    </div>
  ),
};

export const FormTextareaComponent: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <FormTextarea
        label="Description"
        placeholder="Enter a description..."
        rows={4}
      />
      <FormTextarea
        label="Bio"
        placeholder="Tell us about yourself"
        description="Max 500 characters"
        required
      />
      <FormTextarea
        label="Notes"
        placeholder="Add notes..."
        error="Notes cannot be empty"
      />
    </div>
  ),
};

export const InputWithIconLeft: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <InputWithIcon
        icon={Mail}
        placeholder="Email address"
        type="email"
      />
      <InputWithIcon
        icon={Lock}
        placeholder="Password"
        type="password"
      />
      <InputWithIcon
        icon={User}
        placeholder="Username"
      />
    </div>
  ),
};

export const InputWithIconRight: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <InputWithIcon
        icon={DollarSign}
        iconPosition="right"
        placeholder="0.00"
        type="number"
      />
    </div>
  ),
};

export const SearchInputComponent: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <SearchInput placeholder="Search..." />
      <SearchInput placeholder="Search projects..." />
      <SearchInput placeholder="Search users..." />
    </div>
  ),
};

export const CompleteForm: StoryObj = {
  render: () => (
    <form className="space-y-6 max-w-md">
      <h2 className="text-lg font-semibold">Create Account</h2>
      <FormInput
        label="Full Name"
        placeholder="John Doe"
        required
      />
      <FormField label="Email" required>
        <InputWithIcon
          icon={Mail}
          placeholder="john@example.com"
          type="email"
        />
      </FormField>
      <FormField label="Password" required>
        <InputWithIcon
          icon={Lock}
          placeholder="••••••••"
          type="password"
        />
      </FormField>
      <FormTextarea
        label="Bio"
        placeholder="Tell us about yourself"
        description="Optional, max 200 characters"
        rows={3}
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)]"
      >
        Create Account
      </button>
    </form>
  ),
};
