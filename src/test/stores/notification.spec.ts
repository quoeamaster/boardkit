import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { NotificationSchema } from '@/models/notification/notification'
import { useNotificationStore } from '@/stores/notification'

describe('useNotificationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('keeps items in time-ascending order through getItems and getItemByIndex', () => {
    const store = useNotificationStore()

    store.addItem(
      NotificationSchema.parse({
        message: 'newer',
        time: '2026-02-01T00:00:00+00:00',
      }),
    )
    store.addItem(
      NotificationSchema.parse({
        message: 'older',
        time: '2026-01-01T00:00:00+00:00',
      }),
    )

    expect(store.getItems.map((item) => item.message)).toEqual([
      'older',
      'newer',
    ])
    expect(store.getItemByIndex(0)?.message).toBe('older')
    expect(store.getItemByIndex(1)?.message).toBe('newer')
    expect(store.getItemByIndex(99)).toBeNull()
  })
})
