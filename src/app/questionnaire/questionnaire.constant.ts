export class QuestionnaireConstants {
    public static readonly urlList = [
        'propertytype',
        'location',
        'children',
        'sickchildren',
        'recommendation'
    ];

    public static readonly parentSegment = '/questionnaire';

    public static readonly url = {
        lookup: '/api/Questionnaire/Lookup',
        getQuestionnaire: '/api/Questionnaire/Recommendation',
    };
}

export const compareTableData = {

        summary: [
          { registered: '​Explain about the program in few words. Who should apply (or) profile of people who typically apply for this type of program.' },
          { licensed: 'See RFDCH' },
          { large: '​See RFDCH' },
          { childcare: '​See RFDCH' },
          { exempt: '​See RFDCH' },
          { licensedMildy: 'See RFDCH' },
          { licensedChildCare: 'See RFDCH' }
        ],
        numberOfChildren: [
          { registered: 10 },
          { licensed: 10 },
          { large: 12 },
          { childcare: 'More than 12' },
          { exempt: 'More than 12' },
          { licensedMildy: 'More than 12' },
          { licensedChildCare: 10 },
        ],
        director: [
          { registered: 'The operator must be an occupant of the home.' },
          { licensed: 'The operator must be an occupant of the home.' },
          { large: 'The operator must be an occupant of the home.' },
          { childcare: '​Person with a Director credential is mandatory and be present in the facility at all times except evening hours and weekends.' },
          { exempt: '​Person with a Director credential is mandatory and be present in the facility at all times except evening hours and weekends.' },
          { licensedMildy: '​Person with a Director credential is mandatory and be present in the facility at all times except evening hours and weekends.' },
          { licensedChildCare: 'The operator must be an occupant of the home.' }
        ],
        inspections: [
          {
            registered: 'No inspection unless a complaint received. An annual statement must be completed.',
            linkText: ['annual statement'],
            linkDescription: ['annualStatementInspectionRegistered'],
          },
          { licensed: '​A new home inspection and a routine inspection each year. A renewal inspection for subsequent years for relicensure.' },
          { large: '​​A new home inspection and a routine inspection each year. A renewal inspection for subsequent years for relicensure.' },
          { childcare: '​An initial inspection and 2 routine inspections each year. A renewal inspection for subsequent years for relicensure.' },
          { exempt: '​​No inspections unless a complaint received.​' },
          { licensedMildy: '​An initial inspection and 2 routine inspections each year. A renewal inspection for subsequent years for relicensure.' },
          { licensedChildCare: '​A new home inspection and a routine inspection each year. A renewal inspection for subsequent years for relicensure.' },
        ],
        fees: [
          { registered: ['​$25', '', ''] },
          { licensed: ['​$50', '', ''] },
          { large: ['​$60', '', ''] },
          { childcare: ['​Minimum fee: $25', 'Maximum fee: $100', '(Increments of $1 per child)​​'] },
          { exempt: ['​None Required', '', ''] },
          { licensedMildy: ['​Minimum fee: $25', 'Maximum fee: $100', '(Increments of $1 per child)​​'] },
          { licensedChildCare: ['​$50', '', ''] },
        ],
        location: [
          {
            registered: `Business can be located in any county except Brevard,
              Broward, Clay, Duval, Hernando, Hillsborough, Manatee, Miami-Dade, Nassau,
              Palm Beach, Pasco, Pinellas, Polk, Sarasota or St. John’s. Why?`,
            linkText: ['Why'],
            linkDescription: ['whyLocationRegistered']
          },
          { licensed: '​Business can be located in any county.' },
          { large: 'Business can be located in any county.' },
          { childcare: 'Business can be located in any county.' },
          { exempt: 'Business can be located in any county.' },
          { licensedMildy: 'Business can be located in any county.' },
          { licensedChildCare: '​Business can be located in any county.' }
        ],
        staffToChildRatio: [
          { registered: ['0-12 months: 1 to 4', '0 - 5 yrs: 1 to 6 ', '0 - 12 yrs: 1 to 6 (if all children are older than 12 months)', '0 - 12 yrs: 1 to 10 (if 2 children are under 12 months, at least five are 13 months to 5 yrs)', '', ''] },
          { licensed: ['0-12 months: 1 to 4', '0 - 5 yrs: 1 to 6 ', '0 - 12 yrs: 1 to 6 (if all children are older than 12 months)', '0 - 12 yrs: 1 to 10 (if 2 children are under 12 months, at least five are 13 months to 5 yrs)', '', ''] },
          { large: ['​​​Birth to 2 yrs: 2 to 8 (whenup to 8 children are between 0 and 24 months)', 'Birth to 2 yrs: 2 to 12 (when up to 4 children are between 0 and 24 months)', '', '',
            '', ''] },
          { childcare: ['​​Birth to 1yr: 1 to 4', '1 - 2 yrs: 1 to 6', '2 - 3 yrs: 1 to 11', '3 - 4 yrs: 1 to 15',
            '4 - 5 yrs: 1 to 20 ', '5 yrs or older: 1 to 25']},
          { exempt: ['​​Birth to 1yr: 1 to 4', '1 - 2 yrs: 1 to 6', '2 - 3 yrs: 1 to 11', '3 - 4 yrs: 1 to 15',
            '4 - 5 yrs: 1 to 20 ', '5 yrs or older: 1 to 25'] },
          { licensedMildy: ['​​Infants: ​​1 to 3', '1 - 4 yrs: 1 to 4', '4 yrs or older: 1 to 6', '', ''] },
          { licensedChildCare: ['0-12 months: 1 to 4', '0 - 5 yrs: 1 to 6 ', '0 - 12 yrs: 1 to 6 (if all children are older than 12 months)', '0 - 12 yrs: 1 to 10 (if 2 children are under 12 months, at least five are 13 months to 5 yrs)', '', ''] }
        ],
        capacity: [
          { registered: ['Indoor: Any', 'Outdoor: Optional', ''] },
          { licensed: ['Indoor: Any', 'Outdoor: must have fenced outdoor play space for children 12 months or older.', '**Not required if majority of the children are younger than 12 months of age**'] },
          { large: ['​Indoor: Must be 35 square foot per child', 'Outdoor: Minimum of 270 square feet of usable outdoor play space on property.', '**Does not apply if majority of the children are younger than 12 months of age.'] },
          // tslint:disable-next-line:max-line-length
          { childcare: ['​Indoor: 35 square foot per child', 'Outdoor: 45 square foot per child ', 'A capacity of 1 to 15 children is required to have a toilet and wash basin. There should be one more toilet and wash basin every additional 30 children.'] },
          { exempt: ['​Indoor: 35 square foot per child', 'Outdoor: 45 square foot per child ', 'A capacity of 1 to 15 children is required to have a toilet and wash basin. There should be one more toilet and wash basin every additional 30 children.'] },
          { licensedMildy: ['​Indoor: 35 square foot per child', 'Outdoor: Optional ', ''] },
          { licensedChildCare: ['Indoor: Any', 'Outdoor: must have fenced outdoor play space for children 12 months or older.', '**Not required if majority of the children are younger than 12 months of age**'] }
        ],
        services: [
          { registered: 'Elligible to offer: School Readiness' },
          { licensed: '​​Elligible to offer: School Readiness' },
          { large: 'Elligible to offer: School Readiness' },
          { childcare: '​​Elligible to offer: School Readiness, Head, Start, VPK' },
          { exempt: '​​Elligible to offer: School Readiness, Head Start, VPK' },
          { licensedMildy: 'Elligible to offer: School Readiness, Head, Start, VPK' },
          { licensedChildCare: '​​Elligible to offer: School Readiness' },
        ],
        training: [
          { registered: ['​Completion of 30 Clock-Hours of Family Child Care Training course ', '10 Hour Annual in-service training', '5 Hours of approved training in early literacy and language development birth to 5 years of age ​', '',
            '', '',
            '', ''] },
          { licensed: ['​30 Clock Hour Family Child Care Home Training (prior to caring for children)', '10 Hour Annual in-service training', '5 Clock Hours of approved training in early literacy and language development ', '',
            '', '',
            '', ''] },
          { large: ['30 Clock Hour Family Child Care Home​ Training ', '', 'Within 6 months: 10 Hours of Specialized Training', '',
            '10 Hour of Annual In-Service Training ', '5 Clock Hour of Approved Training in Early Literacy and Language Developement ',
            // tslint:disable-next-line:max-line-length
            'Note: A FDCH is eligible to become a Large FDCH after 2 consecutive years within 5 years of the application date to become a Large FDCH.', 'Operator must have a Documented Credential via Staff Credential Verification Application on Training Transcript. '] },
          { childcare: ['​40 Clock Hour Introductory Child Training', '', '10 Hour Annual In-Service Training', '',
            '5 Hour Early Literacy Training and Language Development', '8 Hour Specialized In-Service Training in serving children with disability within 5 years of Employment ', '',
            '', ''] },
          { exempt: ['​None', '', '', '', '', '', ''] },
          // tslint:disable-next-line:max-line-length
          { licensedMildy: ['​​40 Hour Introductory Childcare Training', '10 Hour Annual in-service training with at least 2 hours training related to sick children and prevention of communicable disease ', '5 Hours of approved training in early literacy and language development birth to 5 years of age ', '​​Specialized training in serving children with disability within 5 years ',
          '​​CPR and First Aid ', '', '', ''] },
          { licensedChildCare: ['​30 Clock Hour Family Child Care Home Training (prior to caring for children)', '10 Hour Annual in-service training', '5 Clock Hours of approved training in early literacy and language development ', '',
            '', '',
            '', ''] },
        ],
        trainingStaff: [
          { registered: [
            {text: '​Substitutes:', options: [
              {text: 'Who work more than 40 hours a month:', options: [
                {text: '5 Clock Hour of approved training in Early Literacy and Language Development'},
              ]},
              {text: 'Who work less than 40 hours a month:', options: [
                {text: '6 Clock Hour Family Child Care Rules and Regulation **Not required if 3 Clock Hour of Fundamental Training is completed'}
              ]}
            ]},
          ]},
          { licensed: [
            {text: '​Substitutes:', options: [
              {text: '​Who work more than 40 hours a month:', options: [
                {text: '5 Clock Hour of approved training in Early Literacy and Language Development '}
              ]},
              {text: 'Who work less than 40 hours a month:', options: [
                {text: '6 Clock Hour Family Child Care Rules and Regulation ** Not required if 3 Clock Hour of Fundamental Training is completed'},
                {text: 'Not required to do 5 Hours of Early Literacy and Language Development'},
                {text: '​Not required to take 10 Clock Hour In-Service Training'}
              ]}
            ]}
          ]},
          { large: [
            {text: 'All Employees are required to complete:', options: [
              {text: '30 Clock Hour of Family Child Care Home Training', options: [
                {text: '5 Clock Hour of approved training in Early Literacy and Language Development '}
              ]},
              {text: 'Who work less than 40 hours a month:', options: [
                {text: '6 Clock Hour Family Child Care Rules and Regulation ** Not required if 3 Clock Hour of Fundamental Training is completed'},
                {text: 'Not required to do 5 Hours of Early Literacy and Language Development'},
                {text: '​Not required to take 10 Clock Hour In-Service Training'}
              ]}
            ]}
          ]},
          { childcare: [
            {text: '​Substitutes:', options: [
              {text: '​Who work more than 40 hours a month:', options: [
                {text: '5 Clock Hour of approved training in Early Literacy and Language Development '}
              ]},
              {text: 'Who work less than 40 hours a month:', options: [
                {text: '6 Clock Hour Family Child Care Rules and Regulation ** Not required if 3 Clock Hour of Fundamental Training is completed'},
                {text: 'Not required to do 5 Hours of Early Literacy and Language Development'},
                {text: '​Not required to take 10 Clock Hour In-Service Training'}
              ]}
            ]}
          ]},
          { exempt: [
            {text: '​Substitutes:', options: [
              {text: '​Who work more than 40 hours a month:', options: [
                {text: '5 Clock Hour of approved training in Early Literacy and Language Development '}
              ]},
              {text: 'Who work less than 40 hours a month:', options: [
                {text: '6 Clock Hour Family Child Care Rules and Regulation ** Not required if 3 Clock Hour of Fundamental Training is completed'},
                {text: 'Not required to do 5 Hours of Early Literacy and Language Development'},
                {text: '​Not required to take 10 Clock Hour In-Service Training'}
              ]}
            ]}
          ]},
          { licensedMildy: [
            {text: '​Substitutes:', options: [
              {text: '​Who work more than 40 hours a month:', options: [
                {text: '5 Clock Hour of approved training in Early Literacy and Language Development '}
              ]},
              {text: 'Who work less than 40 hours a month:', options: [
                {text: '6 Clock Hour Family Child Care Rules and Regulation ** Not required if 3 Clock Hour of Fundamental Training is completed'},
                {text: 'Not required to do 5 Hours of Early Literacy and Language Development'},
                {text: '​Not required to take 10 Clock Hour In-Service Training'}
              ]}
            ]}
          ]},
          { licensedChildCare: [
            {text: '​Substitutes:', options: [
              {text: '​Who work more than 40 hours a month:', options: [
                {text: '5 Clock Hour of approved training in Early Literacy and Language Development '}
              ]},
              {text: 'Who work less than 40 hours a month:', options: [
                {text: '6 Clock Hour Family Child Care Rules and Regulation ** Not required if 3 Clock Hour of Fundamental Training is completed'},
                {text: 'Not required to do 5 Hours of Early Literacy and Language Development'},
                {text: '​Not required to take 10 Clock Hour In-Service Training'}
              ]}
            ]}
          ]},
        ],
        backgroundScreening: [
          { registered: [
            {text: '​All of the following people must complete a Level 2 Background Screeining:', options: [
              {text: 'Operator'},
              {text: 'Substitutes'},
              {text: 'Household Member'},
              {text: 'Screenings to be completed:'},
              {text: 'FBI/FDLE'},
              {text: 'Out of State Criminal Record Check'},
              {text: 'Child Abuse and Neglect Registry Checks'},
              {text: 'Sex Offendert Registery Checks'},
              {text: 'Juvenile Screening'},
              {text: 'Attestation of Good Moral Character'},
              {text: 'Mandatory Child Abuse and Neglect Reporting Requirements'},
            ]},
          ]},
          { licensed: [
            {text: '​All of the following people must complete a Level 2 Background Screeining:', options: [
              {text: 'Operator'},
              {text: 'Substitutes'},
              {text: 'Household Member'},
              {text: 'Screenings to be completed:'},
              {text: 'FBI/FDLE'},
              {text: 'Out of State Criminal Record Check'},
              {text: 'Child Abuse and Neglect Registry Checks'},
              {text: 'Sex Offendert Registery Checks'},
              {text: 'Juvenile Screening'},
              {text: 'Attestation of Good Moral Character'},
              {text: 'Mandatory Child Abuse and Neglect Reporting Requirements'},
            ]},
          ]},
          { large: [
            {text: '​All of the following people must complete a Level 2 Background Screeining:', options: [
              {text: 'Operator'},
              {text: 'Substitutes'},
              {text: 'Household Member'},
              {text: 'Screenings to be completed:'},
              {text: 'FBI/FDLE'},
              {text: 'Out of State Criminal Record Check'},
              {text: 'Child Abuse and Neglect Registry Checks'},
              {text: 'Sex Offendert Registery Checks'},
              {text: 'Juvenile Screening'},
              {text: 'Attestation of Good Moral Character'},
              {text: 'Mandatory Child Abuse and Neglect Reporting Requirements'},
            ]},
          ]},
          { childcare: [
            {text: '​All of the following people must complete a Level 2 Background Screeining:', options: [
              {text: 'Operator'},
              {text: 'Substitutes'},
              {text: 'Household Member'},
              {text: 'Screenings to be completed:'},
              {text: 'FBI/FDLE'},
              {text: 'Out of State Criminal Record Check'},
              {text: 'Child Abuse and Neglect Registry Checks'},
              {text: 'Sex Offendert Registery Checks'},
              {text: 'Juvenile Screening'},
              {text: 'Attestation of Good Moral Character'},
              {text: 'Mandatory Child Abuse and Neglect Reporting Requirements'},
            ]},
          ]},
          { exempt: [
            {text: '​All of the following people must complete a Level 2 Background Screeining:', options: [
              {text: 'Operator'},
              {text: 'Substitutes'},
              {text: 'Household Member'},
              {text: 'Screenings to be completed:'},
              {text: 'FBI/FDLE'},
              {text: 'Out of State Criminal Record Check'},
              {text: 'Child Abuse and Neglect Registry Checks'},
              {text: 'Sex Offendert Registery Checks'},
              {text: 'Juvenile Screening'},
              {text: 'Attestation of Good Moral Character'},
              {text: 'Mandatory Child Abuse and Neglect Reporting Requirements'},
            ]},
          ]},
          { licensedMildy: [
            {text: '​All of the following people must complete a Level 2 Background Screeining:', options: [
              {text: 'Operator'},
              {text: 'Substitutes'},
              {text: 'Household Member'},
              {text: 'Screenings to be completed:'},
              {text: 'FBI/FDLE'},
              {text: 'Out of State Criminal Record Check'},
              {text: 'Child Abuse and Neglect Registry Checks'},
              {text: 'Sex Offendert Registery Checks'},
              {text: 'Juvenile Screening'},
              {text: 'Attestation of Good Moral Character'},
              {text: 'Mandatory Child Abuse and Neglect Reporting Requirements'},
            ]},
          ]},
          { licensedChildCare: [
            {text: '​All of the following people must complete a Level 2 Background Screeining:', options: [
              {text: 'Operator'},
              {text: 'Substitutes'},
              {text: 'Household Member'},
              {text: 'Screenings to be completed:'},
              {text: 'FBI/FDLE'},
              {text: 'Out of State Criminal Record Check'},
              {text: 'Child Abuse and Neglect Registry Checks'},
              {text: 'Sex Offendert Registery Checks'},
              {text: 'Juvenile Screening'},
              {text: 'Attestation of Good Moral Character'},
              {text: 'Mandatory Child Abuse and Neglect Reporting Requirements'},
            ]},
          ]},
        ],
        other: [
        { registered: 'None' },
        { licensed: 'None' },
        { large: 'Note: A FDCH is eligible to become a Large FDCH after 2 consecutive years within 5 years of the application date to become a Large FDCH.' },
        { childcare: 'None' },
        { exempt: 'None' },
        { licensedMildy: 'None' },
        { licensedChildCare: 'None' },
        ]
};

