import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { NotificationSchema } from '@/models/notification/notification'
import { useNotificationStore } from '@/stores/notification'

describe('useNotificationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('reads reversed items through getItemByIndex via getItems', () => {
    const store = useNotificationStore()
    store.items = [
      NotificationSchema.parse({
        message: 'older',
        time: '2026-01-01T00:00:00+00:00',
      }),
      NotificationSchema.parse({
        message: 'newer',
        time: '2026-02-01T00:00:00+00:00',
      }),
    ]

    expect(store.getItems[0]?.message).toBe('newer')
    expect(store.getItemByIndex(0)?.message).toBe('newer')
    expect(store.getItemByIndex(99)).toBeNull()
  })
})
