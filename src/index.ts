'use client';

// Wireweave UI Design System - React Components
// Based on Radix UI primitives with Tailwind CSS

// Import styles for CSS extraction
import './styles/index.css';

// Utilities
export { cn } from './lib/utils';

// ============================================
// Core Components
// ============================================

export { Button, buttonVariants } from './components/button';
export type { ButtonProps } from './components/button';

export { Input } from './components/input';
export type { InputProps } from './components/input';

export { Label } from './components/label';
export type { LabelProps } from './components/label';

export { Textarea } from './components/textarea';
export type { TextareaProps } from './components/textarea';

export { Badge, badgeVariants } from './components/badge';
export type { BadgeProps } from './components/badge';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardBody,
} from './components/card';

export { Separator } from './components/separator';
export type { SeparatorProps } from './components/separator';

export { Skeleton } from './components/skeleton';
export type { SkeletonProps } from './components/skeleton';

// ============================================
// Form Components
// ============================================

export { Checkbox } from './components/checkbox';
export type { CheckboxProps } from './components/checkbox';

export { Switch } from './components/switch';
export type { SwitchProps } from './components/switch';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './components/select';

// ============================================
// Navigation Components
// ============================================

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs';
export type { TabsProps, TabsTriggerProps, TabsContentProps } from './components/tabs';

// ============================================
// Overlay Components
// ============================================

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/dialog';

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './components/alert-dialog';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/dropdown-menu';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/tooltip';

// ============================================
// Data Display Components
// ============================================

export { Avatar, AvatarImage, AvatarFallback, avatarVariants } from './components/avatar';
export type { AvatarProps } from './components/avatar';

// ============================================
// Layout Components
// ============================================

export {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarMobile,
  SidebarHeader,
  SidebarContent,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
  SidebarUser,
  SidebarMain,
  SidebarMobileHeader,
} from './components/sidebar';

export { PageHeader, PageSection } from './components/page-header';

export { StatCard, StatCardGrid } from './components/stat-card';

// ============================================
// Table Components
// ============================================

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCellText,
  TableActions,
  TableWrapper,
} from './components/table';

// ============================================
// Feedback Components
// ============================================

export { Alert, AlertInline } from './components/alert';

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  Toaster,
  useToast,
  toast,
} from './components/toast';

export { EmptyState, EmptyStateAction } from './components/empty-state';

// ============================================
// Form Helpers
// ============================================

export {
  FormField,
  FormInput,
  FormTextarea,
  InputWithIcon,
  SearchInput,
} from './components/form-field';

// ============================================
// Code Display Components
// ============================================

export { CodeBlock, CodeBlockHeader } from './components/code-block';

// ============================================
// Theme System
// ============================================

export {
  ThemeProvider,
  useTheme,
  ThemeToggle,
} from './components/theme';
export type { ThemeMode, ResolvedTheme } from './components/theme';

// `getThemeInitScript` 는 server-safe 전용 entry — `import { getThemeInitScript } from '@wireweave/ui/server'`
