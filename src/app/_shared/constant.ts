export class Constant {
  public static readonly animation = {
    pageTransitionTime: 0.6, // time unit s
    pageLeaveDelay: 0.6 * 400, // time unit ms
    easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
    easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    easInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)'
  };
  public static readonly ionicTagName = {
    button: 'ION-BUTTON'
  };
  public static readonly formStatus = {
    valid: 'VALID',
    invalid: 'INVALID',
    pending: 'PENDING',
    disabled: 'DISABLED'
  };
  public static readonly maskPattern = {
    phoneMask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    extensionMask: [/[0-9]/, /\d/, /\d/, /\d/],
    ssnMask: [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    // dlMask: [ /^([A-Z])/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/]

    // LNNN-NNN-NN-NNN-N
  };
  public static readonly errorMessages = {
    'name-required-msg': 'Name is Required',
    'business-required-msg': 'Business is Required',
    'streetAddress-required-msg': 'Address is Required',
    'city-required-msg': 'City is Required',
    'state-required-msg': 'State is Required',
    'county-required-msg': 'County is Required',
    'zipCode-required-msg': 'Zipcode is Required',
    'zipCode-minlength-msg': 'Zipcode is Invalid',
    'zipCode-incorrect-msg': 'Must be a Florida zip code',
    'phoneNumber-required-msg': 'Phone is Required',
    'phoneNumber-minlength-msg': 'Phone is Invalid',
    'website-required-msg': 'Website is Required',
    'email-required-msg': 'Email is Required',
    'email-email-msg': 'Email is Invalid',
    'dob-required-msg': 'Date of birth is Required',
    'ssn-required-msg': 'SSN is Required',
    'ssn-minlength-msg': 'SSN minimum length is Invalid',
    'ssn-maxlength-msg': 'SSN maximum length is Invalid',
    // 'ssn-pattern-msg': 'SSN pattern is Invalid',
    'disabledChildren-required-msg': 'Choose an option',
    'personTitles-required-msg': 'Person titles are required',
    'representative-required-msg': 'Representative is Required',
    'dlnumber-required-msg': 'DL Number is Required',
    'dlnumber-minlength-msg': 'DL Number is Invalid',
    'dlnumber-maxlength-msg': 'DL Number is Invalid',
    'dlnumber-pattern-msg': 'DL Number is Invalid',
    'dlstate-required-msg': 'DL State is Required',
    'dlstate-minlength-msg': 'DL State is Invalid',
    'dlstate-maxlength-msg': 'DL State is Invalid',
    'dlexpirationdate-required-msg': 'DL Expiration Date is Required',
    'username-required-msg': 'Username is required',
    'password-required-msg': 'Password is required',
    'property-type-select-error-msg': 'Choose a property type',
    'services-required-msg': 'Choose atleast one service',
    'timeslots-required-msg': 'Atleast one time slot is required',
    'timeClose-invalid-msg': 'Close time must be after Open time',
    'timeClose-required-msg': 'Close time is required',
    'timeOpen-invalid-msg': 'Time Overlap',
    'timeOpen-required-msg': 'Open time is required',
    'startDate-required-msg': 'Start date is required',
    'endDate-required-msg': 'End date is required',
    'employerName-required-msg': 'Employer name is Required',
    'employerPhone-required-msg': 'Employer phone is Required',
    'employerPhone-minlength-msg': 'Phone is Invalid ',
    'employerZipCode-required-msg': 'Zipcode is Requried',
    'employerZipCode-minlength-msg': 'Zipcode is invalid',
    'employerEmail-required-msg': 'Employer email is Required',
    'employerEmail-email-msg': 'Email is Invalid',
    'supervisorEmail-required-msg': 'Supervisor email is Required',
    'supervisorEmail-email-msg': 'email is invalid',
    'positionHeld-required-msg': 'Position held is Required',
    'supervisorName-required-msg': 'Supervisor name is Required',
    'formSignedBy-required-msg': 'Full name is Required ',
    'formSignedBy-mustMatch-msg': 'Name entered in the application should match the Full Name ',
    'reasonForSeverance-required-msg': 'Reason for leaving employment is Required',
    'jobDuties-required-msg': 'Job duties are Required',
    'hasCommittedOffence-required-msg': 'Please make a choice',
    'attachReqFile-required-msg': 'Select  the file Required',
    'attachFileSize-invalid-msg': 'File size should be less than 2 MB',
    'attachFileType-invalid-msg': 'File could not be uploaded. Only files with the following extensions are allowed: .pdf, .jpeg, .jpg, .png, .doc, .docx, .xlsx, .xls, .txt, .jag',
    'supervisorPhone-required-msg': 'Supervisor phone is Required',
    'supervisorPhone-minlength-msg': 'Supervisor phone is Invalid ',
    'reasonForSeveranceId-required-msg': 'Reason for leaving is Required'
  };

  public static readonly security = {
    module: {
      all: 1,
      dashboard: 2,
      forms: 3,
      application: 4,
      questionnaire: 5
    },
    page: {
      All: 1,
      providerprofile: 2,
      people: 3,
      'people/view': 4,
      summary: 5,
    },
    sectioncontrol: {
      All: 1,
      'application-providerprofile-website': 2,
      'application-providerprofile-address': 3
    }
  };

    public static readonly textareaMaxlength = 200;
    public static readonly jobDutiesMaxlength = 500;

    public static readonly acceptedFileTypes = [
        '.pdf', '.jpeg', '.jpg', '.png', '.doc', '.docx', '.xlsx', '.xls', '.txt', '.jag'
    ];

}


