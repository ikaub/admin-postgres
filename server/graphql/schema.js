const fs = require('fs');
const { makeExecutableSchema } = require('graphql-tools');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const Profile = require('./../models/Profile');

const typeDefs = fs.readFileSync('./graphql/schema.graphql', 'utf-8');

const resolvers = {
  User: {
    profiles: ({ id }, args, { user }) => {
      if (!user) throw new Error('You are not authorized');
      return Profile.findAll({
        where: {
          userId: id,
        },
      });
    },
  },
  Profile: {
    user: ({ userId }, args, { user }) => {
      if (!user) throw new Error('You are not authorized');
      return User.findByPk(userId);
    },
  },
  Query: {
    users: (parent, args, { user }) => {
      if (!user) throw new Error('You are not authenticated');
      return User.findAll();
    },
    user: (parent, { userId }, { user }) => {
      if (!user) throw new Error('You are not authorized');
      return User.findByPk(userId);
    },
    profiles: (parent, { userId }, { user }) => {
      if (!user) throw new Error('You are not authorized');
      return Profile.findAll({
        where: {
          userId,
        },
      });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      try {
        const { dataValues: user } = await User.findOne({
          where: { email },
        });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Email or password are incorrect');
        const token = jwt.sign(
          {
            email: user.email,
            role: user.role,
            id: user.id,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );
        return {
          ...user,
          token,
        };
      } catch (e) {
        throw new Error('Such user does not exist');
      }
    },
    createUser: async (parent, { email, password }) => {
      const user = await User.findOne({
        where: { email },
      });
      if (user) throw new Error('Such user already exists');

      const { dataValues: newUser } = await User.create({
        email,
        password: await bcrypt.hash(password, 10),
        role: 'USER',
      }, { raw: true });

      const token = jwt.sign(
        {
          email: newUser.email,
          role: newUser.role,
          id: newUser.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
      return {
        ...newUser,
        token,
      };
    },

    createProfile: async (parent, { profile }, { user }) => {
      if (!user) throw new Error('You are not authorized');
      const { dataValues: newProfile } = await Profile.create({
        ...profile,
        userId: user.id,
      });
      return newProfile;
    },

    updateProfile: async (parent, { profile }, { user }) => {
      if (!user) throw new Error('You are not authorized');
      const { dataValues: newProfile } = await Profile.update(
        { ...profile },
        { where: { id: profile.id } }
      );
      return newProfile;
    },

    deleteProfile: async (parent, { profileId }, { user }) => {
      if (!user) throw new Error('You are not authorized');
      await Profile.destroy({
        where: { id: profileId },
      });
      return profileId;
    }
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
