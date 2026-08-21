import type { Component } from 'vue'

export interface LayoutComponentDefinition {
  type: string
  name: string
  component: Component
  description?: string
}