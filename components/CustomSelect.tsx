import { StyleSheet, View, Pressable, Text, ScrollView } from 'react-native'
import { useState } from 'react'

interface Props {
  label: string
  placeholder: string
  options: { id: string; label: string }[]
  onPress: (option: { id: string; label: string }) => void
  value: { id: string; label: string } | null
}

const capitalizeFirst = (text: string) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export default function CustomSelect({ label, placeholder, options, onPress, value }: Props) {
  const [showSelect, setShowSelect] = useState<boolean>(false)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selectContainer}>
        <Pressable style={styles.selectBox} onPress={() => setShowSelect((prev) => !prev)}>
          <Text style={[styles.selectValue, !value && styles.selectPlaceholder]}>
            {capitalizeFirst(value?.label.replaceAll('_', ' ') || placeholder)}
          </Text>
          <Text style={styles.selectArrow}>{showSelect ? '▲' : '▼'}</Text>
        </Pressable>

        {showSelect && (
          <View style={styles.dropdown}>
            <ScrollView nestedScrollEnabled style={styles.dropdownScroll}>
              {options.map((option) => (
                <Pressable
                  key={option.id}
                  style={[styles.dropdownOption, value?.id === option.id && styles.dropdownOptionSelected]}
                  onPress={() => {
                    onPress(option)
                    setShowSelect(false)
                  }}
                >
                  <Text style={[styles.dropdownOptionText, value?.id === option.id && styles.optionTextActive]}>
                    {capitalizeFirst(option.label.replaceAll('_', ' '))}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
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
  selectContainer: {
    marginBottom: 12,
  },
  selectBox: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectBoxDisabled: {
    backgroundColor: '#f2f2f2',
  },
  selectValue: {
    color: 'black',
    fontSize: 14,
    flex: 1,
  },
  selectPlaceholder: {
    color: '#7c7c7c',
  },
  selectArrow: {
    color: '#555',
    marginLeft: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  dropdownScroll: {
    maxHeight: 180,
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownOptionSelected: {
    backgroundColor: '#4a90d9',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#555',
  },
  optionTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
})
