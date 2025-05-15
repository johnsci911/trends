import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import formatDistance from '../helpers/formatDistanceCustom';
import { useNavigation } from '@react-navigation/native';

export default function RenderItem({ item: tweet }) {
  const navigation = useNavigation();

  function gotoProfile(userId) {
    navigation.navigate('Profile Screen', {
      userId
    });
  }

  function gotoSingleTweet(tweetId) {
    navigation.navigate('Tweet Screen', {
      tweetId,
    });
  }

  return (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => gotoProfile(tweet.user.id)}>
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
}
const styles = {
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
}
