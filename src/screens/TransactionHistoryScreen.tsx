import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, ToastAndroid, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Transaction = {
  id: string;
  title: string;
  amount: string;
  date: string;
  status: 'success' | 'rejection' | 'pending';
  type: 'incoming' | 'outgoing';
  details?: Record<string, any>;
};

type Props = {
  onBack?: () => void;
  onOpenReceipt?: (tx: Transaction) => void;
  activeTab?: string;
  onChangeTab?: (tab: string) => void;
};

const MOCK: Transaction[] = [
  { id: 't1', title: 'Rent payment - Apt 12B', amount: '+ $1,200.00', date: '2025-12-01', status: 'success', type: 'incoming', details: { payer: 'John Doe', method: 'Card ****1234' } },
  { id: 't2', title: 'Maintenance refund', amount: '+ $120.00', date: '2025-11-15', status: 'rejection', type: 'incoming', details: { reason: 'Missing invoice' } },
  { id: 't3', title: 'Security deposit', amount: '+ $800.00', date: '2025-10-21', status: 'pending', type: 'incoming', details: {} },
  { id: 't4', title: 'Rent payment - Apt 3A', amount: '- $1,000.00', date: '2025-09-01', status: 'success', type: 'outgoing', details: { recipient: 'Landlord', method: 'Bank transfer' } },
  { id: 't5', title: 'Refund', amount: '+ $50.00', date: '2025-08-11', status: 'rejection', type: 'incoming', details: { reason: 'Invalid account' } },
];

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'success', label: 'Success' },
  { key: 'rejection', label: 'Rejection' },
  { key: 'pending', label: 'Pending' },
];

const TransactionHistoryScreen: React.FC<Props> = ({ onBack, onOpenReceipt, activeTab: activeTabProp, onChangeTab }) => {
  const [activeTab, setActiveTab] = useState<string>(activeTabProp ?? 'all');

  useEffect(() => {
    if (typeof activeTabProp === 'string') setActiveTab(activeTabProp);
  }, [activeTabProp]);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return MOCK;
    return MOCK.filter((t) => t.status === (activeTab as Transaction['status']));
  }, [activeTab]);

  const statusColor = (s: Transaction['status']) => {
    if (s === 'success') return '#16a34a';
    if (s === 'rejection') return '#ef4444';
    return '#f59e0b';
  };

  const TransactionItem: React.FC<{ tx: Transaction }> = ({ tx }) => {
    const clickable = tx.status === 'success' && (activeTab === 'all' || activeTab === 'success');
    return (
      <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            if (clickable) {
              onOpenReceipt && onOpenReceipt(tx);
            } else {
              const msg = 'Only successful transactions have receipts';
              if (Platform.OS === 'android') {
                ToastAndroid.show(msg, ToastAndroid.SHORT);
              } else {
                Alert.alert('Info', msg);
              }
            }
          }}
          style={styles.transactionItem}
        >
        <View style={styles.txRow}>
          <View style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.txTitle}>{tx.title}</Text>
            <Text style={styles.txDate}>{tx.date}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.txAmount, tx.amount.startsWith('+') ? styles.amountPos : styles.amountNeg]}>{tx.amount}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <View style={[styles.statusDot, { backgroundColor: statusColor(tx.status) }]} />
              <Text style={styles.statusText}>{tx.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.headerWrap}>
        <TouchableOpacity style={styles.backPill} onPress={() => onBack && onBack()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, activeTab === t.key ? styles.activeTab : styles.inactiveTab]}
            onPress={() => {
              if (onChangeTab) onChangeTab(t.key);
              else setActiveTab(t.key);
            }}
          >
            <Text style={[styles.tabText, activeTab === t.key ? styles.activeTabText : styles.inactiveTabText]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {filtered.length === 0 ? (
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text style={{ color: '#666' }}>No transactions found</Text>
          </View>
        ) : (
          filtered.map((tx) => <TransactionItem key={tx.id} tx={tx} />)
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerWrap: { backgroundColor: '#0A6BFF', paddingTop: 24, paddingBottom: 24, paddingHorizontal: 20, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center' },
  backPill: { position: 'absolute', left: 16, top: 28, width: 44, height: 44, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, marginTop: 12 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  activeTab: { backgroundColor: '#0A6BFF' },
  inactiveTab: { backgroundColor: '#f3f7fb' },
  tabText: { fontWeight: '600' },
  activeTabText: { color: '#fff' },
  inactiveTabText: { color: '#333' },
  listContainer: { padding: 16 },
  transactionItem: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 3 },
  txRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#cfeef6' },
  txTitle: { fontWeight: '700' },
  txDate: { color: '#9aa4b2', marginTop: 4 },
  txAmount: { fontWeight: '700' },
  amountPos: { color: '#16a34a' },
  amountNeg: { color: '#ef4444' },
  statusDot: { width: 8, height: 8, borderRadius: 8, marginRight: 8 },
  statusText: { textTransform: 'capitalize', color: '#666', marginLeft: 6 },
});

export default TransactionHistoryScreen;
