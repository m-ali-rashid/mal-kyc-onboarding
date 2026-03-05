// import React from 'react'
// import LoginView from '../../organisms/LoginView'

// export default function LoginScreen() {
//   return <LoginView />
// }
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const GeometricShapes = () => {
  return (
    <View style={styles.shapesContainer}>
      <View style={styles.pinkShape} />
      <View style={styles.smallPinkCircle} />
      <View style={styles.blueShape}>
        <View style={styles.diagonalLine} />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <LinearGradient
        colors={['#ff9a9e', '#6c5ce7', '#1a1a1a']}
        locations={[0, 0.4, 1]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brandText}>MYMONEY.</Text>
        </View>

        {/* Geometric Shapes */}
        <GeometricShapes />

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.mainTitle}>All your finances{'\n'}in one app</Text>
          
          <Text style={styles.subtitle}>
            Manage your finances in our app.{'\n'}
            We do everything to keep your money safe.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 60,
    alignItems: 'flex-end',
  },
  brandText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 1,
  },
  shapesContainer: {
    flex: 1,
    position: 'relative',
    marginTop: 40,
  },
  pinkShape: {
    position: 'absolute',
    left: 20,
    top: 60,
    width: 120,
    height: 120,
    backgroundColor: '#ff9a9e',
    borderRadius: 20,
    opacity: 0.9,
  },
  triangleOutline: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  diagonalLine: {
    position: 'absolute',
    width: 160,
    height: 2,
    backgroundColor: 'white',
    left: 20,
    top: 20,
    transform: [{ rotate: '-45deg' }],
    opacity: 0.9,
  },
  blueShape: {
    position: 'absolute',
    right: -20,
    top: 20,
    width: 200,
    height: 200,
    backgroundColor: '#6c5ce7',
    borderRadius: 100,
    opacity: 0.9,
  },
  whiteLine: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  smallPinkCircle: {
    position: 'absolute',
    right: 80,
    bottom: 100,
    width: 40,
    height: 40,
    backgroundColor: '#ff9a9e',
    borderRadius: 20,
    opacity: 0.8,
  },
  content: {
    paddingBottom: 60,
  },
  mainTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: 'white',
    lineHeight: 50,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    lineHeight: 24,
    fontWeight: '400',
  },
  buttonContainer: {
    paddingBottom: 40,
    gap: 16,
  },
  loginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
