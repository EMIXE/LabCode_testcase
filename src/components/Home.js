import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

function Home({lectures, userId}) {
    const classes = useStyles();
    const [idLec, setIdLec] = useState("")

    const handleChange = (event) => {
        setIdLec(event.target.value);
      };
    
    function disabledHandler() {
        if (idLec === "") {
            return true;
        }
        else  {
            return false;
        }
    }

    return(
        <Container maxWidth="sm" >
            <Typography variant="h4" gutterBottom>Выберите лекцию</Typography>
            <Typography variant="h4" gutterBottom>Данный пользователь: {userId}</Typography>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={idLec}
                    onChange={handleChange}
                >
                {lectures.map((lecture) => {
                    return(
                        <MenuItem value={lecture.id}>{lecture.name}</MenuItem>
                    )
                })}
                </Select>
                <FormHelperText>Выберите название лекции</FormHelperText>
            </FormControl>
            <Button variant="contained" disabled={disabledHandler()} size="large" color="primary" href={`/lecture/${idLec}`}>Vote</Button>
            <h3>{idLec}</h3>
      </Container>       
    )
}

export default Home