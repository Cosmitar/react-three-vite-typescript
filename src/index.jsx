import { createRoot } from 'react-dom/client'
import './styles.css'

const root = createRoot(document.getElementById('root'))
if (import.meta.env.PROD) {
  import('./App').then(App => {
    root.render(<App.default />)
  })
} else {
  import('./DevApp').then(DevApp => {
    root.render(<DevApp.default />)
  })
}
