import type { Component } from 'vue'

export interface BoardComponentDefinition {
  type: string
  name: string
  component: Component
  description?: string
}