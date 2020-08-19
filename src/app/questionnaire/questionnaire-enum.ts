import { ProgramType, PropertyType } from '../_shared/enum';

export enum ProgramType2IconName {
    'home' = PropertyType.AtHome,
    'business' = PropertyType.CommercialBuilding,
    'fachurch' = PropertyType.ReligiousCenter,
    'school' = PropertyType.PublicPrivateSchool
}

export enum ChildrenCount {
    TwoToTenKids = 1,
    ElevenToTwelveKids = 2,
    MoreThanTwelveKids = 3
}

// Compare Table Row Label Names
export enum RowKeys {
    recommendList = 'RecommendList',
    summary = 'Summary',
    numberOfChildren = 'Number of Children',
    director = 'Director',
    inspections = 'Inspections',
    fees = 'Fees',
    location = 'Location',
    staffToChildRatio = 'Staff to Child Ratio',
    capacity = 'Capacity',
    services = 'Services',
    training = 'Training',
    trainingStaff = 'Training Staff',
    backgroundScreening = 'Background Screening',
    other = 'Other'
}

// Recommendation List Label Names
export enum ColumnKeys {
    registered = 'Registered Family Day Care Home',
    licensed = 'Licensed Family Day Care Home',
    large = 'Large Family Day Care Home',
    childcare = 'Childcare Facility',
    exempt = 'Exempt Child Care Facility',
    licensedMildy = 'Licensed Mildly Ill',
    licensedChildCare = 'Licensed Child Care Facility'
}

// Mapping the recommendation list label name with a key word in the compare table JSON data format
export enum ColumnNameTags {
    'Registered Family Day Care Home' = 'registered',
    'Licensed Family Day Care Home' = 'licensed',
    'Large Family Day Care Home' = 'large',
    'Childcare Facility' = 'childcare',
    'Exempt Child Care Facility' = 'exempt',
    'Licensed Mildly Ill' = 'licensedMildy',
    'Licensed Child Care Facility' = 'licensedChildCare',
}

// Mapping the icons based upon the recommendaiton list label name
export enum IconRecommendation {
    'Registered Family Day Care Home' = 'home',
    'Licensed Family Day Care Home' = 'home',
    'Large Family Day Care Home' = 'fachurch',
    'Childcare Facility' = 'school',
    'Exempt Child Care Facility' = 'home',
    'Licensed Mildly Ill' = 'business',
    'Licensed Child Care Facility' = 'business'
}

