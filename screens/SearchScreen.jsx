import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import axiosConfig from '../helpers/axiosConfig';
import { AuthContext } from '../components/context/AuthProvider';

export default function SearchScreen() {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    axiosConfig
      .get('/user')
      .then(response => {
        console.log(JSON.stringify(response, null, 2));
        console.log(user.avatar);
      })
      .catch(error => {
        console.log(JSON.stringify(error.response.data.message, null, 2));
      });
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search Screen</Text>
    </View>
  )
}
