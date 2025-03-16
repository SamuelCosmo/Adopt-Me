import { Text, Pressable, StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface Props {
  onClick?: () => void
  stylesButton?: any
  color?: string
  width?: string
  height?: string
}

export default function AddButton({
  onClick = () => {},
  stylesButton = {},
  color = '#fff',
  width = '48px',
  height = '48px',
}: Props) {
  return (
    <Pressable style={{ ...styles.button, ...stylesButton }} onPress={onClick}>
      <View>
        <Svg width={width} height={height} viewBox='0 0 24 24' fill='none'>
          <Path d='M4 12h16m-8-8v16' stroke={color} strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
        </Svg>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    borderRadius: 50,
    bottom: 20,
    right: 20,
    borderWidth: 2,
    padding: 4,
    borderColor: '#00639c',
    backgroundColor: '#00639c',
    elevation: 16,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
})
