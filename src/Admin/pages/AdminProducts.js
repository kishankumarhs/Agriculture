import { Add, ArrowDownward, Delete, Edit } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Db } from "../../firebase";
import "./AdminProducts.css";
const AdminProducts = () => {
  const navigate = useNavigate();
  const [deltext, setDeltext] = useState(null);
  const [ProductsList, setProductsList] = useState([]);
  const _getProducts = async () => {
    const q = query(collection(Db, "products"));
    onSnapshot(q, (proRef) => {
      const newarray = [];
      proRef.forEach((doc) => {
        newarray.push({ ...doc.data(), id: doc.id });
      });
      setProductsList(newarray);
    });
  };
  useEffect(() => {
    _getProducts();
  }, []);
  const [checked, setchecked] = useState([]);
  const handelCheck = (id) => {
    const checklist = [...checked];
    if (checked.indexOf(id) === -1) {
      checklist.push(id);
    } else {
      let index = checked.indexOf(id);
      checklist.splice(index, 1);
    }
    return setchecked(checklist);
  };
  const [checkall, setCheckall] = useState(false);
  const CheckAll = () => {
    const checklist = [];
    if (!checkall) {
      ProductsList.map((val) => {
        checklist.push(val.id);
      });
      setchecked(checklist);
      setCheckall(true);
    } else {
      setCheckall(false);
      setchecked([]);
    }
  };
  const [sort, setSort] = useState({});
  const sortByname = () => {
    const array = [...ProductsList];
    array.sort((a, b) => (a.ProName > b.proName ? 1 : -1));
    setProductsList(array);
    setSort({
      sortbyname: true,
    });
  };

  const sortByPrice = () => {
    const array = [...ProductsList];
    array.sort((a, b) => a.price - b.price);
    setProductsList(array);
    setSort({
      sortbyprice: true,
    });
  };
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteConformed, setDeleteConformed] = useState(false);
  const handleClickOpen = () => {
    if (checked.length == 0) setDeltext("Selete Items to Delete");
    else setDeltext(null);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const deleteSelected = () => {
    if (deleteConformed) {
      setDeleting(true);
      checked.map((id) => {
        deleteDoc(doc(Db, "products", id)).then(() => {
          setDeleting(false);
          deleteConformed(false);
          setchecked([]);
        });
      });
    }
  };
  const handleOk = (val) => {
    setOpen(false);
    setDeleteConformed(true);
    return deleteSelected();
  };
  return (
    <div className="container-fluid">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={deleting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className=" container my-5 site">
        <div className="row Adminproducts  py-3 px-3 border-1 shadow-sm">
          <div className="col-12 border-bottom border-warning py-2">
            <Stack spacing={4} direction="row">
              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/addProduct");
                }}
                startIcon={<Add />}
              >
                Product
              </Button>
              <TextField type="search" variant="filled" label="search" />
            </Stack>
          </div>
          <Dialog
            sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
            maxWidth="xs"
            color="error"
            keepMounted
            open={open}
          >
            <DialogTitle>Permnently Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {deltext
                  ? deltext
                  : "Seleted Items will be deleted permanently "}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
          </Dialog>
          <div className="col-12 ">
            <Stack spacing={4} sx={{ margin: "10px 0" }} direction="row">
              <Checkbox onChange={CheckAll} checked={checkall} />
              <Button
                variant="filled"
                endIcon={
                  sort?.sortbyname ? <ArrowDownward /> : <ArrowUpwardIcon />
                }
                disableRipple
                onClick={sortByname}
              >
                Name
              </Button>
              <Button
                variant="filled"
                onClick={sortByPrice}
                endIcon={
                  sort?.sortbyprice ? <ArrowDownward /> : <ArrowUpwardIcon />
                }
                disableRipple
              >
                Price
              </Button>
              <Button
                variant="filled"
                endIcon={<ArrowUpwardIcon />}
                disableRipple
              >
                delivery
              </Button>
              <Button
                variant="filled"
                endIcon={<ArrowUpwardIcon />}
                disableRipple
              >
                Sales
              </Button>
              <IconButton
                variant="contained"
                onClick={handleClickOpen}
                color="error"
              >
                <Delete />
              </IconButton>
            </Stack>
            {ProductsList.map((values, index) => (
              <div
                key={index}
                className="adminProduct__holder py-2  border-bottom algin-items-center d-flex"
              >
                <Checkbox
                  onChange={() => {
                    handelCheck(values.id);
                  }}
                  checked={checked.indexOf(values.id) !== -1}
                  disableRipple
                />
                <figure>
                  <img
                    src={values.imageUrl}
                    alt={values.ProName}
                    className="addProduct__img"
                  />
                </figure>
                <div className="adminProduct__title d-flex mx-3 flex-column">
                  <p className="h6 text-uppercase ">{values.proName}</p>
                  <p className="small text-secondary">{values.desc}</p>
                  <h5 className="adminProduct__price">
                    <CurrencyRupeeIcon fontSize="1rem" />
                    {values.price}
                  </h5>
                  <div className="adminProduct__rating">
                    <Rating value={values?.rating} />
                  </div>
                </div>
                <IconButton
                  onClick={() => {
                    navigate("/addproduct", { state: values });
                  }}
                >
                  <Edit />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
