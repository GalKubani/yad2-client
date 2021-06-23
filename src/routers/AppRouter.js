import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Footer from '../components/main/Footer'
import Header from '../components/main/Header'
import Home from '../components/home/Home'
import PageNotFound from '../components/main/PageNotFound'
import Question from '../components/main/Question'
import LoginContextProvider from '../context/LoginContext'
import LoginRoute from './LoginRouter';
import UserPersonalArea from '../components/userPersonalArea/UserPersonalArea'
import UpdateUserData from '../components/userPersonalArea/UpdateUserData'
import AddAdvert from '../components/newAdvert/AddAdvert'

const AppRouter = () => (
    <BrowserRouter>
        <LoginContextProvider>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <LoginRoute path="/logout" component={Home} />
                <LoginRoute path="/personal-area" component={UserPersonalArea} />
                <LoginRoute path="/personal-area-edit" component={UpdateUserData} />
                <LoginRoute path="/new-advert" component={AddAdvert} />
                <Route path="/home" component={Home} />
                <Route path="*" component={PageNotFound} />
            </Switch>
            <Question />
            <Footer />
        </LoginContextProvider>
    </BrowserRouter>
);

export default AppRouter