import { Box, Button, TextField} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
const Login = ({ setLoggedin }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate()
  const handleFormSubmit = (values) => {
    console.log(values);
    if(values.email.toLowerCase() == "admin@petzy.com" && values.password === "Admin1234"){
    setLoggedin(true);
    navigate("/")
  }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={2}

    >

      <Box
        width={isNonMobile ? "400px" : "100%"}
        mt={3}

        borderRadius="8px"
        boxShadow="0px 2px 6px rgba(0, 0, 0, 0.23)"
        padding={3}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box display="grid" gap={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="E-mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
              </Box>

            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default Login;
