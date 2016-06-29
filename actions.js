// Users
{
  type: AUTH_USER,
  uid,
}

{
  type: UNAUTH_USER,
}

{
  type: FETCHING_USER,
}

{
  type: FETCHING_USER_FAILURE,
  error: 'Error fetching user.',
}

{
  type: FETCHING_USER_SUCCESS,
  uid,
  user,
  timestamp,
}

// Job Feed
{
  type: FETCHING_JOB_FEED,
  filter
}

{
  type: FETCHING_JOB_FEED_SUCCESS
}

{
  type: FETCHING_JOB_FEED_FAILURE,
  error: 'Error fetching feed'
}

// Job (Student)
{
  type: APPLYING_TO_JOB,
  uid,
  jobId
}

{
  type: APPLYING_TO_JOB_SUCCESS,
  jobId
}

{
  type: APPLYING_TO_JOB_FAILURE,
  error: "Error applying to job"
}

// Job (Employer)
{
  type: POSTING_JOB
}

{
  type: POSTING_JOB_SUCCESS
}

{
  type: POSTING_JOB_FAILURE
}





