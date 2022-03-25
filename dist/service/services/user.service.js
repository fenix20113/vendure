"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../common/error/errors");
const generated_graphql_shop_errors_1 = require("../../common/error/generated-graphql-shop-errors");
const config_service_1 = require("../../config/config.service");
const native_authentication_method_entity_1 = require("../../entity/authentication-method/native-authentication-method.entity");
const user_entity_1 = require("../../entity/user/user.entity");
const password_ciper_1 = require("../helpers/password-cipher/password-ciper");
const verification_token_generator_1 = require("../helpers/verification-token-generator/verification-token-generator");
const transactional_connection_1 = require("../transaction/transactional-connection");
const role_service_1 = require("./role.service");
let UserService = class UserService {
    constructor(connection, configService, roleService, passwordCipher, verificationTokenGenerator) {
        this.connection = connection;
        this.configService = configService;
        this.roleService = roleService;
        this.passwordCipher = passwordCipher;
        this.verificationTokenGenerator = verificationTokenGenerator;
    }
    async getUserById(ctx, userId) {
        return this.connection.getRepository(ctx, user_entity_1.User).findOne(userId, {
            relations: ['roles', 'roles.channels', 'authenticationMethods'],
        });
    }
    async getUserByEmailAddress(ctx, emailAddress) {
        return this.connection.getRepository(ctx, user_entity_1.User).findOne({
            where: {
                identifier: emailAddress,
                deletedAt: null,
            },
            relations: ['roles', 'roles.channels', 'authenticationMethods'],
        });
    }
    async createCustomerUser(ctx, identifier, password) {
        const user = new user_entity_1.User();
        user.identifier = identifier;
        const customerRole = await this.roleService.getCustomerRole();
        user.roles = [customerRole];
        return this.connection
            .getRepository(ctx, user_entity_1.User)
            .save(await this.addNativeAuthenticationMethod(ctx, user, identifier, password));
    }
    async addNativeAuthenticationMethod(ctx, user, identifier, password) {
        var _a;
        const checkUser = user.id != null && (await this.getUserById(ctx, user.id));
        if (checkUser) {
            if (!!checkUser.authenticationMethods.find((m) => m instanceof native_authentication_method_entity_1.NativeAuthenticationMethod)) {
                // User already has a NativeAuthenticationMethod registered, so just return.
                return user;
            }
        }
        const authenticationMethod = new native_authentication_method_entity_1.NativeAuthenticationMethod();
        if (this.configService.authOptions.requireVerification) {
            authenticationMethod.verificationToken = this.verificationTokenGenerator.generateVerificationToken();
            user.verified = false;
        }
        else {
            user.verified = true;
        }
        if (password) {
            authenticationMethod.passwordHash = await this.passwordCipher.hash(password);
        }
        else {
            authenticationMethod.passwordHash = '';
        }
        authenticationMethod.identifier = identifier;
        await this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(authenticationMethod);
        user.authenticationMethods = [...((_a = user.authenticationMethods) !== null && _a !== void 0 ? _a : []), authenticationMethod];
        return user;
    }
    async createAdminUser(ctx, identifier, password) {
        const user = new user_entity_1.User({
            identifier,
            verified: true,
        });
        const authenticationMethod = await this.connection
            .getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod)
            .save(new native_authentication_method_entity_1.NativeAuthenticationMethod({
            identifier,
            passwordHash: await this.passwordCipher.hash(password),
        }));
        user.authenticationMethods = [authenticationMethod];
        return this.connection.getRepository(ctx, user_entity_1.User).save(user);
    }
    async softDelete(ctx, userId) {
        await this.connection.getEntityOrThrow(ctx, user_entity_1.User, userId);
        await this.connection.getRepository(ctx, user_entity_1.User).update({ id: userId }, { deletedAt: new Date() });
    }
    async setVerificationToken(ctx, user) {
        const nativeAuthMethod = user.getNativeAuthenticationMethod();
        nativeAuthMethod.verificationToken = this.verificationTokenGenerator.generateVerificationToken();
        user.verified = false;
        await this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod);
        return this.connection.getRepository(ctx, user_entity_1.User).save(user);
    }
    async verifyUserByToken(ctx, verificationToken, password) {
        const user = await this.connection
            .getRepository(ctx, user_entity_1.User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.authenticationMethods', 'authenticationMethod')
            .addSelect('authenticationMethod.passwordHash')
            .where('authenticationMethod.verificationToken = :verificationToken', { verificationToken })
            .getOne();
        if (user) {
            if (this.verificationTokenGenerator.verifyVerificationToken(verificationToken)) {
                const nativeAuthMethod = user.getNativeAuthenticationMethod();
                if (!password) {
                    if (!nativeAuthMethod.passwordHash) {
                        return new generated_graphql_shop_errors_1.MissingPasswordError();
                    }
                }
                else {
                    if (!!nativeAuthMethod.passwordHash) {
                        return new generated_graphql_shop_errors_1.PasswordAlreadySetError();
                    }
                    nativeAuthMethod.passwordHash = await this.passwordCipher.hash(password);
                }
                nativeAuthMethod.verificationToken = null;
                user.verified = true;
                await this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod);
                return this.connection.getRepository(ctx, user_entity_1.User).save(user);
            }
            else {
                return new generated_graphql_shop_errors_1.VerificationTokenExpiredError();
            }
        }
        else {
            return new generated_graphql_shop_errors_1.VerificationTokenInvalidError();
        }
    }
    async setPasswordResetToken(ctx, emailAddress) {
        const user = await this.getUserByEmailAddress(ctx, emailAddress);
        if (!user) {
            return;
        }
        const nativeAuthMethod = user.getNativeAuthenticationMethod();
        nativeAuthMethod.passwordResetToken = await this.verificationTokenGenerator.generateVerificationToken();
        await this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod);
        return user;
    }
    async resetPasswordByToken(ctx, passwordResetToken, password) {
        const user = await this.connection
            .getRepository(ctx, user_entity_1.User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.authenticationMethods', 'authenticationMethod')
            .where('authenticationMethod.passwordResetToken = :passwordResetToken', { passwordResetToken })
            .getOne();
        if (!user) {
            return new generated_graphql_shop_errors_1.PasswordResetTokenInvalidError();
        }
        if (this.verificationTokenGenerator.verifyVerificationToken(passwordResetToken)) {
            const nativeAuthMethod = user.getNativeAuthenticationMethod();
            nativeAuthMethod.passwordHash = await this.passwordCipher.hash(password);
            nativeAuthMethod.passwordResetToken = null;
            await this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod);
            return this.connection.getRepository(ctx, user_entity_1.User).save(user);
        }
        else {
            return new generated_graphql_shop_errors_1.PasswordResetTokenExpiredError();
        }
    }
    async changeIdentifierByToken(ctx, token) {
        const user = await this.connection
            .getRepository(ctx, user_entity_1.User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.authenticationMethods', 'authenticationMethod')
            .where('authenticationMethod.identifierChangeToken = :identifierChangeToken', {
            identifierChangeToken: token,
        })
            .getOne();
        if (!user) {
            return new generated_graphql_shop_errors_1.IdentifierChangeTokenInvalidError();
        }
        if (!this.verificationTokenGenerator.verifyVerificationToken(token)) {
            return new generated_graphql_shop_errors_1.IdentifierChangeTokenExpiredError();
        }
        const nativeAuthMethod = user.getNativeAuthenticationMethod();
        const pendingIdentifier = nativeAuthMethod.pendingIdentifier;
        if (!pendingIdentifier) {
            throw new errors_1.InternalServerError('error.pending-identifier-missing');
        }
        const oldIdentifier = user.identifier;
        user.identifier = pendingIdentifier;
        nativeAuthMethod.identifier = pendingIdentifier;
        nativeAuthMethod.identifierChangeToken = null;
        nativeAuthMethod.pendingIdentifier = null;
        await this.connection
            .getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod)
            .save(nativeAuthMethod, { reload: false });
        await this.connection.getRepository(ctx, user_entity_1.User).save(user, { reload: false });
        return { user, oldIdentifier };
    }
    async updatePassword(ctx, userId, currentPassword, newPassword) {
        const user = await this.connection
            .getRepository(ctx, user_entity_1.User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.authenticationMethods', 'authenticationMethods')
            .addSelect('authenticationMethods.passwordHash')
            .where('user.id = :id', { id: userId })
            .getOne();
        if (!user) {
            throw new errors_1.EntityNotFoundError('User', userId);
        }
        const nativeAuthMethod = user.getNativeAuthenticationMethod();
        const matches = await this.passwordCipher.check(currentPassword, nativeAuthMethod.passwordHash);
        if (!matches) {
            return new generated_graphql_shop_errors_1.InvalidCredentialsError('');
        }
        nativeAuthMethod.passwordHash = await this.passwordCipher.hash(newPassword);
        await this.connection
            .getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod)
            .save(nativeAuthMethod, { reload: false });
        return true;
    }
    async setIdentifierChangeToken(ctx, user) {
        const nativeAuthMethod = user.getNativeAuthenticationMethod();
        nativeAuthMethod.identifierChangeToken = this.verificationTokenGenerator.generateVerificationToken();
        await this.connection.getRepository(ctx, native_authentication_method_entity_1.NativeAuthenticationMethod).save(nativeAuthMethod);
        return user;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [transactional_connection_1.TransactionalConnection,
        config_service_1.ConfigService,
        role_service_1.RoleService,
        password_ciper_1.PasswordCiper,
        verification_token_generator_1.VerificationTokenGenerator])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map