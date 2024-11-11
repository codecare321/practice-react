import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./css/Home.css";
import Card from "@mui/material/Card";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import React from "react";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        console.log(response);
        setTodos([...response.data]);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className="p-2">
      <Navbar></Navbar>
      <h1>Welcome to the Homepage</h1>
      <div className="mt-4">
        {todos.map((item, index) => {
          if (index < 190) {
            return;
          }
          return (
            <div key={item.id}>
              <Card variant="elevation" className="mt-4">
                <h3>Title: {item.title}</h3>
                <p>Id: {item.id}</p>
                <p>Completed: {String(item.completed)}</p>
              </Card>
            </div>
          );
        })}
      </div>

      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination
          className="d-flex justify-content-center"
          count={10}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};

export default Home;
