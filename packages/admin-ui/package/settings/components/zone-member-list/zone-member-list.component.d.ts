import { EventEmitter } from '@angular/core';
import { ZoneMemberControlsDirective } from './zone-member-controls.directive';
import { ZoneMemberListHeaderDirective } from './zone-member-list-header.directive';
export declare type ZoneMember = {
    id: string;
    name: string;
    code: string;
};
export declare class ZoneMemberListComponent {
    members: ZoneMember[];
    selectedMemberIds: string[];
    selectionChange: EventEmitter<string[]>;
    headerTemplate: ZoneMemberListHeaderDirective;
    controlsTemplate: ZoneMemberControlsDirective;
    filterTerm: string;
    filteredMembers(): ZoneMember[];
    areAllSelected(): boolean;
    toggleSelectAll(): void;
    toggleSelectMember(member: ZoneMember): void;
    isMemberSelected: (member: ZoneMember) => boolean;
}
