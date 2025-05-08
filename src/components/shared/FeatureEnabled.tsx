import { FEATURE_FLAGS, FeatureFlagNames } from '@/lib/featureFlags'

interface FeatureEnabledProps {
  flagKey: FeatureFlagNames
  children: React.ReactNode
}

function FeatureEnabled({ flagKey, children }: FeatureEnabledProps) {
  return FEATURE_FLAGS[flagKey] ? children : null
}

export default FeatureEnabled
