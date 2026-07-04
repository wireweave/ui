import type { Meta, StoryObj } from '@storybook/react'
import {
  NodeDetailPanel,
  NodeDetailPanelHeader,
  NodeDetailPanelBody,
  NodeDetailPanelSection,
  NodeDetailPanelEdges,
  NodeDetailPanelFooter,
} from '../components/node-detail-panel'
import { Badge } from '../components/badge'
import { Button } from '../components/button'

const meta: Meta<typeof NodeDetailPanel> = {
  title: 'Panels/NodeDetailPanel',
  component: NodeDetailPanel,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="h-[560px] max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NodeDetailPanel>

const screenEdges = [
  { id: 'e1', label: 'belongs to', targetLabel: 'Billing Domain', kind: 'Domain' },
  { id: 'e2', label: 'renders', targetLabel: 'GET /api/invoices', kind: 'Endpoint' },
  { id: 'e3', label: 'guarded by', targetLabel: 'Plan limit invariant', kind: 'Invariant' },
  { id: 'e4', label: 'entry of', targetLabel: 'Checkout flow', kind: 'Flow' },
]

export const ScreenNode: Story = {
  render: () => (
    <NodeDetailPanel label="Invoice List Screen">
      <NodeDetailPanelHeader
        kind="Screen"
        title="Invoice List Screen"
        meta="ssot://billing/screens/invoice-list"
        onClose={() => {}}
      />
      <NodeDetailPanelBody>
        <NodeDetailPanelSection title="Description">
          <p className="text-sm text-[var(--color-foreground)]">
            Paginated list of invoices for the current workspace. Supports filtering by status and
            date range, and links into the invoice detail screen.
          </p>
        </NodeDetailPanelSection>
        <NodeDetailPanelSection title="Status">
          <div className="flex items-center gap-2">
            <Badge variant="success">verified</Badge>
            <span className="text-xs text-[var(--color-muted-foreground)]">
              last updated 2 days ago
            </span>
          </div>
        </NodeDetailPanelSection>
        <NodeDetailPanelSection title="Connections">
          <NodeDetailPanelEdges
            edges={screenEdges}
            onEdgeClick={(id) => {
              console.warn(`edge clicked: ${id}`)
            }}
          />
        </NodeDetailPanelSection>
      </NodeDetailPanelBody>
      <NodeDetailPanelFooter>
        <Button variant="outline" size="sm">
          Open in graph
        </Button>
        <Button variant="primary" size="sm">
          Edit node
        </Button>
      </NodeDetailPanelFooter>
    </NodeDetailPanel>
  ),
}

export const EmptyEdges: Story = {
  render: () => (
    <NodeDetailPanel label="Payment Concept">
      <NodeDetailPanelHeader kind="Concept" title="Payment Concept" onClose={() => {}} />
      <NodeDetailPanelBody>
        <NodeDetailPanelSection title="Description">
          <p className="text-sm text-[var(--color-foreground)]">
            A freshly created node without any relations yet.
          </p>
        </NodeDetailPanelSection>
        <NodeDetailPanelSection title="Connections">
          <NodeDetailPanelEdges edges={[]} />
        </NodeDetailPanelSection>
      </NodeDetailPanelBody>
    </NodeDetailPanel>
  ),
}

export const KindBadges: Story = {
  render: () => (
    <NodeDetailPanel label="Kind badge palette" className="h-auto">
      <NodeDetailPanelBody>
        <NodeDetailPanelSection title="Kind → Badge mapping">
          <NodeDetailPanelEdges
            edges={[
              { id: 'k1', label: 'kind', targetLabel: 'Wireweave', kind: 'Platform' },
              { id: 'k2', label: 'kind', targetLabel: 'Solo builder', kind: 'Persona' },
              { id: 'k3', label: 'kind', targetLabel: 'Billing', kind: 'Domain' },
              { id: 'k4', label: 'kind', targetLabel: 'Wireframe', kind: 'Concept' },
              { id: 'k5', label: 'kind', targetLabel: 'Rendering', kind: 'Capability' },
              { id: 'k6', label: 'kind', targetLabel: 'api-server', kind: 'SystemComponent' },
              { id: 'k7', label: 'kind', targetLabel: 'Paddle webhook', kind: 'Integration' },
              { id: 'k8', label: 'kind', targetLabel: 'Plan limit', kind: 'Invariant' },
              { id: 'k9', label: 'kind', targetLabel: 'OIDC publish', kind: 'Decision' },
              { id: 'k10', label: 'kind', targetLabel: 'Invoice list', kind: 'Screen' },
              { id: 'k11', label: 'kind', targetLabel: 'GET /invoices', kind: 'Endpoint' },
              { id: 'k12', label: 'kind', targetLabel: 'Checkout', kind: 'Flow' },
            ]}
          />
        </NodeDetailPanelSection>
      </NodeDetailPanelBody>
    </NodeDetailPanel>
  ),
}
