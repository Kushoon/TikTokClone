import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';

import Post from '../../components/Post';

import {API, graphqlOperation} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      //Fetch all the posts
      try {
        const res = await API.graphql(graphqlOperation(listPosts));

        setPosts(res.data.listPosts.items);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 130}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
    </View>
  );
};

export default Home;
