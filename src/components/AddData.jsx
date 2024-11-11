import PropTypes from "prop-types";

const AddData = ({ formik, editingItemId, handleReset }) => {

  
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
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

AddData.propTypes = {
  formik: PropTypes.object,
  editingItemId: PropTypes.number,
  handleReset: PropTypes.func,
};

export default AddData;
