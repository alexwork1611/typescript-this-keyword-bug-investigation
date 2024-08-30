import bcrypt from 'bcryptjs';
import { Schema, Types, model } from 'mongoose';

const userRoleNameEnum = ['king', 'magistrate', 'citizen', 'child'] as const;

const userSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    role: {
      type: {
        name: { type: String, enum: userRoleNameEnum },
        locations: [String],
      },
      required: true,
    },
  },
  {
    methods: {
      /**
       * Checking if a given matches the current one.
       */
      async isCorrectPassword(password: string) {
        return await bcrypt.compare(password, this.password);
      },
    },

    /**
     * Getting the user's resources by query.
     *
     * Working in IDE.
     */
    async getResources(resourceType: keyof App.Models.UserPopulatePaths) {
      return (await this.populate<App.Models.UserPopulatePaths>(resourceType))[
        resourceType
      ] as App.Models.UserPopulatePaths[typeof resourceType];
    },

    /**
     * Getting the user's resources by query.
     *
     * Not working.
     */
    async getResourcesV2<
      const TResourceType extends keyof App.Models.UserPopulatePaths,
    >(resourceType) {
      return (await this.populate<TResourceType>(resourceType))[
        resourceType
      ] as App.Models.UserPopulatePaths[TResourceType];
    },
  },
);

const User = model('User', userSchema);

export default User;
