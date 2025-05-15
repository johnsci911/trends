import { EvilIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, FlatList, ActivityIndicator } from 'react-native';
import axiosConfig from '../helpers/axiosConfig';
import { format } from 'date-fns';
import RenderItem from '../components/RenderItem';

export default function ProfileScreen({ route, navigation }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const [isLoadingTweets, setIsLoadingTweets] = useState(true);
  const [isRefreshingTweets, setIsRefreshingTweets] = useState(false);

  useEffect(() => {
    getUserTweets();
    getUserProfile();
  }, [page])

  function getUserTweets() {
    axiosConfig
      .get(`/users/${route.params.userId}/tweets?page=${page}`)
      .then(response => {
        console.log(response.data);

        if (page === 1) {
          setData(response.data.data);
        } else {
          setData([
            ...data,
            ...response.data.data,
          ]);
        }

        if (!response.data.next_page_url) {
          setIsAtEndOfScrolling(true);
        }

        setIsLoadingTweets(false);
        setIsRefreshingTweets(false);
      })
      .catch(error => {
        console.error(error);
        setIsRefreshingTweets(false);
      });
  }


  function getUserProfile() {
    axiosConfig
      .get(`/users/${route.params.userId}`)
      .then(response => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      })
  }

  function handleRefresh() {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshingTweets(true);
    getUserTweets();
  }

  function handleEnd() {
    setPage(page + 1);
  }

  const ProfileHeader = () => (
    <View style={styles.container}>
      {isLoadingTweets ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <>
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
                uri: user.avatar,
              }}
            />
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>
                Follow
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileHandle}>@{user.username}</Text>
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.profileContainerText}>
              {user.profile}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <EvilIcons name="location" size={24} color="gray" />
            <Text style={styles.textGray}>{user.location}</Text>
          </View>
          <View style={styles.linkContainer}>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => { Linking.openURL(user.link) }}
            >
              <EvilIcons name="link" size={24} color="gray" />
              <Text style={styles.linkColor}>{user.link_text}</Text>
            </TouchableOpacity>
            <View style={[styles.linkItem, styles.ml4]}>
              <EvilIcons name="calendar" size={24} color="gray" />
              <Text style={styles.textGray}>Joined {format(new Date(user.created_at), 'MMM yyyy')}</Text>
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
        </>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" style={{ marginTop: 8 }} />
      ) : (
        <FlatList
          data={data}
          renderItem={props => <RenderItem {...props} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={ProfileHeader}
          refreshing={isRefreshingTweets}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => !isAtEndOfScrolling && (
            <ActivityIndicator size="large" color="gray" style={{ marginBottom: 10 }} />
          )}
          scrollIndicatorInsets={{ right: 1 }}
        />
      )}
    </View>
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

