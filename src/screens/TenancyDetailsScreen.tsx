import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  tenancyType?: string;
  onBack?: () => void;
  onSubmit?: (data: any) => void;
};

const TenancyDetailsScreen: React.FC<Props> = ({ tenancyType = 'Residential', onBack, onSubmit }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrap}>
        <TouchableOpacity style={styles.backPill} onPress={onBack} activeOpacity={0.85}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add {tenancyType.toLowerCase()} tenancy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.formTitle}>Please provide the{`\n`}tenancy details</Text>

        <Text style={styles.sectionLabel}>Address</Text>
        <View style={styles.row}> 
          <TextInput style={styles.inputHalf} placeholder="Flat/Unit" placeholderTextColor="#c9cfd6" />
          <TextInput style={styles.inputHalf} placeholder="Floor" placeholderTextColor="#c9cfd6" />
        </View>
        <TextInput style={styles.input} placeholder="Block" placeholderTextColor="#c9cfd6" />
        <TextInput style={styles.input} placeholder="Building/Estate" placeholderTextColor="#c9cfd6" />
        <TextInput style={styles.input} placeholder="Street" placeholderTextColor="#c9cfd6" />
        <TextInput style={styles.input} placeholder="District" placeholderTextColor="#c9cfd6" />
        <TextInput style={styles.input} placeholder="Region" placeholderTextColor="#c9cfd6" />

        <Text style={[styles.sectionLabel, { marginTop: 18 }]}>Landlord details</Text>
        <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#c9cfd6" />
        <TextInput style={styles.input} placeholder="Phone" placeholderTextColor="#c9cfd6" />

        <Text style={[styles.sectionLabel, { marginTop: 18 }]}>Beneficiary details</Text>
        <TextInput style={styles.input} placeholder="Bank account Name" placeholderTextColor="#c9cfd6" />
        <TextInput style={styles.input} placeholder="Bank Name" placeholderTextColor="#c9cfd6" />
        <TextInput style={styles.input} placeholder="Bank account number" placeholderTextColor="#c9cfd6" />

        <Text style={[styles.sectionLabel, { marginTop: 18 }]}>Rent period</Text>
        <View style={styles.row}> 
          <TextInput style={styles.inputHalf} placeholder="From" placeholderTextColor="#c9cfd6" />
          <TextInput style={styles.inputHalf} placeholder="To" placeholderTextColor="#c9cfd6" />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={() => onSubmit && onSubmit({})} activeOpacity={0.85}>
          <Text style={styles.submitText}>Save tenancy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerWrap: { height: 120, backgroundColor: '#0A6BFF', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingHorizontal: 18, justifyContent: 'center' },
  backPill: { position: 'absolute', left: 12, top: 18, backgroundColor: '#0A6BFF', padding: 8, borderRadius: 18 },
  headerTitle: { color: '#fff', alignSelf: 'center', marginTop: 6, fontWeight: '600' },
  container: { padding: 20, paddingBottom: 140 },
  formTitle: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginTop: 12, marginBottom: 18 },
  sectionLabel: { fontWeight: '700', marginBottom: 8, color: '#333' },
  input: { borderBottomWidth: 1, borderBottomColor: '#e6e9ee', paddingVertical: 10, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  inputHalf: { width: '48%', borderBottomWidth: 1, borderBottomColor: '#e6e9ee', paddingVertical: 10, marginBottom: 12 },
  submitBtn: { backgroundColor: '#0A6BFF', height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  submitText: { color: '#fff', fontWeight: '700' },
});

export default TenancyDetailsScreen;
