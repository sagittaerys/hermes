import { View, StyleSheet } from 'react-native'
import { Text } from 'tamagui'
import { Ionicons } from '@expo/vector-icons'

interface EmptyStateProps {
  title?: string
  message?: string
  icon?: keyof typeof Ionicons.glyphMap
}

export function EmptyState({
  title = 'Nothing here yet',
  message,
  icon = 'newspaper-outline',
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color="#666666" />
      <Text
        color="$color"
        fontSize={18}
        fontWeight="700"
        marginTop="$3"
        textAlign="center"
      >
        {title}
      </Text>
      {message && (
        <Text
          color="$colorSecondary"
          fontSize={14}
          textAlign="center"
          marginTop="$2"
          lineHeight={20}
        >
          {message}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 4,
  },
})