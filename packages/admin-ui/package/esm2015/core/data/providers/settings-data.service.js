import { pick } from '@vendure/common/lib/pick';
import { JobState, } from '../../common/generated-types';
import { ADD_MEMBERS_TO_ZONE, CANCEL_JOB, CREATE_CHANNEL, CREATE_COUNTRY, CREATE_PAYMENT_METHOD, CREATE_TAX_CATEGORY, CREATE_TAX_RATE, CREATE_ZONE, DELETE_CHANNEL, DELETE_COUNTRY, DELETE_PAYMENT_METHOD, DELETE_TAX_CATEGORY, DELETE_TAX_RATE, DELETE_ZONE, GET_ACTIVE_CHANNEL, GET_AVAILABLE_COUNTRIES, GET_CHANNEL, GET_CHANNELS, GET_COUNTRY, GET_COUNTRY_LIST, GET_GLOBAL_SETTINGS, GET_JOBS_BY_ID, GET_JOBS_LIST, GET_JOB_INFO, GET_JOB_QUEUE_LIST, GET_PAYMENT_METHOD, GET_PAYMENT_METHOD_LIST, GET_PAYMENT_METHOD_OPERATIONS, GET_TAX_CATEGORIES, GET_TAX_CATEGORY, GET_TAX_RATE, GET_TAX_RATE_LIST, GET_ZONES, REMOVE_MEMBERS_FROM_ZONE, UPDATE_CHANNEL, UPDATE_COUNTRY, UPDATE_GLOBAL_SETTINGS, UPDATE_PAYMENT_METHOD, UPDATE_TAX_CATEGORY, UPDATE_TAX_RATE, UPDATE_ZONE, } from '../definitions/settings-definitions';
export class SettingsDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    getCountries(take = 10, skip = 0, filterTerm) {
        return this.baseDataService.query(GET_COUNTRY_LIST, {
            options: {
                take,
                skip,
                filter: {
                    name: filterTerm ? { contains: filterTerm } : null,
                },
            },
        });
    }
    getAvailableCountries() {
        return this.baseDataService.query(GET_AVAILABLE_COUNTRIES);
    }
    getCountry(id) {
        return this.baseDataService.query(GET_COUNTRY, { id });
    }
    createCountry(input) {
        return this.baseDataService.mutate(CREATE_COUNTRY, {
            input: pick(input, ['code', 'enabled', 'translations']),
        });
    }
    updateCountry(input) {
        return this.baseDataService.mutate(UPDATE_COUNTRY, {
            input: pick(input, ['id', 'code', 'enabled', 'translations']),
        });
    }
    deleteCountry(id) {
        return this.baseDataService.mutate(DELETE_COUNTRY, {
            id,
        });
    }
    getZones() {
        return this.baseDataService.query(GET_ZONES);
    }
    getZone(id) {
        return this.baseDataService.query(GET_ZONES, { id });
    }
    createZone(input) {
        return this.baseDataService.mutate(CREATE_ZONE, {
            input,
        });
    }
    updateZone(input) {
        return this.baseDataService.mutate(UPDATE_ZONE, {
            input,
        });
    }
    deleteZone(id) {
        return this.baseDataService.mutate(DELETE_ZONE, {
            id,
        });
    }
    addMembersToZone(zoneId, memberIds) {
        return this.baseDataService.mutate(ADD_MEMBERS_TO_ZONE, {
            zoneId,
            memberIds,
        });
    }
    removeMembersFromZone(zoneId, memberIds) {
        return this.baseDataService.mutate(REMOVE_MEMBERS_FROM_ZONE, {
            zoneId,
            memberIds,
        });
    }
    getTaxCategories() {
        return this.baseDataService.query(GET_TAX_CATEGORIES);
    }
    getTaxCategory(id) {
        return this.baseDataService.query(GET_TAX_CATEGORY, {
            id,
        });
    }
    createTaxCategory(input) {
        return this.baseDataService.mutate(CREATE_TAX_CATEGORY, {
            input,
        });
    }
    updateTaxCategory(input) {
        return this.baseDataService.mutate(UPDATE_TAX_CATEGORY, {
            input,
        });
    }
    deleteTaxCategory(id) {
        return this.baseDataService.mutate(DELETE_TAX_CATEGORY, {
            id,
        });
    }
    getTaxRates(take = 10, skip = 0, fetchPolicy) {
        return this.baseDataService.query(GET_TAX_RATE_LIST, {
            options: {
                take,
                skip,
            },
        }, fetchPolicy);
    }
    getTaxRate(id) {
        return this.baseDataService.query(GET_TAX_RATE, {
            id,
        });
    }
    createTaxRate(input) {
        return this.baseDataService.mutate(CREATE_TAX_RATE, {
            input,
        });
    }
    updateTaxRate(input) {
        return this.baseDataService.mutate(UPDATE_TAX_RATE, {
            input,
        });
    }
    deleteTaxRate(id) {
        return this.baseDataService.mutate(DELETE_TAX_RATE, {
            id,
        });
    }
    getChannels() {
        return this.baseDataService.query(GET_CHANNELS);
    }
    getChannel(id) {
        return this.baseDataService.query(GET_CHANNEL, {
            id,
        });
    }
    getActiveChannel(fetchPolicy) {
        return this.baseDataService.query(GET_ACTIVE_CHANNEL, {}, fetchPolicy);
    }
    createChannel(input) {
        return this.baseDataService.mutate(CREATE_CHANNEL, {
            input,
        });
    }
    updateChannel(input) {
        return this.baseDataService.mutate(UPDATE_CHANNEL, {
            input,
        });
    }
    deleteChannel(id) {
        return this.baseDataService.mutate(DELETE_CHANNEL, {
            id,
        });
    }
    getPaymentMethods(take = 10, skip = 0) {
        return this.baseDataService.query(GET_PAYMENT_METHOD_LIST, {
            options: {
                skip,
                take,
            },
        });
    }
    getPaymentMethod(id) {
        return this.baseDataService.query(GET_PAYMENT_METHOD, {
            id,
        });
    }
    createPaymentMethod(input) {
        return this.baseDataService.mutate(CREATE_PAYMENT_METHOD, {
            input,
        });
    }
    updatePaymentMethod(input) {
        return this.baseDataService.mutate(UPDATE_PAYMENT_METHOD, {
            input,
        });
    }
    deletePaymentMethod(id, force) {
        return this.baseDataService.mutate(DELETE_PAYMENT_METHOD, {
            id,
            force,
        });
    }
    getPaymentMethodOperations() {
        return this.baseDataService.query(GET_PAYMENT_METHOD_OPERATIONS);
    }
    getGlobalSettings(fetchPolicy) {
        return this.baseDataService.query(GET_GLOBAL_SETTINGS, undefined, fetchPolicy);
    }
    updateGlobalSettings(input) {
        return this.baseDataService.mutate(UPDATE_GLOBAL_SETTINGS, {
            input,
        });
    }
    getJob(id) {
        return this.baseDataService.query(GET_JOB_INFO, { id });
    }
    pollJobs(ids) {
        return this.baseDataService.query(GET_JOBS_BY_ID, {
            ids,
        });
    }
    getAllJobs(options) {
        return this.baseDataService.query(GET_JOBS_LIST, {
            options,
        });
    }
    getJobQueues() {
        return this.baseDataService.query(GET_JOB_QUEUE_LIST);
    }
    getRunningJobs() {
        return this.baseDataService.query(GET_JOBS_LIST, {
            options: {
                filter: {
                    state: {
                        eq: JobState.RUNNING,
                    },
                },
            },
        });
    }
    cancelJob(id) {
        return this.baseDataService.mutate(CANCEL_JOB, {
            id,
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9jb3JlL3NyYy9kYXRhL3Byb3ZpZGVycy9zZXR0aW5ncy1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhELE9BQU8sRUEwQ0gsUUFBUSxHQWdCWCxNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsVUFBVSxFQUNWLGNBQWMsRUFDZCxjQUFjLEVBQ2QscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNuQixlQUFlLEVBQ2YsV0FBVyxFQUNYLGNBQWMsRUFDZCxjQUFjLEVBQ2QscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNuQixlQUFlLEVBQ2YsV0FBVyxFQUNYLGtCQUFrQixFQUNsQix1QkFBdUIsRUFDdkIsV0FBVyxFQUNYLFlBQVksRUFDWixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQixjQUFjLEVBQ2QsYUFBYSxFQUNiLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLHVCQUF1QixFQUN2Qiw2QkFBNkIsRUFDN0Isa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNuQixlQUFlLEVBQ2YsV0FBVyxHQUNkLE1BQU0scUNBQXFDLENBQUM7QUFJN0MsTUFBTSxPQUFPLG1CQUFtQjtJQUM1QixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFBRyxDQUFDO0lBRXhELFlBQVksQ0FBQyxPQUFlLEVBQUUsRUFBRSxPQUFlLENBQUMsRUFBRSxVQUFtQjtRQUNqRSxP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QU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQTJDLGNBQWMsRUFBRTtZQUN4RixHQUFHO1NBQ04sQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUF3QjtRQUMvQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUF5QyxhQUFhLEVBQUU7WUFDckYsT0FBTztTQUNWLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO1FBQ1IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBd0Isa0JBQWtCLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQXlDLGFBQWEsRUFBRTtZQUNyRixPQUFPLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFO29CQUNKLEtBQUssRUFBRTt3QkFDSCxFQUFFLEVBQUUsUUFBUSxDQUFDLE9BQU87cUJBQ3ZCO2lCQUNKO2FBQ0o7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBUyxDQUFDLEVBQVU7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBMEMsVUFBVSxFQUFFO1lBQ3BGLEVBQUU7U0FDTCxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGZXRjaFBvbGljeSwgV2F0Y2hRdWVyeUZldGNoUG9saWN5IH0gZnJvbSAnQGFwb2xsby9jbGllbnQvY29yZSc7XG5pbXBvcnQgeyBwaWNrIH0gZnJvbSAnQHZlbmR1cmUvY29tbW9uL2xpYi9waWNrJztcblxuaW1wb3J0IHtcbiAgICBBZGRNZW1iZXJzVG9ab25lLFxuICAgIENhbmNlbEpvYixcbiAgICBDcmVhdGVDaGFubmVsLFxuICAgIENyZWF0ZUNoYW5uZWxJbnB1dCxcbiAgICBDcmVhdGVDb3VudHJ5LFxuICAgIENyZWF0ZUNvdW50cnlJbnB1dCxcbiAgICBDcmVhdGVQYXltZW50TWV0aG9kLFxuICAgIENyZWF0ZVBheW1lbnRNZXRob2RJbnB1dCxcbiAgICBDcmVhdGVUYXhDYXRlZ29yeSxcbiAgICBDcmVhdGVUYXhDYXRlZ29yeUlucHV0LFxuICAgIENyZWF0ZVRheFJhdGUsXG4gICAgQ3JlYXRlVGF4UmF0ZUlucHV0LFxuICAgIENyZWF0ZVpvbmUsXG4gICAgQ3JlYXRlWm9uZUlucHV0LFxuICAgIERlbGV0ZUNoYW5uZWwsXG4gICAgRGVsZXRlQ291bnRyeSxcbiAgICBEZWxldGVQYXltZW50TWV0aG9kLFxuICAgIERlbGV0ZVRheENhdGVnb3J5LFxuICAgIERlbGV0ZVRheFJhdGUsXG4gICAgRGVsZXRlWm9uZSxcbiAgICBHZXRBY3RpdmVDaGFubmVsLFxuICAgIEdldEFsbEpvYnMsXG4gICAgR2V0QXZhaWxhYmxlQ291bnRyaWVzLFxuICAgIEdldENoYW5uZWwsXG4gICAgR2V0Q2hhbm5lbHMsXG4gICAgR2V0Q291bnRyeSxcbiAgICBHZXRDb3VudHJ5TGlzdCxcbiAgICBHZXRHbG9iYWxTZXR0aW5ncyxcbiAgICBHZXRKb2JJbmZvLFxuICAgIEdldEpvYlF1ZXVlTGlzdCxcbiAgICBHZXRKb2JzQnlJZCxcbiAgICBHZXRQYXltZW50TWV0aG9kLFxuICAgIEdldFBheW1lbnRNZXRob2RMaXN0LFxuICAgIEdldFBheW1lbnRNZXRob2RPcGVyYXRpb25zLFxuICAgIEdldFRheENhdGVnb3JpZXMsXG4gICAgR2V0VGF4Q2F0ZWdvcnksXG4gICAgR2V0VGF4UmF0ZSxcbiAgICBHZXRUYXhSYXRlTGlzdCxcbiAgICBHZXRab25lLFxuICAgIEdldFpvbmVzLFxuICAgIEpvYkxpc3RPcHRpb25zLFxuICAgIEpvYlN0YXRlLFxuICAgIFJlbW92ZU1lbWJlcnNGcm9tWm9uZSxcbiAgICBVcGRhdGVDaGFubmVsLFxuICAgIFVwZGF0ZUNoYW5uZWxJbnB1dCxcbiAgICBVcGRhdGVDb3VudHJ5LFxuICAgIFVwZGF0ZUNvdW50cnlJbnB1dCxcbiAgICBVcGRhdGVHbG9iYWxTZXR0aW5ncyxcbiAgICBVcGRhdGVHbG9iYWxTZXR0aW5nc0lucHV0LFxuICAgIFVwZGF0ZVBheW1lbnRNZXRob2QsXG4gICAgVXBkYXRlUGF5bWVudE1ldGhvZElucHV0LFxuICAgIFVwZGF0ZVRheENhdGVnb3J5LFxuICAgIFVwZGF0ZVRheENhdGVnb3J5SW5wdXQsXG4gICAgVXBkYXRlVGF4UmF0ZSxcbiAgICBVcGRhdGVUYXhSYXRlSW5wdXQsXG4gICAgVXBkYXRlWm9uZSxcbiAgICBVcGRhdGVab25lSW5wdXQsXG59IGZyb20gJy4uLy4uL2NvbW1vbi9nZW5lcmF0ZWQtdHlwZXMnO1xuaW1wb3J0IHtcbiAgICBBRERfTUVNQkVSU19UT19aT05FLFxuICAgIENBTkNFTF9KT0IsXG4gICAgQ1JFQVRFX0NIQU5ORUwsXG4gICAgQ1JFQVRFX0NPVU5UUlksXG4gICAgQ1JFQVRFX1BBWU1FTlRfTUVUSE9ELFxuICAgIENSRUFURV9UQVhfQ0FURUdPUlksXG4gICAgQ1JFQVRFX1RBWF9SQVRFLFxuICAgIENSRUFURV9aT05FLFxuICAgIERFTEVURV9DSEFOTkVMLFxuICAgIERFTEVURV9DT1VOVFJZLFxuICAgIERFTEVURV9QQVlNRU5UX01FVEhPRCxcbiAgICBERUxFVEVfVEFYX0NBVEVHT1JZLFxuICAgIERFTEVURV9UQVhfUkFURSxcbiAgICBERUxFVEVfWk9ORSxcbiAgICBHRVRfQUNUSVZFX0NIQU5ORUwsXG4gICAgR0VUX0FWQUlMQUJMRV9DT1VOVFJJRVMsXG4gICAgR0VUX0NIQU5ORUwsXG4gICAgR0VUX0NIQU5ORUxTLFxuICAgIEdFVF9DT1VOVFJZLFxuICAgIEdFVF9DT1VOVFJZX0xJU1QsXG4gICAgR0VUX0dMT0JBTF9TRVRUSU5HUyxcbiAgICBHRVRfSk9CU19CWV9JRCxcbiAgICBHRVRfSk9CU19MSVNULFxuICAgIEdFVF9KT0JfSU5GTyxcbiAgICBHRVRfSk9CX1FVRVVFX0xJU1QsXG4gICAgR0VUX1BBWU1FTlRfTUVUSE9ELFxuICAgIEdFVF9QQVlNRU5UX01FVEhPRF9MSVNULFxuICAgIEdFVF9QQVlNRU5UX01FVEhPRF9PUEVSQVRJT05TLFxuICAgIEdFVF9UQVhfQ0FURUdPUklFUyxcbiAgICBHRVRfVEFYX0NBVEVHT1JZLFxuICAgIEdFVF9UQVhfUkFURSxcbiAgICBHRVRfVEFYX1JBVEVfTElTVCxcbiAgICBHRVRfWk9ORVMsXG4gICAgUkVNT1ZFX01FTUJFUlNfRlJPTV9aT05FLFxuICAgIFVQREFURV9DSEFOTkVMLFxuICAgIFVQREFURV9DT1VOVFJZLFxuICAgIFVQREFURV9HTE9CQUxfU0VUVElOR1MsXG4gICAgVVBEQVRFX1BBWU1FTlRfTUVUSE9ELFxuICAgIFVQREFURV9UQVhfQ0FURUdPUlksXG4gICAgVVBEQVRFX1RBWF9SQVRFLFxuICAgIFVQREFURV9aT05FLFxufSBmcm9tICcuLi9kZWZpbml0aW9ucy9zZXR0aW5ncy1kZWZpbml0aW9ucyc7XG5cbmltcG9ydCB7IEJhc2VEYXRhU2VydmljZSB9IGZyb20gJy4vYmFzZS1kYXRhLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NEYXRhU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlRGF0YVNlcnZpY2U6IEJhc2VEYXRhU2VydmljZSkge31cblxuICAgIGdldENvdW50cmllcyh0YWtlOiBudW1iZXIgPSAxMCwgc2tpcDogbnVtYmVyID0gMCwgZmlsdGVyVGVybT86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UucXVlcnk8R2V0Q291bnRyeUxpc3QuUXVlcnksIEdldENvdW50cnlMaXN0LlZhcmlhYmxlcz4oR0VUX0NPVU5UUllfTElTVCwge1xuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHRha2UsXG4gICAgICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZmlsdGVyVGVybSA/IHsgY29udGFpbnM6IGZpbHRlclRlcm0gfSA6IG51bGwsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEF2YWlsYWJsZUNvdW50cmllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldEF2YWlsYWJsZUNvdW50cmllcy5RdWVyeT4oR0VUX0FWQUlMQUJMRV9DT1VOVFJJRVMpO1xuICAgIH1cblxuICAgIGdldENvdW50cnkoaWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UucXVlcnk8R2V0Q291bnRyeS5RdWVyeSwgR2V0Q291bnRyeS5WYXJpYWJsZXM+KEdFVF9DT1VOVFJZLCB7IGlkIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZUNvdW50cnkoaW5wdXQ6IENyZWF0ZUNvdW50cnlJbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPENyZWF0ZUNvdW50cnkuTXV0YXRpb24sIENyZWF0ZUNvdW50cnkuVmFyaWFibGVzPihDUkVBVEVfQ09VTlRSWSwge1xuICAgICAgICAgICAgaW5wdXQ6IHBpY2soaW5wdXQsIFsnY29kZScsICdlbmFibGVkJywgJ3RyYW5zbGF0aW9ucyddKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ291bnRyeShpbnB1dDogVXBkYXRlQ291bnRyeUlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8VXBkYXRlQ291bnRyeS5NdXRhdGlvbiwgVXBkYXRlQ291bnRyeS5WYXJpYWJsZXM+KFVQREFURV9DT1VOVFJZLCB7XG4gICAgICAgICAgICBpbnB1dDogcGljayhpbnB1dCwgWydpZCcsICdjb2RlJywgJ2VuYWJsZWQnLCAndHJhbnNsYXRpb25zJ10pLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVDb3VudHJ5KGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxEZWxldGVDb3VudHJ5Lk11dGF0aW9uLCBEZWxldGVDb3VudHJ5LlZhcmlhYmxlcz4oREVMRVRFX0NPVU5UUlksIHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRab25lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldFpvbmVzLlF1ZXJ5PihHRVRfWk9ORVMpO1xuICAgIH1cblxuICAgIGdldFpvbmUoaWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UucXVlcnk8R2V0Wm9uZS5RdWVyeSwgR2V0Wm9uZS5WYXJpYWJsZXM+KEdFVF9aT05FUywgeyBpZCB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVab25lKGlucHV0OiBDcmVhdGVab25lSW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxDcmVhdGVab25lLk11dGF0aW9uLCBDcmVhdGVab25lLlZhcmlhYmxlcz4oQ1JFQVRFX1pPTkUsIHtcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVab25lKGlucHV0OiBVcGRhdGVab25lSW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxVcGRhdGVab25lLk11dGF0aW9uLCBVcGRhdGVab25lLlZhcmlhYmxlcz4oVVBEQVRFX1pPTkUsIHtcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVab25lKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxEZWxldGVab25lLk11dGF0aW9uLCBEZWxldGVab25lLlZhcmlhYmxlcz4oREVMRVRFX1pPTkUsIHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRNZW1iZXJzVG9ab25lKHpvbmVJZDogc3RyaW5nLCBtZW1iZXJJZHM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8QWRkTWVtYmVyc1RvWm9uZS5NdXRhdGlvbiwgQWRkTWVtYmVyc1RvWm9uZS5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgQUREX01FTUJFUlNfVE9fWk9ORSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB6b25lSWQsXG4gICAgICAgICAgICAgICAgbWVtYmVySWRzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW1vdmVNZW1iZXJzRnJvbVpvbmUoem9uZUlkOiBzdHJpbmcsIG1lbWJlcklkczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxSZW1vdmVNZW1iZXJzRnJvbVpvbmUuTXV0YXRpb24sIFJlbW92ZU1lbWJlcnNGcm9tWm9uZS5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgUkVNT1ZFX01FTUJFUlNfRlJPTV9aT05FLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHpvbmVJZCxcbiAgICAgICAgICAgICAgICBtZW1iZXJJZHMsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFRheENhdGVnb3JpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5xdWVyeTxHZXRUYXhDYXRlZ29yaWVzLlF1ZXJ5PihHRVRfVEFYX0NBVEVHT1JJRVMpO1xuICAgIH1cblxuICAgIGdldFRheENhdGVnb3J5KGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldFRheENhdGVnb3J5LlF1ZXJ5LCBHZXRUYXhDYXRlZ29yeS5WYXJpYWJsZXM+KEdFVF9UQVhfQ0FURUdPUlksIHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVUYXhDYXRlZ29yeShpbnB1dDogQ3JlYXRlVGF4Q2F0ZWdvcnlJbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPENyZWF0ZVRheENhdGVnb3J5Lk11dGF0aW9uLCBDcmVhdGVUYXhDYXRlZ29yeS5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgQ1JFQVRFX1RBWF9DQVRFR09SWSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGF4Q2F0ZWdvcnkoaW5wdXQ6IFVwZGF0ZVRheENhdGVnb3J5SW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxVcGRhdGVUYXhDYXRlZ29yeS5NdXRhdGlvbiwgVXBkYXRlVGF4Q2F0ZWdvcnkuVmFyaWFibGVzPihcbiAgICAgICAgICAgIFVQREFURV9UQVhfQ0FURUdPUlksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlbGV0ZVRheENhdGVnb3J5KGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxEZWxldGVUYXhDYXRlZ29yeS5NdXRhdGlvbiwgRGVsZXRlVGF4UmF0ZS5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgREVMRVRFX1RBWF9DQVRFR09SWSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0VGF4UmF0ZXModGFrZTogbnVtYmVyID0gMTAsIHNraXA6IG51bWJlciA9IDAsIGZldGNoUG9saWN5PzogRmV0Y2hQb2xpY3kpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldFRheFJhdGVMaXN0LlF1ZXJ5LCBHZXRUYXhSYXRlTGlzdC5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgR0VUX1RBWF9SQVRFX0xJU1QsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICB0YWtlLFxuICAgICAgICAgICAgICAgICAgICBza2lwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmV0Y2hQb2xpY3ksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0VGF4UmF0ZShpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5xdWVyeTxHZXRUYXhSYXRlLlF1ZXJ5LCBHZXRUYXhSYXRlLlZhcmlhYmxlcz4oR0VUX1RBWF9SQVRFLCB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlVGF4UmF0ZShpbnB1dDogQ3JlYXRlVGF4UmF0ZUlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8Q3JlYXRlVGF4UmF0ZS5NdXRhdGlvbiwgQ3JlYXRlVGF4UmF0ZS5WYXJpYWJsZXM+KENSRUFURV9UQVhfUkFURSwge1xuICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVRheFJhdGUoaW5wdXQ6IFVwZGF0ZVRheFJhdGVJbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFVwZGF0ZVRheFJhdGUuTXV0YXRpb24sIFVwZGF0ZVRheFJhdGUuVmFyaWFibGVzPihVUERBVEVfVEFYX1JBVEUsIHtcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVUYXhSYXRlKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxEZWxldGVUYXhSYXRlLk11dGF0aW9uLCBEZWxldGVUYXhSYXRlLlZhcmlhYmxlcz4oREVMRVRFX1RBWF9SQVRFLCB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Q2hhbm5lbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5xdWVyeTxHZXRDaGFubmVscy5RdWVyeT4oR0VUX0NIQU5ORUxTKTtcbiAgICB9XG5cbiAgICBnZXRDaGFubmVsKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldENoYW5uZWwuUXVlcnksIEdldENoYW5uZWwuVmFyaWFibGVzPihHRVRfQ0hBTk5FTCwge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEFjdGl2ZUNoYW5uZWwoZmV0Y2hQb2xpY3k/OiBGZXRjaFBvbGljeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UucXVlcnk8R2V0QWN0aXZlQ2hhbm5lbC5RdWVyeSwgR2V0QWN0aXZlQ2hhbm5lbC5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgR0VUX0FDVElWRV9DSEFOTkVMLFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBmZXRjaFBvbGljeSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjcmVhdGVDaGFubmVsKGlucHV0OiBDcmVhdGVDaGFubmVsSW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxDcmVhdGVDaGFubmVsLk11dGF0aW9uLCBDcmVhdGVDaGFubmVsLlZhcmlhYmxlcz4oQ1JFQVRFX0NIQU5ORUwsIHtcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVDaGFubmVsKGlucHV0OiBVcGRhdGVDaGFubmVsSW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxVcGRhdGVDaGFubmVsLk11dGF0aW9uLCBVcGRhdGVDaGFubmVsLlZhcmlhYmxlcz4oVVBEQVRFX0NIQU5ORUwsIHtcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVDaGFubmVsKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLm11dGF0ZTxEZWxldGVDaGFubmVsLk11dGF0aW9uLCBEZWxldGVDaGFubmVsLlZhcmlhYmxlcz4oREVMRVRFX0NIQU5ORUwsIHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRQYXltZW50TWV0aG9kcyh0YWtlOiBudW1iZXIgPSAxMCwgc2tpcDogbnVtYmVyID0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UucXVlcnk8R2V0UGF5bWVudE1ldGhvZExpc3QuUXVlcnksIEdldFBheW1lbnRNZXRob2RMaXN0LlZhcmlhYmxlcz4oXG4gICAgICAgICAgICBHRVRfUEFZTUVOVF9NRVRIT0RfTElTVCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIHNraXAsXG4gICAgICAgICAgICAgICAgICAgIHRha2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0UGF5bWVudE1ldGhvZChpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5xdWVyeTxHZXRQYXltZW50TWV0aG9kLlF1ZXJ5LCBHZXRQYXltZW50TWV0aG9kLlZhcmlhYmxlcz4oXG4gICAgICAgICAgICBHRVRfUEFZTUVOVF9NRVRIT0QsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2QoaW5wdXQ6IENyZWF0ZVBheW1lbnRNZXRob2RJbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPENyZWF0ZVBheW1lbnRNZXRob2QuTXV0YXRpb24sIENyZWF0ZVBheW1lbnRNZXRob2QuVmFyaWFibGVzPihcbiAgICAgICAgICAgIENSRUFURV9QQVlNRU5UX01FVEhPRCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlUGF5bWVudE1ldGhvZChpbnB1dDogVXBkYXRlUGF5bWVudE1ldGhvZElucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8VXBkYXRlUGF5bWVudE1ldGhvZC5NdXRhdGlvbiwgVXBkYXRlUGF5bWVudE1ldGhvZC5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgVVBEQVRFX1BBWU1FTlRfTUVUSE9ELFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWxldGVQYXltZW50TWV0aG9kKGlkOiBzdHJpbmcsIGZvcmNlOiBib29sZWFuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8RGVsZXRlUGF5bWVudE1ldGhvZC5NdXRhdGlvbiwgRGVsZXRlUGF5bWVudE1ldGhvZC5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgREVMRVRFX1BBWU1FTlRfTUVUSE9ELFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIGZvcmNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRQYXltZW50TWV0aG9kT3BlcmF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldFBheW1lbnRNZXRob2RPcGVyYXRpb25zLlF1ZXJ5PihHRVRfUEFZTUVOVF9NRVRIT0RfT1BFUkFUSU9OUyk7XG4gICAgfVxuXG4gICAgZ2V0R2xvYmFsU2V0dGluZ3MoZmV0Y2hQb2xpY3k/OiBXYXRjaFF1ZXJ5RmV0Y2hQb2xpY3kpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldEdsb2JhbFNldHRpbmdzLlF1ZXJ5PihcbiAgICAgICAgICAgIEdFVF9HTE9CQUxfU0VUVElOR1MsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICBmZXRjaFBvbGljeSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVHbG9iYWxTZXR0aW5ncyhpbnB1dDogVXBkYXRlR2xvYmFsU2V0dGluZ3NJbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UubXV0YXRlPFVwZGF0ZUdsb2JhbFNldHRpbmdzLk11dGF0aW9uLCBVcGRhdGVHbG9iYWxTZXR0aW5ncy5WYXJpYWJsZXM+KFxuICAgICAgICAgICAgVVBEQVRFX0dMT0JBTF9TRVRUSU5HUyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0Sm9iKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldEpvYkluZm8uUXVlcnksIEdldEpvYkluZm8uVmFyaWFibGVzPihHRVRfSk9CX0lORk8sIHsgaWQgfSk7XG4gICAgfVxuXG4gICAgcG9sbEpvYnMoaWRzOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGF0YVNlcnZpY2UucXVlcnk8R2V0Sm9ic0J5SWQuUXVlcnksIEdldEpvYnNCeUlkLlZhcmlhYmxlcz4oR0VUX0pPQlNfQllfSUQsIHtcbiAgICAgICAgICAgIGlkcyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0QWxsSm9icyhvcHRpb25zPzogSm9iTGlzdE9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZURhdGFTZXJ2aWNlLnF1ZXJ5PEdldEFsbEpvYnMuUXVlcnksIEdldEFsbEpvYnMuVmFyaWFibGVzPihHRVRfSk9CU19MSVNULCB7XG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRKb2JRdWV1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5xdWVyeTxHZXRKb2JRdWV1ZUxpc3QuUXVlcnk+KEdFVF9KT0JfUVVFVUVfTElTVCk7XG4gICAgfVxuXG4gICAgZ2V0UnVubmluZ0pvYnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5xdWVyeTxHZXRBbGxKb2JzLlF1ZXJ5LCBHZXRBbGxKb2JzLlZhcmlhYmxlcz4oR0VUX0pPQlNfTElTVCwge1xuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXE6IEpvYlN0YXRlLlJVTk5JTkcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbmNlbEpvYihpZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VEYXRhU2VydmljZS5tdXRhdGU8Q2FuY2VsSm9iLk11dGF0aW9uLCBDYW5jZWxKb2IuVmFyaWFibGVzPihDQU5DRUxfSk9CLCB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19