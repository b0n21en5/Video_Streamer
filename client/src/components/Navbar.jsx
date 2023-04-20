import { Stack, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

import { logo } from "../utils/constants";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("auth");
      setAuth({ ...auth, user: "", token: "" });
      navigate("/");
      toast.success("Logout Successfully");
    } catch (error) {}
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/" sx={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>
      <SearchBar />
      {auth.user ? (
        <div className="d-flex">
          <Button variant="outlined" className="me-2" id="user">
            {auth.user.name}
          </Button>
          <Button variant="contained" onClick={handleLogout} id="logo">
            LOGOUT
          </Button>
        </div>
      ) : (
        <div className="d-flex ">
          <Link to="/login" className="me-2">
            <Button variant="contained" id="log">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outlined" id="reg">
              Register
            </Button>
          </Link>
        </div>
      )}
    </Stack>
  );
};
export default Navbar;
