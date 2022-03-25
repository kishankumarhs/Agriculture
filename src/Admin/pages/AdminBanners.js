import React, { useEffect, useState } from "react";
import "./AdminBanners.css";
import banner2 from "../../assets/banner2.jpg";
import { Carousel, Image, Spinner } from "react-bootstrap";
import {
  Backdrop,
  Button,
  CircularProgress,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { Delete, Save } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Db, Storage } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
const AdminBanners = () => {
  const [bannerValues, setbannerValues] = useState({});
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState({});
  const [BannerList, setBannerList] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const _getBanner = async () => {
    const q = query(collection(Db, "banners"));
    onSnapshot(q, (proRef) => {
      const newarray = [];
      proRef.forEach((doc) => {
        newarray.push({ ...doc.data(), id: doc.id });
      });
      setBannerList(newarray);
    });
  };
  useEffect(() => {
    _getBanner();
  }, []);
  const _handelChange = (e) => {
    const { id, value } = e.target;
    setbannerValues({
      ...bannerValues,
      [id]: value,
    });
  };
  const _handleImage = (e) => {
    let file = e.target.files[0];
    setbannerValues({
      ...bannerValues,
      file,
    });
  };
  const UploadImage = () => {
    if (!bannerValues.file) {
      setErrors({
        ...errors,
        file: "Select a Image",
      });
      return;
    }
    const name = bannerValues.file.name;
    setUploading(true);
    const imageRef = ref(Storage, `banners/${name}`);
    const uploadTask = uploadBytesResumable(imageRef, bannerValues.file);
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
          bannerName: error.massage,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploading(false);
          setbannerValues({
            ...bannerValues,
            imageUrl: downloadURL,
          });
        });
      }
    );
  };
  const _UploadBanner = () => {
    if (!bannerValues.imageUrl) {
      setErrors({ ...errors, file: "upload image first" });
      return;
    }

    setIsloading(true);
    if (Object.keys(errors).length === 0 && bannerValues.imageUrl) {
      let proref = collection(Db, "banners");
      addDoc(proref, {
        ...bannerValues,
        file: null,
      })
        .then(() => {
          setIsloading(false);
          Object.keys(bannerValues).forEach((a) => {
            setbannerValues({
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
  const DeleteBanner = (id) => {
    setDeleting(true);
    deleteDoc(doc(Db, "banners", id))
      .then(() => {
        setDeleting(false);
        console.log("Sucseesfull");
      })
      .catch((err) => {
        setDeleting(false);
        console.log(err.massage);
      });
  };
  const _onBlur = () => {
    function validate() {
      const errors = {};
      if (!bannerValues.bannerName) errors.bannerName = "name is required";
      return errors;
    }
    setErrors(validate());
  };

  return (
    <div className="adminBanners">
      <div className="container my-5">
        <div className="container-fluid my-5">
          <Carousel className="home_carousel">
            {BannerList.map((ban) => (
              <Carousel.Item key={ban.id} className="home__car_item">
                <img
                  className=" home__cars_img"
                  src={ban.imageUrl}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{ban.bannerName}</h3>
                  <p>{ban.bannerDesc}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="container bg-white shadow-sm rounded my-5">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={deleting}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <p className="h5 pt-3">Delete Banners</p>
          <List>
            {BannerList.map((val, index) => (
              <ListItem key={index} sx={{ borderBottom: "solid 1px #999" }}>
                <Image
                  src={val.imageUrl}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={val.bannerName}
                />
                <ListItemText
                  sx={{ margin: "0 10px" }}
                  primary={val.bannerName}
                  secondary={val.bannerDesc}
                />
                <ListItemIcon>
                  <IconButton
                    color="error"
                    onClick={() => {
                      DeleteBanner(val.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 px-2">
            <Carousel className="home_carousel" interval={3000}>
              <Carousel.Item>
                <img
                  className="img-fluid "
                  src={bannerValues?.imageUrl ? bannerValues.imageUrl : banner2}
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>{bannerValues?.bannerName}</h3>
                  <p>{bannerValues?.bannerDesc}</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-6 col-sm-12 px-2">
            <div className="h3 fw-bold my-3"> New Banner</div>
            <Stack spacing={3}>
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
                        onClick={UploadImage}
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
                variant="filled"
                id="bannerName"
                label="Heading"
                required
                onChange={_handelChange}
                helperText={errors.bannerName}
                value={bannerValues.bannerName}
                onBlur={_onBlur}
                error={errors.bannerName ? true : false}
              />
              <TextField
                id="bannerDesc"
                label="description"
                variant="filled"
                value={bannerValues.bannerDesc}
                onChange={_handelChange}
                onBlur={_onBlur}
              />
              <Stack direction="row" spacing={4}>
                <Button
                  variant="contained"
                  startIcon={
                    isLoading ? (
                      <Spinner
                        size="sm"
                        style={{ color: "var(--bs-secondary-main)" }}
                      />
                    ) : (
                      <Save />
                    )
                  }
                  onClick={_UploadBanner}
                >
                  Save
                </Button>
                <Button variant="contained" startIcon={<Delete />}>
                  Delete
                </Button>
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBanners;
