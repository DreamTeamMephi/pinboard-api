/**
 * Created by pter9_000 on 16.10.2016.
 */
import Sequelize from 'Sequelize';

var User = global.sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  local_hash: {
    type: Sequelize.STRING,
    allowNull: false
  },
  local_salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  local_iterations: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  indexes: [
    // Create a unique index on email
    {
      unique: true,
      fields: ['email']
    }
  ]
});

//{force: true}
User.sync().then(function () {
  // Table created
});


export default User