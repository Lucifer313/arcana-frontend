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
import LoginScreen from './screens/user/LoginScreen'
import RegisterScreen from './screens/user/RegisterScreen'
import CreateTournamentScreen from './screens/admin/Tournament/CreateTournamentScreen'
import TournamentScreen from './screens/admin/Tournament/TournamentScreen'
import SelectTeamScreen from './screens/user/SelectTeamScreen'
import SquadSelectionScreen from './screens/user/SquadSelectionScreen'
import MyTournamentScreen from './screens/user/MyTournamentScreen'
import TournamentDetailScreen from './screens/user/TournamentDetailScreen'
import AdminTournamentDetailsScreen from './screens/admin/Tournament/AdminTournamentDetailsScreen'
import PreviousSquadViewer from './components/PreviousSquadViewer'
import PlayerLeaderboardScreen from './screens/user/PlayerLeaderboardScreen'
import ArcanaLeaderboardScreen from './screens/user/ArcanaLeaderboardScreen'
import ProfileScreen from './screens/user/ProfileScreen'
import ForgotPasswordScreen from './screens/user/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/user/ResetPasswordScreen'
import PlayerListScreen from './screens/user/PlayerListScreen'
import PlayerDetailScreen from './screens/user/PlayerDetailScreen'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/login' exact component={LoginScreen} />
        <Route path='/register' exact component={RegisterScreen} />

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

        <Route
          path='/admin/tournaments/create'
          exact
          component={CreateTournamentScreen}
        />
        <Route path='/admin/tournaments' exact component={TournamentScreen} />
        <Route
          path='/admin/tournaments/:tid'
          exact
          component={AdminTournamentDetailsScreen}
        />

        <Route
          path='/tournaments/:tid/create-team'
          exact
          component={SelectTeamScreen}
        />
        <Route
          path='/tournaments/:tid/'
          exact
          component={TournamentDetailScreen}
        />
        <Route
          path='/tournaments/:tid/squad-selection/'
          exact
          component={SquadSelectionScreen}
        />
        <Route path='/my-tournaments/' exact component={MyTournamentScreen} />
        <Route
          path='/my-tournaments/:tid/view-previous-squads/'
          exact
          component={PreviousSquadViewer}
        />

        <Route
          path='/tournaments/:tid/player-leaderboard/'
          exact
          component={PlayerLeaderboardScreen}
        />
        <Route
          path='/tournaments/:tid/arcana-leaderboard/'
          exact
          component={ArcanaLeaderboardScreen}
        />

        <Route path='/profile' exact component={ProfileScreen} />
        <Route path='/forgot-password' exact component={ForgotPasswordScreen} />
        <Route
          path='/reset-password/:tid'
          exact
          component={ResetPasswordScreen}
        />
        <Route path='/players' exact component={PlayerListScreen} />
        <Route path='/players/:pid' exact component={PlayerDetailScreen} />
      </Switch>
    </Router>
  )
}

export default App
