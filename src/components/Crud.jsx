import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

const Crud = () => {
  const [tblOperation, setTblOperation] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const apiEndPoint = "https://fakestoreapi.com/products/";
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
    },

    validationSchema: new Yup.ObjectSchema({
      title: Yup.string().required("Title is required"),
      category: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      if (editingItemId) {
        handleUpdate(editingItemId, values);
      } else {
        addInTable(values);
      }
    },
  });

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(apiEndPoint + id);
      console.log(response);

      const shouldRemove = confirm(
        "Are you sure you want to delete this item?"
      );
      if (shouldRemove) {
        setTblOperation((prevTblOperation) =>
          prevTblOperation.filter((item) => item.id !== id)
        );
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdate = (id, updatedData) => {
    axios
      .put(apiEndPoint + id, updatedData)
      .then((response) => {
        setTblOperation((prevTblOperation) =>
          prevTblOperation.map((item) =>
            item.id === id ? response.data : item
          )
        );
        setEditingItemId(null);
        formik.resetForm();
        alert("updated data successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const addInTable = async (userData) => {
    try {
      const response = await axios.post(apiEndPoint, userData);
      console.log(response);

      setTblOperation((prevTblOperation) => [
        response.data,
        ...prevTblOperation,
      ]);
      alert("table added successfully");
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (id) => {
    const itemToEdit = tblOperation.find((item) => item.id === id);
    formik.setValues({
      title: itemToEdit.title,
      category: itemToEdit.category,
      description: itemToEdit.description,
    });
    setEditingItemId(id);
  };

  useEffect(() => {
    axios
      .get(apiEndPoint)
      .then((response) => {
        console.log(response);

        setTblOperation([...response.data]);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center align-center mt-4">
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column w-50 gap-2"
        >
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter your title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title ? (
            <div>{formik.errors.title}</div>
          ) : null}
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="Enter your category type"
            value={formik.values.category}
            onChange={formik.handleChange}
          />
          {formik.touched.category && formik.errors.category ? (
            <div>{formik.errors.category}</div>
          ) : null}
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Enter your description"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
          <button type="submit">{editingItemId ? "Update" : "Add"}</button>
        </form>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {tblOperation.map((operation) => {
          return (
            <tbody key={operation.id}>
              <tr>
                <td>{operation.id}</td>

                <td>{operation.title}</td>
                <td>{operation.category}</td>
                <td>{operation.description}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleEdit(operation.id)}
                  >
                    Edit
                  </Button>{" "}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(operation.id)}
                  >
                    delete
                  </Button>{" "}
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </>
  );
};

export default Crud;
