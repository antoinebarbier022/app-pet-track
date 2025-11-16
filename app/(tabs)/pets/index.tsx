import { usePets } from "@/features/pet/hooks/use-pets";
import { Link, Stack } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { data } = usePets();
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
          title: "Mes Animaux",
          headerRight: () => (
            <Link href="/pets/add-pet" asChild>
              <TouchableOpacity style={styles.addButton}>
                <Text style={{ color: "white" }}>Ajouter</Text>
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Link
            asChild
            href={{
              pathname: "/pets/pet-detail",
              params: { id: item.id, name: item.name },
            }}
            style={styles.item}
          >
            <TouchableOpacity>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image
                  source={{
                    uri: "https://reactnative.dev/docs/assets/p_cat2.png",
                  }}
                  style={{ width: 40, height: 40 }}
                />
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text>Link to {item.name} page</Text>
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
  container: { flex: 1, backgroundColor: "#fff" },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  title: { fontSize: 18 },
  addButton: { padding: 10, borderRadius: 8 },
});
