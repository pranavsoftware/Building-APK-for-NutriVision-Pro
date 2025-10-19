import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getColors } from '../styles/theme';

/**
 * Custom hook to get themed colors
 * Usage: const colors = useThemedColors();
 */
export const useThemedColors = () => {
  const { isDarkMode } = useTheme();
  const colors = useMemo(() => getColors(isDarkMode), [isDarkMode]);
  return colors;
};

export default useThemedColors;
