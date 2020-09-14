

import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function ReposTable(props) {

    const classes = useStyles();
    const { fetchedRepos } = props

    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Repo Name</TableCell>
                <TableCell align="right">Owner</TableCell>
                <TableCell align="right">Language</TableCell>
                <TableCell align="right">Private/</TableCell>
                <TableCell align="right">Stars</TableCell>
                <TableCell align="right">Watchers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedRepos.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.owner.login}</TableCell>
                  <TableCell align="right">{row.language}</TableCell>
                  <TableCell align="right">{row.private}</TableCell>
                  <TableCell align="right">{row.stargazers_count}</TableCell>
                  <TableCell align="right">{row.watchers_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

    // return (
    //     <p>{JSON.stringify(props.fetchedRepos)}</p>
    // );
}

export default ReposTable;