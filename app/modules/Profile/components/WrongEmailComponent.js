
import react from 'react'
import { wrongEmailComponentContainer, tooltip, tooltiptext } from '../styles/WrongEmailComponentStyles.css'

export default function WrongEmailComponent (email, handleResendVerificationEmail) {
  return (
    <div className={wrongEmailComponentContainer}>
      <img onClick={handleResendVerificationEmail} src="https://image.flaticon.com/icons/svg/321/321817.svg"/>
      <div onClick={handleResendVerificationEmail} className={tooltip}>
        <div className={tooltiptext}>Resend Verification Email?</div>
      </div>
      <div>Accidentally type in the wrong email? Contact us at by clicking the chat window in the bottom right and we'll help you.</div>
    </div>
  )
}