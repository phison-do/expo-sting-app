import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';
import { DetailsScreen } from './DetailScreen';

const AccountStack = createStackNavigator();

export const AccountScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welkom</Text>
      <Button
        title="Mijn Bestellingen"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Mijn retouren"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Mijn profiel"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Beoordeel onze app"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Klantenservice"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Gebruiksvoorwaarden"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator >
      <AccountStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <AccountStack.Screen name="Details" component={DetailsScreen} />
    </AccountStack.Navigator>
  );
}