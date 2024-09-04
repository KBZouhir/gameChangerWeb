import { useReCaptcha } from 'vue-recaptcha-v3'

export default () => {
  const recaptchaInstance = useReCaptcha()
  const executeRecaptcha = async action => {
    await recaptchaInstance?.recaptchaLoaded()
    const token = await recaptchaInstance?.executeRecaptcha(action)
    const headerOptions = {
      headers: {
        'google-recaptcha-token': token
      }
    }
    return { token, headerOptions }
  }
  return { executeRecaptcha }
}