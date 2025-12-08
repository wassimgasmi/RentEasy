import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  onClose?: () => void;
  onAdd?: (type: string) => void;
};

const OptionRow: React.FC<{ label: string; onAdd?: () => void }> = ({ label, onAdd }) => (
  <View style={styles.optionWrap}>
    <Text style={styles.optionLabel}>{label}</Text>
    <TouchableOpacity style={styles.optionBtn} onPress={onAdd} activeOpacity={0.85}>
      <Text style={styles.optionBtnText}>Add tenancy</Text>
    </TouchableOpacity>
  </View>
);

const AddTenancyScreen: React.FC<Props> = ({ onClose, onAdd }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.85}>
          <Ionicons name="close" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>What type{`\n`}of Rent ?</Text>

        <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
          <OptionRow label="Residential" onAdd={() => onAdd && onAdd('Residential')} />
          <OptionRow label="Commercial" onAdd={() => onAdd && onAdd('Commercial')} />
          <OptionRow label="Parking" onAdd={() => onAdd && onAdd('Parking')} />
          <OptionRow label="Public Housing" onAdd={() => onAdd && onAdd('Public Housing')} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20 },
  closeBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#0A6BFF', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', marginTop: 18, marginBottom: 18, textAlign: 'center', alignSelf: 'center', width: '100%' },
  optionWrap: { borderWidth: 1.5, borderColor: '#0A6BFF', borderRadius: 14, padding: 16, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionLabel: { fontSize: 16, fontWeight: '600' },
  optionBtn: { backgroundColor: '#0A6BFF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 14 },
  optionBtnText: { color: '#fff', fontWeight: '700' },
});

export default AddTenancyScreen;
