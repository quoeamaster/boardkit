import type { Component } from 'vue'

export type WidgetKind = 'query' | 'markdown' | 'control'

export interface BoardComponentDefinition {
  type: string
  name: string
  component: Component
  description?: string
  kind: WidgetKind
}