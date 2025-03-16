import { StarEmptyIcon, StarFilledIcon } from '@/assets/svg/stars'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Pressable, ScrollView, Text, TextInput, Dimensions, View } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function PublishComment() {
  const [comment, setComment] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const router = useRouter()

  return (
    <ScrollView style={{ ...styles.container }}>
      <Text style={styles.title}>Comment</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder='Comment'
        placeholderTextColor='#7c7c7c'
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <View className='flex flex-row justify-center gap-[4px]'>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index}>
            {index < score ? (
              <Pressable onPress={() => setScore(index + 1)}>
                <StarFilledIcon width='32' height='32' />
              </Pressable>
            ) : (
              <Pressable onPress={() => setScore(index + 1)}>
                <StarEmptyIcon width='32' height='32' />
              </Pressable>
            )}
          </View>
        ))}
      </View>
      <Pressable
        onPress={() => {
          router.push('/profile')
        }}
        style={{ backgroundColor: '#00639c', padding: 16, borderRadius: 8, marginTop: 16, alignItems: 'center' }}
      >
        <Text className='text-white font-bold'>Submit</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
  gridContainer: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: '100%',
    maxWidth: windowWidth,
  },
  row: {
    gap: 8,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
    color: 'black',
    position: 'relative',
  },
})
