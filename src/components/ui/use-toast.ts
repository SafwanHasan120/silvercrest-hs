import { create } from 'zustand';

type ToastVariant = 'default' | 'success' | 'destructive';

interface ToastState {
  message: string | null;
  variant: ToastVariant;
  toast: (params: { 
    title: string; 
    description: string; 
    variant?: ToastVariant 
  }) => void;
}

export const useToast = create<ToastState>((set) => ({
  message: null,
  variant: 'default',
  toast: ({ title, description, variant = 'default' }) => {
    set({ message: `${title}: ${description}`, variant });
    setTimeout(() => set({ message: null }), 5000);
  },
})); 