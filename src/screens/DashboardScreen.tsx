import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TransactionCard: React.FC<{ title: string; amount: string; subtitle?: string; positive?: boolean }> = ({ title, amount, subtitle, positive }) => (
  <View style={[styles.txCard, positive ? styles.txPositive : styles.txNegative]}>
    <View style={styles.txRow}>
      <View style={styles.avatar} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.txTitle}>{title}</Text>
        {subtitle ? <Text style={styles.txSubtitle}>{subtitle}</Text> : null}
      </View>
      <Text style={[styles.txAmount, positive ? styles.amountPos : styles.amountNeg]}>{amount}</Text>
    </View>
  </View>
);

type Props = {
  onAddTenancy?: () => void;
};

const DashboardScreen: React.FC<Props> = ({ onAddTenancy }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greet}>Hi Javvin</Text>
            <Text style={styles.subGreet}>Good Afternoon</Text>
          </View>
          <View style={styles.bell} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardText}>Complete your registration now to start paying rent</Text>
          <TouchableOpacity style={styles.cardBtn} activeOpacity={0.85}>
            <Text style={styles.cardBtnText}>Complete</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.9} onPress={() => onAddTenancy && onAddTenancy()}>
          <Text style={styles.primaryBtnText}>Add New Tenancy</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Incoming Transactions</Text>
          <Text style={styles.seeAll}>See All &gt;</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 8 }}>
          <TransactionCard title="Cameron Williamson" amount="+ $96.84" subtitle="23 December 2020" positive />
          <TransactionCard title="Cameron Williamson" amount="+ $96.84" subtitle="23 December 2020" positive />
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Outgoing Transactions</Text>
          <Text style={styles.seeAll}>See All &gt;</Text>
        </View>

        <TransactionCard title="Juohn Morris" amount="- $396.84" subtitle="12 December 2021" positive={false} />

      </ScrollView>
      {/* Bottom navigation bar */}
      <View style={styles.bottomBarWrap} pointerEvents="box-none">
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.85}>
            <View style={styles.selectedPill}>
              <Ionicons name="home" size={20} color="#fff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} activeOpacity={0.85}>
            <Ionicons name="card" size={22} color="#0A6BFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} activeOpacity={0.85}>
            <Ionicons name="bar-chart" size={22} color="#0A6BFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} activeOpacity={0.85}>
            <Ionicons name="person-circle" size={22} color="#0A6BFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  greet: { fontSize: 20, fontWeight: '700' },
  subGreet: { color: '#9aa4b2' },
  bell: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#e9f0ff' },
  card: { backgroundColor: '#f3f7fb', padding: 16, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  cardText: { flex: 1, color: '#333', fontWeight: '600' },
  cardBtn: { backgroundColor: '#0A6BFF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, marginLeft: 12 },
  cardBtnText: { color: '#fff', fontWeight: '700' },
  primaryBtn: { backgroundColor: '#0A6BFF', paddingVertical: 14, borderRadius: 28, alignItems: 'center', marginBottom: 18 },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  sectionTitle: { fontWeight: '700', color: '#333' },
  seeAll: { color: '#0A6BFF' },
  txCard: { width: 260, padding: 12, borderRadius: 12, backgroundColor: '#fff', marginRight: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 3 },
  txRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#cfeef6' },
  txTitle: { fontWeight: '700' },
  txSubtitle: { color: '#9aa4b2', marginTop: 4 },
  txAmount: { fontWeight: '700' },
  txPositive: {},
  txNegative: { backgroundColor: '#fff' },
  amountPos: { color: '#16a34a' },
  amountNeg: { color: '#ef4444' },
  bottomBarWrap: { position: 'absolute', left: 0, right: 0, bottom: 12, alignItems: 'center' },
  bottomBar: { width: '92%', height: 64, backgroundColor: '#fff', borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 14, elevation: 6 },
  navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  selectedPill: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#0A6BFF', alignItems: 'center', justifyContent: 'center' },
});

export default DashboardScreen;
