import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

type Props = {
  onNext?: (data?: any) => void;
  onBack?: () => void;
};

const GetToKnowYouScreen: React.FC<Props> = ({ onNext, onBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [invite, setInvite] = useState('');

  const canContinue = !!name && !!phone; // require at least name and phone

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <View style={styles.headerWrap}>
          <View style={styles.headerBlue}>
            <View style={styles.whiteCurve} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Let us get to know you</Text>

          <TextInput
            placeholder="Your preferred name"
            placeholderTextColor="#9aa3b2"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Phone number"
            placeholderTextColor="#9aa3b2"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#9aa3b2"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Invitation Code"
            placeholderTextColor="#9aa3b2"
            style={styles.input}
            value={invite}
            onChangeText={setInvite}
          />

          <View style={styles.buttonWrap}>
            <TouchableOpacity
              style={[styles.nextButton, !canContinue && styles.nextButtonDisabled]}
              onPress={() => canContinue && onNext && onNext({ name, phone, email, invite })}
              activeOpacity={0.85}
              disabled={!canContinue}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flexGrow: 1, flex: 1, backgroundColor: '#f3f5f7', alignItems: 'stretch', paddingVertical: 0 },
  card: { flex: 1, width: '100%', backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12 },
  headerWrap: { backgroundColor: 'transparent' },
  headerBlue: { height: 160, backgroundColor: '#0A6BFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', alignItems: 'center' },
  whiteCurve: { position: 'absolute', bottom: -44, width: '150%', height: 140, backgroundColor: '#fff', borderRadius: 140, left: '-25%' },
  content: { paddingHorizontal: 28, paddingTop: 12, paddingBottom: 48 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 10, color: '#111' },
  input: { borderBottomWidth: 1, borderBottomColor: '#e6edf2', paddingVertical: 12, marginBottom: 20, color: '#222', fontSize: 13 },
  nextButton: { width: 120, height: 48, borderRadius: 24, backgroundColor: '#0A6BFF', alignItems: 'center', justifyContent: 'center', elevation: 8, shadowColor: '#0A6BFF', shadowOpacity: 0.18, shadowOffset: { width: 0, height: 8 }, shadowRadius: 24, zIndex: 2 },
  nextButtonDisabled: { backgroundColor: '#0A6BFF', opacity: 0.45 },
  nextText: { color: '#fff', fontWeight: '700' },
  buttonWrap: { alignItems: 'center', marginTop: 36, paddingVertical: 24 },
});

export default GetToKnowYouScreen;
