'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from "react"

import { Session, User } from "@supabase/supabase-js"
import { supabase, signInWithGoogle, signOutUser } from "@/supabase/supabase"

type AuthContextType ={
    user: User | null,
    session:Session | null,
    loading: boolean,
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({
    children,
}:{
    children: ReactNode
}) => {
    const [user,setUser] = useState<User | null>(null)
    const [session,setSession] = useState<Session | null>(null)
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getSession = async () => {
            const{data: {session}}= await supabase.auth.getSession()
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        }
        getSession()

        const {data: {subscription}} = supabase.auth.onAuthStateChange((_event,session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    },[])

    const value = {
        user,session,loading,signInWithGoogle: async () => {await signInWithGoogle()},signOut: async () => {await signOutUser()}
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}