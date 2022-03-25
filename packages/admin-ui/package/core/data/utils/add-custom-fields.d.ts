import { DocumentNode } from 'graphql';
import { CustomFields } from '../../common/generated-types';
/**
 * Given a GraphQL AST (DocumentNode), this function looks for fragment definitions and adds and configured
 * custom fields to those fragments.
 */
export declare function addCustomFields(documentNode: DocumentNode, customFields: CustomFields): DocumentNode;
