/**
 * An enum for the different types of groups
 */
export enum GroupType {
    Association = "Association",
    Club = "Club",
    Group = "Group",
    Integration = "Integration",
    StudentAssociationSection = "StudentASsociationSection",
    List = "List"
};	

export interface Group {
    president : boolean;
    treasurer : boolean;
    vicePresident : boolean;
    secretary : boolean;
    group: {
        uid: string;
        name: string;
        type : GroupType;
    };
}

export interface User {
    pictureFile: string;
    firstName: string;
    lastName: string;
    uid: string;
    major: {
        name: string;
    };
    groups: Group[];
    phone: string;
}

export interface ListeInfo {
    pictureFile: string;
    name: string;
    uid: string;
    color: string;
}

export interface Liste extends ListeInfo {
    members: User[];
}