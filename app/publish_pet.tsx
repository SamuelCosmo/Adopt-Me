import { StyleSheet, View, Text, ScrollView, Image, FlatList, Dimensions, TextInput, Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import AddButton from '@/components/AddButton'
import { useRouter } from 'expo-router'
import CustomButton from '@/components/CustomButton'

const windowWidth = Dimensions.get('window').width

export default function PublishPet() {
  const [perName, setPetName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [images, setImages] = useState<string[]>([])
  const router = useRouter()

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission is required to access photos.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      allowsMultipleSelection: true,
      quality: 1,
    })

    if (!result.canceled) {
      let newList = [...images]
      if (newList[newList.length - 1] === '') newList.pop()
      const selectedImages = result.assets.map((asset: any) => asset.uri)
      newList = [...newList, ...selectedImages]
      if (newList.length > 6) {
        alert('You can only select up to 6 photos.')
        newList = newList.slice(0, 6)
      }
      setImages(newList.length < 6 ? [...newList, ''] : [...newList])
    }
  }

  return (
    <View style={{ ...styles.container }}>
      <Text style={styles.title}>Pet Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Pet Name'
        placeholderTextColor='#7c7c7c'
        value={perName}
        onChangeText={setPetName}
      />
      <Text style={styles.title}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder='Describe your pet'
        placeholderTextColor='#7c7c7c'
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.title}>Images</Text>
      {images.length === 0 && <AddButton onClick={pickImages} stylesButton={styles.add_first_button} color='#cdd2d3' />}
      {images.length > 0 && (
        <FlatList
          data={images}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View key={index}>
              {item !== '' ? (
                <>
                  <Image source={{ uri: item }} style={{ width: 100, height: 100, borderRadius: 8 }} />
                  <AddButton
                    stylesButton={styles.add_button_image}
                    color='white'
                    width={16}
                    height={16}
                    onClick={() => {
                      const newList = [...images]
                      newList.splice(index, 1)
                      if (newList.length < 6 && newList[newList.length - 1] !== '') newList.push('')
                      setImages(newList.length === 1 ? [] : newList)
                    }}
                  />
                </>
              ) : (
                <AddButton onClick={pickImages} stylesButton={styles.add_button} color='#cdd2d3' />
              )}
            </View>
          )}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContainer}
        />
      )}
      <CustomButton
        title='Submit'
        onPress={() => {
          router.push('/')
        }}
        customStyles={styles.submit}
      />
    </View>
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
  add_first_button: {
    position: 'static',
    bottom: 0,
    right: 0,
    width: '100%',
    height: 100,
    backgroundColor: 'transparent',
    borderColor: '#cdd2d3',
    borderWidth: 4,
    borderRadius: 8,
    elevation: 0,
    padding: 0,
  },

  add_button: {
    position: 'static',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    borderColor: '#cdd2d3',
    borderWidth: 4,
    borderRadius: 8,
    elevation: 0,
    padding: 0,
  },
  add_button_image: {
    bottom: undefined,
    right: -10,
    top: -10,
    width: 24,
    height: 24,
    backgroundColor: '#cdd2d3',
    borderColor: '#cdd2d3',
    borderWidth: 4,
    borderRadius: '50%',
    elevation: 0,
    padding: 0,
  },

  submit: {
    marginTop: 16,
  },
})
