import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCellText,
  TableActions,
} from '../components/table';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Trash2, Edit2, MoreHorizontal, Key } from 'lucide-react';

const meta: Meta = {
  title: 'Data Display/Table',
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-50 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;

const apiKeys = [
  { id: '1', name: 'Production API', keyPrefix: 'sk-prod-****', tier: 'pro', status: 'active', created: 'Jan 15, 2024', lastUsed: '2 hours ago' },
  { id: '2', name: 'Development API', keyPrefix: 'sk-dev-****', tier: 'free', status: 'active', created: 'Jan 10, 2024', lastUsed: 'Yesterday' },
  { id: '3', name: 'Test API Key', keyPrefix: 'sk-test-****', tier: 'basic', status: 'revoked', created: 'Dec 20, 2023', lastUsed: 'Never' },
];

export const Default: StoryObj = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Key</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Last Used</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apiKeys.map((key) => (
          <TableRow key={key.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-gray-400" />
                <TableCellText variant="primary">{key.name}</TableCellText>
              </div>
            </TableCell>
            <TableCell>
              <code className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-800">
                {key.keyPrefix}
              </code>
            </TableCell>
            <TableCell>
              <Badge variant={key.tier === 'pro' ? 'default' : key.tier === 'basic' ? 'secondary' : 'outline'}>
                {key.tier}
              </Badge>
            </TableCell>
            <TableCell>
              <TableCellText variant="muted">{key.created}</TableCellText>
            </TableCell>
            <TableCell>
              <TableCellText variant="muted">{key.lastUsed}</TableCellText>
            </TableCell>
            <TableCell>
              <Badge variant={key.status === 'active' ? 'success' : 'destructive'}>
                {key.status}
              </Badge>
            </TableCell>
            <TableActions>
              {key.status === 'active' && (
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-[var(--color-destructive)]" />
                </Button>
              )}
            </TableActions>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive' },
];

export const UsersTable: StoryObj = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div>
                <TableCellText variant="primary">{user.name}</TableCellText>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.status === 'active' ? 'success' : 'outline'}>
                {user.status}
              </Badge>
            </TableCell>
            <TableActions>
              <Button variant="ghost" size="sm">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableActions>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const SimpleTable: StoryObj = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell><TableCellText variant="primary">Widget A</TableCellText></TableCell>
          <TableCell><TableCellText>$19.99</TableCellText></TableCell>
          <TableCell><TableCellText variant="muted">In Stock</TableCellText></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><TableCellText variant="primary">Widget B</TableCellText></TableCell>
          <TableCell><TableCellText>$29.99</TableCellText></TableCell>
          <TableCell><TableCellText variant="muted">Low Stock</TableCellText></TableCell>
        </TableRow>
        <TableRow>
          <TableCell><TableCellText variant="primary">Widget C</TableCellText></TableCell>
          <TableCell><TableCellText>$39.99</TableCellText></TableCell>
          <TableCell><TableCellText variant="muted">Out of Stock</TableCellText></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
