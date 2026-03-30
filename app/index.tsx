import CatFootPrint from '@/assets/svg/catFootPrint'
import AddButton from '@/components/AddButton'
import ModalPets from '@/components/ModalPets'
import ModalSignIn from '@/components/ModalSignIn'
import PetCard from '@/components/PetCard'
import { setOpenModalSignIn } from '@/store/slices/modalSignInSlice'
import { PetsProps } from '@/utils/interfaces'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View, FlatList, Dimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
const catImage = require('../assets/images/cat.jpg')
const dogImage = require('../assets/images/dog.webp')

const data: PetsProps[] = [
  {
    id: '1',
    srcImage: dogImage,
    owner: 'Samuel Gutierrez',
    score: 2,
    name: 'Cerberus, protector del abismo',
    description:
      'Cerberus es un feroz cachorro de tres cabezas que custodia la entrada del abismo, impidiendo que las almas escapen. Aunque pequeño, su instinto protector y mirada ardiente reflejan el poder que algún día desatará. 🔥🐶',
    age: 2,
    city: 'Mexicali',
    state: 'B.C.',
  },
  {
    id: '2',
    srcImage: catImage,
    owner: 'Ernesto Lopez',
    score: 5,
    name: 'Tomás, el devorador de dioses',
    description:
      'Es una criatura envuelta en misterio. Bajo su suave pelaje y mirada inocente se esconde un hambre cósmica insaciable. Con un bostezo, consume deidades; con un zarpazo, desgarra realidades. 🐱✨',
    age: 2,
    city: 'Mexicali',
    state: 'B.C.',
  },
]

const defaultPet: PetsProps = {
  id: '0',
  owner: '',
  score: 0,
  srcImage: '',
  name: '',
  description: '',
  age: 0,
  city: '',
  state: '',
}
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function HomeScreen() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [petToShow, setPetToShow] = useState<PetsProps>(defaultPet)

  const router = useRouter()
  const dispatch = useDispatch()
  const token = useSelector((state: any) => state.auth.user.token)
  const openModalSignIn = useSelector((state: any) => {
    return state.modalSignIn.openModalSignIn
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {token ? (
          <AddButton
            onClick={() => {
              router.push('/publish_pet')
            }}
          />
        ) : null}
        <ModalSignIn
          openModal={openModalSignIn}
          setOpenModal={(value: boolean) => {
            dispatch(setOpenModalSignIn(value))
          }}
        />
        <ModalPets
          openModal={openModal}
          setOpenModal={(value: boolean) => {
            setOpenModal(value)
          }}
          petToShow={petToShow}
        />
        <View
          className='flex justify-center items-center'
          style={{ flex: 1, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
        >
          <CatFootPrint color='#8B4513' width={320} height={320} />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.card_container}>
              <PetCard
                petToShow={item}
                onClick={() => {
                  setOpenModal(true)
                  setPetToShow(item)
                }}
              />
            </View>
          )}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContainer}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 96,
  },
  gridContainer: {
    gap: 16,
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: windowWidth,
  },
  row: {
    justifyContent: 'center',
    gap: 16,
    width: '100%',
  },
  card_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 2 - 32,
  },
})
