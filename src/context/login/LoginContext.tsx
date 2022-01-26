import React, { createContext, useEffect, useState } from 'react'

type IsLogged = {
  profile: string;
  setProfileId: (profile: string) => void;
};

interface Props {
  children: JSX.Element | JSX.Element[]
}

interface IProfileId {
  profile: string
}

const initialState = {
  profile: '',
}

export const LoginContext = createContext<IsLogged>({} as IsLogged)

export const LoginStateProvider = ({ children }: Props) => {
  const [state, setstate] = useState<IProfileId>(initialState)

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      if (state.profile === '') {
        if (typeof window !== 'undefined') {
          const getDataStorage = localStorage.getItem('profileUser') || ''
          setstate({ profile: getDataStorage })
        }
      }
    }
    return () => {
      cleanup = false
    }
  }, [])

  const setProfileId = (profileId: string) => {
    return setstate({ profile: profileId })
  }

  return (
    <LoginContext.Provider
      value={{
        profile: state.profile,
        setProfileId,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}
