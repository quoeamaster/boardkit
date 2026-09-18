import { config } from '@vue/test-utils'

config.global.stubs = {
  // common Vue stubs
}

// It is a file that Vitest executes before the test suite, so you can establish common test infrastructure.
//
// Vitest starts
//      │
//      ▼
// setup.ts
//      │
//      ├── install global mocks
//      ├── configure Vue Test Utils
//      ├── configure test environment
//      └── register common test helpers
//      │
//      ▼
// *.spec.ts