// [lesson] Vite only exposes env vars prefixed with VITE_ to client code.
// Read them in a module (ES module context), never directly in a Vue template.
export function isDebugModeOn(): boolean {
  return import.meta.env.VITE_DEBUG_MODE_ON === 'true'
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $isDebugModeOn: typeof isDebugModeOn
  }
}
