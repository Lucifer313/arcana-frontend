import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginScreen from './screens/admin/LoginScreen'
import TeamScreen from './screens/admin/Team/TeamScreen'
import CreateTeamScreen from './screens/admin/Team/CreateTeamScreen'
import EditTeamScreen from './screens/admin/Team/EditTeamScreen'

import dotenv from 'dotenv'

const App = () => {
  dotenv.config()

  return (
    <Router>
      <Switch>
        <Route path='/admin/login' exact component={LoginScreen} />
        <Route path='/admin/' exact component={TeamScreen} />
        <Route path='/admin/teams/create' exact component={CreateTeamScreen} />
        <Route path='/admin/teams/edit/:id' exact component={EditTeamScreen} />
      </Switch>
    </Router>
  )
}

export default App
