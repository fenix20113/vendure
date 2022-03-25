import { gql } from 'apollo-angular';
export const CONFIGURABLE_OPERATION_FRAGMENT = gql `
    fragment ConfigurableOperation on ConfigurableOperation {
        args {
            name
            value
        }
        code
    }
`;
export const CONFIGURABLE_OPERATION_DEF_FRAGMENT = gql `
    fragment ConfigurableOperationDef on ConfigurableOperationDefinition {
        args {
            name
            type
            required
            defaultValue
            list
            ui
            label
        }
        code
        description
    }
`;
export const ERROR_RESULT_FRAGMENT = gql `
    fragment ErrorResult on ErrorResult {
        errorCode
        message
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLWRlZmluaXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9kYXRhL2RlZmluaXRpb25zL3NoYXJlZC1kZWZpbml0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUcsR0FBRyxDQUFBOzs7Ozs7OztDQVFqRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBQUcsR0FBRyxDQUFBOzs7Ozs7Ozs7Ozs7OztDQWNyRCxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxDQUFBOzs7OztDQUt2QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3FsIH0gZnJvbSAnYXBvbGxvLWFuZ3VsYXInO1xuXG5leHBvcnQgY29uc3QgQ09ORklHVVJBQkxFX09QRVJBVElPTl9GUkFHTUVOVCA9IGdxbGBcbiAgICBmcmFnbWVudCBDb25maWd1cmFibGVPcGVyYXRpb24gb24gQ29uZmlndXJhYmxlT3BlcmF0aW9uIHtcbiAgICAgICAgYXJncyB7XG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIGNvZGVcbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQ09ORklHVVJBQkxFX09QRVJBVElPTl9ERUZfRlJBR01FTlQgPSBncWxgXG4gICAgZnJhZ21lbnQgQ29uZmlndXJhYmxlT3BlcmF0aW9uRGVmIG9uIENvbmZpZ3VyYWJsZU9wZXJhdGlvbkRlZmluaXRpb24ge1xuICAgICAgICBhcmdzIHtcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIHR5cGVcbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWVcbiAgICAgICAgICAgIGxpc3RcbiAgICAgICAgICAgIHVpXG4gICAgICAgICAgICBsYWJlbFxuICAgICAgICB9XG4gICAgICAgIGNvZGVcbiAgICAgICAgZGVzY3JpcHRpb25cbiAgICB9XG5gO1xuXG5leHBvcnQgY29uc3QgRVJST1JfUkVTVUxUX0ZSQUdNRU5UID0gZ3FsYFxuICAgIGZyYWdtZW50IEVycm9yUmVzdWx0IG9uIEVycm9yUmVzdWx0IHtcbiAgICAgICAgZXJyb3JDb2RlXG4gICAgICAgIG1lc3NhZ2VcbiAgICB9XG5gO1xuIl19