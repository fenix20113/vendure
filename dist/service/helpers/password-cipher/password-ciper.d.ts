/**
 * A cipher which uses bcrypt (https://en.wikipedia.org/wiki/Bcrypt) to hash plaintext password strings.
 */
export declare class PasswordCiper {
    hash(plaintext: string): Promise<string>;
    check(plaintext: string, hash: string): Promise<boolean>;
}
