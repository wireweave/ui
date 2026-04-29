'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { Label } from './label';
import { Input, type InputProps } from './input';
import { Textarea, type TextareaProps } from './textarea';

/**
 * Wireweave UI Form Components
 * 시맨틱/팔레트 변수 기반으로 리팩토링
 */

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

export function FormField({
  className,
  label,
  description,
  error,
  required,
  children,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {label && (
        <Label className="text-sm font-medium text-[var(--color-foreground)]">
          {label}
          {required && <span className="text-[var(--color-destructive)] ml-1">*</span>}
        </Label>
      )}
      {children}
      {description && !error && (
        <p className="text-sm text-[var(--color-muted-foreground)]">{description}</p>
      )}
      {error && <p className="text-sm text-[var(--color-destructive)]">{error}</p>}
    </div>
  );
}

interface FormInputProps extends InputProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  wrapperClassName?: string;
}

export function FormInput({
  label,
  description,
  error,
  required,
  wrapperClassName,
  className,
  ...props
}: FormInputProps) {
  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      className={wrapperClassName}
    >
      <Input
        className={cn(
          error && 'border-[var(--color-destructive)]/40 focus:border-[var(--color-destructive)] focus:ring-[var(--color-destructive)]/10',
          className
        )}
        {...props}
      />
    </FormField>
  );
}

interface FormTextareaProps extends TextareaProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  wrapperClassName?: string;
}

export function FormTextarea({
  label,
  description,
  error,
  required,
  wrapperClassName,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      className={wrapperClassName}
    >
      <Textarea
        className={cn(
          error && 'border-[var(--color-destructive)]/40 focus:border-[var(--color-destructive)] focus:ring-[var(--color-destructive)]/10',
          className
        )}
        {...props}
      />
    </FormField>
  );
}

interface InputWithIconProps extends InputProps {
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
}

export function InputWithIcon({
  className,
  icon: Icon,
  iconPosition = 'left',
  ...props
}: InputWithIconProps) {
  if (!Icon) {
    return <Input className={className} {...props} />;
  }

  return (
    <div className="relative">
      {iconPosition === 'left' && (
        // 시맨틱 변수 사용: text-muted-foreground
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-[var(--color-muted-foreground)]" />
        </div>
      )}
      <Input
        className={cn(
          iconPosition === 'left' && 'pl-10',
          iconPosition === 'right' && 'pr-10',
          className
        )}
        {...props}
      />
      {iconPosition === 'right' && (
        // 시맨틱 변수 사용: text-muted-foreground
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Icon className="h-5 w-5 text-[var(--color-muted-foreground)]" />
        </div>
      )}
    </div>
  );
}

interface SearchInputProps extends Omit<InputProps, 'type'> {
  onSearch?: (value: string) => void;
}

export function SearchInput({
  className,
  onSearch,
  onChange,
  ...props
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative">
      {/* 시맨틱 변수 사용: text-muted-foreground */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-[var(--color-muted-foreground)]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <Input
        type="search"
        className={cn('pl-10', className)}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
