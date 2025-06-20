import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import axiosConfig from '../helpers/axiosConfig';
import { Modalize } from 'react-native-modalize';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../components/context/AuthProvider';

export default function TweetScreen({ route, navigation }) {
  const [tweet, setTweet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const modalizeRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getTweet();
  }, []);

  function getTweet() {
    axiosConfig
      .get(`/tweets/${route.params.tweetId}`)
      .then(response => {
        setTweet(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
      })
  }

  function gotoProfile(userId) {
    navigation.navigate('Profile Screen', {
      userId
    })
  }

  function showAlert() {
    Alert.alert('Are you sure you want to delete this tweet?', null, [
      {
        text: 'Cancel',
        onPress: () => modalizeRef.current.close(),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => deleteTweet(),
        style: 'default'
      }
    ]);
  }

  function deleteTweet() {
    axiosConfig.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.token}`;

    axiosConfig
      .delete(`/tweets/${route.params.tweetId}`)
      .then(() => {
          Alert.alert('Tweet Deleted', 'Tweet has been deleted successfully.');
          navigation.navigate('Tab', {
            screen: 'Home1',
            params: { tweetDeleted: true }
          });
      })
      .catch(error => {
        console.error(error.response);
      })

  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" style={{ marginTop: 8, }} />
      ) : (
        <>
          <View style={styles.profileContainer}>
            <TouchableOpacity
                style={styles.flexRow}
                onPress={() => gotoProfile(tweet.user.id)}
              >
              <Image
                style={styles.avatar}
                source={{
                  uri: tweet.user.avatar,
                }}
              />
              <View>
                <Text style={styles.tweetName}>{tweet.user.name}</Text>
                <Text style={styles.tweetHandle}>@{tweet.user.username}</Text>
              </View>
            </TouchableOpacity>
            {user.id === tweet.user.id && (
              <TouchableOpacity style={styles.tweetButton} onPress={() => {
                  modalizeRef.current.open();
                }}>
                <Entypo name="dots-three-vertical" size={24} color="gray" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.tweetContentContainer}>
            <Text style={styles.tweetContent}>
              {tweet.body}
            </Text>
            <View style={styles.tweetTimestampContainer}>
              <Text style={styles.tweetTimestampText}>{format(new Date(tweet.created_at), 'h:mm a')}</Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={styles.tweetTimestampText}>{format (new Date(tweet.created_at), 'd MMM.yy')}</Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={[styles.tweetTimestampText, styles.linkColor]}>
                Twitter for iPhone
              </Text>
            </View>
          </View>
          <View style={styles.tweetEngagement}>
            <View style={styles.flexRow}>
              <Text style={styles.tweetEngagementNumber}>600</Text>
              <Text style={styles.tweetEngagementLabel}>Retweets</Text>
            </View>
            <View style={[styles.flexRow, styles.ml4]}>
              <Text style={styles.tweetEngagementNumber}>600</Text>
              <Text style={styles.tweetEngagementLabel}>Quote Tweets</Text>
            </View>
            <View style={[styles.flexRow, styles.ml4]}>
              <Text style={styles.tweetEngagementNumber}>2,299</Text>
              <Text style={styles.tweetEngagementLabel}>Likes</Text>
            </View>
          </View>
          <View style={[styles.tweetEngagement, styles.spaceAround]}>
            <TouchableOpacity>
              <EvilIcons name="comment" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons name="retweet" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons name="heart" size={32} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <EvilIcons
                name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
                size={32}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <Modalize ref={modalizeRef} snapPoint={300}>
            <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
              <TouchableOpacity style={styles.menuButton}>
                <AntDesign name="pushpino" size={24} color="#222" />
                <Text style={styles.menuButtonText}>Pin Tweet</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={showAlert} style={[styles.menuButton, styles.mt6]}>
                <AntDesign name="delete" size={24} color="#222" />
                <Text style={styles.menuButtonText}>Delete Tweet</Text>
              </TouchableOpacity>
            </View>
          </Modalize>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexRow: {
    flexDirection: 'row',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 25,
  },
  tweetName: {
    fontWeight: 'bold',
    color: '#222222',
  },
  tweetHandle: {
    marginTop: 4,
    color: 'gray',
  },
  tweetContentContainer: {
    paddingHorizontal: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tweetContent: {
    fontSize: 20,
    lineHeight: 30,
  },
  tweetEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tweetEngagementNumber: {
    fontWeight: 'bold',
    color: '#222222',
  },
  tweetEngagementLabel: {
    color: 'gray',
    marginLeft: 6,
  },
  ml4: {
    marginLeft: 16
  },
  spaceAround: {
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  tweetTimestampContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  tweetTimestampText: {
    color: 'gray',
    marginRight: 6,
  },
  linkColor: {
    color: '#1d9bf1',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 20,
    color: '#222',
    marginLeft: 12,
  },
  mt6: {
    marginTop: 32,
  },
})

