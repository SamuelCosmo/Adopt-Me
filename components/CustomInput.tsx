import { StyleSheet, View, Text, TextInput } from 'react-native'

interface Props {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
}
export default function CustomInput({ label, placeholder, value, onChangeText, keyboardType = 'default' }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor='#7c7c7c'
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
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
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 12,
    color: 'black',
    backgroundColor: 'white',
  },
})
