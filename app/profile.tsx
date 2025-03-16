import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'
import { StarEmptyIcon, StarFilledIcon } from '@/assets/svg/stars'
import { useState } from 'react'
import { TabBar, TabView } from 'react-native-tab-view'
import { PetsProps } from '@/utils/interfaces'
import PetCard from '@/components/PetCard'
import ModalPets from '@/components/ModalPets'
import { GridIcon, ListIcon } from '@/assets/svg/gridList'
import CommentCard from '@/components/CommentCard'
import { ScrollView } from 'react-native-gesture-handler'
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

interface FirstRouteProps {
  setOpenModal: (value: boolean) => void
  setPetToShow: (value: PetsProps) => void
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const FirstRoute = ({ setOpenModal, setPetToShow }: FirstRouteProps) => {
  const [gridList, setGridList] = useState<boolean>(false)

  return (
    <ScrollView>
      <View style={[styles.scene, {}]}>
        <Pressable onPress={() => setGridList(!gridList)}>
          <View className='w-full flex flex-row justify-end items-center pt-[16px] pb-[16px] pr-[16px] gap-[8px]'>
            <View
              className='flex flex-row items-center justify-center gap-[8px] p-[8px] rounded-lg'
              style={{ backgroundColor: '#cdd2d3' }}
            >
              <GridIcon width='24px' height='24px' color='#7c7c7c' />
              <ListIcon width='28px' height='28px' color='#7c7c7c' />
            </View>
          </View>
        </Pressable>
        {gridList && (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={{ ...styles.card_container, width: windowWidth / 2 - 32 }}>
                <PetCard
                  petToShow={item}
                  onClick={() => {
                    setOpenModal(true)
                    setPetToShow(item)
                  }}
                  orientation={'column'}
                />
              </View>
            )}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.gridContainer}
          />
        )}
        {!gridList && (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={1}
            renderItem={({ item }) => (
              <View style={{ ...styles.card_container, width: '100%' }}>
                <PetCard
                  petToShow={item}
                  onClick={() => {
                    setOpenModal(true)
                    setPetToShow(item)
                  }}
                  orientation={'row'}
                />
              </View>
            )}
            contentContainerStyle={styles.gridContainer}
          />
        )}
      </View>
    </ScrollView>
  )
}

const SecondRoute = () => (
  <ScrollView>
    <View style={[styles.scene, {}]} className='flex flex-col p-[16px] gap-[16px]'>
      <CommentCard
        data={{
          id: '1',
          commentatorName: 'Ernesto Lopez',
          score: 3,
          comment:
            'Buena experiencia, pero faltó más información sobre los cuidados y la comunicación pudo ser más rápida. Agradezco la adopción.',
        }}
      />
      <CommentCard
        data={{
          id: '2',
          commentatorName: 'Alejandro Perez',
          score: 5,
          comment:
            'Excelente experiencia. La persona fue muy amable, brindó toda la información necesaria y se notaba su amor por los animales. ¡Gracias por la adopción!',
        }}
      />
      <CommentCard
        data={{
          id: '3',
          commentatorName: 'Ernesto Lopez',
          score: 4,
          comment:
            'Buena experiencia, pero faltó más información sobre los cuidados y la comunicación pudo ser más rápida. Agradezco la adopción.',
        }}
      />
      <CommentCard
        data={{
          id: '4',
          commentatorName: 'Alejandro Perez',
          score: 5,
          comment:
            'Excelente experiencia. La persona fue muy amable, brindó toda la información necesaria y se notaba su amor por los animales. ¡Gracias por la adopción!',
        }}
      />
    </View>
  </ScrollView>
)

export default function Profile() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [petToShow, setPetToShow] = useState<PetsProps>(defaultPet)
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'Pets' },
    { key: 'second', title: 'Comments' },
  ])

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute setOpenModal={setOpenModal} setPetToShow={setPetToShow} />
      case 'second':
        return <SecondRoute />
      default:
        return null
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, width: '100%' }}>
          <ModalPets
            openModal={openModal}
            setOpenModal={(value: boolean) => {
              setOpenModal(value)
            }}
            petToShow={petToShow}
          />
          <View style={styles.headerContainer}>
            <View style={styles.profileIcon}>
              <Svg width='56px' height='56px' viewBox='0 0 24 24' fill='none'>
                <Path
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  stroke='#7c7c7c'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </Svg>
            </View>
            <Text className='text-[18px]' style={{ fontWeight: '800', color: '#7c7c7c' }}>
              Samuel Gutierrez
            </Text>
            <View className='flex flex-row gap-[2px]'>
              {Array.from({ length: 5 }).map((_, index) => (
                <View key={index}>
                  {index < 3 ? (
                    <StarFilledIcon width='18px' height='18px' color='#7c7c7c' />
                  ) : (
                    <StarEmptyIcon width='18px' height='18px' color='#7c7c7c' />
                  )}
                </View>
              ))}
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  activeColor='#7c7c7c' // Color del texto cuando está activo
                  inactiveColor='#7c7c7c'
                  style={styles.tabBar}
                />
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  headerContainer: {
    backgroundColor: '#f3f7f9',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    borderRadius: 50,
    borderColor: '#7c7c7c',
    borderWidth: 4,
    padding: 8,
  },
  scene: { flex: 1, paddingVertical: 16, backgroundColor: 'transparent' },
  tabBar: {
    backgroundColor: '#f3f7f9',
    color: '#000',
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
  },
})
