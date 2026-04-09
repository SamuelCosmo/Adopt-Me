import CatFootPrint from '@/assets/svg/catFootPrint'
import AddButton from '@/components/AddButton'
import ModalPets from '@/components/ModalPets'
import ModalSignIn from '@/components/ModalSignIn'
import PetCard from '@/components/PetCard'
import type { AppDispatch } from '@/store/StoreContext'
import { fetchAdoptions, selectAdoptionsLoading, selectAllAdoptions } from '@/store/slices/adoptionSlice'
import { setOpenModalSignIn } from '@/store/slices/modalSignInSlice'
import { AdoptionProps } from '@/utils/interfaces'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Dimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'

const defaultPet: AdoptionProps = {
  id: 0,
  user_id: 0,
  species_id: 0,
  breed_id: null,
  title: '',
  pet_name: '',
  description: '',
  address: '',
  city: '',
  state: '',
  zip_code: '',
  age: 0,
  size: 'small',
  gender: 'unknown',
  images: [],
  status: 'active',
  created_at: '',
  updated_at: '',
  deleted_at: null,
}
const windowWidth = Dimensions.get('window').width

export default function HomeScreen() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [petToShow, setPetToShow] = useState<AdoptionProps>(defaultPet)

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: any) => state.auth.user.token)
  const openModalSignIn = useSelector((state: any) => {
    return state.modalSignIn.openModalSignIn
  })

  const adoptions = useSelector(selectAllAdoptions)
  const loadingAdoptions = useSelector(selectAdoptionsLoading)

  const handleRefresh = useCallback(() => {
    dispatch(fetchAdoptions())
  }, [dispatch])

  useEffect(() => {
    handleRefresh()
  }, [handleRefresh])

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
          data={adoptions}
          style={styles.list}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          refreshing={loadingAdoptions}
          onRefresh={handleRefresh}
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
    width: '100%',
  },
  list: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
  },
  gridContainer: {
    flexGrow: 1,
    gap: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 120,
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
