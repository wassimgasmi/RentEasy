import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

type Props = {
  onGetStarted?: (e?: GestureResponderEvent) => void;
};

const WelcomeScreen: React.FC<Props> = ({ onGetStarted }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View style={styles.diamondLeft} />
          <View style={styles.diamondRight} />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.brand}>RentEasy.</Text>

          <Text style={styles.subtitle}>
            Secure money transfer{"\n"}between tenant and{"\n"}landlord.
          </Text>
        </View>

        <View style={styles.bottomArea}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.button}
            onPress={onGetStarted}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' },
  logoContainer: {
    marginTop: 0,
    width: 120,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diamondLeft: {
    width: 44,
    height: 44,
    backgroundColor: '#006bff',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 28,
    top: 8,
    borderRadius: 4,
  },
  diamondRight: {
    width: 44,
    height: 44,
    backgroundColor: '#7fb0ff',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 56,
    top: 20,
    borderRadius: 4,
  },
  textBlock: { marginTop: 20, alignItems: 'center' },
  welcome: { fontSize: 28, fontWeight: '700', color: '#111', marginBottom: 6 },
  brand: { fontSize: 30, fontWeight: '800', color: '#007bff' },
  subtitle: {
    color: '#8b8b8b',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 18,
    maxWidth: 260,
  },
  bottomArea: { justifyContent: 'center', marginTop: 32, marginBottom: 48, width: '100%', alignItems: 'center' },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 28,
    minWidth: 200,
    alignItems: 'center',
    justifyContent: 'center',
    // shadow
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 6,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default WelcomeScreen;
