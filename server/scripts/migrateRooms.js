const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const migrate = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required');
  await mongoose.connect(process.env.MONGO_URI);
  const result = await mongoose.connection.collection('rooms').updateMany(
    { depth: { $exists: false }, length: { $exists: true } },
    [{ $set: { depth: '$length' } }, { $unset: 'length' }]
  );
  console.log(`Migrated ${result.modifiedCount} room record(s)`);
  await mongoose.disconnect();
};

migrate().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect().catch(() => {});
  process.exitCode = 1;
});
