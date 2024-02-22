import bcrypt from "bcrypt";

export class EncryptDecrypt {
  public static async encrypt(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  public static async compare(
    userpassword: string,
    dbPassword: string
  ): Promise<Boolean> {
    return await bcrypt.compare(userpassword, dbPassword);
  }
}
