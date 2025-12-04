import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  onClose: () => void;
};

const AboutScreen: React.FC<Props> = ({ onClose }) => {
  const IMAGE_HEIGHT = 320;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.headerWrap, { height: IMAGE_HEIGHT }] }>
        <TouchableOpacity style={styles.menuClose} onPress={onClose} activeOpacity={0.8}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>

        {/* optional image background (will cover header if present) */}
        <Image source={require('../assets/about.png')} style={[styles.headerImage, { height: IMAGE_HEIGHT }]} />

        {/* diamonds placed above the image */}
        <View style={styles.logoContainer} pointerEvents="none">
          <View style={styles.diamondLeft} />
          <View style={styles.diamondRight} />
        </View>

        {/* centered title in header */}
        <View style={styles.titleWrap} pointerEvents="none">
          <Text style={styles.appTitle}>RentEasy</Text>
        </View>

        {/* white curved bottom to match mock */}
        <View style={styles.curve} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.paragraph}>
          RentEasy is your companion to live smart and rent smart!
        </Text>
        <Text style={styles.paragraph}>
          Our innovative services are changing the way you rent and breaking old habits to build a new rental ecosystem filled with rewards and surprises for you.
        </Text>

        <TouchableOpacity style={styles.linkRow} activeOpacity={0.85}>
          <Text style={styles.linkText}>Terms and Conditions</Text>
          <Ionicons name="chevron-forward" size={18} color="#4C8DFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkRow} activeOpacity={0.85}>
          <Text style={styles.linkText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={18} color="#4C8DFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkRow} activeOpacity={0.85}>
          <Text style={styles.linkText}>Personal Information Collection Statement</Text>
          <Ionicons name="chevron-forward" size={18} color="#4C8DFF" />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.version}>Version Number : 0.1</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerWrap: { backgroundColor: '#1E6FFF', alignItems: 'center', overflow: 'hidden' },
  menuClose: { position: 'absolute', left: 12, top: 12, padding: 6, justifyContent: 'center', alignItems: 'center', zIndex: 20 },
  headerImage: { position: 'absolute', left: 0, right: 0, top: 0, width: '100%', resizeMode: 'cover', opacity: 1 },
  logoContainer: { position: 'absolute', top: 30, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', zIndex: 18 },
  diamondLeft: { width: 56, height: 56, backgroundColor: '#ffffff', transform: [{ rotate: '45deg' }], marginRight: -14, elevation: 2 },
  diamondRight: { width: 56, height: 56, backgroundColor: '#cfcfcf', transform: [{ rotate: '45deg' }], elevation: 1 },
  titleWrap: { position: 'absolute', top: '50%', left: 0, right: 0, alignItems: 'center', zIndex: 19 },
  appTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
  curve: { position: 'absolute', bottom: -82, alignSelf: 'center', width: '220%', height: 160, borderRadius: 160, backgroundColor: '#fff', zIndex: 15 },
  content: { padding: 20 },
  paragraph: { color: '#333', fontSize: 14, marginBottom: 18, lineHeight: 20 },
  linkRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 8 },
  linkText: { color: '#111', fontSize: 14 },
  footer: { paddingVertical: 18, alignItems: 'center' },
  version: { textAlign: 'center', color: '#666' },
});

export default AboutScreen;
