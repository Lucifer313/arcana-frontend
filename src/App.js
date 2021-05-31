import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginScreen from './screens/admin/Login Screen/LoginScreen'
import HomeScreen from './screens/admin/HomeScreen'

import dotenv from 'dotenv'

const App = () => {
  dotenv.config()

  return (
    <Router>
      <Switch>
        <Route path='/admin/login' exact component={LoginScreen} />
        <Route path='/admin/' exact component={HomeScreen} />
      </Switch>
    </Router>
  )
}

export default App
