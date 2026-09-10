import { z } from 'zod'

/**
 * Notification Model
 *
 * Defines the validation schema and TypeScript type for application notifications.
 *
 * - time: ISO-8601 timestamp for when the notification was generated.
 * - level: Severity level of the notification ('info', 'warning', 'error'). Defaults to 'info'.
 * - message: Short message shown as notification preview.
 * - details: Additional (optional) content, e.g. stacktrace or expanded explanation.
 * - isRead: Whether the user has marked the notification as read.
 *
 * Usage:
 * 
 *   import { NotificationSchema, type Notification } from './notification'
 *   const result = NotificationSchema.safeParse(notificationData)
 *   if (result.success) {
 *     // result.data is a valid Notification object
 *   }
 */

/**
 * NotificationLevel
 *
 * Enum for notification severity levels.
 * - 'info': Informational message, default severity.
 * - 'warning': A cautionary message indicating a potential issue.
 * - 'error': An error message indicating something went wrong.
 *
 * Usage:
 *   import { NotificationLevel } from './notification'
 *   // Example: NotificationLevel.enum.warning
 */
export const NotificationLevel = z.enum(['info', 'warning', 'error'])

/**
 * Zod-based schema for validating Notification objects.
 *
 * Fields:
 * - time: string  
 *     ISO-8601 timestamp for when the notification was generated.  
 *     Example: "2026-09-10T18:52:00+08:00"  
 *     Default: "1970-01-01T00:00:00+00:00"
 * - level: NotificationLevel  
 *     Severity level of the notification: one of 'info', 'warning', or 'error'.  
 *     Default: 'info'
 * - message: string  
 *     Short message shown as notification preview.  
 *     Default: ""
 * - details: string  
 *     Additional content for the notification (may include stack traces or expanded explanations).  
 *     Default: ""
 * - isRead: boolean  
 *     Marks whether the user has read the notification or not.  
 *     Default: false
 */
export const NotificationSchema = z.object({
    /** ISO-8601 timestamp for when the notification was generated.
     * @example "2026-09-10T18:52:00+08:00" */
    time: z.iso.datetime({ offset: true }).default("1970-01-01T00:00:00+00:00"),
    /** Severity level: 'info', 'warning', or 'error'.
     * @default 'info' */
    level: NotificationLevel.default(NotificationLevel.enum.info),
    /** Short message for the notification, shown as preview.
     * @default "" */
    message: z.string().default(""),
    /** Additional details to show (optional, can be stacktrace or explanation).
     * @default "" */
    details: z.string().default(""),
    /** If the user has marked this notification as read.
     * @default false */
    isRead: z.boolean().default(false),
})

/**
 * TypeScript type for Notification objects.
 */
export type Notification = z.infer<typeof NotificationSchema>
