import { posthog } from '@/lib/posthog'

type LogAttributes = Record<string, boolean | number | string>

export const posthogLogs = {
  info(body: string, attributes?: LogAttributes) {
    posthog?.logger.info(body, attributes)
  },
}
