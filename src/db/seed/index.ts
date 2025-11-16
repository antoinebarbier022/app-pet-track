import { db } from '../index';
import { pets, weights } from '../schema';

// Fonction helper pour générer un timestamp
const daysAgo = (days: number) => Date.now() - days * 24 * 60 * 60 * 1000;

export async function seedDatabase() {
  console.log('🌱 Démarrage du seed...');

  // Nettoyage de la base (optionnel)
  db.delete(weights).run();
  db.delete(pets).run();

  // Insertion des animaux
  const insertedPets = db
    .insert(pets)
    .values([
      { name: 'Rex', type: "cat", birthDate: new Date(daysAgo(365 * 3)) },
      { name: 'Mia', type: "dog", birthDate: new Date(daysAgo(365 * 2)) },
      { name: 'Bunny', type: "rabbit", birthDate: new Date(daysAgo(365)) },
    ])
    .returning({ id: pets.id })
    .all();

  console.log(`🐾 ${insertedPets.length} animaux ajoutés.`);

  // Ajout de quelques mesures de poids
  const [rex, mia, bunny] = insertedPets;

  db.insert(weights)
    .values([
      // Rex
      { petId: rex.id, recordedAt: new Date(daysAgo(30)), weightKg: 12.1 },
      { petId: rex.id, recordedAt: new Date(daysAgo(15)), weightKg: 12.5 },
      { petId: rex.id, recordedAt: new Date(daysAgo(5)), weightKg: 12.8 },

      // Mia
      { petId: mia.id, recordedAt: new Date(daysAgo(20)), weightKg: 4.3 },
      { petId: mia.id, recordedAt: new Date(daysAgo(10)), weightKg: 4.4 },

      // Bunny
      { petId: bunny.id, recordedAt: new Date(daysAgo(25)), weightKg: 2.1 },
      { petId: bunny.id, recordedAt: new Date(daysAgo(5)), weightKg: 2.2 },
    ])
    .run();

  console.log('⚖️ Données de poids insérées avec succès.');
  console.log('✅ Seed terminé !');
}

