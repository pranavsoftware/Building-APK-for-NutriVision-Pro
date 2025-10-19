import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';

export default StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  contentContainer: {
    padding: 20,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  // Card Styles
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  cardHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Text Styles
  heading1: {
    fontSize: typography.h1,
    fontWeight: typography.weightBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  
  heading2: {
    fontSize: typography.h2,
    fontWeight: typography.weightBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  
  heading3: {
    fontSize: typography.h3,
    fontWeight: typography.weightSemiBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  
  bodyText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: typography.body * typography.lineHeightNormal,
  },
  
  smallText: {
    fontSize: typography.bodySmall,
    color: colors.textLight,
    lineHeight: typography.bodySmall * typography.lineHeightNormal,
  },
  
  captionText: {
    fontSize: typography.caption,
    color: colors.textLight,
  },
  
  // Spacing
  marginBottom8: {
    marginBottom: 8,
  },
  
  marginBottom16: {
    marginBottom: 16,
  },
  
  marginBottom24: {
    marginBottom: 24,
  },
  
  marginTop8: {
    marginTop: 8,
  },
  
  marginTop16: {
    marginTop: 16,
  },
  
  marginTop24: {
    marginTop: 24,
  },
  
  // Flex
  row: {
    flexDirection: 'row',
  },
  
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  flex1: {
    flex: 1,
  },
  
  // Shadow
  shadow: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  shadowLarge: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
});
