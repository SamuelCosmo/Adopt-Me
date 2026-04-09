import { StyleSheet, View, Text, Pressable } from 'react-native'

interface Props {
  label: string
  value: string
  options: { value: string, label: string }[]
  onClick: (text: string) => void
}

export default function CustomOptions({ label, value, options, onClick }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionRow}>
        {options.map((option) => (
          <Pressable
            key={option.value}
            style={[styles.optionButton, value === option.value && styles.optionButtonActive]}
            onPress={() => onClick(option.value)}
          >
            <Text style={[styles.optionText, value === option.value && styles.optionTextActive]}>{option.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  optionButtonActive: {
    backgroundColor: '#4a90d9',
    borderColor: '#4a90d9',
  },
  optionText: {
    fontSize: 14,
    color: '#555',
  },
  optionTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
})
