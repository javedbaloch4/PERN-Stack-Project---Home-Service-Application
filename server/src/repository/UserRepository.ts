import { BadRequestError } from "../errors";
import { User } from "../model/User";
import { EncryptDecrypt } from "../utils/EncryptDecrypt";
import { generateVerificationToken } from "../utils/generateToken";
import sendVerificationEmail from "../service/emailService";

interface IUser {
  register(user: User): Promise<void>;
  login(user: User): Promise<User>;
}

interface loginPayload {
  email: string;
  password: string;
}

export class UserRepository implements IUser {
  async register(user: User): Promise<void> {
    const findUser = await User.findOne({
      where: { email: user.email },
    });

    const verificationToken = generateVerificationToken();

    user.userVerificationToken = verificationToken;

    if (findUser) {
      throw new BadRequestError("Already exists");
    }

    user.password = await EncryptDecrypt.encrypt(user.password);
    await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      age: user.age,
      gender: user.gender,
      status: true,
      userVerificationToken: verificationToken,
      lastLoginAttempt: null,
      loginAttempts: 0,
    });

    // Send email
    // await sendVerificationEmail(user.email, verificationToken);
  }

  async login(user: loginPayload): Promise<User> {
    const dbUser = await User.findOne({
      where: { email: user.email },
    });

    if (!dbUser) {
      throw new BadRequestError("Invalid credential");
    }

    if (dbUser.status === false) {
      const lockoutDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
      const currentTime = new Date().getTime();

      if (
        dbUser.lastLoginAttempt &&
        currentTime - dbUser.lastLoginAttempt.getTime() < lockoutDuration
      ) {
        throw new BadRequestError(
          "Account is locked. Try again after 5 minutes"
        );
      }

      // Unlock the account
      dbUser.status = true;
      await dbUser.update({
        status: true,
        loginAttempts: 0,
        lastLoginAttempt: null,
      });
    }

    if (!(await EncryptDecrypt.compare(user.password, dbUser.password))) {
      await dbUser.increment("loginAttempts");

      if (dbUser.loginAttempts >= 5) {
        dbUser.status = false;
        dbUser.lastLoginAttempt = new Date();
        await dbUser.save();

        throw new BadRequestError("Account is locked. Try again later.");
      } else {
        throw new BadRequestError("Invalid credentials");
      }
    }

    await dbUser.update({ loginAttempts: 0, lastLoginAttempt: null });

    return dbUser;
  }
}
