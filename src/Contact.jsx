import Navbar from "./Navbar";
import { useFormik } from "formik";
import { Button } from "@mui/material";

const Contact = () => {
  const formik = useFormik({
    initialvalue: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <Navbar></Navbar>

      <label className="d-flex align-center justify-content-center">
        Contact Us
      </label>
      <div className="d-flex justify-content-center align-center">
        <form
          onSubmit="formik.handleSubmit"
          className="d-flex flex-column w-50 gap-2"
        >
          <label htmlFor="name" x>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={formik.handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email address"
            onChange={formik.handleChange}
          />

          <label htmlFor="message">Message</label>
          <textarea
            placeholder="Enter your message"
            id="message"
            name="message"
            onChange={formik.handleChange}
          ></textarea>

          <Button variant="contained" color="secondary">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
