import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import axiosConfig from '../../helpers/axiosConfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function register(username, email, password, confirmPassword) {
    if (name.length < 1) {
      Alert.alert('Name is required')

      return
    }

    setIsLoading(true);
    axiosConfig
      .post('/register', {
        name,
        email,
        username,
        password,
        password_confirmation: confirmPassword,
      })
      .then((response) => {
        setIsLoading(false);
        setError(null);
        Alert.alert('You are now registered!');
        navigation.navigate('Login Screen');
      })
      .catch((error) => {
        console.log(error.response)
        const key = Object.keys(error.response.data.errors)[0];
        setError(error.response.data.errors[key][0]);
        setIsLoading(false);
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0} // adjust as needed
      style={styles.container}
    >
      <ScrollView
        // Get width of screen
        contentContainerStyle={{ alignItems: 'center', flexGrow: 1, alignSelf: 'center', width: Dimensions.get('window').width }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginTop: 130, width: 260 }}>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={styles.logo}
              source={require('../../assets/larydefault.png')}
            />
          </View>
          <View style={{ marginTop: 40 }}>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={setName}
              value={name}
              placeholder="Name"
              placeholderTextColor="gray"
            />
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              placeholderTextColor="gray"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
              placeholderTextColor="gray"
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              placeholderTextColor="gray"
              autoCapitalize="none"
              secureTextEntry={true}
            />
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              autoCapitalize="none"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            onPress={() => register(username, email, password, confirmPassword)}
            style={[styles.loginButton, styles.mt5]}
          >
            {isLoading && (
              <ActivityIndicator
                size="small"
                color="white"
                style={{ marginRight: 18 }}
              />
            )}
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 12,
            }}
          >
            <Text style={[styles.registerText]}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
              <Text style={styles.registerTextLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
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
  registerText: {
    fontSize: 12,
  },
  registerTextLink: {
    fontSize: 12,
    color: 'white',
    textDecorationLine: 'underline',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  mt4: {
    marginTop: 16,
  },

  mt5: {
    marginTop: 22,
  },
});
