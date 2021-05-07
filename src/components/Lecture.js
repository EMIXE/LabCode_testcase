import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { db } from '../firebase'
import Emoji from './Emoji'
import Container from '@material-ui/core/Container';
import Statistic from './Statistic'
var Loader = require('react-loader');

function Lecture({lectures, userId}) {
    const lecId = useParams().id
    const faces =["sad", "confused", "happy"]
    const [lecture, setLecture] = useState({id: lecId, name: getLecture()})
    const [isVoted, setIsVoted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);

    async function checkUserVote() {
        let voteOfUser = []
        const result = await db.collection('votes').where("idLec", "==", lecId).where("user", "==", userId).get().then((snap) => {
            snap.forEach(doc => {
                console.log(doc.data())
                voteOfUser.push(doc.data())
            })
          });
        console.log("vote user:", voteOfUser)
        if (voteOfUser.length !== 0) {
            setIsVoted(true)
        }
        console.log("Lecture.js", userId)
        setIsLoaded(true);
    }

    useEffect(() => {
        console.log("userId: ",userId)
        checkUserVote()

        console.log("isVoted: ", isVoted);
    })

    async function addVote(textFace) {
        await db.collection('votes').add({idLec: lecture.id, name: lecture.name, user: userId, vote: textFace})
        setIsVoted(true)
    }

    function getLecture() {
        const objLecture = lectures.find((lec) => lec.id === lecId)
        return objLecture.name;
    }

    function renderPage() {
            if (!isVoted) {
                return (
                        <div>
                            <Typography variant="h4" gutterBottom>{lecture.name}</Typography>
                            <Typography variant="h5" gutterBottom>Данный пользователь: {userId}</Typography>
                            <Container maxWidth="sm" style={{display: 'flex', justifyContent: 'center'}}>
                                {faces.map((face) => {
                                return(<Emoji key={face} face={face} faceHandler={addVote}/>)
                            })}
                            </Container>
                    </div>
                )
            } else {
                return (
                    <Container maxWidth="sm">
                        <Typography variant="h5" gutterBottom>{isVoted}</Typography>
                        <Typography variant="h4" gutterBottom>Спасибо за ваш голос!: {userId}</Typography>
                        <Statistic id={lecture.id} lectures={lectures} userId={userId} nameLecture={lecture.name}/>
                    </Container>
                )
            }
        }

    return (<Loader loaded={isLoaded}>{renderPage()}</Loader>)
}
    

export default Lecture