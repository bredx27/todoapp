import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { async } from 'q';
import { IoT1ClickProjects } from 'aws-sdk/clients/all';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/styles';
import { makeStyles, createMuiTheme, ListItemText, List, ListItem, Container, TextField, Button, ListItemSecondaryAction } from '@material-ui/core';
const theme = createMuiTheme();
const ListTodos = `query {
    listTodos {
        items {
            id name description completed
        }
    }
}`;
const styles = ({
    root: {
        background: '#DC2424',  /* fallback for old browsers */
        background: '-webkit-linear-gradient(to right, #4A569D, #DC2424)',  /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to right, #4A569D, #DC2424)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        heigth: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        position: 'absolute'
    },
    main: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    list: {
        width: '100%',
        background: theme.palette.background.paper
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRigth: theme.spacing(1)
    },
    button: {

    }
});
class App extends React.Component {
    state = { todos: [], name: '', description: '' }

    componentDidMount() {
        API.graphql(graphqlOperation(ListTodos)).then((e) => this.setState({ todos: e.data.listTodos.items }));
    }
    newTodo = (e) => {
        const { todos } = this.state;
        todos.push({ name: this.state.name, description: this.state.description });
        const state = { todos, name: '', description: '' }
        this.setState(state);
        API.get("todoApp",(req,res)=> console.log(res));
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.root} >
                <div className={classes.main}>

                    <Paper className={classes.paper}>

                        <List className={classes.list}>
                            <ListItem>
                                <TextField name="name" onChange={this.onChange} value={this.state.name} className={classes.textField} label="Title" />
                                <TextField name="description" onChange={this.onChange} value={this.state.description} className={classes.textField} label="Description" />
                                <ListItemSecondaryAction>
                                    <Button onClick={this.newTodo} variant="contained" color="primary" classes={classes.button}>Add </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {
                                this.state.todos.map((todo, i) => (
                                    <ListItem>
                                        <ListItemText key={i} primary={todo.name} secondary={todo.description}></ListItemText>
                                    </ListItem>

                                ))
                            }
                        </List>

                    </Paper>
                </div>
            </Container>
        );
    }

}

export default withStyles(styles)(App);
