import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

// Define the type for the user object
type User = {
  id: string
  token: string
}

// Define the context type
type GlobalContextType = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
  openModalSignIn: boolean
  setOpenModalSignIn: Dispatch<SetStateAction<boolean>>
}

// Create the context with a default value
export const GlobalContext = createContext<GlobalContextType>({
  user: { id: '', token: '' },
  setUser: () => {
    throw new Error('setUser function must be overridden')
  },
  openModalSignIn: false,
  setOpenModalSignIn: () => {
    throw new Error('setOpenModalSignIn function must be overridden')
  },
})

// Define the provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ id: '', token: '' })
  const [openModalSignIn, setOpenModalSignIn] = useState<boolean>(false)

  return (
    <GlobalContext.Provider value={{ user, setUser, openModalSignIn, setOpenModalSignIn }}>
      {children}
    </GlobalContext.Provider>
  )
}
