import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  onClose: () => void;
};

const HelpCenterScreen: React.FC<Props> = ({ onClose }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.menuClose} onPress={onClose} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={18} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Help Center</Text>
          
        </View>
        <View style={styles.underline} />
        <View style={styles.searchWrap}>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <Ionicons name="search" size={18} color="#333" style={styles.searchIcon} />
        </View>

        <ScrollView style={styles.faqs} contentContainerStyle={{ paddingBottom: 40 }}>
          <TouchableOpacity style={styles.faqItem} activeOpacity={0.85}>
            <View style={styles.faqRow}>
              <Text style={styles.faqQ}>What is credit does RentEasy accept?</Text>
              <Ionicons name="add" size={18} color="#999" />
            </View>
            <Text style={styles.faqA}>We support all Visa / MasterCard / UnionPay credit cards issued in oman</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqItem} activeOpacity={0.85}>
            <View style={styles.faqRow}>
              <Text style={styles.faqQ}>How long it take for the rent to reach my landlord?</Text>
              <Ionicons name="add" size={18} color="#999" />
            </View>
            <Text style={styles.faqA}>Typically 3-5 business days depending on the bank.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqItem} activeOpacity={0.85}>
            <View style={styles.faqRow}>
              <Text style={styles.faqQ}>What shall i provide tenancy verification</Text>
              <Ionicons name="add" size={18} color="#999" />
            </View>
            <Text style={styles.faqA}>Provide copy of tenancy contract and ID for verification.</Text>
          </TouchableOpacity>

          <Text style={styles.helpHeading}>Still stuck? Help us a mail away</Text>

          <TouchableOpacity style={styles.sendBtn} activeOpacity={0.85}>
            <Text style={styles.sendBtnText}>Send a message</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  menuClose: { width: 44, height: 36, borderRadius: 18, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center' },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#111' },
  underline: { width: '100%', height: 4, borderRadius: 2, backgroundColor: '#007bff', marginTop: 8, marginBottom: 12 },
  searchWrap: { marginTop: 12, backgroundColor: '#f2f4f6', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' },
  searchInput: { flex: 1, padding: 0, color: '#333' },
  searchIcon: { marginLeft: 8 },
  faqs: { marginTop: 18 },
  faqItem: { borderBottomWidth: 1, borderBottomColor: '#eef2f8', paddingVertical: 12 },
  faqRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQ: { fontSize: 14, fontWeight: '700', color: '#111' },
  faqA: { color: '#666', fontSize: 13 },
  helpHeading: { marginTop: 22, fontSize: 16, fontWeight: '700', textAlign: 'center' },
  sendBtn: { marginTop: 18, alignSelf: 'center', backgroundColor: '#007bff', paddingHorizontal: 36, paddingVertical: 14, borderRadius: 28 },
  sendBtnText: { color: '#fff', fontWeight: '700' },
});

export default HelpCenterScreen;
