import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com',
        person_profiles: 'identified_only', // ou 'always' pour tracker les anonymes
        capture_pageview: false, // On va le gérer manuellement
        capture_pageleave: true, // Optionnel
    })

    if (process.env.NODE_ENV === 'development') {
        posthog.debug() // Active les logs en développement
    }
}

export default posthog