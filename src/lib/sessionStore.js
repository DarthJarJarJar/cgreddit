import { writable } from 'svelte/store'
import { supabase } from './supabaseClient'

export const user = writable(false)
export const username = writable("")