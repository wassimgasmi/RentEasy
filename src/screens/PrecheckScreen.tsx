import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  onContinue?: () => void;
  onBack?: () => void;
};

const Bullet: React.FC<{ text: string }>= ({ text }) => (
  <View style={styles.bulletRow}>
    <View style={styles.bulletCircle}>
      <Ionicons name="checkmark" size={16} color="#fff" />
    </View>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const PrecheckScreen: React.FC<Props> = ({ onContinue, onBack }) => {
  const [checks, setChecks] = useState([false, false, false]);

  const toggle = (idx: number) => {
    const next = [...checks];
    next[idx] = !next[idx];
    setChecks(next);
  };

  const allChecked = checks.every(Boolean);

  const CheckRow: React.FC<{ label: string; index: number }> = ({ label, index }) => (
    <TouchableOpacity
      style={styles.checkboxRow}
      onPress={() => toggle(index)}
      activeOpacity={0.85}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: checks[index] }}
    >
      <View style={[styles.checkBox, checks[index] && styles.checkBoxChecked]}>
        {checks[index] ? <View style={styles.innerDot} /> : null}
      </View>
      <Text style={[styles.bulletText, !checks[index] && { color: '#222' }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerWrap}>
          <View style={styles.headerTop} />
          <View style={styles.diamondsWrap} pointerEvents="none">
            <View style={styles.diamondLeft} />
            <View style={styles.diamondRight} />
          </View>
          <Text style={styles.brand}>RentEasy</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Let’s see if you are ready:</Text>

          {/* Replace bullets with interactive checkboxes */}
          <View style={styles.checkboxList}>
            {[
              "I'm aged 18 or above",
              'I am legal Oman resident with a valid identity document',
              'I have an Oman mobile number',
            ].map((label, i) => (
              <CheckRow key={i} label={label} index={i} />
            ))}
          </View>

          <Text style={styles.legal}>By tapping, 'Let's go', you have read and accepted our Terms and Conditions, Privacy policy and Personal Information Collection Statement. You also understand that any partially completed form will be stored for 90 days. Please contact us at our customer service hotline for any enquiries.</Text>

          <TouchableOpacity
            style={allChecked ? styles.goButton : styles.goButtonDisabled}
            onPress={allChecked ? onContinue : undefined}
            activeOpacity={0.85}
            disabled={!allChecked}
            accessibilityState={{ disabled: !allChecked }}
          >
            <Text style={styles.goText}>Let's go</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { paddingBottom: 60 },
  headerWrap: { alignItems: 'center', backgroundColor: '#0A6BFF', paddingBottom: 36, borderBottomLeftRadius: 36, borderBottomRightRadius: 36 },
  headerTop: { height: 80, width: '100%' },
  diamondsWrap: { width: 140, height: 80, marginTop: -40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'relative' },
  diamondLeft: { width: 56, height: 56, backgroundColor: '#ffffff', transform: [{ rotate: '45deg' }], marginRight: -14, elevation: 2 },
  diamondRight: { width: 56, height: 56, backgroundColor: '#cfcfcf', transform: [{ rotate: '45deg' }], elevation: 1 },
  brand: { color: '#fff', fontSize: 20, fontWeight: '700', marginTop: 8 },
  content: { paddingHorizontal: 28, paddingTop: 28 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 18 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 10 },
  bulletCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#0A6BFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  bulletText: { flex: 1, color: '#222' },
  checkboxList: { marginTop: 6 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  checkBox: { width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, borderColor: '#cfd6df', justifyContent: 'center', alignItems: 'center', marginRight: 12, backgroundColor: 'transparent' },
  checkBoxChecked: { backgroundColor: '#0A6BFF', borderColor: '#0A6BFF' },
  innerDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#fff' },
  legal: { marginTop: 18, color: '#8d97a6', fontSize: 12, lineHeight: 18 },
  goButton: { marginTop: 28, backgroundColor: '#0A6BFF', alignSelf: 'center', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 28 },
  goText: { color: '#fff', fontWeight: '700' },
  goButtonDisabled: { marginTop: 28, backgroundColor: '#cfd6df', alignSelf: 'center', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 28 },
});

export default PrecheckScreen;
