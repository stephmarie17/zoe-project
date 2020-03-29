import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddStudentButton from '../AddStudentButton';
import API from '../../../utils/API';
import AuthContext from '../../../context/auth/authContext';
import ProjectContext from '../../../context/projects/projectContext';

require('./style.css');

export default function FormDialog(props) {
  const authContext = useContext(AuthContext);
  const projectContext = useContext(ProjectContext);

  const { current, activeProject } = projectContext;
  const { loadUser, activeUser } = authContext;
  useEffect(() => {
    loadUser(true);
    activeProject();
  },[]);

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const projectId = localStorage.getItem('projectId');

  const handleSave = event => {
    event.preventDefault();
    const { firstName, lastName } = values;
    const studentData = {
      firstName,
      lastName
    };
    console.log(studentData, "student data from student modal!");
    console.log(projectId);

    if (!studentData.firstName || !studentData.lastName) {
      return;
    }
    API.addProjectStudents(projectId, studentData)
      .then(setOpen(false))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Button variant="none" onClick={handleClickOpen}>
        <div className="button-area">
          <AddStudentButton />
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the student's first and last name to add them to the project.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            name="firstName"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            name="lastName"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
