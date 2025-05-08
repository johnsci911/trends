import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import formatDistance from '../helpers/formatDistanceCustom';
import axiosConfig from '../helpers/axiosConfig';

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);

  useEffect(() => {
    getAllTweets();
  }, [page])

  function getAllTweets() {
    axiosConfig
      .get(`/tweets?page=${page}`)
      .then(response => {
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

        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch(error => {
        console.error(error);
        setIsRefreshing(false);
      });
  }

  function handleRefresh() {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(true);
    getAllTweets();
  }

  function handleEnd() {
    setPage(page + 1);
  }

  function gotoProfile() {
    navigation.navigate('Profile Screen');
  }

  function gotoSingleTweet(tweetId) {
    navigation.navigate('Tweet Screen', {
      tweetId: tweetId,
    });
  }

  function gotoNewTweet() {
    navigation.navigate('New Tweet');
  }

  const renderItem = ({ item: tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => gotoProfile()}>
        <Image style={styles.avatar} source={{
          uri: tweet.user.avatar,
        }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.flexRow} onPress={() => gotoSingleTweet(tweet.id)}>
          <Text numberOfLines={1} style={styles.tweetName}>{tweet.user.name}</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>@{tweet.user.username}</Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            {formatDistanceToNowStrict(
              new Date(
                tweet.created_at),
              {
                locale: {
                  ...locale,
                  formatDistance
                }
              }
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tweetContentContainer}
          onPress={() => gotoSingleTweet(tweet.id)}
        >
          <Text style={styles.tweetContent}>{tweet.body}</Text>
        </TouchableOpacity>
        <View style={styles.tweetEngagement}>
          <TouchableOpacity style={styles.flexRow}>
            <EvilIcons name="comment" size={22} color="gray" style={styles.tweetIcon} />
            <Text style={styles.textGray}>100</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flexRow}>
            <EvilIcons name="retweet" size={22} color="gray" style={[styles.tweetIcon, styles.ml4]} />
            <Text style={styles.textGray}>12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flexRow}>
            <EvilIcons name="heart" size={22} color="gray" style={[styles.tweetIcon, styles.ml4]} />
            <Text style={styles.textGray}>1,200</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flexRow}>
            <EvilIcons
              name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
              size={22} color="gray"
              style={[styles.tweetIcon, styles.ml4]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" style={{
          marginTop: 8,
        }} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.tweetSeparator} />}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => !isAtEndOfScrolling && (
            <ActivityIndicator size="large" color="gray" style={{ marginBottom: 10 }} />
          )}
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => gotoNewTweet()}
      >
        <AntDesign name="plus" size={26} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tweetContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    borderRadius: 21,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'start',
    marginBottom: 8,
  },
  tweetName: {
    fontWeight: 'bold',
    color: '#222222',
  },
  tweetHandle: {
    marginHorizontal: 8,
    color: 'gray',
  },
  tweetContentContainer: {
    marginTop: 4,
  },
  tweetContent: {
    lineHeight: 20,
    color: '#666666',
  },
  tweetEngagement: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  textGray: {
    color: 'gray',
  },
  tweetIcon: {
    marginRight: 2,
  },
  ml4: {
    marginLeft: 16
  },
  tweetSeparator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 12,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38A1F3',
    position: 'absolute',
    bottom: 20,
    right: 12,
  }
}
