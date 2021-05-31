import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginScreen from './screens/admin/Login Screen/LoginScreen'
import TeamScreen from './screens/admin/TeamScreen'
import CreateTeamScreen from './screens/admin/CreateTeamScreen'

import dotenv from 'dotenv'

const App = () => {
  dotenv.config()

  return (
    <Router>
      <Switch>
        <Route path='/admin/login' exact component={LoginScreen} />
        <Route path='/admin/' exact component={TeamScreen} />
        <Route path='/admin/teams/create' exact component={CreateTeamScreen} />
      </Switch>
    </Router>
  )
}

export default App
