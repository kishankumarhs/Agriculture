import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import {
  Button,
  Stack,
  TextareaAutosize,
  TextField,
  Rating,
  CircularProgress,
  FormControl,
  FilledInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Typography,
  Divider,
} from "@mui/material";
import "./addProduct.css";
import UploadIcon from "@mui/icons-material/Upload";
import getCroppedImg from "./components/cropImage";
import Backdrop from "@mui/material/Backdrop";
import { Card, Spinner } from "react-bootstrap";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Crop, Delete, Save } from "@mui/icons-material";
import { Db, Storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Cropper from "react-easy-crop";

const AddProduct = () => {
  const [proValues, setProValues] = useState({
    proName: "",
    file: null,
    stock: "instock",
  });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.AdminChanger.isAdmin);
  useEffect(() => {
    Object.keys(isAdmin).length === 0 && navigate("/royal-admin");
  }, [isAdmin, navigate]);
  const _handelChange = (e) => {
    const { id, value } = e.target;
    setProValues({
      ...proValues,
      [id]: value,
    });
  };
  const _handelErrors = () => {
    setErrors(validate());
    function validate() {
      const errors = {};
      if (!proValues.file) errors.file = "image is required";
      if (!proValues.proName) {
        errors.proName = "Prodcut Name is Required";
      }
      if (!proValues.desc) errors.desc = "description is required";

      if (proValues.price === 0) {
        errors.price = "Price is required";
      }
      if (!proValues.catogary) errors.catogary = "catogray is required";

      return errors;
    }
  };

  const save = () => {
    setIsloading(true);
    if (!proValues.imageUrl) {
      setErrors({
        ...errors,
        file: "select a image",
      });
      return;
    }
    if (Object.keys(errors).length === 0) {
      if (state) {
        // console.log(state.id);
        // return;
        const upref = doc(Db, "products", state.id);
        updateDoc(upref, {
          ...proValues,
          file: null,
        })
          .then(() => {
            setIsloading(false);
            Object.keys(proValues).forEach((a) => {
              setProValues({
                [a]: "",
              });
            });
          })
          .catch((err) => {
            setIsloading(false);
            setErrors({
              ...errors,
              proName: err.massage,
            });
          });
        return;
      }
      let proref = collection(Db, "products");
      addDoc(proref, {
        ...proValues,
        file: null,
      })
        .then(() => {
          setIsloading(false);
          Object.keys(proValues).forEach((a) => {
            setProValues({
              [a]: "",
            });
          });
        })
        .catch((err) => {
          setIsloading(false);
          setErrors({
            ...errors,
            proName: err.massage,
          });
        });
    }
  };
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }
  const _handleImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setProValues({
        ...proValues,
        file: imageDataUrl,
      });
    }
  };
  const [croped, setCroped] = useState(false);

  const uploadImage = () => {
    if (!proValues.file) {
      setErrors({
        ...errors,
        file: "Select a Image",
      });
      return;
    }
    if (!croped) {
      setErrors({ ...errors, file: "crop image first" });
      return;
    }
    const name = proValues.file.name;
    setUploading(true);
    const imageRef = ref(Storage, `products/${name}`);
    const uploadTask = uploadBytesResumable(imageRef, proValues.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        setProgress(Math.round(progress));
      },
      (error) => {
        setUploading(false);
        setErrors({
          ...errors,
          file: error.massage,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploading(false);
          setProValues({
            ...proValues,
            imageUrl: downloadURL,
          });
        });
      }
    );
  };
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setProValues({ ...state });
    }
  }, [state]);
  const update = () => {
    if (Object.keys(errors).length === 0) {
      if (state) {
        // console.log(state.id);
        // return;
        const upref = doc(Db, "products", state.id);
        updateDoc(upref, {
          ...proValues,
          file: null,
        })
          .then(() => {
            setIsloading(false);
            Object.keys(proValues).forEach((a) => {
              setProValues({
                [a]: "",
              });
            });
          })
          .catch((err) => {
            setIsloading(false);
            setErrors({
              ...errors,
              proName: err.massage,
            });
          });
        return;
      }
    }
  };
  // const resizeFile = (file) =>
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       300,
  //       300,
  //       "JPEG",
  //       100,
  //       0,
  //       (uri) => {
  //         resolve(uri);
  //       },
  //       "file",
  //       200,
  //       200
  //     );
  //   });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // const [croppedImage, setCroppedImage] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const dogImg =
    "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        proValues.file,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setProValues({
        ...proValues,
        file: croppedImage,
      });
      setCroped(true);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  return (
    <div className="addproduct">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isloading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col-md-6 px-2 col-sm-12 center">
            <pre style={{ width: "100%", wordWrap: "break-word" }}>
              {JSON.stringify(proValues, null, 2)}
            </pre>
            <Card className=" shadow-sm mb-3">
              <Card.Img
                className="products__image border-0 img-fluid"
                style={{ width: "400px", height: "300px" }}
                src={proValues.imageUrl}
              />
              <Card.Body>
                <Card.Title className="h5 text-uppercase w-75  products__title">
                  {proValues.proName ? proValues.proName : "Products"}
                </Card.Title>
                <Card.Subtitle className=" text-truncate">
                  <p className="products__desc">
                    {proValues.desc
                      ? proValues.desc
                      : "Lorem ipsum, dolor sit amet consectetur adipisicing elit."}
                  </p>
                </Card.Subtitle>
                <Card.Title className="h5 my-1 text-uppercase w-75  products__title">
                  <p className="products__price">
                    <CurrencyRupeeIcon />
                    {proValues.price ? proValues.price + ".00" : "340.00"}
                  </p>
                </Card.Title>
                <Card.Subtitle>
                  <Rating value={4} readOnly />
                </Card.Subtitle>
                <p
                  className="fw-500"
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  {proValues.delivery === "0" || !proValues.delivery
                    ? "Free Delivery"
                    : proValues.delivery + " Rs for delivery"}
                </p>
              </Card.Body>
              <div className="d-flex">
                <button className=" Button-2 ln-1 rounded-0 center d-flex w-50">
                  Add to Cart
                </button>
                <button className=" Button-1 ln-1 rounded-0 center d-flex w-50">
                  Buy Now
                </button>
              </div>
            </Card>
          </div>
          <div className="col-md-6 mt-3  center col-sm-12">
            <div className="cropImage">
              <Cropper
                image={proValues.file ? proValues.file : dogImg}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                cropSize={{ width: 300, height: 200 }}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <Stack spacing={4} className="addProducts__info">
              <div className="">
                <div>
                  <Typography variant="overline">Zoom</Typography>
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                </div>
                <div>
                  <Typography variant="overline">Rotation</Typography>
                  <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    onChange={(e, rotation) => setRotation(rotation)}
                  />
                </div>
                <div className="crop__button">
                  <Button
                    color="secondary"
                    onClick={showCroppedImage}
                    startIcon={<Crop />}
                    variant="contained"
                  >
                    Crop
                  </Button>
                </div>
              </div>
              <Divider />
              <FormControl variant="filled">
                <FilledInput
                  id="filled-adornment-password"
                  type="file"
                  onChange={_handleImage}
                  error={errors.file ? true : false}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={uploadImage}
                        edge="end"
                        sx={{
                          bgcolor: "var(--bs-primary)",
                        }}
                      >
                        {uploading ? (
                          <CircularProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                              color: "var(--secondary-light)",
                            }}
                            size={25}
                          />
                        ) : (
                          <UploadIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{errors.file}</FormHelperText>
              </FormControl>
              <TextField
                type="text"
                variant="filled"
                label="Product name"
                id="proName"
                value={proValues.proName}
                onChange={_handelChange}
                error={errors.proName ? true : false}
                helperText={errors.proName}
                onBlur={_handelErrors}
              />
              <textarea
                placeholder="description"
                id="desc"
                value={proValues.desc}
                rows={4}
                onChange={_handelChange}
                onBlur={_handelErrors}
                className="desc"
                style={{
                  background: "#cedbf4",
                  border: 0,
                  height: "100px",
                  borderBottom: "solid 1px var(--secondary-main)",
                  "&:foucs": {
                    outline: "none",
                    border: 0,
                  },
                }}
              ></textarea>
              <TextField
                type="number"
                variant="filled"
                label="price"
                id="price"
                value={proValues.price}
                onChange={_handelChange}
                error={errors.price ? true : false}
                helperText={errors.price}
                onBlur={_handelErrors}
              />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Stock</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="instock"
                  row
                  name="radio-buttons-group"
                  value={proValues.stock}
                  id="stock"
                  onChange={(e) => {
                    let s = e.target.value;
                    setProValues({
                      ...proValues,
                      stock: s,
                    });
                  }}
                >
                  <FormControlLabel
                    value="instock"
                    control={<Radio />}
                    label="instock"
                  />
                  <FormControlLabel
                    value="out of stock"
                    control={<Radio />}
                    label="out of stock"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                type="number"
                variant="filled"
                label="delivery (O means free delivery)"
                id="delivery"
                value={proValues.delivery}
                onChange={_handelChange}
                onBlur={_handelErrors}
              />
              <TextField
                type="text"
                variant="filled"
                label="catogary"
                id="catogary"
                value={proValues.catogary}
                onChange={_handelChange}
                onBlur={_handelErrors}
                error={errors.catogary ? true : false}
                helperText={errors.catogary}
              />
              <Stack spacing={3} direction="row">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={state ? update : save}
                  startIcon={
                    isloading ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        style={{ color: "var(--bs-primary)" }}
                      />
                    ) : (
                      <Save />
                    )
                  }
                >
                  {state ? "update" : "save"}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  type="reset"
                  startIcon={<Delete />}
                >
                  reset
                </Button>
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
