import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  phone?: string;
  onBack?: () => void;
  onNext?: () => void;
};

const Verif2Screen: React.FC<Props> = ({ phone = '', onBack, onNext }) => {
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
            <View style={styles.otpLine} />
            <View style={styles.otpLine} />
            <View style={styles.otpLine} />
            <View style={styles.otpLine} />
            <View style={styles.otpLine} />
            <View style={styles.otpLine} />
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={onNext} activeOpacity={0.85}>
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
  otpLine: { width: 40, height: 6, backgroundColor: '#0A6BFF', borderRadius: 4, marginHorizontal: 6 },
  nextButton: { marginTop: 40, width: 220, height: 56, borderRadius: 28, backgroundColor: '#0A6BFF', justifyContent: 'center', alignItems: 'center' },
  nextText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default Verif2Screen;
