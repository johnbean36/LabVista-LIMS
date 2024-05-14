import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from '../components/Nav'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div>
      <header>
        <Nav user={user} />
      </header>
    </div>
  )
}

export default App
