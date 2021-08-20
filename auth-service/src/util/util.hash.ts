import * as bcrypt from 'bcrypt';

export const hash = async (password: string): Promise<string> => {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
}

export const isHashValid = async (password, encryptedPwd): Promise<boolean> => {
    return await bcrypt.compare(password, encryptedPwd)
}