import { create } from 'zustand';

interface ToastState {
  message: string | null;
  variant: 'default' | 'success' | 'destructive';
  toast: (params: { title: string; description: string; variant?: 'default' | 'success' | 'destructive' }) => void;
}

export const useToast = create<ToastState>((set) => ({
  message: null,
  variant: 'default',
  toast: ({ title, description, variant = 'default' }) => {
    set({ message: `${title}: ${description}`, variant });
    setTimeout(() => set({ message: null }), 5000);
  },
})); 