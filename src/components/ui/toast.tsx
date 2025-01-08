import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${colors[type]} shadow-lg`}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
}; 