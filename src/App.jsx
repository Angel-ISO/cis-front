import { ThemeProvider, CssBaseline, TextField, Button } from '@mui/material'
import theme from './theme/theme'
import UserLogin from './components/Security/UserLogIn/UserLogin'
import UserProfile from './components/Security/UserProfile/UserProfile'
import UserRegister from "./components/Security/UserRegister/UserRegister"
import IntroPage from './components/Intro-Page'
import { Route, Switch, Redirect } from 'wouter'
import { Toaster } from 'react-hot-toast'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
         <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}/>
        <Switch>
        <Route path="/" component={() => <Redirect to="/intro" />} />
        <Route path="/intro" component={IntroPage} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/login" component={UserLogin} />
        <Route path="/register" component={UserRegister} />
        <Route>{() => <h1>404 - Página no encontrada</h1>}</Route>
      </Switch>
    </ThemeProvider>
  )
}

export default App
