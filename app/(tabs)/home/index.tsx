import { Link, Stack } from "expo-router";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DATA = [
  { id: '1', title: 'Coppa' },
  { id: '2', title: 'Sushi' },
];

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Mes Animaux',
          headerRight: () => (
            <Link href="/home/add-pet" asChild>
              <TouchableOpacity style={styles.addButton}>
                <Text style={{ color: 'white' }}>Ajouter</Text>
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            asChild
            href={{
              pathname: '/home/pet/[id]',
              params: { id: item.title, name: item.title }
            }}
            style={styles.item}

          >
            <TouchableOpacity >
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Image
                  source={{
                    uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
                  }}
                  style={{ width: 40, height: 40 }}
                />
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>Link to {item.title} page</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        style={{ width: "100%", flex: 1, backgroundColor: "silver" }}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  title: { fontSize: 18 },
  addButton: { padding: 10, borderRadius: 8 },
});