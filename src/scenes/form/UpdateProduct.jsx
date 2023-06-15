import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useParams ,useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateIcon from '@mui/icons-material/Update';

const UpdateProduct = ({prodDetails , setRender, render, collapsedSB}) => {
  const navigate=useNavigate()
  const ID=useParams().id
  const product = prodDetails.filter(e => e.id === Number(ID))
    //=======================================================
    var style={marginLeft: '290px' }

    if (collapsedSB){style = {marginLeft: '100px'}} 
    //=======================================================

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    axios.put(`http://localhost:3000/shop//updateProduct/${ID}`,values).then((res)=>{setRender(!render); navigate("/products")}).catch((err)=>{console.log(err)})
  };
  const initialValues = {
    name: product[0].name,
    price: product[0].price,
    image: product[0].image,
    description: product[0].description,
  };
  return (
    <Box m="20px" style={style}>
      <Header title="UPDATE PRODUCT " subtitle="Update An Old Product In Your Store" />

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
                //defaultValue={product[0].name}
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
                //defaultValue={product[0].price}
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
                //defaultValue={product[0].image}
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
                //defaultValue={product[0].description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
              <UpdateIcon sx={{ mr: "10px" }} />
              UPDATE PRODUCT
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
});
// const initialValues = {
//   name: "",
//   price: "",
//   image: "",
//   description: "",
// };

export default UpdateProduct;
