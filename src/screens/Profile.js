import { Avatar, Button, List, ListItem, TextField } from "@mui/material";
import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Auth, Db } from "../firebase";
import "./profile.css";
import { AnimatedTree, Tree } from "react-tree-graph";
import "react-tree-graph/dist/style.css";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const Profile = () => {
  const user = Auth.currentUser;
  const [User, setUser] = useState({});
  const _getUser = async () => {
    const q = doc(Db, "users", user.uid);
    onSnapshot(q, (proRef) => {
      console.log(proRef.data());
      setUser(proRef.data());
    });
  };
  useEffect(() => {
    _getUser();
  }, []);

  let data = {
    name: user.displayName,
    children: [
      {
        name: "Child One",
        children: [
          {
            name: "Child One",
          },
          {
            name: "Child Two",
          },
        ],
      },
      {
        name: "Child Two",
      },
    ],
  };
  const [showTree, setShowTree] = useState(true);
  function newfun() {
    let ref = collection(Db, "users");
    let q = query(ref, where("refferalCode", "==", "J5ONGW"));
    getDocs(q).then((a) => {
      updateDoc(collection("users", a.docs[0].id, "childrens"), {
        username: "reffral",
        email: "refferalemail@gmail.com",
      })
        .then(() => {
          console.log("sslssl");
        })
        .catch((ett) => console.log(ett.massage));
    });
  }
  const ShowTree = () => {
    return (
      <div className="p-3">
        <div className="bg-warning text-white p-2 rounded shadow-sm">
          <p className="h4">Your Reffral link</p>
          <p className="small">
            {window.location.protocol}//{window.location.hostname}/register/
            {User?.refferalCode}
          </p>
          <TextField
            // className="mx-5"
            defaultValue={User?.refferalCode}
            label="Refferal Code"
            variant="outlined"
            disabled
          />
        </div>
        <p className="h4 mt-3">Your Reffrals</p>
        <div className="tree">
          <Tree data={data} height={400} width={400} />
        </div>
      </div>
    );
  };
  return (
    <div className="profile">
      <div className="row">
        <div className="col-sm-12 col-md-3 center profile__avatar border-end  border-1">
          <Avatar
            sx={{ width: 100, height: 100, bgcolor: "#ffb900" }}
            scr={user?.photoURL}
          >
            {!user.photoURL && user.displayName.toUpperCase().slice(0, 2)}
          </Avatar>
          <p className="fs-4 profile__name">{user.displayName}</p>
          <p className="small profile__email">{user.email}</p>
          <p className="small profile__phoneNumber">{user.phoneNumber}</p>
          <div className="profilelist">
            <List>
              <ListItem
                onClick={() => {
                  setShowTree(!showTree);
                }}
                className="border-bottom border-1"
              >
                <Link to="#">My Refrals </Link>
              </ListItem>
              <ListItem className="border-bottom border-1">
                <Link to="/ForgetPassword">Change Password</Link>
              </ListItem>
              <ListItem>
                <Button onClick={newfun}>newfun</Button>
              </ListItem>
            </List>
          </div>
        </div>
        <div className="col-sm-12 profile__links col-md-9">
          {showTree ? <ShowTree /> : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
