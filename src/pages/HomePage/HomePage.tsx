import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../../App'
import { Button } from '@mui/material'

interface HomePageProps {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const HomePage: React.FC<HomePageProps> = ({ user, setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [navigate, user])

  const handleLogout = useCallback(() => {
    setUser(undefined)
    navigate('/login')
  }, [navigate, setUser])

  if (!user) return null

  return (
    <main style={{ padding: '2rem', width: '100%', height: '100vh', backgroundColor: '#7293d6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Strawberry QA</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', marginBottom: '1rem' }}>
        <div style={{
          width: '100%',
          color: 'white',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '1rem'
          }}>
          <h1 style={{ fontSize: '3.0rem', margin: '0.5rem 0' }}>Welcome {user.firstName} {user.lastName}</h1>
          <p style={{ fontSize: '2.0rem', margin: '0.5rem 0' }}>You have successfully logged into this website.</p>
          <span> </span>
          <p style={{ margin: '0.5rem 0' }}>
            Strawberry is one of the largest hotel companies in Scandinavia with 240 hotels in Scandinavia, Finland and the Baltics and over 16,500 employees.
            It is a franchisee of Choice Hotels International.
            The franchise agreement gives the company the right to use three brands and their umbrella brands.
          </p>
          <p style={{ margin: '0.5rem 0' }}> - from the Wikipedia </p>
        </div>
      </div>
      <Button variant="contained" onClick={handleLogout}>Log out</Button>
    </main>
  )
}

export default HomePage
