import { Stack, Button } from "@mui/material";
import { categories } from "../utils/constants";
import { useMemo } from "react";

const SideBar = ({ selectedCategory, setSelectedCategory }) => {
  const memoizedCategories = useMemo(() => categories, []);

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {memoizedCategories.map((category) => (
        <Button
          className="category-btn"
          onClick={() => setSelectedCategory(category.name)}
          sx={{
            background: category.name === selectedCategory && "#fc1503",
            color: "white",
          }}
          key={category.key}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "red",
              marginRight: "15px",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.name}
          </span>
        </Button>
      ))}
    </Stack>
  );
};

export default SideBar;
