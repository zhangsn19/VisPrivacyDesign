import './legacy.css'
import './App.css'
import { ConditionsPage } from './pages/ConditionsPage'
import { StoryboardTestPage } from './pages/StoryboardTestPage'
import { StudyFlowPage } from './pages/StudyFlowPage'
import { PrototypeGalleryPage } from './pages/PrototypeGalleryPage'
import { ScreenOutPage } from './pages/ScreenOutPage'

function App() {
  const path = window.location.pathname

  if (path.endsWith('/conditions.html') || path.endsWith('/conditions')) return <ConditionsPage />
  if (path.endsWith('/storyboard-test.html') || path.endsWith('/storyboard-test')) return <StoryboardTestPage />
  if (path.endsWith('/prototype-gallery.html') || path.endsWith('/prototype-gallery')) return <PrototypeGalleryPage />
  if (path.endsWith('/screen-out.html') || path.endsWith('/screen-out')) return <ScreenOutPage />
  return <StudyFlowPage />
}

export default App
