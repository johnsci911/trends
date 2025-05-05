import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList } from 'react-native';

export default function ProfileScreen() {
  const DATA = [
    {
      id: 1,
      title: 'Tweet 1',
    },
    {
      id: 2,
      title: 'Tweet 2',
    },
    {
      id: 3,
      title: 'Tweet 3',
    },
    {
      id: 4,
      title: 'Tweet 4',
    },
    {
      id: 5,
      title: 'Tweet 5',
    },
    {
      id: 6,
      title: 'Tweet 6',
    },
    {
      id: 7,
      title: 'Tweet 7',
    },
    {
      id: 8,
      title: 'Tweet 8',
    },
    {
      id: 9,
      title: 'Tweet 9',
    },
    {
      id: 10,
      title: 'Tweet 10',
    },
  ]

  const ProfileHeader = () => (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
        }}
      ></Image>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>
            Follow
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.profileName}>John Karlo</Text>
        <Text style={styles.profileHandle}>@jkCachero</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileContainerText}>
          CEO of Bloomberg, Vice President of Marketing, and Director of Strategic Partnerships at Twitter.
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <EvilIcons name="location" size={24} color="gray" />
        <Text style={styles.textGray}>Toronto, Canada</Text>
      </View>
      <View style={styles.linkContainer}>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => { Linking.openURL('https://google.com') }}
        >
          <EvilIcons name="link" size={24} color="gray" />
          <Text style={styles.linkColor}>google.com</Text>
        </TouchableOpacity>
        <View style={[styles.linkItem, styles.ml4]}>
          <EvilIcons name="calendar" size={24} color="gray" />
          <Text style={styles.textGray}>Joined May 2018</Text>
        </View>
      </View>
      <View style={styles.followContainer}>
        <View style={styles.followItem}>
          <Text style={styles.followItemNumber}>550</Text>
          <Text style={styles.followItemLabel}>Following</Text>
        </View>
        <View style={[styles.followItem, styles.ml4]}>
          <Text style={styles.followItemNumber}>10,331</Text>
          <Text style={styles.followItemLabel}>Following</Text>
        </View>
      </View>
      <View style={styles.separator}></View>
    </View>
  )

  const renderItem = ({ item }) => (
    <View style={{
      marginVertical: 10,
      marginHorizontal: 10,
    }}>
      <Text>{item.title}</Text>
    </View>
  )

  return (
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={ProfileHeader}
      />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bsckgroundColor: 'white',
  },
  backgroundImage: {
    width: 800,
    height: 120,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginTop: -34,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
  },
  followButton: {
    backgroundColor: '#0f1418',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  profileHandle: {
    color: 'gray',
    marginTop: 1,
  },
  profileContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  profileContainerText: {
    lineHeight: 22,
  },
  textGray: {
    color: 'gray',
  },
  locationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ml4: {
    marginLeft: 16
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'gray',
  },
  linkColor: {
    color: '#1d9bf1',
  },
  linkContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  followContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  followItem: {
    flexDirection: 'row',
  },
  followItemNumber: {
    fontWeight: 'bold',
  },
  followItemLabel: {
    marginLeft: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
})

