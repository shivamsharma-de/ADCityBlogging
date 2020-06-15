/** @format */

import React, { Component } from "react";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import Slide from "@material-ui/core/Slide";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons";

export class CommentsModel extends Component {
    state={
        open: false,
        loading: false,
        comments: [{username: 'shashank', body: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'}, {
            username: 'shivam',
            body: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages'
        }]
    }
    componentDidMount() {
        axios.get()
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
       
      };
	render() {
		return (
			<div>
                <FontAwesomeIcon onClick={this.handleClickOpen} color ='orange' style={{ cursor: "pointer" }} size="lg" icon={faComments} />
				
				<Dialog
					open={this.state.open}
					keepMounted
					onClose={this.handleClose}
					aria-labelledby='alert-dialog-slide-title'
					aria-describedby='alert-dialog-slide-description'>
					<DialogTitle id='alert-dialog-slide-title'>
						{"Comments"}
                        <IconButton aria-label="close" onClick={this.handleClose} style={{float: 'right', color: "red"}}>
                            <CloseIcon />
                        </IconButton>
					</DialogTitle>
                    <Grid item style={{ textAlign: 'center',alignSelf: "center", width: '100%', padding: "3%" }}>
                        <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="Comment on this blog"
                           // helperText={errors.comment}
                            value={this.state.body}
                            onChange={this.handleChange}
                            fullWidth
                            
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            className = "bg-success text-white"
                           style={{marginTop: '2%'}}// className={classes.button}
                        >
                            Submit
                        </Button>
                        </form>
                        <hr/>
                    </Grid>
					<DialogContent>
						{
                            this.state.loading ? <p>loading</p> : this.state.comments.length === 0 ? <p>no comments</p> : this.state.comments.map(comment => {
                                return <p>{comment.body}</p>
                            })
                        }
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

export default CommentsModel;
