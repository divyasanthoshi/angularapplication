export class ApplicationConstants {
    public static readonly baseUrl = '/application';

    public static readonly url = {
        page: {
            providerprofile: ApplicationConstants.baseUrl + '/providerprofile',
            businessHours: ApplicationConstants.baseUrl + '/businesshours',
            services: ApplicationConstants.baseUrl + '/services',
            people: ApplicationConstants.baseUrl + '/people',
            peoplePersonnelView: ApplicationConstants.baseUrl + '/people/view',
            personnelProfile: ApplicationConstants.baseUrl + '/personnelprofile',
            ownershipPersonnelProfile: ApplicationConstants.baseUrl + '/ownershippersonnelprofile',
            ownership: ApplicationConstants.baseUrl + '/ownership',
            ownershipInfo: ApplicationConstants.baseUrl + '/ownershipinfo',
            summary: ApplicationConstants.baseUrl + '/summary',
            applicationCertify: ApplicationConstants.baseUrl + '/certify',
            applicationSubmit: ApplicationConstants.baseUrl + '/submit',
            applicationSubmitted: ApplicationConstants.baseUrl + '/submitted',
            documents: ApplicationConstants.baseUrl + '/documents',
            peopleDocuments: ApplicationConstants.baseUrl + '/formfiler',
            attestation: ApplicationConstants.baseUrl + '/documents/AGMC',
            attestationView: ApplicationConstants.baseUrl + '/documents/AGMC/view',
            attestationEdit: ApplicationConstants.baseUrl + '/documents/AGMC/edit',
            childabuse: ApplicationConstants.baseUrl + '/documents/CANR',
            childabuseView: ApplicationConstants.baseUrl + '/documents/CANR/view',
            childabuseEdit: ApplicationConstants.baseUrl + '/documents/CANR/edit',
            empHistory: ApplicationConstants.baseUrl + '/documents/EH',
            empHistoryView: ApplicationConstants.baseUrl + '/documents/EH/view',
            empHistoryCreate: ApplicationConstants.baseUrl + '/documents/EH/create',
            empHistoryEdit: ApplicationConstants.baseUrl + '/documents/EH/edit',
            viewEmploymentDetails: ApplicationConstants.baseUrl + '/employmentdetails/view',
            zoningAttestation: ApplicationConstants.baseUrl + '/zoningattestation',
            editSelfAttestation: ApplicationConstants.baseUrl + '/selfattestation/edit'
        },
        api: {
            getApplicationLookup: '/api/Application/Lookup',
            verifyAddress: '/api/Shared/Address',
            insertUpdateGetProvider: '/api/Provider/OnHoldProvider',
            insertUpdateGetPersonnel: '/api/Personnel/OnHoldPerson',
            searchDocumentNumber: '/api/Ownership/Document',
            createUpdateGetOwnership: '/api/Ownership/Detail',
            submitForm: '/api/Application/Status',
            getProviderId: '/api/Form/Detail/FormId',
            getPersonTitlePlus: '/api/Application/LookupPersonTitle',
            getInsertUpdateServices: '/api/Service/OnHoldProvider',
            insertUpdateGetBusinessHours: '/api/BusinessHour/OnHoldProvider',
            getDocumentsList: '/api/Form/ProviderId',
            getDocumentsPeopleList: '/api/Form/Filer',
            getInsertUpdateDeleteEmploymentDetails: '/api/Form/EmploymentHistoryCheck/Details',
            getInsertUpdateUnEmploymentDetails: '/api/Form/EmploymentHistoryCheck/Unemployment',
            getEmploymentHistoryCheckSummary: '/api/Form/EmploymentHistoryCheck/Summary',
            getInsertUpdateAGMCDetails: '/api/Form/GoodMoralCharacter',
            childAbuseReportingDetail: '/api/Form/ChildAbuseNeglectReporting',
            zoningAttestationSource: '/api/Form/ZoningAttestation/Lookup',
            zoningAttestationDetail: '/api/Form/ZoningAttestation',
            selfAttestationDetail: '/api/Form/ZoningAttestation/SelfAttestation',
            upload: '/upload'
        }

    };

    public static readonly urlList = [
        'Provider Profile',
        'Attestation',
        'Business Hours',
        'Services',
        'Employment History',
        'Employment Details',
        'Ownership Info',
        'Ownership',
        'Ownership Personnel Profile',
        'People',
        'Personnel Profile',
        'Summary',
        'Certify',
        'Submit',
        'Submitted',
        'Child Abuse',
        'Documents',
        'formfilers',
       'Zoning Attestation',
        'Self Attestation'
    ];

    // constants for providerprofile stepper
    public static readonly stepperList = [
        'providerprofile',
        'people',
        'ownership',
        'summary'
    ];

    public static readonly validationModalData = {
        title: {
            title: 'Fix Ownership Error',
        },
        description: {
            individualDescriptionErrorOne: 'More than one person has been assigned as owner in the People page. But the ownership type has been selected as Individual. Below are your options',
            individualDescriptionErrorTwo: 'You have opted for Individual, there must be only one Owner role profile, kindly add atleast one owner role profile',
            partnershipDescriptionErrorOne: 'You have opted for Partnership, there must be only two Owner role profile, kindly remove the additional owner role profile',
            partnershipDescriptionErrorTwo: 'You have opted for Partnership, there must be atleast two Owner role profile, kindly add the owner role profile',
            peoplePersonnelError: 'Please add a person record',
            corporationDescriptionErrorOne: 'You have opted for Corporation, there must be no Owner role profile, kindly remove the owner role profile',
            otherEntityDescriptionErrorOne: 'You have opted for Other Entity, there must be no Owner role profile, kindly remove the owner role profile'
        },
        listItems: {
            individualItemsErrorOne: ['If the ownership type is an Individual, remove the role Owner for everyone in the People page, except that Individual.',
                'If there is more than one owner and the partnership is not registered with SunBiz, change the ownership type to Partnership in the Ownership page.'
            ],
            individualItemsErrorTwo: ['List', 'List'],
            partnershipItemsErrorOne: ['If the ownership type is Partnership, there must be atleast two owners assigned, Kindly fix it.',
                'If there is more than one owner and the partnership is not registered with SunBiz, change the ownership type to Partnership in the Ownership page.'
            ],
            corporationItemsErrorOne: ['If the ownership type is Corporation, there must be no owners assigned, Kindly fix it.',
                'If there is more than one owner and the partnership is not registered with SunBiz, change the ownership type to Partnership in the Ownership page.'
            ],
            otherEntityItemsErrorOne: ['If the ownership type is Other Entity, there must be no owners assigned, Kindly fix it.',
                'If there is more than one owner and the partnership is not registered with SunBiz, change the ownership type to Partnership in the Ownership page.'
            ],
        }
    };

    public static readonly ownershipTypeTags = {
        2: 'Individual',
        3: 'Partnership',
        4: 'Corporation',
        5: 'Other Entity'
    };

    public static readonly serviceDetails = [
        {
            serviceId: 2,
            description: 'Childcare offered full day.',
            imagePath: '../../../../assets/service_fullday.json'
        },
        {
            serviceId: 3,
            description: 'Childcare offered half day',
            imagePath: '../../../../assets/service_halfday.json'
        },
        {
            serviceId: 4,
            description: 'Care in a facility, in a mall or business establishment for not more than 4 hours.',
            imagePath: '../../../../assets/services_dropin.json'
        },
        {
            serviceId: 5,
            description: 'Care provided from 6:00 pm to 7:00 am the following day to help parents who work evening shifts.',
            imagePath: '../../../../assets/service_nightcare.json'
        },
        {
            serviceId: 6,
            description: 'Care for kids before the school hours when students are not in school and parents not at home.',
            imagePath: '../../../../assets/service_beforeschool.json'
        },
        {
            serviceId: 7,
            description: 'Care for kids after the school hours when students are not in school and parents not at home.',
            imagePath: '../../../../assets/service_Afterschool.json'
        },
        {
            serviceId: 8,
            description: 'Care provided between the hours of 6:00 pm on Friday and 6:00 am on Monday.',
            imagePath: '../../../../assets/Calander1.json'
        },
        {
            serviceId: 9,
            description: 'Support for nursery facilities and home fostering, taking care of infants from 0 to 2 years.',
            imagePath: '../../../../assets/service_infant.json'
        },
        {
            serviceId: 10,
            description: 'Provide nutritious meals and snacks of quantity and quality to meet the daily needs of children.',
            imagePath: '../../../../assets/service_food.json'
        },
        {
            serviceId: 11,
            description: 'Transportation of children in care per request by parent/gaurdian.',
            imagePath: '../../../../assets/service_transportation.json'
        },
        // {
        //     serviceId: 12,
        //     description: '',
        //     imagePath: '../../../../assets/service_movingbus.json'
        // },
        // {
        //     serviceId: 14,
        //     description: '',
        //     imagePath: '../../../../assets/service_open24hours.json'
        // },
        // {
        //     serviceId: 15,
        //     description: '',
        //     imagePath: '../../../../assets/service_movingbus.json'
        // },
        // {
        //     serviceId: 16,
        //     description: '',
        //     imagePath: '../../../../assets/service_openyearround.json'
        // }
    ];

    public static readonly attestationLinks = [
        {
            description: 'Sexual misconduct with certain developmentally disabled clients and reporting of such sexual misconduct',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=393.135&URL=0300-0399/0393/Sections/0393.135.html'
        },
        {
            description: 'Attempts, solicitation, and conspiracy',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=777.04&URL=0700-0799/0777/Sections/0777.04.html'
        },
        {
            description: 'Adult abuse, neglect, or exploitation of aged persons or disabled adults or failure to report of such abuse ',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=415.111&URL=0400-0499/0415/Sections/0415.111.html'
        },
        {
            description: 'Murder',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=782.04&URL=0700-0799/0782/Sections/0782.04.html'
        },
        {
            description: 'Sexual misconduct with certain mental health patients and reporting of such sexual misconduct',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=394.4593&URL=0300-0399/0394/Sections/0394.4593.html'
        },
        {
            description: 'Vehicular homicide',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=782.071&URL=0700-0799/0782/Sections/0782.071.html'
        },
        {
            description: 'Criminal offenses that constitute domestic violence, whether committed in Florida or another jurisdiction',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=741.28&URL=0700-0799/0741/Sections/0741.28.html'
        },
        {
            description: 'Killing an unborn quick child by injury to the mother',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=782.09&URL=0700-0799/0782/Sections/0782.09.html'
        },
        {
            description: 'Assault, battery, and culpable negligence, if the offense was a felony',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0784/0784.html'
        },
        {
            description: 'Assault, if the victim of offense was a minor',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=784.011&URL=0700-0799/0784/Sections/0784.011.html'
        },
        {
            description: 'Battery, if the victim of offense was a minor',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=784.03&URL=0700-0799/0784/Sections/0784.03.html'
        },
        {
            description: 'Kidnapping',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=787.01&URL=0700-0799/0787/Sections/0787.01.html'
        },
        {
            description: 'Manslaughter, aggravated manslaughter of an elderly person or disabled adult, or aggravated manslaughter of a child',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=782.07&URL=0700-0799/0782/Sections/0782.07.html'
        },
        {
            description: 'False imprisonment',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=787.02&URL=0700-0799/0787/Sections/0787.02.html'
        },
        {
            description: 'Luring or enticing a child',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=787.025&URL=0700-0799/0787/Sections/0787.025.html'
        },
        {
            description: 'Taking, enticing, or removing a child beyond the state limits with criminal intent pending custody proceeding',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=787.04&URL=0700-0799/0787/Sections/0787.04.html'
        },
        {
            description: 'Sexual battery',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=794.011&URL=0700-0799/0794/Sections/0794.011.html'
        },
        {
            description: 'Prohibited acts of persons in familial or custodial authority',
            url: ''
        },
        {
            description: 'Exhibiting firearms or weapons within 1,000 feet of a school',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=790.115&URL=0700-0799/0790/Sections/0790.115.html'
        },
        {
            description: 'Possessing an electric weapon or device, destructive device, or other weapon on school property',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=790.115&URL=0700-0799/0790/Sections/0790.115.html'
        },
        {
            description: 'Unlawful sexual activity with certain minors',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=794.05&URL=0700-0799/0794/Sections/0794.05.html'
        },
        {
            description: 'Prostitution',
            url: ''
        },
        {
            description: 'Carrying a child beyond the state lines with criminal intent to avoid producing a child at a custody hearing or delivering the child to the designated person',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=787.04&URL=0700-0799/0787/Sections/0787.04.html'
        },
        {
            description: 'Lewd and lascivious behavior',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=798.02&URL=0700-0799/0798/Sections/0798.02.html'
        },
        {
            description: 'Lewdness and indecent exposure',
            url: ''
        },
        {
            description: 'Arson',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=806.01&URL=0800-0899/0806/Sections/0806.01.html'
        },
        {
            description: 'Burglary',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=810.02&URL=0800-0899/0810/Sections/0810.02.html'
        },
        {
            description: 'Voyeurism, if the offense is a felony',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=810.14&URL=0800-0899/0810/Sections/0810.14.html'
        },
        {
            description: 'Video voyeurism, if the offense is a felony',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=810.145&URL=0800-0899/0810/Sections/0810.145.html'
        },
        {
            description: 'Theft and/or robbery and related crimes, if a felony offense',
            url: ''
        },
        {
            description: 'Fraudulent sale of controlled substances, if the offense was a felony',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=817.563&URL=0800-0899/0817/Sections/0817.563.html'
        },
        {
            description: 'Abuse, aggravated abuse, or neglect of an elderly person or disabled adult',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=825.102&URL=0800-0899/0825/Sections/0825.102.html'
        },
        {
            description: 'Lewd or lascivious offenses committed upon or in the presence of an elderly person or disabled adult',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=825.1025&URL=0800-0899/0825/Sections/0825.1025.html'
        },
        {
            description: 'Exploitation of disabled adults or elderly persons, if the offense was a felony',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=825.103&URL=0800-0899/0825/Sections/0825.103.html'
        },
        {
            description: 'Incest',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=826.04&URL=0800-0899/0826/Sections/0826.04.html'
        },
        {
            description: 'Child abuse, aggravated child abuse, or neglect of a child',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=827.03&URL=0800-0899/0827/Sections/0827.03.html'
        },
        {
            description: 'Contributing to the delinquency or dependency of a child',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=827.04&URL=0800-0899/0827/Sections/0827.04.html'
        },
        {
            description: 'Negligent treatment of children',
            url: ''
        },
        {
            description: 'Sexual performance by a child',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=827.071&URL=0800-0899/0827/Sections/0827.071.html'
        },
        {
            description: 'Resisting arrest with violence',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=843.01&URL=0800-0899/0843/Sections/0843.01.html'
        },
        {
            description: 'Depriving a law enforcement, correctional, or correctional probation officer means of protection or communication',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=843.025&URL=0800-0899/0843/Sections/0843.025.html'
        },
        {
            description: 'Aiding in an escape',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=843.12&URL=0800-0899/0843/Sections/0843.12.html'
        },
        {
            description: 'Aiding in the escape of juvenile inmates in correctional institution',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=843.13&URL=0800-0899/0843/Sections/0843.13.html'
        },
        {
            description: 'Obscene literature',
            url: ''
        },
        {
            description: 'Encouraging or recruiting another to join a criminal gang',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=874.05&URL=0800-0899/0874/Sections/0874.05.html'
        },
        {
            description: 'Sexual misconduct with certain forensic clients and reporting of such sexual conduct',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=916.1075&URL=0900-0999/0916/Sections/0916.1075.html'
        },
        {
            description: 'Inflicting cruel or inhuman treatment on an inmate resulting in great bodily harm ',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=944.35&URL=0900-0999/0944/Sections/0944.35.html'
        },
        {
            description: 'Escape',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=944.40&URL=0900-0999/0944/Sections/0944.40.html'
        },
        {
            description: 'Drug abuse prevention and control only if the offense was a felony or if any other person involved in the offense was a minor',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0800-0899/0893/0893ContentsIndex.html'
        },
        {
            description: 'Harboring, concealing, or aiding an escaped prisoner',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=944.46&URL=0900-0999/0944/Sections/0944.46.html'
        },
        {
            description: 'Introduction of contraband into a correctional facility',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=944.47&URL=0900-0999/0944/Sections/0944.47.html'
        },
        {
            description: 'Sexual misconduct in juvenile justice programs',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=985.701&URL=0900-0999/0985/Sections/0985.701.html'
        },
        {
            description: 'Contraband introduced into detention facilities',
            url: 'http://www.leg.state.fl.us/statutes/index.cfm?mode=View%20Statutes&SubMenu=1&App_mode=Display_Statute&Search_String=985.711&URL=0900-0999/0985/Sections/0985.711.html'
        },
    ];

    public static readonly weekDaysIds = {
        Sunday: 1,
        Monday: 2,
        Tuesday: 3,
        Wednesday: 4,
        Thursday: 5,
        Friday: 6,
        Saturday: 7,
    };

    public static readonly weekDaysNames = {
        1: 'Sunday',
        2: 'Monday',
        3: 'Tuesday',
        4: 'Wednesday',
        5: 'Thursday',
        6: 'Friday',
        7: 'Saturday'
    };
    public static readonly isEmployed = {
        1: true,
        2: false
    };

    public static readonly openDuringYear = {
        2: 'Open during school year?',
        3: 'Open during summer?'
    };

}
