"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatherCiUserResponses = exports.gatherUserResponses = void 0;
const shared_constants_1 = require("@vendure/common/lib/shared-constants");
const fs_extra_1 = __importDefault(require("fs-extra"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
// tslint:disable:no-console
/**
 * Prompts the user to determine how the new Vendure app should be configured.
 */
async function gatherUserResponses(root) {
    function onSubmit(prompt, answer) {
        if (prompt.name === 'dbType') {
            dbType = answer;
        }
    }
    let dbType;
    const answers = await prompts_1.default([
        {
            type: 'select',
            name: 'dbType',
            message: 'Which database are you using?',
            choices: [
                { title: 'MySQL', value: 'mysql' },
                { title: 'MariaDB', value: 'mariadb' },
                { title: 'Postgres', value: 'postgres' },
                { title: 'SQLite', value: 'sqlite' },
                { title: 'SQL.js', value: 'sqljs' },
            ],
            initial: 0,
        },
        {
            type: (() => (dbType === 'sqlite' || dbType === 'sqljs' ? null : 'text')),
            name: 'dbHost',
            message: `What's the database host address?`,
            initial: 'localhost',
        },
        {
            type: (() => (dbType === 'sqlite' || dbType === 'sqljs' ? null : 'text')),
            name: 'dbPort',
            message: `What port is the database listening on?`,
            initial: (() => defaultDBPort(dbType)),
        },
        {
            type: (() => (dbType === 'sqlite' || dbType === 'sqljs' ? null : 'text')),
            name: 'dbName',
            message: `What's the name of the database?`,
            initial: 'vendure',
        },
        {
            type: (() => (dbType === 'sqlite' || dbType === 'sqljs' ? null : 'text')),
            name: 'dbUserName',
            message: `What's the database user name?`,
            initial: 'root',
        },
        {
            type: (() => (dbType === 'sqlite' || dbType === 'sqljs' ? null : 'password')),
            name: 'dbPassword',
            message: `What's the database password?`,
        },
        {
            type: 'select',
            name: 'language',
            message: 'Which programming language will you be using?',
            choices: [
                { title: 'TypeScript', value: 'ts' },
                { title: 'JavaScript', value: 'js' },
            ],
            initial: 0,
        },
        {
            type: 'toggle',
            name: 'populateProducts',
            message: 'Populate with some sample product data?',
            initial: true,
            active: 'yes',
            inactive: 'no',
        },
        {
            type: 'text',
            name: 'superadminIdentifier',
            message: 'What identifier do you want to use for the superadmin user?',
            initial: shared_constants_1.SUPER_ADMIN_USER_IDENTIFIER,
        },
        {
            type: 'text',
            name: 'superadminPassword',
            message: 'What password do you want to use for the superadmin user?',
            initial: shared_constants_1.SUPER_ADMIN_USER_PASSWORD,
        },
    ], {
        onSubmit,
        onCancel() {
            /* */
        },
    });
    if (!answers.language) {
        console.log('Setup aborted. No changes made');
        process.exit(0);
    }
    const { indexSource, indexWorkerSource, configSource, migrationSource, readmeSource, } = await generateSources(root, answers);
    return {
        indexSource,
        indexWorkerSource,
        configSource,
        migrationSource,
        readmeSource,
        usingTs: answers.language === 'ts',
        dbType: answers.dbType,
        populateProducts: answers.populateProducts,
        superadminIdentifier: answers.superadminIdentifier,
        superadminPassword: answers.superadminPassword,
    };
}
exports.gatherUserResponses = gatherUserResponses;
/**
 * Returns mock "user response" without prompting, for use in CI
 */
async function gatherCiUserResponses(root) {
    const ciAnswers = {
        dbType: 'sqlite',
        dbHost: '',
        dbPort: '',
        dbName: 'vendure',
        dbUserName: '',
        dbPassword: '',
        language: 'ts',
        populateProducts: true,
        superadminIdentifier: shared_constants_1.SUPER_ADMIN_USER_IDENTIFIER,
        superadminPassword: shared_constants_1.SUPER_ADMIN_USER_PASSWORD,
    };
    const { indexSource, indexWorkerSource, configSource, migrationSource, readmeSource, } = await generateSources(root, ciAnswers);
    return {
        indexSource,
        indexWorkerSource,
        configSource,
        migrationSource,
        readmeSource,
        usingTs: ciAnswers.language === 'ts',
        dbType: ciAnswers.dbType,
        populateProducts: ciAnswers.populateProducts,
        superadminIdentifier: ciAnswers.superadminIdentifier,
        superadminPassword: ciAnswers.superadminPassword,
    };
}
exports.gatherCiUserResponses = gatherCiUserResponses;
/**
 * Create the server index, worker and config source code based on the options specified by the CLI prompts.
 */
async function generateSources(root, answers) {
    const assetPath = (fileName) => path_1.default.join(__dirname, '../assets', fileName);
    const templateContext = Object.assign(Object.assign({}, answers), { dbType: answers.dbType === 'sqlite' ? 'better-sqlite3' : answers.dbType, name: path_1.default.basename(root), isTs: answers.language === 'ts', isSQLite: answers.dbType === 'sqlite', isSQLjs: answers.dbType === 'sqljs', requiresConnection: answers.dbType !== 'sqlite' && answers.dbType !== 'sqljs' });
    const configTemplate = await fs_extra_1.default.readFile(assetPath('vendure-config.hbs'), 'utf-8');
    const configSource = handlebars_1.default.compile(configTemplate)(templateContext);
    const indexTemplate = await fs_extra_1.default.readFile(assetPath('index.hbs'), 'utf-8');
    const indexSource = handlebars_1.default.compile(indexTemplate)(templateContext);
    const indexWorkerTemplate = await fs_extra_1.default.readFile(assetPath('index-worker.hbs'), 'utf-8');
    const indexWorkerSource = handlebars_1.default.compile(indexWorkerTemplate)(templateContext);
    const migrationTemplate = await fs_extra_1.default.readFile(assetPath('migration.hbs'), 'utf-8');
    const migrationSource = handlebars_1.default.compile(migrationTemplate)(templateContext);
    const readmeTemplate = await fs_extra_1.default.readFile(assetPath('readme.hbs'), 'utf-8');
    const readmeSource = handlebars_1.default.compile(readmeTemplate)(templateContext);
    return { indexSource, indexWorkerSource, configSource, migrationSource, readmeSource };
}
function defaultDBPort(dbType) {
    switch (dbType) {
        case 'mysql':
        case 'mariadb':
            return 3306;
        case 'postgres':
            return 5432;
        case 'mssql':
            return 1433;
        case 'oracle':
            return 1521;
        default:
            return 3306;
    }
}
//# sourceMappingURL=gather-user-responses.js.map