import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  onBack?: () => void;
  onNext?: (phone?: string) => void;
  onUseOmanId?: () => void;
};

const LoginMobileScreen: React.FC<Props> = ({ onBack, onNext, onUseOmanId }) => {
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topImageWrap}>
        <Image source={require('../assets/about.png')} style={styles.topImage} resizeMode="cover" />
        <TouchableOpacity style={styles.backPill} onPress={onBack} activeOpacity={0.85}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Login to{`\n`}RentEasy</Text>
          <Text style={styles.subtitle}>Please enter your mobile number to{`\n`}register</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>* Phone Number</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
              placeholder="+968 9200 5278"
              placeholderTextColor="#9aa4b2"
            />
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={() => onNext && onNext(phone)} activeOpacity={0.85}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginRow} onPress={() => { if (onUseOmanId) onUseOmanId(); }} activeOpacity={0.8}>
            <Text style={styles.loginText}>Log in with </Text>
            <Text style={styles.loginLink}>oman id</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  topImageWrap: { width: '100%', height: 110, overflow: 'hidden' },
  topImage: { width: '100%', height: 240, transform: [{ translateY: -120 }], borderBottomLeftRadius: 90, borderBottomRightRadius: 90 },
  backPill: { position: 'absolute', left: 16, top: 20, backgroundColor: '#0A6BFF', padding: 10, borderRadius: 18 },
  container: { flex: 1, paddingHorizontal: 24, alignItems: 'center' },
  content: { marginTop: 28, width: '100%', alignItems: 'center' },
  title: { fontSize: 36, fontWeight: '800', textAlign: 'center', color: '#111', lineHeight: 42 },
  subtitle: { marginTop: 14, color: '#9aa4b2', textAlign: 'center' },
  inputGroup: { marginTop: 28, width: '100%' },
  label: { color: '#0A6BFF', marginBottom: 6 },
  input: { borderBottomWidth: 1, borderBottomColor: '#0A6BFF', paddingVertical: 8, fontSize: 16, color: '#111' },
  nextButton: { marginTop: 40, width: 240, height: 56, borderRadius: 28, backgroundColor: '#0A6BFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#0A6BFF', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.18, shadowRadius: 20, elevation: 8 },
  nextText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  loginText: { color: '#8d97a6' },
  loginLink: { color: '#0A6BFF', textDecorationLine: 'underline' },
});

export default LoginMobileScreen;
