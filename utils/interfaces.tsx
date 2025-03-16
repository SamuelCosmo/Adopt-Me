export interface PetsProps {
  id: string
  srcImage: any
  owner: string
  score: number
  name: string
  description: string
  age: number
  city: string
  state: string
}

export interface CommentsProps {
  id: string
  commentatorName: string
  score: number
  comment: string
}
