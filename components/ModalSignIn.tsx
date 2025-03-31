import { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Dimensions, TextInput } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { useDispatch } from 'react-redux'
import { loginUser, signUpUser } from '@/store/slices/authSlice'
import { AppDispatch } from '@/store/StoreContext'

interface Props {
  openModal: boolean
  setOpenModal: (value: boolean) => void
}

interface FormProps {
  changeForm: () => void
}

interface PasswordProps {
  placeholder: string
  passwordValue: string
  setPasswordValue: (value: string) => void
  showPassword: boolean
  setShowPassword: (value: boolean) => void
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function ModalSignIn({ openModal, setOpenModal }: Props) {
  const [isSignIn, setIsSignIn] = useState<boolean>(true)

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={openModal}
      onRequestClose={() => {
        setOpenModal(false)
      }}
    >
      <View style={stylesModal.modal}>
        <Pressable style={stylesModal.background} onPress={() => setOpenModal(false)}></Pressable>
        {isSignIn ? (
          <SignInForm
            changeForm={() => {
              setIsSignIn(!isSignIn)
            }}
          />
        ) : (
          <SignUpForm
            changeForm={() => {
              setIsSignIn(!isSignIn)
            }}
          />
        )}
      </View>
    </Modal>
  )
}

function CatSvg() {
  return (
    <View className='flex justify-center items-center'>
      <Svg width='64px' height='64px' viewBox='0 0 24 24' fill='none'>
        <Path
          d='M19.98 9.063l.75.002v-.002h-.75zm-15.96 0h-.75v.002l.75-.002zM19.1 10.66l-.573.485.084.1.114.065.374-.65zm-.272-1.265a.75.75 0 00-.888 1.21l.888-1.21zM4.02 15h-.75.75zm2.04-4.396a.75.75 0 10-.888-1.209l.888 1.21zM12 5.656c-.772 0-1.21.041-1.556.084-.34.042-.512.072-.838.072v1.5c.44 0 .725-.047 1.02-.083.29-.036.666-.073 1.374-.073v-1.5zm0 1.5c.708 0 1.085.037 1.373.073.296.036.58.083 1.021.083v-1.5c-.326 0-.498-.03-.838-.072A11.885 11.885 0 0012 5.656v1.5zm2.394.157c.213 0 .412-.061.555-.114.156-.058.317-.134.472-.214.305-.157.659-.367.983-.554.34-.195.66-.373.947-.503.308-.14.484-.178.554-.178v-1.5c-.408 0-.83.157-1.171.31a12.82 12.82 0 00-1.078.571c-.354.204-.658.385-.922.52-.13.067-.23.113-.306.141-.087.032-.087.02-.034.02v1.5zm3.511-1.563c.345 0 .675.103.907.303.212.182.418.51.418 1.135h1.5c0-1-.352-1.766-.939-2.272-.566-.487-1.272-.666-1.886-.666v1.5zm1.325 1.438v1.875h1.5V7.188h-1.5zM9.606 5.813c.053 0 .053.011-.034-.02a2.92 2.92 0 01-.306-.141c-.264-.136-.568-.317-.922-.52-.34-.196-.716-.408-1.078-.571-.34-.154-.763-.311-1.171-.311v1.5c.07 0 .246.039.554.178.287.13.608.308.947.503.324.187.678.397.983.554.155.08.316.156.472.214.143.053.342.114.555.114v-1.5zM6.095 4.25c-.614 0-1.32.179-1.886.666-.587.505-.939 1.272-.939 2.271h1.5c0-.625.206-.952.418-1.134.232-.2.563-.303.907-.303v-1.5zM3.27 7.188v1.875h1.5V7.187h-1.5zM12 20.75c1.431 0 3.54-.285 5.32-1.104 1.784-.82 3.41-2.273 3.41-4.646h-1.5c0 1.533-1.007 2.58-2.536 3.284-1.53.704-3.412.966-4.694.966v1.5zm7.672-10.574a4.883 4.883 0 00-.844-.78l-.888 1.208c.24.177.433.359.587.54l1.145-.968zM19.23 9.06c0 .198-.041.61-.138.895-.055.159-.086.155-.03.11a.419.419 0 01.412-.055l-.749 1.3c.18.104.402.18.65.167.255-.013.466-.114.626-.242.287-.23.432-.566.51-.796.168-.491.218-1.08.22-1.374l-1.5-.005zM12 19.25c-1.282 0-3.163-.262-4.694-.966C5.776 17.58 4.77 16.532 4.77 15h-1.5c0 2.373 1.626 3.826 3.41 4.646 1.78.82 3.889 1.104 5.32 1.104v-1.5zM4.77 15c0-.788-.057-1.437.019-2.128.07-.645.253-1.218.684-1.727l-1.145-.97c-.68.805-.938 1.693-1.03 2.534-.087.797-.028 1.66-.028 2.291h1.5zm.703-3.855c.154-.182.346-.364.587-.54l-.888-1.21c-.33.242-.609.503-.844.78l1.145.97zM3.27 9.065c.001.294.051.883.219 1.374.078.23.223.566.51.796.16.128.371.229.625.242.249.012.47-.063.651-.167l-.749-1.3a.419.419 0 01.411.055c.057.045.026.049-.029-.11a3.329 3.329 0 01-.138-.895l-1.5.005z'
          fill='#8B4513'
        />
        <Path
          d='M12.826 16c0 .173-.361.313-.806.313-.446 0-.807-.14-.807-.313s.361-.313.807-.313c.445 0 .806.14.806.313zM15.5 13.594c0 .431-.217.781-.484.781s-.484-.35-.484-.781c0-.432.217-.781.484-.781s.484.35.484.78zM9.5 13.594c0 .431-.217.781-.484.781s-.484-.35-.484-.781c0-.432.217-.781.484-.781s.484.35.484.78z'
          stroke='#8B4513'
          strokeWidth={1.5}
        />
        <Path
          d='M22 15.469c-.483-.313-2.58-1.094-3.387-1.094M20.387 17.969c-.484-.313-1.613-1.094-2.42-1.094M2 15.469c.484-.313 2.58-1.094 3.387-1.094M3.613 17.969c.484-.313 1.613-1.094 2.42-1.094'
          stroke='#8B4513'
          strokeWidth={1.5}
          strokeLinecap='round'
        />
      </Svg>
      <Text className='text-center font-extrabold text-[20px]' style={{ color: '#8B4513' }}>
        Adopt-Me!
      </Text>
    </View>
  )
}

