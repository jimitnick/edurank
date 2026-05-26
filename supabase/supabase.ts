import { type Provider } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
const provider:Provider = 'google'

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `https://edurank-eta.vercel.app//auth/callback`,
    },
  })
  
  if (error) throw error
  return data
}


export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}