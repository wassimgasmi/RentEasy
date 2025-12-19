import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TransactionReceiptScreen: React.FC<{ transaction?: any; onBack?: () => void }> = ({ transaction, onBack }) => {
  if (!transaction) return null;
  const details = transaction.details || {};
  const statusColor = (s: string) => (s === 'success' ? '#16a34a' : s === 'rejection' ? '#ef4444' : '#f59e0b');

  const renderDetail = (k: string, v: any) => {
    const labelMap: Record<string, string> = {
      payer: 'Payer',
      recipient: 'Recipient',
      method: 'Method',
      reason: 'Reason',
      account: 'Account',
    };
    return (
      <View key={k} style={styles.detailRow}>
        <Text style={styles.detailKey}>{labelMap[k] ?? k}</Text>
        <Text style={styles.detailVal}>{String(v)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.headerWrap}>
        <TouchableOpacity style={styles.backPill} onPress={() => onBack && onBack()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receipt</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.card}>
          <Text style={styles.title}>{transaction.title}</Text>
          <Text style={styles.amount}>{transaction.amount}</Text>
          <Text style={styles.date}>{transaction.date}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Status</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <View style={[styles.statusDot, { backgroundColor: statusColor(transaction.status) }]} />
                <Text style={styles.metaValue}>{String(transaction.status)}</Text>
              </View>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Type</Text>
              <Text style={styles.metaValue}>{transaction.type ?? '-'}</Text>
            </View>
          </View>

          <View style={{ marginTop: 18 }}>
            <Text style={styles.sectionTitle}>Details</Text>
            {Object.keys(details).length === 0 ? (
              <Text style={styles.detailText}>No extra details available.</Text>
            ) : (
              Object.entries(details).map(([k, v]) => renderDetail(k, v))
            )}
            <View style={{ marginTop: 12 }}>
              <Text style={styles.sectionTitle}>Transaction ID</Text>
              <Text style={styles.detailVal}>{transaction.id}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerWrap: { backgroundColor: '#0A6BFF', paddingTop: 24, paddingBottom: 24, paddingHorizontal: 20, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center' },
  backPill: { position: 'absolute', left: 16, top: 28, width: 44, height: 44, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 10, elevation: 4 },
  title: { fontWeight: '700', fontSize: 16 },
  amount: { fontWeight: '800', fontSize: 22, marginTop: 8 },
  date: { color: '#9aa4b2', marginTop: 6 },
  sectionTitle: { marginBottom: 8, fontWeight: '700' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailKey: { color: '#9aa4b2' },
  detailVal: { fontWeight: '700' },
  detailText: { color: '#666' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  metaCol: { flex: 1 },
  metaLabel: { color: '#9aa4b2', fontSize: 12 },
  metaValue: { fontWeight: '700', marginTop: 4 },
  statusDot: { width: 10, height: 10, borderRadius: 10, marginRight: 8 },
});

export default TransactionReceiptScreen;
