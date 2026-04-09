export interface User {
  id: number
  name: string
  email: string
  password: string
  token: string
}

export interface CommentsProps {
  id: string
  commentatorName: string
  score: number
  comment: string
}

export interface SpeciesOption {
  id: number
  name: string
}

export interface BreedOption {
  id: number
  species_id: number
  name: string
}

export type PetSize = 'small' | 'medium' | 'large' | 'extra_large'
export type PetGender = 'male' | 'female' | 'unknown'
export type AdoptionStatus = 'active' | 'adopted' | 'paused' | 'deleted'

export interface AdoptionImage {
  id: number
  url: string
  adoption_id: number
  created_at?: string
  updated_at?: string
}

export interface AdoptionProps {
  id: number
  user_id: number
  species_id: number
  breed_id: number | null
  title: string
  pet_name: string
  description: string
  address: string
  city: string
  state: string
  zip_code: string
  age: number
  size: PetSize
  gender: PetGender
  images: AdoptionImage[]
  status: AdoptionStatus
  created_at: string
  updated_at: string
  deleted_at: string | null
}
