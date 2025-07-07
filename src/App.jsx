import { useNavigate } from 'react-router'
import React, { useEffect } from 'react'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login'); // Navigate to the login page when the component mounts
  }, [navigate]);

  return null; // No UI is rendered in this component
}

export default App
