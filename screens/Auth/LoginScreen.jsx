import React, { useContext, useState } from 'react';
import { ActivityIndicator, Button, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Dimensions } from "react-native";
import { AuthContext } from '../../components/context/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0} // adjust as needed
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', flexGrow: 1, alignSelf: 'center', width: Dimensions.get('window').width }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginTop: 130, width: 260 }}>
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.logo} source={require('../../assets/larydefault.png')}></Image>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={{ marginTop: 40 }}>
              {error && <Text style={{ color: 'red' }}>{error}</Text>}
              <TextInput
                style={[styles.inputBox, styles.mt4]}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                placeholderTextColor="gray"
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
              />
              <TextInput
                style={[styles.inputBox, styles.mt4]}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor="gray"
                autoCapitalize='none'
                secureTextEntry={true}
              />
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity onPress={() => login(email, password)} style={[styles.loginButton, styles.mt5]}>
            {isLoading && (
              <ActivityIndicator size="small" style={{ marginRight: 18 }} color="white" />
            )}
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
            <Text style={styles.registerText}>Do you have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register Screen')}>
              <Text style={styles.registerTextLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d9bf1',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 120,
  },
  inputBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  mt4: {
    marginTop: 16,
  },
  mt5: {
    marginTop: 22,
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0084b3',
    padding: 12,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
  },
  registerTextLink: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  }
})
