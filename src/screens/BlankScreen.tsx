import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const BlankScreen: React.FC = () => {
  return <SafeAreaView style={styles.container} />;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
});

export default BlankScreen;
