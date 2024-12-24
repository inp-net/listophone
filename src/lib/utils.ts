//Enum pour les différents types de groupes
export enum GroupType {
    Association = "Association",
    Club = "Club",
    Group = "Group",
    Integration = "Integration",
    StudentAssociationSection = "StudentASsociationSection",
    List = "List"
};	

// Interface pour 
export interface groups {
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

export interface user {
    member: {
        pictureFile: string;
        firstName: string;
        lastName: string;
        uid: string;
        major: {
            shortName: string;
        };
        groups: groups[];
        phone: string;
    };
}

export interface groupListe {
    pictureFile: string;
    name: string;
    uid: string;
    color: string;
    members: user[];
}