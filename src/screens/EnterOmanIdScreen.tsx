import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';

type Props = {
  onBack?: () => void;
  onNext?: (idNumber: string) => void;
  onLoginWithMobile?: () => void;
};

const EnterOmanIdScreen: React.FC<Props> = ({ onBack, onNext, onLoginWithMobile }) => {
  const [idNumber, setIdNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.topImageWrap}>
          <Image source={require('../assets/about.png')} style={styles.topImage} resizeMode="cover" />
          <TouchableOpacity style={styles.backPillAbsolute} onPress={() => { if (onBack) onBack(); }} activeOpacity={0.8}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.centerBlock}>
            <Text style={styles.title}>Enter your oman id number</Text>

            <View style={{ height: 18 }} />

            <Text style={[styles.label, { textAlign: 'center' }]}>* Your Oman Id number</Text>
            <TextInput
              value={idNumber}
              onChangeText={setIdNumber}
              placeholder="123456678"
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={[styles.nextButton, !idNumber ? styles.nextButtonDisabled : null]}
            activeOpacity={0.85}
            onPress={() => { if (idNumber && onNext) onNext(idNumber); }}
            disabled={!idNumber}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginRow} onPress={() => { if (onLoginWithMobile) onLoginWithMobile(); }} activeOpacity={0.8}>
            <Text style={styles.loginText}>Log in with </Text>
            <Text style={styles.loginLink}>Mobile Number</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topImageWrap: { width: '100%', height: 90, overflow: 'hidden' },
  topImage: { width: '100%', height: 220, transform: [{ translateY: -120 }], borderBottomLeftRadius: 90, borderBottomRightRadius: 90 },
  headerBackWrap: { paddingHorizontal: 20, paddingTop: 14 },
  backPill: { width: 56, height: 30, backgroundColor: '#0A6BFF', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  backPillAbsolute: { position: 'absolute', left: 16, top: 12, width: 56, height: 30, backgroundColor: '#0A6BFF', borderRadius: 16, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  backArrow: { color: '#fff', fontSize: 26 },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 18 },
  centerBlock: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  title: { fontSize: 22, fontWeight: '700', color: '#111', textAlign: 'center', marginTop: 6 },
  label: { color: '#0A6BFF', marginTop: 18, marginBottom: 6 },
  input: { borderBottomWidth: 1, borderBottomColor: '#0A6BFF', paddingVertical: 8, fontSize: 16, color: '#111', width: '70%', textAlign: 'center' },
  nextButton: { marginTop: 28, width: '70%', height: 56, borderRadius: 28, backgroundColor: '#0A6BFF', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 18 },
  nextButtonDisabled: { backgroundColor: '#9fc1ff' },
  nextText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 50 },
  loginText: { color: '#8d97a6' },
  loginLink: { color: '#0A6BFF', textDecorationLine: 'underline' },
});

export default EnterOmanIdScreen;
