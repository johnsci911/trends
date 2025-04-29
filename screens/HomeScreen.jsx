import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
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
    }
  ]

  function gotoProfile() {
    navigation.navigate('Profile Screen');
  }

  function gotoSingleTweet() {
    navigation.navigate('Tweet Screen');
  }

  function gotoNewTweet() {
    navigation.navigate('New Tweet');
  }

  const renderItem = ({ item }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => gotoProfile()}>
        <Image style={styles.avatar} source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.flexRow} onPress={() => gotoSingleTweet()}>
          <Text numberOfLines={1} style={styles.tweetName}>{item.title}</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>@jkcachero</Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>9am</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tweetContentContainer} onPress={() => gotoSingleTweet()}>
          <Text style={styles.tweetContent}>Amet vel ratione expedita numquam soluta! Aperiam natus asperiores dicta0</Text>
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
              name={Platform.OS === 'ios'? 'share-apple' : 'share-google'}
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
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.tweetSeparator} />}
      />
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
    justifyContent:'start',
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
