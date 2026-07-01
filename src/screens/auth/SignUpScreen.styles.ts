import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { rf, rs } from '../../utils/responsive';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width >= 768 ? width * 0.6 : width * 0.88;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCard: {
    width: CARD_WIDTH,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: rs(260),
    height: rs(100),
  },
  header: {
    marginBottom: 28,
    gap: 10,
  },
  subtitle: {
    marginTop: 4,
  },
  form: {
    gap: 22,
    marginBottom: 20,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
  },
  checkbox: {
    width: rs(20),
    height: rs(20),
    borderRadius: rs(5),
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    fontSize: rf(12),
    color: Colors.white,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    color: Colors.textSecondary,
  },
  createButton: {
    marginBottom: 20,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: Colors.textSecondary,
  },
});
