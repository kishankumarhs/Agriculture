import Search from "@mui/icons-material/Search";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React from "react";
import "./SearchProducts.css";
const SearchProducts = () => {
  return (
    <div className="container-fluid">
      <div className="container-fluid mt-5 pt-3 shadow-sm">
        <div className="mt-5 container">
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="password">Search</InputLabel>
            <FilledInput
              id="search"
              type="search"
              //   value={formValues.password}
              onChange={(e) => {
                console.log(e.target.value);
              }}
              //   onBlur={_onBlur}
              //   error={errors.password ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={(e) => {
                      console.log(e.target.value);
                    }}
                    edge="end"
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
