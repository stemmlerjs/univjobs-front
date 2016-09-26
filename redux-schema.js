{
  // Your account information
  user: {
    uid: '',
    isCreatingAccount: false,
    isFetching: false,
    studentProfile: {},
    employerProfile: {},
    isAStudent: true,
    accessToken: '',
    emailVerified: false,
    error: ''
    // Student
    studentProfileInfo: {
      email,
      password,
      lastUpdated,
      emailPreferences,
      firstName,
      lastName,
      studentStatus,
      degreeName,
      schoolName,
      enrollmentMonth,
      enrollmentYear,
      graduationMonth,
      graduationYear,
      lastUpdated,
    },
    // Employer
    employerProfileInfo: {
      email,
      password,
      lastUpdated,
      emailPreferences,
      firstName,
      lastName,
      lastUpdated
    }
  },

  signupForm: {
    studentSignupForm: {
      email: '',
      password: '',
      error: ''
    },
    employerSignupForm: {
      firstName: '',
      lastName: '',
      companyName: '',
      phone: '',
      email: '',
      password: '',
      error: ''
    },
    error: ''
  }

  jobs: {
    [jobId]: {
      companyId,
      jobType, // Summer 2016
      title,   // Software Developer
      startDate,
      responsibilities: [
        'Developing enterprise grade software for the best video conferencing company in Canada',
        'Finding errors and bugs'
      ],
      compensation: [
        '40/hr pay',
        'Health and benefits'
      ],
      qualifications: [
        '40/hr pay',
        'Health and benefits'
      ],
      [questions]: {
        1,
        2
      },
      logo,
      address,  // this information could be different from the company location
      city,     // we want a feature to be able to click the Location 
      postalCode, // and have it open in google maps
      distance
    }
  },

  companies: {
    [companyId]: {
      name,
      logo,
      address,
      postalCode,
      companyWebsite,
      description
    }
  },

  myJobApplications: {
    [jobIds]: {
      status
    }
  },

  users: {
    [userId]: {
      // All profile information
    }
  },

  modal: {
    isOpen,
    currentModalType,

    STUDENT_JOB_FEED_MODAL: {
      jobId
    },

    STUDENT_APPLICATIONS_MODAL: {
      jobId
    },

    EMPLOYER_VIEWING_STUDENT_MODAL: {
      userId
    },

    NOTIFICATION_MODAL: {
      message
    },

    SUCCESS_MODAL: {
      message
    },

    FAILURE_MODAL: {
      message
    }
  },

  jobsFeed: {
    jobs: [jobIds]
  },

  feedFilters: {
    jobType
  },

  // EMPLOYER BASED STATE THINGS
  myListings: {
    [jobId]: {
      applicants: ['kstemmler', 'charlesakio'], // uids
      maxApplicants
    }
  },

  myApplicants: {
    [jobId]: {
      applicants: {
        userId,
        isHidden,
        status,
        resumeLink
      }
    }
  }

}
