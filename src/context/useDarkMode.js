import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('Context was used before Provider');
  return context;
}

export { useDarkMode };
