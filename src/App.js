import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AdminLoginScreen from './screens/admin/AdminLoginScreen'
import TeamScreen from './screens/admin/Team/TeamScreen'
import CreateTeamScreen from './screens/admin/Team/CreateTeamScreen'
import EditTeamScreen from './screens/admin/Team/EditTeamScreen'
import PlayerScreen from './screens/admin/Player/PlayerScreen'

import dotenv from 'dotenv'
import CreatePlayerScreen from './screens/admin/Player/CreatePlayerScreen'
import EditPlayerScreen from './screens/admin/Player/EditPlayerScreen'
import HomeScreen from './screens/user/HomeScreen'
import TeamListScreen from './screens/user/TeamListScreen'

const App = () => {
  dotenv.config()

  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/teams' exact component={TeamListScreen} />
        <Route path='/admin/login' exact component={AdminLoginScreen} />
        <Route path='/admin/' exact component={TeamScreen} />
        <Route path='/admin/teams' exact component={TeamScreen} />
        <Route path='/admin/teams/create' exact component={CreateTeamScreen} />
        <Route path='/admin/teams/edit/:id' exact component={EditTeamScreen} />
        <Route path='/admin/players/' exact component={PlayerScreen} />
        <Route
          path='/admin/players/edit/:id'
          exact
          component={EditPlayerScreen}
        />
        <Route
          path='/admin/players/create'
          exact
          component={CreatePlayerScreen}
        />
      </Switch>
    </Router>
  )
}

export default App
