import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { User } from "../../hooks/useUsers";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { styled } from "@mui/material";
import * as yup from "yup";

interface OwnProps {
  user: User;
  isOpen: boolean;
  handleSubmit: (values: User) => void;
  handleCancel: () => void;
}

export default function EditUserDialog(props: OwnProps) {
  const { isOpen, handleSubmit, handleCancel, user } = props;

  return (
    <div>
      <Dialog open={isOpen} onClose={handleCancel}>
        <Formik
          initialValues={user}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values));
              handleSubmit(values);
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={editUserValidationSchema}
          validateOnChange={true}
        >
          {({ isSubmitting, errors, touched }) => (
            <StyledForm>
              <Field
                as={TextField}
                autoFocus
                margin="dense"
                name="email"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                helperText={touched.email && errors.email}
                error={touched.email && Boolean(errors.email)}
              />
              <Field
                as={TextField}
                autoFocus
                margin="dense"
                name="name"
                id="name"
                label="Name"
                type="text"
                fullWidth
                helperText={touched.name && errors.name}
                error={touched.name && Boolean(errors.name)}
              />
              <Field
                as={TextField}
                autoFocus
                margin="dense"
                name="username"
                id="username"
                label="Username"
                type="text"
                fullWidth
                helperText={touched.username && errors.username}
                error={touched.username && Boolean(errors.username)}
              />
              <DialogActions>
                <Button type="submit" disabled={isSubmitting || Object.keys(errors).length > 0}>
                  Save
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </DialogActions>
            </StyledForm>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

const editUserValidationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  username: yup
    .string()
    .min(3, "Username should be of between 3-20 characters length")
    .max(26, "Username should be of between 3-20 characters length")
    .required("Username is required"),
  name: yup.string().required("Name is required"),
});

const StyledForm = styled(Form)`
  padding: 16px 16px 0px 16px;
`;
