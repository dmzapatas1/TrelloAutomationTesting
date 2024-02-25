const AccountMenu = require('./accountMenu/accountMenu.component')
const LogoutConfirmation = require('./accountMenu/logoutConfirmation.component')
const ProfileandVisibility = require('./accountMenu/profileAndVisibility.component')

const Header = require('./common/header.component')

const Atlassian = require('./login/atlassian.component')
const Login = require('./login/login.component')

const BoardHeader = require('./board/boardHeader.component')
const Card = require('./board/card.component')
const List = require('./board/list.component')
const MemberMenu = require('./board/memberMenu.component')

const Workspace = require('./workspace/workspace.component')

module.exports = {
    AccountMenu,
    LogoutConfirmation,
    ProfileandVisibility,
    Header,
    Atlassian,
    Login,
    BoardHeader,
    Card,
    List,
    MemberMenu,
    Workspace
  };