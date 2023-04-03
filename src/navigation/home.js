import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import { DetailsScreen } from './DetailScreen';

const HomeStack = createStackNavigator();

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
    </HomeStack.Navigator>
  );
}