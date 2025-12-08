import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';

type Props = {
  onBack?: () => void;
  onMaybeLater?: () => void;
  onStart?: () => void;
};

const VerificationIdentityScreen: React.FC<Props> = ({ onBack, onMaybeLater, onStart }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topImageWrap}>
        <Image source={require('../assets/about.png')} style={styles.topImage} resizeMode="cover" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Let’s verify your identity{`\n`}with Identity Document{`\n`}and a selfie</Text>

        <Image source={require('../assets/verif.png')} style={styles.illustration} resizeMode="contain" />

        <View style={styles.bullets}>
          <View style={styles.row}>
            <View style={styles.iconCircle}><Text style={styles.iconInner}>✓</Text></View>
            <Text style={styles.btext}>Put your Identity Document on a dark-colored surface with good lighting</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.iconCircle}><Text style={styles.iconInner}>✓</Text></View>
            <Text style={styles.btext}>Flip to scan both side of your Identity Card if needed</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.iconCircle}><Text style={styles.iconInner}>✓</Text></View>
            <Text style={styles.btext}>Take a selfie</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} activeOpacity={0.85} onPress={() => { if (onStart) onStart(); }}>
          <Text style={styles.startText}>let's start</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.later} activeOpacity={0.8} onPress={() => { if (onMaybeLater) onMaybeLater(); }}>
          <Text style={styles.laterText}>Maybe later</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  topImageWrap: { width: '100%', height: 90, paddingTop: 0, marginLeft: 0, marginRight: 0, overflow: 'hidden' },
  topImage: { width: '100%', height: 220,borderRadius:90, transform: [{ translateY: -120 }] },
  content: { paddingHorizontal: 28, paddingTop: 20, alignItems: 'center', flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', color: '#111', marginBottom: 10 },
  illustration: { width: 180, height: 140, marginVertical: 12 },
  bullets: { width: '100%', marginTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#0A6BFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  iconInner: { color: '#fff', fontWeight: '700' },
  btext: { flex: 1, color: '#556070' },
  startButton: { marginTop: 28, width: '70%', height: 56, borderRadius: 28, backgroundColor: '#0A6BFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#0A6BFF', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 20, elevation: 6 },
  startText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  later: { marginTop: 12 },
  laterText: { color: '#8d97a6', fontSize: 13 },
});

export default VerificationIdentityScreen;
