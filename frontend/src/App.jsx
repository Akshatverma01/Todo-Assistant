import { Button } from '@mui/material'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="p-4 bg-gray-100">
    <h1 className="text-xl font-bold mb-4">Hello with Tailwind</h1>
    <Button variant="contained" color="primary">
      MUI Button
    </Button>
  </div>
  )
}

export default App
