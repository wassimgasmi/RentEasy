import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, ToastAndroid, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Invitation = {
  id: string;
  title: string;
  address: string;
  rent: string;
  startDate: string;
  endDate?: string;
  status: 'pending' | 'accepted' | 'rejected';
  details?: Record<string, any>;
};

const MOCK_INVITES: Invitation[] = [
  { id: 'i1', title: 'Tenancy: Apt 12B', address: '12B, Palm Residency', rent: '$1,200/mo', startDate: '2026-01-01', status: 'pending', details: { landlord: 'John Smith', contact: '+971 50 123 4567' } },
  { id: 'i2', title: 'Tenancy: Apt 3A', address: '3A, Ocean View', rent: '$1,000/mo', startDate: '2026-02-15', status: 'pending', details: { landlord: 'Alice Brown', contact: '+971 50 987 6543' } },
];

const API_BASE = 'https://example.com/api'; // <- Replace with your API base URL

const InvitationScreen: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [invites, setInvites] = useState<Invitation[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const showMsg = (msg: string) => {
    if (Platform.OS === 'android') ToastAndroid.show(msg, ToastAndroid.SHORT);
    else Alert.alert('Info', msg);
  };

  const fetchInvites = async () => {
    setLoading(true);
    try {
      // Example GET: GET /invitations
      const res = await fetch(`${API_BASE}/invitations`);
      if (!res.ok) throw new Error(`Fetch error ${res.status}`);
      const data = await res.json();
      setInvites(Array.isArray(data) ? data : []);
    } catch (err: any) {
      // fallback to mock data if API fails
      setInvites(MOCK_INVITES);
      console.warn('Failed to fetch invitations, using mock data:', err.message || err);
      showMsg('Unable to fetch invitations — showing local data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const respondInvitation = async (id: string, newStatus: 'accepted' | 'rejected') => {
    setActionLoadingId(id);
    try {
      // Example POST: POST /invitations/:id/respond { status: 'accepted' }
      const res = await fetch(`${API_BASE}/invitations/${id}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error(`Response error ${res.status}`);
      const updated = await res.json();
      // Update local list with server response if provided, otherwise set status locally
      setInvites((s) => s.map((it) => (it.id === id ? { ...it, status: updated?.status ?? newStatus } : it)));
      showMsg(`Invitation ${newStatus}`);
    } catch (err: any) {
      // optimistic fallback: still update locally
      setInvites((s) => s.map((it) => (it.id === id ? { ...it, status: newStatus } : it)));
      console.warn('Failed to send response, updated locally:', err.message || err);
      showMsg(`Unable to sync — marked ${newStatus} locally`);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWrap}>
        <TouchableOpacity style={styles.backPill} onPress={() => onBack && onBack()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Invitations</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {loading ? (
          <View style={{ padding: 24, alignItems: 'center' }}>
            <ActivityIndicator size="small" color="#0A6BFF" />
          </View>
        ) : invites.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No invitations at the moment.</Text>
          </View>
        ) : (
          invites.map((inv) => (
            <View key={inv.id} style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.cardLeft} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{inv.title}</Text>
                  <Text style={styles.cardSub}>{inv.address}</Text>
                  <Text style={styles.cardSub}>{inv.rent} • Starts {inv.startDate}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.status, inv.status === 'accepted' ? styles.statusAccepted : inv.status === 'rejected' ? styles.statusRejected : styles.statusPending]}>{inv.status}</Text>
                </View>
              </View>

              <View style={styles.actionsRow}>
                {inv.status === 'pending' ? (
                  <>
                    <TouchableOpacity style={[styles.btn, styles.btnAccept]} onPress={() => respondInvitation(inv.id, 'accepted')} disabled={!!actionLoadingId}>
                      {actionLoadingId === inv.id ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Accept</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.btnReject]} onPress={() => respondInvitation(inv.id, 'rejected')} disabled={!!actionLoadingId}>
                      {actionLoadingId === inv.id ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Reject</Text>}
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={{ paddingVertical: 6 }}>
                    <Text style={{ color: '#666' }}>{inv.status.toUpperCase()}</Text>
                  </View>
                )}

                <TouchableOpacity style={styles.detailsToggle} onPress={() => setExpandedId(expandedId === inv.id ? null : inv.id)}>
                  <Text style={styles.detailsToggleText}>{expandedId === inv.id ? 'Hide details' : 'View details'}</Text>
                </TouchableOpacity>
              </View>

              {expandedId === inv.id && (
                <View style={styles.detailsCard}>
                  {Object.entries(inv.details || {}).map(([k, v]) => (
                    <View key={k} style={styles.detailRow}>
                      <Text style={styles.detailKey}>{k}</Text>
                      <Text style={styles.detailVal}>{String(v)}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
    headerWrap: { backgroundColor: '#0A6BFF', paddingTop: 24, paddingBottom: 24, paddingHorizontal: 20, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center' },

  backPill: { position: 'absolute', left: 16, top: 28, width: 44, height: 44, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontWeight: '700', fontSize: 18 },
  list: { padding: 16 },
  emptyWrap: { padding: 40, alignItems: 'center' },
  emptyText: { color: '#666' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 6 }, shadowRadius: 12, elevation: 3 },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  cardLeft: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#eef6ff', marginRight: 12 },
  cardTitle: { fontWeight: '700' },
  cardSub: { color: '#9aa4b2', marginTop: 4 },
  status: { textTransform: 'capitalize', fontWeight: '700' },
  statusAccepted: { color: '#16a34a' },
  statusRejected: { color: '#ef4444' },
  statusPending: { color: '#f59e0b' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  btn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  btnAccept: { backgroundColor: '#16a34a' },
  btnReject: { backgroundColor: '#ef4444' },
  btnText: { color: '#fff', fontWeight: '700' },
  detailsToggle: { padding: 6 },
  detailsToggleText: { color: '#0A6BFF', fontWeight: '700' },
  detailsCard: { marginTop: 12, padding: 10, backgroundColor: '#f8fafc', borderRadius: 8 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  detailKey: { color: '#9aa4b2' },
  detailVal: { fontWeight: '700' },
});

export default InvitationScreen;
