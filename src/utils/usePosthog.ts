import { usePostHog } from 'posthog-js/react'

type PostHogProperties = Record<string, string | number | boolean | null | undefined>
type UserProperties = Record<string, string | number | boolean | Date | null | undefined>

export const useAnalytics = () => {
    const posthog = usePostHog()

    const trackEvent = (eventName: string, properties?: PostHogProperties) => {
        posthog?.capture(eventName, properties)
    }

    const identifyUser = (userId: string, properties?: UserProperties) => {
        posthog?.identify(userId, properties)
    }

    const setUserProperties = (properties: UserProperties) => {
        posthog?.setPersonProperties(properties)
    }

    return {
        trackEvent,
        identifyUser,
        setUserProperties,
    }
}