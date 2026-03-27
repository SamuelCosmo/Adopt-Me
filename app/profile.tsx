import { StyleSheet, View, Text, SafeAreaView, FlatList, Dimensions, Pressable } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'
import { StarEmptyIcon, StarFilledIcon } from '@/assets/svg/stars'
import { useState } from 'react'
import { PetsProps } from '@/utils/interfaces'
import PetCard from '@/components/PetCard'
import ModalPets from '@/components/ModalPets'
import { GridIcon, ListIcon } from '@/assets/svg/gridList'
import CommentCard from '@/components/CommentCard'
import { ScrollView } from 'react-native-gesture-handler'
import AddButton from '@/components/AddButton'
import { useRouter } from 'expo-router'
import CatFootPrint from '@/assets/svg/catFootPrint'

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

const FirstRoute = ({ setOpenModal, setPetToShow }: FirstRouteProps) => {
  const [gridList, setGridList] = useState(false)

  return (
    <View style={styles.scene}>
      <Pressable onPress={() => setGridList(!gridList)}>
        <View className='w-full flex flex-row justify-end items-center pt-[16px] pb-[16px] pr-[16px] gap-[8px]'>
          <View
            className='flex flex-row items-center justify-center gap-[8px] p-[8px] rounded-lg'
            style={{ backgroundColor: '#cdd2d3' }}
          >
            <GridIcon width={24} height={24} color='#7c7c7c' />
            <ListIcon width={28} height={28} color='#7c7c7c' />
          </View>
        </View>
      </Pressable>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={gridList ? 2 : 1}
        key={gridList ? 'grid' : 'list'} // ← Aquí se fuerza el reinicio del FlatList
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.card_container,
              width: gridList ? windowWidth / 2 - 32 : '100%',
            }}
          >
            <PetCard
              petToShow={item}
              onClick={() => {
                setOpenModal(true)
                setPetToShow(item)
              }}
              orientation={gridList ? 'column' : 'row'}
            />
          </View>
        )}
        columnWrapperStyle={gridList ? styles.row : undefined}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  )
}

const SecondRoute = () => (
  <ScrollView>
    <View style={[styles.scene, { padding: 16, paddingBottom: 96, gap: 16 }]}>
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
    <ScrollView>
      <View style={[styles.scene, { position: 'relative' }]} className='flex flex-col p-[16px] pb-[96px] gap-[16px]'>
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
  </ScrollView>
)

export default function Profile() {
  const [openModal, setOpenModal] = useState(false)
  const [petToShow, setPetToShow] = useState(defaultPet)
  const [tab, setTab] = useState<'pets' | 'comments'>('pets')
  const router = useRouter()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, width: '100%' }}>
          {tab === 'comments' && <AddButton onClick={() => router.push('/publish_comment')} />}

          <ModalPets openModal={openModal} setOpenModal={setOpenModal} petToShow={petToShow} />

          {/* Header */}
          <View style={styles.headerContainer}>
            <View style={styles.profileIcon}>
              <Svg width={56} height={56} viewBox='0 0 24 24' fill='none'>
                <Path
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  stroke='#7c7c7c'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </Svg>
            </View>

            <Text style={styles.name}>Samuel Gutierrez</Text>

            <View style={{ flexDirection: 'row' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <View key={i}>
                  {i < 3 ? (
                    <StarFilledIcon width={18} height={18} color='#7c7c7c' />
                  ) : (
                    <StarEmptyIcon width={18} height={18} color='#7c7c7c' />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Tabs */}
          <View style={{ flex: 1 }}>
            <View style={styles.tabsContainer}>
              <Pressable style={[styles.tabItem, tab === 'pets' && styles.activeTab]} onPress={() => setTab('pets')}>
                <Text style={styles.tabText}>Pets</Text>
              </Pressable>

              <Pressable
                style={[styles.tabItem, tab === 'comments' && styles.activeTab]}
                onPress={() => setTab('comments')}
              >
                <Text style={styles.tabText}>Comments</Text>
              </Pressable>
            </View>

            {tab === 'pets' && <FirstRoute setOpenModal={setOpenModal} setPetToShow={setPetToShow} />}
            {tab === 'comments' && <SecondRoute />}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', width: '100%' },
  headerContainer: { backgroundColor: '#f3f7f9', padding: 16, alignItems: 'center' },
  profileIcon: { borderRadius: 50, borderWidth: 4, padding: 8 },
  name: { fontWeight: '800', color: '#7c7c7c' },
  scene: { flex: 1, paddingVertical: 16 },
  gridContainer: { gap: 16, paddingHorizontal: 16 },
  row: { justifyContent: 'center', gap: 16 },
  card_container: { alignItems: 'center' },

  tabsContainer: { flexDirection: 'row', backgroundColor: '#f3f7f9' },
  tabItem: { flex: 1, padding: 12, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#7c7c7c' },
  tabText: { color: '#7c7c7c', fontWeight: '600' },
})
