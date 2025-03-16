import AddButton from '@/components/AddButton'
import ModalPets from '@/components/ModalPets'
import ModalSignIn from '@/components/ModalSignIn'
import PetCard from '@/components/PetCard'
import { GlobalContext } from '@/store/StoreContext'
import { PetsProps } from '@/utils/interfaces'
import { useRouter } from 'expo-router'
import { useContext, useState } from 'react'
import { StyleSheet, View, FlatList, Dimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
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

  const { openModalSignIn, setOpenModalSignIn } = useContext(GlobalContext)
  const router = useRouter()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AddButton
          onClick={() => {
            router.push('/publish_pet')
          }}
        />
        <ModalSignIn
          openModal={openModalSignIn}
          setOpenModal={(value: boolean) => {
            setOpenModalSignIn(value)
          }}
        />
        <ModalPets
          openModal={openModal}
          setOpenModal={(value: boolean) => {
            setOpenModal(value)
          }}
          petToShow={petToShow}
        />
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
    // paddingTop: StatusBar.currentHeight,
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
