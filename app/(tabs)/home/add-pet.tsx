import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddPet() {

    const router = useRouter();
    const [name, setName] = useState('');
    const [type, setType] = useState<'Chien' | 'Chat' | 'Lapin'>('Chien');
    const [birthDate, setBirthDate] = useState('');

    const handleAdd = () => {
        // Ici tu peux stocker l'animal dans un store ou base de données
        console.log({ name, type, birthDate });
        router.back(); // Retour à la liste après ajout
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nom de l'animal</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <Text style={styles.label}>Date de naissance</Text>
            <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={birthDate}
                onChangeText={setBirthDate}
            />
            <Button title="Ajouter"
                onPress={handleAdd} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'column', padding: 16 },
    label: { fontSize: 16, marginTop: 16 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 8,
    },
});