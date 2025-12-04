import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  onBack?: () => void;
  onNext?: (phone?: string) => void;
};

const RegisterScreen: React.FC<Props> = ({ onBack, onNext }) => {
  const [phone, setPhone] = React.useState('+1234 567 8901');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header} />

        <TouchableOpacity style={styles.backPill} onPress={onBack} activeOpacity={0.85}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome to{`\n`}RentEasy</Text>
          <Text style={styles.subtitle}>Please enter your mobile number to{`\n`}register</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>* Phone Number</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
              placeholder="+1234 567 8901"
              placeholderTextColor="#9aa4b2"
            />
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={() => onNext && onNext(phone)} activeOpacity={0.85}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 24, alignItems: 'center' },
  header: { height: 6, backgroundColor: '#f3f7fb', width: '100%', marginTop: 12, borderRadius: 2 },
  backPill: { position: 'absolute', left: 18, top: 28, backgroundColor: '#0A6BFF', padding: 10, borderRadius: 18 },
  content: { marginTop: 120, width: '100%', alignItems: 'center' },
  title: { fontSize: 36, fontWeight: '800', textAlign: 'center', color: '#111', lineHeight: 42 },
  subtitle: { marginTop: 14, color: '#9aa4b2', textAlign: 'center' },
  inputGroup: { marginTop: 28, width: '100%' },
  label: { color: '#0A6BFF', marginBottom: 6 },
  input: { borderBottomWidth: 1, borderBottomColor: '#0A6BFF', paddingVertical: 8, fontSize: 16, color: '#111' },
  nextButton: { marginTop: 40, width: 240, height: 56, borderRadius: 28, backgroundColor: '#0A6BFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#0A6BFF', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.18, shadowRadius: 20, elevation: 8 },
  nextText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default RegisterScreen;
