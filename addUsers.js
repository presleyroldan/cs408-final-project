const { sequelize, User } = require('./backend/models');

const users = [
  { firstName: 'Alice', username: 'alice01', password: 'pass123' },
  { firstName: 'Bob', username: 'bobby', password: 'hunter2' },
  { firstName: 'Carla', username: 'carlz', password: 'mypassword' },
  { firstName: 'Dave', username: 'davey', password: 'qwerty' },
  { firstName: 'Ella', username: 'ella_luvs_music', password: 'letmein' },
  { firstName: 'Finn', username: 'finn95', password: 'password1' },
  { firstName: 'Gina', username: 'ginabee', password: '123456' },
  { firstName: 'Hank', username: 'hank_the_tank', password: 'abc123' },
  { firstName: 'Ivy', username: 'ivyxoxo', password: 'ilovecats' },
  { firstName: 'Jack', username: 'jackattack', password: 'secure123' }
];

async function seedUsers() {
  try {
    await sequelize.sync(); 
    for (const user of users) {
      await User.create(user);
      console.log(`✅ Added user: ${user.username}`);
    }
  } catch (err) {
    console.error('❌ Failed to seed users:', err);
  } finally {
    await sequelize.close();
  }
}

seedUsers();
