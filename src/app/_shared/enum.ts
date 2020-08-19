export enum ProgramType {
    ChildCareFacility         = 1,
    FamilyDayCareHome         = 2,
    Informal                  = 3,
    LargeFamilyChildCareHome  = 4,
    MildlyIll                 = 5
}

export enum LicenseStatus {
    Licensed = 1,
    Illegal = 2,
    Registered = 3,
    Exempt = 4,
    SubstantialCompliance = 5
}

export enum Agency {
    FloridaDCF          = 2 ,
    HillsboroughCounty  = 36,
    PalmBeachCount      = 37,
    PinellasCounty      = 38,
    SarasotaCounty      = 39,
    BrowardCounty       = 40
}

export enum ProviderType {
    SubstantialComplianceChildCareFacility,
    IllegalChildCareFacility,
    LicensedLargeFamilyChildCareHome,
    LicensedMildlyIll,
    ExemptInformal,
    LicensedChildCareFacility,
    ExemptChildCareFacility,
    RegisteredFamilyDayCareHome,
    IllegalFamilyDayCareHome,
    LicensedFamilyDayCareHome
}

export enum OrganizationType {
    Individual = 2,
    Partnership = 3,
    Corporation = 4,
    OtherEntity = 22
}

export enum FormType {
    Intent = 1,
    Application = 2,
}

export enum FormStatus {
    InProgress              = 1,
    ReadyToSubmit           = 2,
    Submitted               = 3,
    AssignedToCounselor     = 4,
    UnderReview             = 5,
    RequestForInformation   = 6,
    Closed                  = 7,
    NotifiedToApply         = 8,
    PendingInspection       = 9,
    Approved                = 10,
    Denied                  = 11
}

export enum PropertyType {
    AtHome = 1,
    CommercialBuilding = 2,
    ReligiousCenter = 3,
    PublicPrivateSchool = 4
}

export enum AddressType {
    Mailing = 2,
    Billing = 3,
    Home    = 4,
    Work    = 5,
    Main    = 6
}

export enum EmailAddressType {
    PersonalPrimary   = 1,
    PersonalSecondary = 2,
    Work = 3,
    Main = 4,
    Other = 5
}

export enum PhoneType {
    Blank = 1,
    Work = 2,
    Cell = 3,
    Home = 4,
    Other = 5,
    Fax = 6,
    Landline = 7
}

export enum PersonType {
    Owner = 4,
    Director = 6,
    Driver = 30
}

export enum OwnershipType {
    Individual = 2,
    Partnership = 3,
    Corporation = 4,
    OtherEntity = 5
}

export enum PersonTitleId {
    Owner = 20,
}

export enum Module {
    All = 1,
    Dashboard = 2,
    Forms = 3,
    Application = 4,
    Questionnaire = 5
}

export enum Page {
    All = 1,
    Provider = 2
}

export enum SectionControl {
    All = 1
}
export enum FormTypes {
    AGMC= 3,
    CANR = 5,
    EH = 6,
    ZBL = 7
}
export enum ProgressStatusEnum {
    START, COMPLETE, IN_PROGRESS, ERROR
  }