function SignInForm({ changeForm }: FormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <View style={stylesModal.body}>
      <CatSvg />
      <TextInput
        style={stylesModal.input}
        placeholder='Email'
        placeholderTextColor='#7c7c7c'
        value={email}
        onChangeText={setEmail}
      />
      <PasswordInput
        placeholder='Password'
        passwordValue={password}
        setPasswordValue={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <View className='flex flex-column gap-[8px]'>
        <Pressable
          style={stylesModal.button}
          onPress={async () => {
            await dispatch(loginUser({ email: email, password: password }))
          }}
        >
          <Text className='text-white'>Sign In</Text>
        </Pressable>
      </View>
      <View className='w-full h-[1px] bg-gray-200 mt-[4px] mb-[4px]'></View>
      <Pressable
        style={stylesModal.button_cancel}
        onPress={() => {
          changeForm()
        }}
      >
        <Text style={stylesModal.button_text}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

function SignUpForm({ changeForm }: FormProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [repeatedPassword, setRepeatedPassword] = useState<string>('')
  const [showRepeatedPassword, setShowRepeatedPassword] = useState<boolean>(false)

  return (
    <View style={stylesModal.body}>
      <CatSvg />
      <TextInput
        style={stylesModal.input}
        placeholder='New Username'
        placeholderTextColor='#7c7c7c'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={stylesModal.input}
        placeholder='Email'
        placeholderTextColor='#7c7c7c'
        value={email}
        onChangeText={setEmail}
      />
      <PasswordInput
        placeholder='New Password'
        passwordValue={password}
        setPasswordValue={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <PasswordInput
        placeholder='Repeated Password'
        passwordValue={repeatedPassword}
        setPasswordValue={setRepeatedPassword}
        showPassword={showRepeatedPassword}
        setShowPassword={setShowRepeatedPassword}
      />
      <View className='flex flex-column gap-[8px]'>
        <Pressable
          style={stylesModal.button}
          onPress={async () => {
            if (username !== '' && email !== '' && password !== '' && password === repeatedPassword)
              await dispatch(signUpUser({ name: username, email: email, password: password }))
            else alert('Invalid data...')
          }}
        >
          <Text className='text-white'>Sign Up</Text>
        </Pressable>
      </View>
      <View className='w-full h-[1px] bg-gray-200 mt-[4px] mb-[4px]'></View>
      <Pressable
        style={stylesModal.button_cancel}
        onPress={() => {
          changeForm()
        }}
      >
        <Text style={stylesModal.button_text}>Sign In</Text>
      </Pressable>
    </View>
  )
}

function PasswordInput({ placeholder, passwordValue, setPasswordValue, showPassword, setShowPassword }: PasswordProps) {
  return (
    <View
      style={{
        ...stylesModal.input,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='#7c7c7c'
        value={passwordValue}
        onChangeText={setPasswordValue}
        secureTextEntry={!showPassword}
        className='flex-1'
      />
      <Pressable
        onPress={() => {
          setShowPassword(!showPassword)
        }}
        style={{ position: 'absolute', right: 8 }}
      >
        {!showPassword ? (
          <Svg width='24px' height='24px' viewBox='0 0 24 24' fill='none'>
            <Path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M19.707 5.707a1 1 0 00-1.414-1.414l-4.261 4.26a4 4 0 00-5.478 5.478l-4.261 4.262a1 1 0 101.414 1.414l4.261-4.26a4 4 0 005.478-5.478l4.261-4.262zm-7.189 4.36a2 2 0 00-2.45 2.45l2.45-2.45zm-1.036 3.865l2.45-2.45a2 2 0 01-2.45 2.45zm4.283-9.111C14.63 4.32 13.367 4 12 4 9.148 4 6.757 5.395 4.998 6.906c-1.765 1.517-2.99 3.232-3.534 4.064a1.876 1.876 0 000 2.06 20.304 20.304 0 002.748 3.344l1.414-1.414A18.315 18.315 0 013.18 12c.51-.773 1.598-2.268 3.121-3.577C7.874 7.072 9.816 6 12 6a7.06 7.06 0 012.22.367l1.545-1.546zM12 18a7.06 7.06 0 01-2.22-.367L8.236 19.18c1.136.5 2.398.821 3.765.821 2.852 0 5.243-1.395 7.002-2.906 1.765-1.517 2.99-3.232 3.534-4.064.411-.628.411-1.431 0-2.06a20.303 20.303 0 00-2.748-3.344L18.374 9.04A18.312 18.312 0 0120.82 12c-.51.773-1.598 2.268-3.121 3.577C16.126 16.928 14.184 18 12 18z'
              fill='#ccc'
            />
          </Svg>
        ) : (
          <Svg width='24px' height='24px' viewBox='0 0 20 20' fill='none'>
            <Path
              fill='#ccc'
              fillRule='evenodd'
              d='M3.415 10.242c-.067-.086-.13-.167-.186-.242a16.806 16.806 0 011.803-2.025C6.429 6.648 8.187 5.5 10 5.5c1.813 0 3.57 1.148 4.968 2.475A16.816 16.816 0 0116.771 10a16.9 16.9 0 01-1.803 2.025C13.57 13.352 11.813 14.5 10 14.5c-1.813 0-3.57-1.148-4.968-2.475a16.799 16.799 0 01-1.617-1.783zm15.423-.788L18 10l.838.546-.002.003-.003.004-.01.016-.037.054a17.123 17.123 0 01-.628.854 18.805 18.805 0 01-1.812 1.998C14.848 14.898 12.606 16.5 10 16.5s-4.848-1.602-6.346-3.025a18.806 18.806 0 01-2.44-2.852 6.01 6.01 0 01-.037-.054l-.01-.016-.003-.004-.001-.002c0-.001-.001-.001.837-.547l-.838-.546.002-.003.003-.004.01-.016a6.84 6.84 0 01.17-.245 18.804 18.804 0 012.308-2.66C5.151 5.1 7.394 3.499 10 3.499s4.848 1.602 6.346 3.025a18.803 18.803 0 012.44 2.852l.037.054.01.016.003.004.001.002zM18 10l.838-.546.355.546-.355.546L18 10zM1.162 9.454L2 10l-.838.546L.807 10l.355-.546zM9 10a1 1 0 112 0 1 1 0 01-2 0zm1-3a3 3 0 100 6 3 3 0 000-6z'
            />
          </Svg>
        )}
      </Pressable>
    </View>
  )
}

const stylesModal = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  background: {
    flex: 1,
    backgroundColor: '#7c7c7c',
    opacity: 0.7,
    width: windowWidth,
    height: windowHeight,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 8,
    width: windowWidth - 30,
    gap: 4,
    padding: 16,
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
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B4513',
    padding: 4,
    backgroundColor: '#8B4513',
  },
  button_cancel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B4513',
    padding: 4,
    backgroundColor: 'transparent',
  },
  button_text: {
    color: '#8B4513',
  },
})
