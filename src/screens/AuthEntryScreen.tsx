import React, { useRef, useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// Try to require native BlurView if available at runtime. We use a dynamic require
// so the app won't crash if the native module isn't installed.
let BlurView: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('@react-native-community/blur');
  BlurView = mod && (mod.BlurView || mod.default || mod);
} catch (e) {
  BlurView = null;
}

const AnimatedBlurView = BlurView ? Animated.createAnimatedComponent(BlurView) : null;


type Props = {
  onLogin?: () => void;
  onRegister?: () => void;
  onOpenHelp?: () => void;
  onOpenAbout?: () => void;
};

const AuthEntryScreen: React.FC<Props> = ({ onLogin, onRegister, onOpenHelp, onOpenAbout }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnim = useRef(new Animated.Value(0)).current; // 0 = closed, 1 = open
  const PANEL_WIDTH = Dimensions.get('window').width * 0.78;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(menuAnim, {
      toValue: 1,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = (cb?: () => void) => {
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 240,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
      if (cb) cb();
    });
  };

  const itemAnimStyle = (index: number) => {
    const delayFactor = 0.08 * index; // makes each item slightly offset
    return {
      opacity: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
      transform: [
        {
          translateX: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [24 + index * 8, 0], extrapolate: 'clamp' }),
        },
      ],
    } as any;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header} />

        <View style={styles.logoWrap}>
          {/* Menu button */}
          <TouchableOpacity style={styles.menuIcon} onPress={openMenu} activeOpacity={0.85}>
            <Ionicons name="menu" size={22} color="#fff" />
          </TouchableOpacity>

          {/* diamonds and underline remain unchanged when menu opens */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }} pointerEvents="none">
            <View style={styles.diamondLeft} />
            <View style={styles.diamondRight} />
          </View>

          <View style={styles.underline} pointerEvents="none" />
        </View>

        <Image source={require('../assets/imgauth.png')} style={styles.illustration} resizeMode="contain" />

        {/* Main content - unchanged when menu opens */}
        <View style={styles.mainContent}>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.loginButton} onPress={onLogin} activeOpacity={0.85}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={onRegister} activeOpacity={0.85}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu overlay + animated panel */}
        {menuVisible && (
          <View style={styles.menuOverlay} pointerEvents={menuVisible ? 'auto' : 'none'}>
            {/* Animated blur or translucent overlay covering the screen but placed behind the panel */}
            {AnimatedBlurView ? (
              <AnimatedBlurView
                style={[styles.fullscreenBlur, { opacity: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }]}
                blurType="light"
                blurAmount={16}
                reducedTransparencyFallbackColor="white"
              />
            ) : (
              <Animated.View style={[styles.fullscreenBlurFallback, { opacity: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.88] }) }]} />
            )}

            <Animated.View
              style={[
                styles.menuPanel,
                {
                  transform: [{ translateX: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [-PANEL_WIDTH, 0] }) }],
                  opacity: menuAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.6, 1] }),
                },
              ]}
            >
              <View style={styles.menuHeader}>
                <TouchableOpacity style={styles.menuClose} onPress={() => closeMenu()} activeOpacity={0.85}>
                  <Text style={styles.menuCloseArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.menuTitle}>Information</Text>
              </View>

              <ScrollView style={styles.menuItems} contentContainerStyle={styles.menuItemText} showsVerticalScrollIndicator={false}>
                <Animated.View style={[styles.menuItemContainer, itemAnimStyle(0)]}>
                  <TouchableOpacity style={styles.menuItem} activeOpacity={0.85} onPress={() => { /* no-op */ }}>
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuItemIcon}>
                        <Feather name="wallet" size={18} color="#4C8DFF" />
                      </View>
                    </View>
                    <Text style={styles.menuItemText}>App settings</Text>
                    <Text style={styles.menuItemChevron}>›</Text>
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[styles.menuItemContainer, itemAnimStyle(1)]}>
                  <TouchableOpacity style={styles.menuItem} activeOpacity={0.85} onPress={() => { closeMenu(); if (typeof onOpenHelp === 'function') onOpenHelp(); }}>
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuItemIcon}>
                        <Feather name="wallet" size={18} color="#4C8DFF" />
                      </View>
                    </View>
                    <Text style={styles.menuItemText}>Help Center</Text>
                    <Text style={styles.menuItemChevron}>›</Text>
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[styles.menuItemContainer, itemAnimStyle(2)]}>
                  <TouchableOpacity style={styles.menuItem} activeOpacity={0.85} onPress={() => { closeMenu(); if (typeof onOpenAbout === 'function') onOpenAbout(); }}>
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuItemIcon}>
                        <Feather name="wallet" size={18} color="#4C8DFF" />
                      </View>
                    </View>
                    <Text style={styles.menuItemText}>About RentEasy</Text>
                    <Text style={styles.menuItemChevron}>›</Text>
                  </TouchableOpacity>
                </Animated.View>

                <View style={{ height: 220 }} />
              </ScrollView>
            </Animated.View>

            {/* Backdrop: transparent touch layer so underlying UI isn't visually changed */}
            <TouchableOpacity style={styles.backdropTouchable} activeOpacity={1} onPress={() => closeMenu()} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// ======================================================================
