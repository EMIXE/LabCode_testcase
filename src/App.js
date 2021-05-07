import './App.css';
import React, { useState, useEffect } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Home from './components/Home'
import Lecture from './components/Lecture';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

function App(history) {
  const [idUser, setIdUser] = useState("") 

  useEffect(() => {
    console.log("APP.JS_1: ", idUser)
    console.log("APP.JS_2: ", idUser)
    console.log("EFFECT")
    const fpPromise = FingerprintJS.load({token: 'LPlkkNqfidglSXPvaqoC'})
    ;(async () => {
      const fp = await fpPromise
      const result = await fp.get()
    
      const visitorId = result.visitorId
      console.log("App.js:",result.visitorId)
      setIdUser(result.visitorId)
    })()
  });
  
  const [lectures, setLectures] = useState([
    {
        id: "9e8303d6-ad8c-11eb-8529-0242ac130003",
        name: "Lecture 1",
    },
    {
        id: "b5df6c72-ad8c-11eb-8529-0242ac130003",
        name: "Lecture 2",
    },
    {
        id: "c44f6730-ad8c-11eb-8529-0242ac130003",
        name: "Lecture 3",
    },
])


  return (
    <div className="App" >
      <Typography variant="h3" gutterBottom>Оцените лекцию!</Typography>
      <Switch>
            <Route history={history} path='/home' render={()=><Home lectures={lectures} userId={idUser} />} />
            <Route history={history} path='/lecture/:id' render={()=><Lecture lectures={lectures} userId={idUser}/>} />
            <Redirect from='/' to='/home'/>
      </Switch>
    </div>
  );

  
}

export default App;
