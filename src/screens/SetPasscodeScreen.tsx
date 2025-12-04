import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

type Props = {
  onNext?: () => void;
  onBack?: () => void;
};

const SetPasscodeScreen: React.FC<Props> = ({ onNext, onBack }) => {
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  const canContinue = pass1.length === 6 && pass2 === pass1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerWrap}>
          <View style={styles.headerBlue}>
            <View style={styles.whiteCurve} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Set up your login{`\n`}passcode</Text>

          <TextInput
            placeholder="Enter a 6-digit login passcode"
            placeholderTextColor="#9aa3b2"
            style={styles.input}
            value={pass1}
            onChangeText={(t) => setPass1(t.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="numeric"
            secureTextEntry
          />

          <TextInput
            placeholder="Re-enter your 6-digit login passcode"
            placeholderTextColor="#9aa3b2"
            style={styles.input}
            value={pass2}
            onChangeText={(t) => setPass2(t.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="numeric"
            secureTextEntry
          />

          <View style={styles.buttonWrap}>
            <TouchableOpacity
              style={[styles.nextButton, !canContinue && styles.nextButtonDisabled]}
              onPress={() => canContinue && onNext && onNext()}
              activeOpacity={0.85}
              disabled={!canContinue}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flexGrow: 1 },
  headerWrap: {},
  headerBlue: { height: 140, backgroundColor: '#0A6BFF', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  whiteCurve: { position: 'absolute', bottom: -36, width: '150%', height: 120, backgroundColor: '#fff', borderRadius: 120, left: '-25%' },
  content: { paddingHorizontal: 28, paddingTop: 28 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 18, color: '#111' },
  input: { borderBottomWidth: 1, borderBottomColor: '#e6edf2', paddingVertical: 12, marginBottom: 18, color: '#222' },
  buttonWrap: { alignItems: 'center', marginTop: 36 },
  nextButton: { width: 140, height: 48, borderRadius: 24, backgroundColor: '#0A6BFF', alignItems: 'center', justifyContent: 'center' },
  nextButtonDisabled: { backgroundColor: '#0A6BFF', opacity: 0.45 },
  nextText: { color: '#fff', fontWeight: '700' },
});

export default SetPasscodeScreen;
