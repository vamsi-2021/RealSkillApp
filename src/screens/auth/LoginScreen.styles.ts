import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { rs } from '../../utils/responsive';

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
    marginBottom: 24,
  },
  loginButton: {
    marginBottom: 20,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: Colors.textSecondary,
  },
});
