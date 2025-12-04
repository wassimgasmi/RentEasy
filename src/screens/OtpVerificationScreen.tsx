import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  phone?: string;
  onBack?: () => void;
  onVerify?: (code: string) => void;
};

const OtpVerificationScreen: React.FC<Props> = ({ phone = '', onBack, onVerify }) => {
  const [code, setCode] = React.useState(['', '', '', '', '', '']);
  const inputsRef = React.useRef<Array<TextInput | null>>([]);

  const focusInput = (idx: number) => {
    const input = inputsRef.current[idx];
    if (input && typeof input.focus === 'function') {
      (input as any).focus();
    }
  };

  const updateDigit = (index: number, value: string) => {
    const v = value.replace(/[^0-9]/g, '').slice(-1);
    const next = [...code];
    next[index] = v;
    setCode(next);
    if (v) {
      // move to next input if there is one
      const nextIndex = Math.min(index + 1, code.length - 1);
      if (nextIndex !== index) focusInput(nextIndex);
      // if all inputs filled, auto-submit
      if (next.every((d) => d !== '')) {
        const joined = next.join('');
        if (onVerify) onVerify(joined);
      }
    }
  };

  const handleKeyPress = (index: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (code[index] === '') {
        // move to previous
        const prev = Math.max(0, index - 1);
        if (prev !== index) {
          focusInput(prev);
          const next = [...code];
          next[prev] = '';
          setCode(next);
        }
      } else {
        const next = [...code];
        next[index] = '';
        setCode(next);
      }
    }
  };

  const submit = () => {
    const joined = code.join('');
    if (onVerify) onVerify(joined);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header} />

        <TouchableOpacity style={styles.backPill} onPress={onBack} activeOpacity={0.85}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>One-time passcode{`\n`}Verification</Text>
          <Text style={styles.subtitle}>Enter the one-time passcode we will send to{`\n`}your mobile</Text>
          <Text style={styles.phone}>{phone}</Text>

          <View style={styles.otpRow}>
            {code.map((digit, i) => (
              <TextInput
                key={i}
                ref={(ref) => { inputsRef.current[i] = ref; }}
                value={digit}
                onChangeText={(t) => updateDigit(i, t)}
                onKeyPress={(e) => handleKeyPress(i, e)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.otpInput}
                textAlign="center"
                placeholder="-"
                placeholderTextColor="#b6c3d6"
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={submit} activeOpacity={0.85}>
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
  content: { marginTop: 100, width: '100%', alignItems: 'center' },
  title: { fontSize: 30, fontWeight: '800', textAlign: 'center', color: '#111', lineHeight: 36 },
  subtitle: { marginTop: 12, color: '#9aa4b2', textAlign: 'center' },
  phone: { marginTop: 8, color: '#111', fontWeight: '600' },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28, width: '92%' },
  otpInput: { width: 40, height: 44, borderBottomWidth: 2, borderBottomColor: '#0A6BFF', fontSize: 18, color: '#111' },
  nextButton: { marginTop: 40, width: 220, height: 56, borderRadius: 28, backgroundColor: '#0A6BFF', justifyContent: 'center', alignItems: 'center' },
  nextText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default OtpVerificationScreen;
