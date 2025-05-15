import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axiosConfig from '../helpers/axiosConfig';
import RenderItem from '../components/RenderItem';

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

  function gotoNewTweet() {
    navigation.navigate('New Tweet');
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="gray" style={{
          marginTop: 8,
        }} />
      ) : (
        <FlatList
          data={data}
          renderItem={props => <RenderItem {...props} />}
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
  },
}
