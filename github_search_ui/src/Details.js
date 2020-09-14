import React from 'react';
import { connect } from 'react-redux'
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    button: {
        marginTop: '5%'
    }
  });

function Details(props) {
    const classes = useStyles();
    const { id } = useParams();
    const repo = props.repos[id];
    let repoData = [];
    if(props.repos[id]) {
        // only form up data if repos have been fetched
        repoData = [
            {id: 'owner', name: 'Owner', data: repo.owner.login},
            {id: 'created', name: 'Created At', data: repo.created_at},
            {id: 'desc', name: 'Description', data: repo.description},
            {id: 'watchers', name: 'Watchers', data: repo.watchers_count},
            {id: 'issues', name: 'Open Issues', data: repo.open_issues_count},
            {id: 'size', name: 'Size (KB)', data: repo.size},
            {id: 'url', name: 'Github Repo', data: <a href={repo.svn_url}>Link</a>}
        ]
    }

    const handleClick = (next) => {
        // this will navigate through original fetched list
        // the order will not be the same as the table if the table had been sorted
        let next_id = parseInt(id) + next
        if(!next) {
            props.history.push('/')
        } else {
            props.history.push(`/${parseInt(id) + next}`)
        }
    }

    // if no repo data exists, go back to main page
    if(!props.repos[id]) {
        props.history.push('/');
        return null
    }
    return (
        <div className='App'>
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <h1>Repository: {repo.name}</h1>
                </Grid>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                    {repoData.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.data}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <Grid className={classes.button} item xs={4}>
                    <Button variant="contained" onClick={() => handleClick(-1)} disabled={id < 1} >Previous</Button>
                </Grid>
                <Grid className={classes.button} item xs={4}>
                    <Button variant="contained" onClick={() => handleClick(0)} >Home</Button>
                </Grid>
                <Grid className={classes.button} item xs={4}>
                    <Button variant="contained" onClick={() => handleClick(1)} disabled={id === props.repos.length - 1} >Next</Button>
                </Grid>
            </Grid>
        </div>
      );
}

const mapStateToProps = state => ({
    repos: state.repos
})

export default connect(mapStateToProps)(Details);
