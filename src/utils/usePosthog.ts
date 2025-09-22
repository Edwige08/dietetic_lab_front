import { usePostHog } from 'posthog-js/react'

export const useAnalytics = () => {
  const posthog = usePostHog()

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    posthog?.capture(eventName, properties)
  }

  const identifyUser = (userId: string, properties?: Record<string, any>) => {
    posthog?.identify(userId, properties)
  }

  const setUserProperties = (properties: Record<string, any>) => {
    posthog?.setPersonProperties(properties)
  }

  return {
    trackEvent,
    identifyUser,
    setUserProperties,
  }
}