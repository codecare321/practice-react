import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";

const ListTable = ({ tblOperation, handleEdit, handleDelete }) => {
  return (
    <>
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

ListTable.propTypes = {
  tblOperation: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ListTable;
