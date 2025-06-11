import { useEffect } from 'react'

export default function FOUCPrevention() {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `html.loading [src*="heroparallax"]{display:none!important}`
    document.head.appendChild(style)

    const done = () => {
      document.documentElement.classList.remove('loading')
      style.remove()
    }

    if (document.readyState === 'complete') done()
    else window.addEventListener('load', done)
    return () => window.removeEventListener('load', done)
  }, [])
  return null
}