//                            STYLES
// ======================================================================

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },

  header: { height: 6, backgroundColor: '#007bff', marginTop: 12, borderRadius: 2 },

  logoWrap: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 28,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  diamondLeft: {
    width: 50,
    height: 50,
    backgroundColor: '#006AFF',
    transform: [{ rotate: '45deg' }],
    marginRight: -18,
    zIndex: 2,
  },

  diamondRight: {
    width: 50,
    height: 50,
    backgroundColor: '#5FA7FF',
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },

  underline: {
    position: 'absolute',
    bottom: -12,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#007bff',
    borderRadius: 2,
  },

  illustration: { width: '100%', height: 220, marginTop: 0, marginBottom: 20 },

  mainContent: { width: '100%', alignItems: 'center' },

  menuItemContainer: { overflow: 'hidden' },

  // =============== Top-left MENU BUTTON ===============
  menuIcon: {
    position: 'absolute',
    left: -4,
    top: 10,
    backgroundColor: '#007bff',
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconSymbol: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },

  // =============== SIDE MENU OVERLAY ===============
  menuOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'row',
  },
   backdrop: { flex: 1, backgroundColor: 'rgba(255,255,255,0.6)' },
  backdropTouchable: { flex: 1, backgroundColor: 'transparent' },
  fullscreenBlur: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  fullscreenBlurFallback: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.6)' },

  // =============== SIDE MENU PANEL ===============
  menuPanel: {
    width: '78%',
    backgroundColor: '#fff',
    paddingVertical: 32,
    paddingHorizontal: 22,
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: -6, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 20,
  },
    /* Backdrop uses a translucent white to simulate blur on the uncovered area */

  menuClose: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginRight: 12,
  },
  menuCloseArrow: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    flex: 1,
    textAlign: 'center',
  },

  menuItems: { marginTop: 10 },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingVertical: 18,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  menuItemText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '500',
    position: 'absolute',
    left: 60,
    right: 40,
    textAlign: 'center',
  },
  menuItemChevron: {
    color: '#4C8DFF',
    fontSize: 22,
    marginRight: 4,
  },

  /* menu item left group */
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemIcon: {
    width: 34,
    height: 24,
    borderRadius: 6,
    borderWidth: 0,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#fff',
  },
  menuItemIconImage: {
    width: 18,
    height: 14,
  },

  // Login / Register buttons
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },

  loginButton: {
    flex: 1,
    marginRight: 12,
    paddingVertical: 14,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#007bff',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  registerButton: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  loginText: { color: '#007bff', fontWeight: '600' },
  registerText: { color: '#fff', fontWeight: '600' },
});

export default AuthEntryScreen;
