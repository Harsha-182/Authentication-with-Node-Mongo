const bcrypt = require('bcrypt');
const User = require('../../models/users');

// Seed data
const seedUsers = [
  { name:'testUser1', email: 'testuser1@gmail.com', password: 'password1' },
  { name:'testUser2', email: 'testuser2@gmail.com', password: 'password2' },
  { name:'testUser3', email: 'testuser3@gmail.com', password: 'password3' }
];

seedUsers.forEach(user => {
  User.findOne({ email: user.email })
  .then((existingUser) => {
    if (!existingUser) {
      const newUser = new User(user);
      bcrypt.hash(newUser.password, 10)
        .then((hash) => {
          newUser.password = hash;
          return newUser.save();
        })
        .then(() => {
          console.log('User created successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })
  .catch((err) => {
    console.log(err);
  });
});
