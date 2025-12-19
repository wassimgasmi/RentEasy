/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, LogBox } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import OnboardingStep2 from './src/screens/OnboardingStep2';
import OnboardingStep3 from './src/screens/OnboardingStep3';
import AuthEntryScreen from './src/screens/AuthEntryScreen';
import HelpCenterScreen from './src/screens/HelpCenterScreen';
import AboutScreen from './src/screens/AboutScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import OtpVerificationScreen from './src/screens/OtpVerificationScreen';
import PrecheckScreen from './src/screens/PrecheckScreen';
import GetToKnowYouScreen from './src/screens/GetToKnowYouScreen';
import SetPasscodeScreen from './src/screens/SetPasscodeScreen';
import VerificationIdentityScreen from './src/screens/VerificationIdentityScreen';
import LoginMobileScreen from './src/screens/LoginMobileScreen';
import Verif2Screen from './src/screens/Verif2Screen';
import DashboardScreen from './src/screens/DashboardScreen';
import AddTenancyScreen from './src/screens/AddTenancyScreen';
import TenancyDetailsScreen from './src/screens/TenancyDetailsScreen';
import TransactionHistoryScreen from './src/screens/TransactionHistoryScreen';
import TransactionReceiptScreen from './src/screens/TransactionReceiptScreen';
import InvitationScreen from './src/screens/InvitationScreen';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [showWelcome, setShowWelcome] = useState(false);
  const [showOnboardingStep, setShowOnboardingStep] = useState(0); // 0 = none, 1 = step1, 2 = step2, 3 = step3
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpPhone, setOtpPhone] = useState('');
  const [showPrecheck, setShowPrecheck] = useState(false);
  const [showGetToKnow, setShowGetToKnow] = useState(false);
  const [showSetPasscode, setShowSetPasscode] = useState(false);
  const [showVerificationIdentity, setShowVerificationIdentity] = useState(false);
  const [showEnterOmanId, setShowEnterOmanId] = useState(false);
  const [showLoginMobile, setShowLoginMobile] = useState(false);
  const [showVerif2, setShowVerif2] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAddTenancy, setShowAddTenancy] = useState(false);
  const [showTenancyDetails, setShowTenancyDetails] = useState(false);
  const [tenancyType, setTenancyType] = useState('');
  const [showTransactions, setShowTransactions] = useState(false);
  const [showTransactionReceipt, setShowTransactionReceipt] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showInvitation, setShowInvitation] = useState(false);
  const [transactionActiveTab, setTransactionActiveTab] = useState<string>('all');

  useEffect(() => {
    // ignore timer warnings if any
    LogBox.ignoreAllLogs();

    const t = setTimeout(() => setShowWelcome(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      {!showWelcome ? (
        <SplashScreen />
      ) : showOnboardingStep === 0 ? (
        <WelcomeScreen
          onGetStarted={() => {
            setShowOnboardingStep(1);
          }}
        />
      ) : showOnboardingStep === 1 ? (
        <OnboardingScreen
          onContinue={() => {
            setShowOnboardingStep(2);
          }}
        />
      ) : showOnboardingStep === 2 ? (
        <OnboardingStep2
          onContinue={() => {
            setShowOnboardingStep(3);
          }}
        />
      ) : showOnboardingStep === 3 ? (
          <OnboardingStep3
            onContinue={() => {
              // show authentication entry screen
              setShowOnboardingStep(4);
            }}
          />
        ) : showOnboardingStep === 4 ? (
            showHelpCenter ? (
              <HelpCenterScreen onClose={() => setShowHelpCenter(false)} />
            ) : showAbout ? (
              <AboutScreen onClose={() => setShowAbout(false)} />
            ) : (
              showRegister ? (
                <RegisterScreen
                  onBack={() => setShowRegister(false)}
                  onNext={(phone) => {
                    // Open OTP verification screen and pass phone
                    setShowRegister(false);
                    setOtpPhone(phone || '');
                    setShowOtp(true);
                  }}
                />
              ) : showOtp ? (
                <OtpVerificationScreen
                  phone={otpPhone}
                  onBack={() => {
                    // go back to register to edit phone
                    setShowOtp(false);
                    setShowRegister(true);
                  }}
                  onVerify={(code) => {
                    // On successful OTP verification, show precheck screen
                    setShowOtp(false);
                    setShowPrecheck(true);
                  }}
                />
              ) : showPrecheck ? (
                <PrecheckScreen onBack={() => setShowPrecheck(false)} onContinue={() => { setShowPrecheck(false); setShowGetToKnow(true); }} />
              ) : showGetToKnow ? (
                <GetToKnowYouScreen
                  onBack={() => { setShowGetToKnow(false); setShowPrecheck(true); }}
                  onNext={(data) => { setShowGetToKnow(false); setShowSetPasscode(true); }}
                />
              ) : showSetPasscode ? (
                <SetPasscodeScreen
                  onBack={() => { setShowSetPasscode(false); setShowGetToKnow(true); }}
                  onNext={() => { setShowSetPasscode(false); setShowVerificationIdentity(true); }}
                />
              ) : showVerificationIdentity ? (
                <VerificationIdentityScreen
                  // go back to passcode edit if needed
                  onBack={() => { setShowVerificationIdentity(false); setShowSetPasscode(true); }}
                  // Maybe later should return to the Auth entry screen
                  onMaybeLater={() => { setShowVerificationIdentity(false); setShowOnboardingStep(4); }}
                  onStart={() => { setShowVerificationIdentity(false); setShowEnterOmanId(true); }}
                />
              ) : showEnterOmanId ? (
                // Enter Oman ID screen
                // navigate back to verification with onBack or close to auth on next
                require('./src/screens/EnterOmanIdScreen').default ? (
                  // dynamic render
                  React.createElement(require('./src/screens/EnterOmanIdScreen').default, {
                    onBack: () => { setShowEnterOmanId(false); setShowVerificationIdentity(true); },
                    onNext: (id: string) => { console.log('Oman ID entered:', id); setShowEnterOmanId(false); setShowOnboardingStep(4); },
                    onLoginWithMobile: () => { setShowEnterOmanId(false); setShowLoginMobile(true); },
                  })
                ) : null
              ) : showLoginMobile ? (
                // Login with Mobile screen
                require('./src/screens/LoginMobileScreen').default ? (
                  React.createElement(require('./src/screens/LoginMobileScreen').default, {
                    onBack: () => { setShowLoginMobile(false); setShowEnterOmanId(true); },
                    onNext: (phone?: string) => { setShowLoginMobile(false); setOtpPhone(''); setShowVerif2(true); },
                    onUseOmanId: () => { setShowLoginMobile(false); setShowEnterOmanId(true); },
                  })
                ) : null
              ) : showVerif2 ? (
                <Verif2Screen
                  phone={otpPhone}
                  onBack={() => { setShowVerif2(false); setShowLoginMobile(true); }}
                  onNext={() => { setShowVerif2(false); setShowDashboard(true); }}
                />
              ) : showDashboard ? (
                showAddTenancy ? (
                  <AddTenancyScreen
                    onClose={() => setShowAddTenancy(false)}
                    onAdd={(type) => {
                      // open tenancy details form for the selected type
                      setShowAddTenancy(false);
                      setTenancyType(type || 'Residential');
                      setShowTenancyDetails(true);
                    }}
                  />
                ) : showTenancyDetails ? (
                  <TenancyDetailsScreen
                    tenancyType={tenancyType}
                    onBack={() => { setShowTenancyDetails(false); setShowDashboard(true); }}
                    onSubmit={(data) => {
                      // TODO: save tenancy data
                      console.log('Tenancy saved', data);
                      setShowTenancyDetails(false);
                      setShowDashboard(true);
                    }}
                  />
                ) : (
                  showTransactionReceipt ? (
                    <TransactionReceiptScreen
                      transaction={selectedTransaction}
                      onBack={() => {
                        // Close receipt and return to transaction list (preserve tab)
                        setShowTransactionReceipt(false);
                        setSelectedTransaction(null);
                        setShowTransactions(true);
                      }}
                    />
                  ) : showTransactions ? (
                    <TransactionHistoryScreen
                      onBack={() => {
                        // Ensure we return to dashboard when backing out of transactions
                        setShowTransactions(false);
                        setShowDashboard(true);
                      }}
                      activeTab={transactionActiveTab}
                      onChangeTab={(t: string) => setTransactionActiveTab(t)}
                      onOpenReceipt={(tx: any) => { setSelectedTransaction(tx); setShowTransactionReceipt(true); }}
                    />
                  ) : showInvitation ? (
                    <InvitationScreen onBack={() => { setShowInvitation(false); setShowDashboard(true); }} />
                  ) : (
                    <DashboardScreen onAddTenancy={() => setShowAddTenancy(true)} onOpenWallet={() => setShowTransactions(true)} onOpenInvitation={() => setShowInvitation(true)} />
                  )
                )
              ) : (
                <AuthEntryScreen
                  onLogin={() => {
                    // Open EnterOmanIdScreen when user presses Login
                    setShowEnterOmanId(true);
                  }}
                  onRegister={() => {
                    // Open the register screen (new flow)
                    setShowRegister(true);
                  }}
                  onOpenHelp={() => setShowHelpCenter(true)}
                  onOpenAbout={() => setShowAbout(true)}
                />
              )
            )
        ) : (
          <OnboardingStep3
            onContinue={() => {
              console.log('Onboarding finished - navigate to main app');
            }}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
