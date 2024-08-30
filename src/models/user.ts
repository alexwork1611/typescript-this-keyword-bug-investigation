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

      /**
       * Actual code that I wanted to use, but breaks if I use generic types.
       */
      async getResources(resourceType: keyof App.Models.UserPopulatePaths) {
        return (
          await this.populate<App.Models.UserPopulatePaths>(resourceType)
        )[resourceType] as App.Models.UserPopulatePaths[typeof resourceType];
      },

      /**
       * Try commenting this function to see that the `this` (line 51) inside `getResources` (line 49) will then get type inference.
       */
      async getResourcesV2<
        const TResourceType extends keyof App.Models.UserPopulatePaths,
      >(resourceType: TResourceType) {
        return (await this.populate<TResourceType>(resourceType))[
          resourceType
        ] as App.Models.UserPopulatePaths[TResourceType];
      },

      /**
       * This works.
       */
      async thisWorks() {
        return this.populate('something');
      },
    },
  },
);

const User = model('User', userSchema);

export default User;
