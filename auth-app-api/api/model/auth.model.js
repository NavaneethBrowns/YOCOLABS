import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

export const AuthModel = async (sequelize) => {
  const Auth = await sequelize.define("Auth", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  });

  Auth.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.passwordHash);
  };

  return Auth;
};

