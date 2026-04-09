import { StyleSheet, View, Text, ScrollView, Image, FlatList, Dimensions, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '@/components/AddButton'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { createAdoption, updateAdoption } from '@/store/slices/adoptionSlice'
import {
  fetchPetOptions,
  selectBreedOptions,
  selectPetOptionsError,
  selectPetOptionsLoading,
  selectSpeciesOptions,
} from '@/store/slices/petOptionsSlice'
import type { AppDispatch, RootState } from '@/store/StoreContext'
import type { AdoptionProps, PetSize, PetGender } from '@/utils/interfaces'
import CustomSelect from '@/components/CustomSelect'
import CustomInput from '@/components/CustomInput'
import CustomOptions from '@/components/CustomOptions'

const windowWidth = Dimensions.get('window').width

const getLocalFileUri = (uri: string) => {
  if (uri.startsWith('file://')) return uri
  if (/^[a-z]+:\/\//i.test(uri)) return uri
  return `file://${uri}`
}

const getImageMimeType = (uri: string): 'image/jpeg' | 'image/png' => {
  const cleanUri = uri.split('?')[0].toLowerCase()
  return cleanUri.endsWith('.png') ? 'image/png' : 'image/jpeg'
}

const defaultForm = {
  title: '',
  petName: '',
  description: '',
  speciesId: '',
  breedId: '',
  address: '',
  city: '',
  addressState: '',
  zipCode: '',
  age: '',
  size: 'medium' as PetSize,
  gender: 'unknown' as PetGender,
  images: [] as string[],
  existingImages: [] as string[],
}

export default function PublishPet() {
  const params = useLocalSearchParams<{ pet?: string | string[] }>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingPetId, setEditingPetId] = useState<number | null>(null)
  const [form, setForm] = useState({ ...defaultForm })
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const token = useSelector((state: RootState) => state.auth.user.token)
  const speciesOptions = useSelector(selectSpeciesOptions)
  const breedOptions = useSelector(selectBreedOptions)
  const loadingPetOptions = useSelector(selectPetOptionsLoading)
  const petOptionsError = useSelector(selectPetOptionsError)

  const filteredBreeds = form.speciesId
    ? breedOptions.filter((breed) => String(breed.species_id) === form.speciesId)
    : []
  const selectedSpecies = speciesOptions.find((species) => String(species.id) === form.speciesId)
  const selectedBreed = filteredBreeds.find((breed) => String(breed.id) === form.breedId)

  useEffect(() => {
    dispatch(fetchPetOptions())
  }, [dispatch, token])

  useEffect(() => {
    const petParam = Array.isArray(params.pet) ? params.pet[0] : params.pet
    if (!petParam) return

    try {
      const pet = JSON.parse(petParam) as AdoptionProps
      const imageUrls = pet.images.map((image) => image.url).slice(0, 6)
      setEditingPetId(pet.id)

      setForm({
        title: pet.title || '',
        petName: pet.pet_name || '',
        description: pet.description || '',
        speciesId: String(pet.species_id || ''),
        breedId: pet.breed_id ? String(pet.breed_id) : '',
        address: pet.address || '',
        city: pet.city || '',
        addressState: pet.state || '',
        zipCode: pet.zip_code || '',
        age: String(pet.age || ''),
        size: pet.size || 'medium',
        gender: pet.gender || 'unknown',
        images: imageUrls.length < 6 ? [''] : [],
        existingImages: imageUrls,
      })
    } catch {
      Alert.alert('Error', 'Could not load pet information for editing.')
    }
  }, [params.pet])

  useFocusEffect(
    useCallback(() => {
      const petParam = Array.isArray(params.pet) ? params.pet[0] : params.pet
      if (!petParam) {
        setEditingPetId(null)
        setForm({ ...defaultForm })
      }
    }, [params.pet]),
  )

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
      let sumList = [...form.images, ...form.existingImages]
      let newList = [...form.images]
      if (newList[newList.length - 1] === '') newList.pop()
      const selectedImages = result.assets.map((asset: ImagePicker.ImagePickerAsset) => getLocalFileUri(asset.uri))
      newList = [...newList, ...selectedImages]
      if (sumList.length > 6) {
        alert('You can only select up to 6 photos.')
      } else setForm({ ...form, images: sumList.length < 6 ? [...newList, ''] : [...newList] })
    }
  }

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.petName ||
      !form.description ||
      !form.speciesId ||
      !form.address ||
      !form.city ||
      !form.addressState ||
      !form.zipCode ||
      !form.age
    ) {
      Alert.alert('Error', 'Please fill in all required fields.')
      return
    }

    const formData = new FormData()

    formData.append('title', form.title)
    formData.append('pet_name', form.petName)
    formData.append('description', form.description)
    formData.append('species_id', form.speciesId)

    if (form.breedId) {
      formData.append('breed_id', form.breedId)
    }

    formData.append('address', form.address)
    formData.append('city', form.city)
    formData.append('state', form.addressState)
    formData.append('zip_code', form.zipCode)
    formData.append('age', form.age)
    formData.append('size', form.size)
    formData.append('gender', form.gender)

    form.existingImages.forEach((url) => {
      formData.append('existing_images[]', url)
    })

    form.images
      .filter((uri) => uri && uri.trim() !== '')
      .forEach((uri, index) => {
        const localUri = getLocalFileUri(uri)

        // extra safety
        if (!localUri || localUri === 'file://') return

        const type = getImageMimeType(localUri)
        const extension = type === 'image/png' ? 'png' : 'jpg'

        formData.append('images', {
          uri: localUri,
          type,
          name: `photo_${index}.${extension}`,
        } as any)
      })

    setIsSubmitting(true)

    try {
      const result = editingPetId
        ? await dispatch(updateAdoption({ id: editingPetId, formData }))
        : await dispatch(createAdoption(formData))

      const isSuccess = editingPetId ? updateAdoption.fulfilled.match(result) : createAdoption.fulfilled.match(result)

      if (isSuccess) {
        router.push('/')
      } else {
        Alert.alert('Error', (result.payload as string) || 'Failed to save adoption.')
      }
    } catch (error) {
      Alert.alert('Error', 'Unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const allImages = useMemo(() => [...form.existingImages, ...form.images], [form.existingImages, form.images])

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CustomInput
        label='Title *'
        placeholder='Adoption title'
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
      />

      <CustomInput
        label='Pet Name *'
        placeholder='Pet name'
        value={form.petName}
        onChangeText={(text) => setForm({ ...form, petName: text })}
      />

      {petOptionsError ? (
        <Text style={styles.helperText}>{petOptionsError}</Text>
      ) : loadingPetOptions ? (
        <Text style={styles.helperText}>Loading species...</Text>
      ) : speciesOptions.length === 0 ? (
        <Text style={styles.helperText}>No species available.</Text>
      ) : (
        <CustomSelect
          label='Species *'
          placeholder='Select a species'
          options={speciesOptions.map((species) => ({ id: String(species.id), label: species.name }))}
          value={{ id: String(selectedSpecies?.id), label: selectedSpecies?.name || '' }}
          onPress={(option) => {
            setForm({ ...form, speciesId: String(option.id), breedId: '' })
          }}
        />
      )}

      <CustomSelect
        label='Breed'
        placeholder='Select a species to see its breeds.'
        options={filteredBreeds.map((breed) => ({ id: String(breed.id), label: breed.name }))}
        value={{ id: String(selectedBreed?.id), label: selectedBreed?.name || '' }}
        onPress={(option) => {
          setForm({ ...form, breedId: String(option.id) })
        }}
      />

      <CustomInput
        label='Age *'
        placeholder='Age (years)'
        value={form.age}
        onChangeText={(text) => setForm({ ...form, age: text })}
        keyboardType='numeric'
      />

      <CustomOptions
        label='Size *'
        value={form.size}
        options={[
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ]}
        onClick={(size) => setForm({ ...form, size: size as PetSize })}
      />

      <CustomOptions
        label='Gender *'
        value={form.gender}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'unknown', label: 'Unknown' },
        ]}
        onClick={(gender) => setForm({ ...form, gender: gender as PetGender })}
      />

      <CustomInput
        label='Description *'
        placeholder='Describe your pet'
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />

      <CustomInput
        label='Address *'
        placeholder='Street address'
        value={form.address}
        onChangeText={(text) => setForm({ ...form, address: text })}
      />

      <CustomInput
        label='City *'
        placeholder='City'
        value={form.city}
        onChangeText={(text) => setForm({ ...form, city: text })}
      />

      <CustomInput
        label='State *'
        placeholder='State'
        value={form.addressState}
        onChangeText={(text) => setForm({ ...form, addressState: text })}
      />

      <CustomInput
        label='Zip Code *'
        placeholder='Zip code'
        value={form.zipCode}
        onChangeText={(text) => {
          if (text.length <= 5) {
            setForm({ ...form, zipCode: text })
          }
        }}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Images</Text>
      {allImages.length === 0 && (
        <AddButton onClick={pickImages} stylesButton={styles.add_first_button} color='#cdd2d3' />
      )}
      {allImages.length > 0 && (
        <FlatList
          data={allImages}
          numColumns={3}
          scrollEnabled={false}
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
                      const totalExisting = form.existingImages.length

                      if (index < totalExisting) {
                        const updatedExisting = [...form.existingImages]
                        updatedExisting.splice(index, 1)

                        setForm({ ...form, existingImages: updatedExisting })
                      } else {
                        const newIndex = index - totalExisting
                        const updatedImages = [...form.images]
                        updatedImages.splice(newIndex, 1)
                        setForm({ ...form, images: updatedImages })
                      }
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
        title={editingPetId ? 'Update' : 'Submit'}
        onPress={handleSubmit}
        customStyles={styles.submit}
        isLoading={isSubmitting}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
  helperText: {
    color: '#555',
    marginBottom: 12,
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
    transform: [{ rotate: '45deg' }],
  },
  submit: {
    marginTop: 16,
    marginBottom: 32,
  },
})
