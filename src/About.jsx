import Navbar from "./Navbar";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { Box } from "@mui/material";

// const data = [
//   {
//     name: "F",
//     message: "",
//   },
//   {
//     name: "R",
//     message: "",
//   },
//   {
//     name: "B",
//     message: "",
//   },
// ];
const About = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4 -2">
        <Box className="">
          <Box sx={{ p: 1, border: "1px solid grey" }}>
            <div>
              <div className="d-flex mt-4 justify-content-center">
                <Avatar
                  sx={{
                    bgcolor: deepOrange[500],
                    width: "70px",
                    height: "70px",
                  }}
                  alt="Remy Sharp"
                  src="/broken-image.jpg"
                >
                  R
                </Avatar>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Molestiae, obcaecati. Quo expedita nostrum suscipit voluptatum
                ducimus ab esse vitae dignissimos iste libero. Reiciendis,
                perferendis? Vero adipisci voluptate enim veritatis soluta, quae
                corrupti corporis iure minima nostrum veniam expedita ipsum
                eaque porro distinctio maxime itaque accusamus cumque
                dignissimos voluptatibus reprehenderit vitae totam? Ad ex
                accusamus odit quis ipsa officia aspernatur, sit doloribus magni
                perferendis, mollitia ab voluptatum, vitae autem laboriosam. Cum
                molestias fugit rerum est non quisquam architecto quod optio
                iusto, dolorem harum, eveniet unde quas pariatur. Quia modi sunt
                magnam eligendi incidunt laborum voluptatum animi, esse quas
                numquam, repellat consequuntur.
              </div>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default About;
