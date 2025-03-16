import Svg, { Path } from 'react-native-svg'

interface SvgProps {
  width?: string
  height?: string
  color?: string
}

export function GridIcon({ width = '12px', height = '12px', color = '#8B4513' }: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox='0 0 28 28'>
      <Path
        d='M128 941a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4zm-2-8h-4a4 4 0 00-4 4v4a4 4 0 004 4h4a4 4 0 004-4v-4a4 4 0 00-4-4zm2 24a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4zm-2-8h-4a4 4 0 00-4 4v4a4 4 0 004 4h4a4 4 0 004-4v-4a4 4 0 00-4-4zm-14-8a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4zm-2-8h-4a4 4 0 00-4 4v4a4 4 0 004 4h4a4 4 0 004-4v-4a4 4 0 00-4-4zm2 24a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4zm-2-8h-4a4 4 0 00-4 4v4a4 4 0 004 4h4a4 4 0 004-4v-4a4 4 0 00-4-4z'
        transform='translate(-102 -933)'
        fill={color}
        stroke='none'
        strokeWidth={1}
        fillRule='evenodd'
      />
    </Svg>
  )
}

export function ListIcon({ width = '12px', height = '12px', color = '#8B4513' }: SvgProps) {
  return (
    <Svg width={width} height={height} viewBox='0 0 24 24'>
      <Path
        d='M8 6l13 .001m-13 6h13m-13 6h13M3.5 6h.01m-.01 6h.01m-.01 6h.01M4 6a.5.5 0 11-1 0 .5.5 0 011 0zm0 6a.5.5 0 11-1 0 .5.5 0 011 0zm0 6a.5.5 0 11-1 0 .5.5 0 011 0z'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
