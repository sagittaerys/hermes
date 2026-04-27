import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'tamagui'
import { Ionicons } from '@expo/vector-icons'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={48} color="#666666" />
      <Text
        color="$colorSecondary"
        textAlign="center"
        fontSize={15}
        lineHeight={22}
        marginTop="$3"
      >
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text color="$brandRed" fontWeight="600" fontSize={15}>
            Try Again
          </Text>
        </TouchableOpacity>
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
    gap: 8,
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C41E3A',
  },
})