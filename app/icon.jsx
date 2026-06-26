export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#000000"/>
      <circle cx="16" cy="16" r="13" fill="none" stroke="white" strokeWidth="1.8" opacity="0.25"/>
      <circle cx="16" cy="16" r="9.5" fill="none" stroke="white" strokeWidth="1.8" opacity="0.5"/>
      <circle cx="16" cy="16" r="6" fill="none" stroke="white" strokeWidth="1.8" opacity="0.75"/>
      <circle cx="16" cy="16" r="2.5" fill="white"/>
    </svg>
  )
}