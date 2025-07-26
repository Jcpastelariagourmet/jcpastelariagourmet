import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { supabase } from '@/lib/supabase';
import { formatAuthError } from '@/lib/auth-utils';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  updatePoints: (points: number) => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      signIn: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          
          if (error) {
            set({ isLoading: false });
            return { success: false, error: formatAuthError(error.message) };
          }

          if (data.user) {
            // Buscar dados completos do usuário
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();
            
            if (userError) {
              set({ isLoading: false });
              return { success: false, error: 'Erro ao carregar dados do usuário' };
            }

            set({ 
              user: userData,
              isAuthenticated: true,
              isLoading: false 
            });
            
            return { success: true };
          }

          set({ isLoading: false });
          return { success: false, error: 'Erro desconhecido' };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'Erro de conexão' };
        }
      },

      signUp: async (name: string, email: string, password: string, phone?: string) => {
        set({ isLoading: true });
        
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name,
                phone,
                preferences: {
                  favorite_flavors: [],
                  dietary_restrictions: [],
                  notification_settings: {
                    email_promotions: true,
                    sms_notifications: true,
                    push_notifications: true,
                    order_updates: true
                  },
                  theme: 'light'
                }
              }
            }
          });
          
          if (error) {
            set({ isLoading: false });
            return { success: false, error: formatAuthError(error.message) };
          }

          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, error: 'Erro de conexão' };
        }
      },

      signOut: async () => {
        set({ isLoading: true });
        
        try {
          await supabase.auth.signOut();
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
        }
      },

      updateUser: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        try {
          const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();
          
          if (!error && data) {
            set({ user: { ...user, ...data } });
          }
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
        }
      },

      updatePoints: async (points: number) => {
        const { user } = get();
        if (!user) return;

        try {
          const { data, error } = await supabase
            .from('users')
            .update({ points })
            .eq('id', user.id)
            .select()
            .single();
          
          if (!error && data) {
            set({ user: { ...user, points: data.points } });
          }
        } catch (error) {
          console.error('Erro ao atualizar pontos:', error);
        }
      },

      setUser: (user: User | null) => {
        set({ 
          user, 
          isAuthenticated: !!user 
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);