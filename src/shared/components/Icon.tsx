import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'

interface IconProps {
  name: string
  family?: 'Ionicons' | 'Feather' | 'MaterialIcons'
  size?: number
  color?: string
}

export function Icon({ name, family = 'Ionicons', size = 20, color = '#f5f5f5' }: IconProps) {
  switch (family) {
    case 'Feather':
      return <Feather name={name as any} size={size} color={color} />
    case 'MaterialIcons':
      return <MaterialIcons name={name as any} size={size} color={color} />
    default:
      return <Ionicons name={name as any} size={size} color={color} />
  }
}