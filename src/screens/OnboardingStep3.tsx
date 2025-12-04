import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type Props = {
  onContinue?: () => void;
};

const OnboardingStep3: React.FC<Props> = ({ onContinue }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
            <Image
                      // local asset placed at src/assets/imgauth.png
              source={require('../assets/cards.png')}
              style={styles.illustration}
              resizeMode="contain"
             />

          <Text style={styles.title}>Smart Payment{"\n"}System</Text>

          <Text style={styles.subtitle}>
            We handle the transfer from tenant to landlord securely, ensuring transparency and guaranteed delivery.
          </Text>

          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>

          <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={onContinue}>
            <Text style={styles.buttonText}>let's go</Text>
          </TouchableOpacity>
        </View>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' },
  card: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#fff',
    borderRadius: 18,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 28,
  },
  illustration: { width: '100%', height: 220, marginTop: 0, marginBottom: 20 },
  underline: {
    position: 'absolute',
    bottom: -12,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#007bff',
    borderRadius: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111',
    paddingHorizontal: 20,
  },
  subtitle: {
    color: '#9b9b9b',
    marginTop: 12,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 26,
    lineHeight: 20,
  },
  dots: { flexDirection: 'row', marginTop: 20, alignItems: 'center' },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d6e6ff',
    marginHorizontal: 6,
  },
  dotActive: { backgroundColor: '#66a8ff' },
  button: {
    marginTop: 28,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 28,
    minWidth: 180,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 6,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600', textTransform: 'lowercase' },
});

export default OnboardingStep3;
