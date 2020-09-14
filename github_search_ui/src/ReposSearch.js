import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import { getRepos } from './api/repos-api';
import { setRepos } from './actions/Actions';
import ReposTable from './ReposTable';
import './App.css';



class ReposSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerms: '',
            language: '',
            sort: '',
            terms_error: false,
            errorMessage: ''
        }
        this.searchRepos = this.searchRepos.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        let newState = { terms_error: false }
        newState[e.target.id] = e.target.value;
        if (e.target.id === 'searchTerms'
            && e.target.value.length
            && !e.target.value.match(/^[0-9a-z\s]+$/i)) newState.terms_error = true;
        this.setState(newState)
    }

    searchRepos(e) {
        e.preventDefault();
        
        const { searchTerms, language, sort } = this.state;
        
        const { dispatch } = this.props;
        // getRepos call can be done inside action with the installation of Thunk middleware
        const getRepoData = async function(queryString) {
            let repoData = await getRepos(queryString)
            if(!repoData.items) return 'Error fetching data'
            dispatch(setRepos(repoData.items))
            return repoData
        }

        let formedQuery = `${searchTerms.trim().replace(/\s/g, '+')}`
        if(language.length) formedQuery += `+language:${language}`
        if(sort.length) formedQuery += `&sort:${sort}`
        // additional search querys can be added based on github's qualifiers
        // https://docs.github.com/en/github/searching-for-information-on-github/searching-for-repositories

        getRepoData(formedQuery)
        .then((data) => {
            // Set error message if problem occured with API call
            if(data === 'Error fetching data') this.setState({errorMessage: data})
        })
    }

    render() {
        const { searchTerms, language, sort, terms_error, errorMessage } = this.state;
        return (
            <div className='App'>
                <h1>Kevin's Github Search App</h1>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <form onSubmit={this.searchRepos}>
                    <Grid item xs={12}>
                        <TextField 
                            id="searchTerms"
                            error={terms_error}
                            label="Search Term"
                            helperText={terms_error ? 'Terms must be alphanumeric' : ''}
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleChange}
                            value={searchTerms}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="language"
                            label="Language"
                            variant="outlined"
                            margin="normal"
                            onChange={this.handleChange}
                            value={language}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel component="legend">Grab results based on:</FormLabel>
                        <RadioGroup aria-label="gender" value={sort} onChange={this.handleChange}>
                            <FormControlLabel value="" control={<Radio id="sort" />} label="Score" />
                            <FormControlLabel value="stars" control={<Radio id="sort" />} label="Stars" />
                            <FormControlLabel value="updated" control={<Radio id="sort" />} label="Date Updated" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit"  style={{marginBottom: '5%'}}>
                            Search
                        </Button>
                    </Grid>
                    </form>
                </Grid>
                {this.props.repos.length > 0 ? 
                    <ReposTable fetchedRepos={this.props.repos} history={this.props.history} />
                    :
                    <p style={{textAlign: 'center'}}>{errorMessage.length > 0 ? errorMessage : 'No Repos Found'}</p>
                }
            </div>
        );
    }
}
// disabled={terms_error}

const mapStateToProps = state => ({
  repos: state.repos,
  details: state.details
})


export default connect(mapStateToProps)(ReposSearch);
