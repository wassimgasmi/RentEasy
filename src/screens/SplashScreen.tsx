import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const SplashScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <View style={styles.logoContainer}>
            <View style={styles.diamondLeft} />
            <View style={styles.diamondRight} />
          </View>

          <Text style={styles.title}>RentEasy</Text>

          <Text style={styles.subtitle}>
            Secure money transfer{"\n"}between tenant and{"\n"}landlord.
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Created By Nls</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#007bff',
  },
  outer: {
    flex: 1,
    padding: 10,
  },
  inner: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#007bff',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  logoContainer: {
    width: 120,
    height: 80,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diamondLeft: {
    width: 56,
    height: 56,
    backgroundColor: '#f1f1f1',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 16,
    top: 8,
    borderRadius: 4,
  },
  diamondRight: {
    width: 56,
    height: 56,
    backgroundColor: '#bdbdbd',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    left: 48,
    top: 20,
    borderRadius: 4,
  },
  title: {
    color: '#fff',
    fontSize: 56,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#eaf3ff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 120,
  },
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 12,
  },
});

export default SplashScreen;