export const linkDescription = {
  annualStatementInspectionRegistered:
  {
      title: 'Contact Information',
      description: 'Information regarding Counties',
      counties: [
          {
              countyName: 'Brevard County',
              personName: 'Linda Halpin',
              personAddress: '375 Commerce Parkway Rockledge',
              personAddress2: 'Fort Pierce FL, 34950',
              personTelephone: '(321) 604-4282',
              personEmail: 'county@gmail.com'
          },
          {
              countyName: 'Brevard County',
              personName: 'Linda Halpin',
              personAddress: '375 Commerce Parkway Rockledge',
              personAddress2: 'Fort Pierce FL, 34950',
              personTelephone: '(321) 604-4282',
              personEmail: 'county@gmail.com'
          }
      ]
  },
  whyLocationRegistered: {
          title: 'Registration is not an option in certain counties',
          description: 'The counties below does not offer registering a childcare home. They do offer licensing. For further questions, please see the contact details below.',
          counties: [
            {
                countyName: 'Brevard County',
                personName: 'Linda Halpin',
                personAddress: '337 N US Highway 1',
                personAddress2: 'Fort Pierce FL, 34950',
                personTelephone: '(772) 467-4184',
                personEmail: 'Linda.Halpin@myflfamilies.com'
            },
            {
                countyName: 'Broward County',
                personName: 'William Karp',
                personAddress: '1 N University Dr',
                personAddress2: 'Plantation FL, 33324',
                personTelephone: '(954) 357-4800',
                personEmail: 'wskarp@broward.org'
            },
            {
              countyName: 'Clay, Duval, Nassau County',
              personName: 'Carl Smith',
              personAddress: '5920 Arlington Expressway',
              personAddress2: 'Jacksonville FL 32211',
              personTelephone: '(904) 485-9564',
              personEmail: 'Carl.Smith@myflfamilies.com'
            },
            {
              countyName: '',
              personName: 'Andrew Warnock',
              personAddress: '5920 Arlington Expressway',
              personAddress2: 'Jacksonville FL 32211',
              personTelephone: '(904) 485-9493',
              personEmail: 'andrew.warnock@myflfamilies.com'
            },
            {
              countyName: 'Hernando',
              personName: 'Avdia Rosa',
              personAddress: '400 W Robinson St Ste 912',
              personAddress2: 'Orlando FL 32801-1754',
              personTelephone: '(352) 330-5631',
              personEmail: 'Avida.Rosa@myflfamilies.com'
            },
            {
              countyName: 'Hillsborough',
              personName: 'Angela Chowning',
              personAddress: '3152 Clay Mangum Ln',
              personAddress2: 'Tampa FL, 33618',
              personTelephone: '(813) 264-3925',
              personEmail: 'ChowningA@hillsboroughcounty.org'
            },
            {
              countyName: 'Manatee, Pasco',
              personName: 'Maritza Gonzalez',
              personAddress: '2004 43rd Ave W Rm 3',
              personAddress2: 'Bradenton FL 34205-9146',
              personTelephone: '(813) 337-5847',
              personEmail: 'Maritza.gonzalez@myflfamilies.com'
            },
            {
              countyName: 'Miami, Dade',
              personName: 'Ian Fleary',
              personAddress: '401 NW 2nd Ave Ste N314',
              personAddress2: 'Miami FL, 33128',
              personTelephone: '(786) 257-5211',
              personEmail: 'ian.fleary@myflfamilies.com'
            },
            {
              countyName: '',
              personName: 'Patrick Karch',
              personAddress: '401 NW 2nd Ave',
              personAddress2: 'Miami FL, 33128',
              personTelephone: '(786) 472-0938',
              personEmail: 'Patrick.karch@myflfamilies.com'
            },
            {
              countyName: '',
              personName: 'Naomi Morency',
              personAddress: '401 NW 2nd Ave',
              personAddress2: 'Miami FL, 33128',
              personTelephone: '(305) 506-3841',
              personEmail: 'naomie.morency@myflfamilies.com'
            },
            {
              countyName: 'Palm Beach',
              personName: 'Holly Strawser',
              personAddress: '800 Clematis St',
              personAddress2: 'West Palm Beach FL, 33401',
              personTelephone: '(561) 837-5976',
              personEmail: 'holly.strawser@flhealth.gov'
            },
            {
              countyName: '',
              personName: 'Courtney Shippey',
              personAddress: '800 Clematis St',
              personAddress2: 'West Palm Beach FL, 33401',
              personTelephone: '(561) 837-5971',
              personEmail: 'courtney.shippey@flhealth.gov'
            },
            {
              countyName: 'Pinellas',
              personName: 'Faith Bornoff',
              personAddress: '8751 Ulmerton Road, Suite 2000',
              personAddress2: 'Largo, FL 33771',
              personTelephone: '(727) 507-4857',
              personEmail: 'Faith.Bornoff@flhealth.gov'
            },
            {
              countyName: 'Polk',
              personName: 'Nancy Ebrahimi',
              personAddress: '901 Industrial Dr Ste 110',
              personAddress2: 'Wildwood FL, 34785',
              personTelephone: '(863) 797-1623',
              personEmail: 'Nancy.Ebrahimi@myflfamilies.com'
            },
            {
              countyName: 'Sarasota',
              personName: 'Fatima Conteh',
              personAddress: '1001 Sarasota Center Blvd',
              personAddress2: 'Sarasota FL, 34240',
              personTelephone: '(941) 861-6650',
              personEmail: 'Fatima.Conteh@flhealth.gov'
            },
            {
              countyName: 'St Johns',
              personName: 'Jennifer Overley',
              personAddress: '5920 Arlington Expy',
              personAddress2: 'Jacksonville FL 32211-7156',
              personTelephone: 'NA',
              personEmail: 'Jennifer.Overley@myflfamilies.com'
            },
        ]
  }
};
