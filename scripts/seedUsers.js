const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const users = [
  // Analistas
  {
    username: 'a.a.abreu',
    role: 'analyst',
    active: true,
    createdAt: new Date(),
  },
  {
    username: 'a.bergamini.borgueti',
    role: 'analyst',
    active: true,
    createdAt: new Date(),
  },
  {
    username: 'a.de.almeida.marcalo',
    role: 'analyst',
    active: true,
    createdAt: new Date(),
  },
  {
    username: 'a.de.oliveira.filho',
    role: 'analyst',
    active: true,
    createdAt: new Date(),
  },

  // QSAs
  {
    username: 'a.luis.pires.pinto',
    role: 'qsa',
    active: true,
    createdAt: new Date(),
  },
  {
    username: 'a.muniz.egerland',
    role: 'qsa',
    active: true,
    createdAt: new Date(),
  },
  {
    username: 'a.oliveira.cordeiro',
    role: 'qsa',
    active: true,
    createdAt: new Date(),
  },
  { username: 'afonso.rosa', role: 'qsa', active: true, createdAt: new Date() },
];

async function seedUsers() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('🔌 Connected to MongoDB');

    const db = client.db('job-alignment');
    const collection = db.collection('users');

    // Limpar usuários existentes
    await collection.deleteMany({});
    console.log('🗑️ Cleared existing users');

    // Inserir novos usuários
    const result = await collection.insertMany(users);
    console.log(`✅ Inserted ${result.insertedCount} users successfully!`);

    // Mostrar usuários inseridos
    const insertedUsers = await collection.find({}).toArray();
    console.log('\n👥 Users in database:');
    insertedUsers.forEach(user => {
      console.log(`   ${user.role.toUpperCase()}: ${user.username}`);
    });
  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Connection closed');
  }
}

seedUsers();
