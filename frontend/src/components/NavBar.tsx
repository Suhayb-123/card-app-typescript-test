import {NavLink} from 'react-router-dom'
import {useState, useEffect} from 'react'
export default function NavBar(){
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  }
  return(
    <nav className="flex justify-center gap-5 p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
      <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
      <button onClick={() => setIsSettingsOpen(true)} className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white">Settings</button>
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-semibold dark:text-gray-100">Settings</h2>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-gray-900 dark:text-gray-100">Dark Mode</span>
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-400"/>
            </div>
            <button onClick={() => setIsSettingsOpen(false)} className="mt-6 w-full bg-blue-500 text-white p-2 rounded">Close</button>
          </div>
        </div>
      )}
    </nav>
  )
}
