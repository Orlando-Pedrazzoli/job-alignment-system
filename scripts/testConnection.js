const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB connection...');
    console.log(
      'URI:',
      process.env.MONGODB_URI ? 'URI loaded' : 'URI not found'
    );

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    console.log('✅ Connected successfully!');

    // Listar databases
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log(
      '📁 Available databases:',
      dbs.databases.map(db => db.name)
    );

    await client.close();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
