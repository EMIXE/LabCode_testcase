import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { db } from '../firebase'

const useStyles = makeStyles({
    table: {
      minWidth: 50,
    },
  });

function Statistic({id, lectures, userId, nameLecture}) {
    const classes = useStyles();
    const [sadVotes, setSadVotes] = useState([])
    const [confusedVotes, setConfusedVotes] = useState([])
    const [happyVotes, setHappyVotes] = useState([])

    async function getStats(face, func) {
      let arrHelper = [] 
      const votesWithFace = await db.collection('votes').where("vote", "==", face).where("idLec", "==", id).get().then((snap) => {
        snap.forEach(doc => {
            arrHelper.push(doc.data())
        })
      });
      func(arrHelper)
    }

    useEffect(() => {
      getStats("sad", setSadVotes)
      getStats("confused", setConfusedVotes)
      getStats("happy", setHappyVotes)
    }, [])


    return(
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom>{nameLecture}</Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Оценка</TableCell>
            <TableCell align="center">Кол-во</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell align="center" component="th" scope="row">sad</TableCell>
              <TableCell align="center">{sadVotes ? sadVotes.length : 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" component="th" scope="row">confused</TableCell>
              <TableCell align="center">{confusedVotes ? confusedVotes.length : 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" component="th" scope="row">happy</TableCell>
              <TableCell align="center">{happyVotes ? happyVotes.length : 0}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default Statistic