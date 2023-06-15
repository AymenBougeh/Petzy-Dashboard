import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Select, MenuItem } from "@mui/material";

const AddProduct = ({ collapsedSB, setRender, render }) => {
  const navigate = useNavigate()
  //=======================================================
  var style = { marginLeft: '290px' }

  if (collapsedSB) { style = { marginLeft: '100px' } }
  //=======================================================

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    if(values.breed !== "Breed Category" && values.category !== "Product Category"){
    // console.log(values);
    axios.post(`http://localhost:3000/shop/addProduct`, values).then((res) => { setRender(!render); navigate("/products") }).catch((err) => { console.log(err) })
  }
};

  return (
    <Box m="20px" style={style}>
      <Header title="ADD PRODUCT " subtitle="Add a New Product To Your Store" />

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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Product Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Image"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.image}
                name="image"
                error={!!touched.image && !!errors.image}
                helperText={touched.image && errors.image}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <Select
                fullWidth
                variant="filled"
                label="Product Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helpertext={touched.category && errors.category}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="Product Category" disabled>
                Product Category
                </MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
                <MenuItem value="HealthCare">HealthCare</MenuItem>
              </Select>
              <Select
                fullWidth
                variant="filled"
                label="Breed Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.breed}
                name="breed"
                error={!!touched.breed && !!errors.breed}
                helpertext={touched.breed && errors.breed}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="Breed Category" disabled>
                  Breed Category
                </MenuItem>
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                <AddCircleOutlineIcon sx={{ mr: "10px" }} />
                Add New Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};



const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  price: yup.string().required("required"),
  image: yup.string().required("required"),
  description: yup.string().required("required"),
  category: yup.string().required("required"),
  breed: yup.string().required("required"),
});
const initialValues = {
  name: "",
  price: "",
  image: "",
  description: "",
  category: "Product Category",
  breed: "Breed Category",
};

export default AddProduct;
