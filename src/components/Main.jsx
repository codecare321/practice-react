import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";

import * as Yup from "yup";
import AddData from "./AddData";
import ListTable from "./ListTable";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Main = () => {
  const [tblOperation, setTblOperation] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [currentCase, setCurrentCase] = useState(1);
  const location = useLocation();
  const apiEndPoint = "https://fakestoreapi.com/products/";
  const { id } = useParams();
  //navigate
  const navigate = useNavigate();
  const fetchTableData = () => {
    axios
      .get(apiEndPoint)
      .then((response) => {
        setTblOperation(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  useEffect(() => {
    if (currentCase === 2) {
      fetchTableData();
    }

    if (id) {
      handleEdit(id);
      setCurrentCase(2);
    }
  }, [currentCase, id]);

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
  // addTable FUNCTIONS

  const addInTable = async (userData) => {
    try {
      const response = await axios.post(apiEndPoint, userData);
      console.log(response);

      setTblOperation((prevTblOperation) => [
        response.data,
        ...prevTblOperation,
      ]);
      alert("table added successfully");
      formik.resetForm();
      setCurrentCase(1);
      navigate("/listofdata");
    } catch (err) {
      console.error(err);
    }
  };

  //List tables FUNCTIONS

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
        setCurrentCase(1);
        navigate("/listofdata");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleReset = () => {
    formik.resetForm();
    setEditingItemId(null);
  };

  const handleEdit = (id) => {
    const itemToEdit = tblOperation.find((item) => item.id === parseInt(id));
    if (itemToEdit) {
      formik.setValues({
        title: itemToEdit.title,
        category: itemToEdit.category,
        description: itemToEdit.description,
      });
      setEditingItemId(itemToEdit.id);
      setCurrentCase(2);
      navigate(`/adddata/${id}`);
    } else {
      console.error("Item to edit not found");
    }
  };
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

  //RENDER THE COMPONENT WITH CASES

  // const renderCrudOperation = () => {
  //   return (
  //     <>
  //       {currentCase === 1 ? (
  //         <ListTable
  //           tblOperation={tblOperation}
  //           handleEdit={handleEdit}
  //           handleDelete={handleDelete}
  //         />
  //       ) : (
  //         <AddData
  //           formik={formik}
  //           editingItemId={editingItemId}
  //           handleReset={handleReset}
  //         />
  //       )}
  //     </>
  //   );
  // };

  const renderCrudOperation = () => {
    if (location.pathname === "/listofdata" || location.pathname === "/") {
      return (
        <ListTable
          tblOperation={tblOperation}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    } else if (
      location.pathname.startsWith("/adddata")
      // location.pathname.startsWith("/editData")
    ) {
      return (
        <AddData
          formik={formik}
          editingItemId={editingItemId}
          handleReset={handleReset}
        />
      );
    }
  };

  return (
    <>
      <button onClick={() => setCurrentCase(1)}>View List</button>
      <button onClick={() => setCurrentCase(2)}>Add New Item</button>
      <div>{renderCrudOperation()}</div>
    </>
  );
};

export default Main;
