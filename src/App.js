import "./App.css";
import cw from "./assets/cw.svg";
import man from "./assets/man.svg";
import woman from "./assets/woman.svg";
import growingMan from "./assets/growing-up-man.svg";
import growingWoman from "./assets/growing-up-woman.svg";
import mail from "./assets/mail.svg";
import map from "./assets/map.svg";
import padlock from "./assets/padlock.svg";
import phone from "./assets/phone.svg";
import loadingGif from "./assets/loading.gif";
import axios from "axios";
import { useState, useEffect } from "react";

import React from "react";

function App() {
  const [user, setUser] = useState([]);
  const [personal, setPersonal] = useState("name");
  const [information, setInformation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  const addUserList = () => {
    if (userList.filter((a) => a.email === user?.email).length > 0) {
      alert("You've added this person");
    } else {
      setUserList([
        ...userList,
        {
          name: user?.name?.first,
          email: user?.email,
          phone: user?.phone,
          age: user?.dob?.age,
        },
      ]);
    }
  };

  const handleClick = (info) => {
    setPersonal(info);
  };

  const getData = () => {
    setLoading(true);
    axios.get("https://randomuser.me/api/").then((res) => {
      console.log(res.data.results[0]);
      setUser(res.data.results[0]);
      setInformation([
        res.data.results[0].name.title,
        res.data.results[0].name.first,
        res.data.results[0].name.last,
      ]);

      setPersonal("name");
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <img src={cw} alt="cwlogo" className="cw" />
      <div className="card">
        <div className="card-title-background"></div>
        {loading ? (
          <img src={loadingGif} alt="" className="loading" />
        ) : (
          <div>
            {" "}
            <img
              className="image"
              src={user?.picture?.large}
              alt="fsdf"
              srcset=""
            />
            <div className="personal-info">
              <p>My {personal} is</p>
              <p>
                {personal === "name" && user?.name?.title}{" "}
                {personal === "name" && user?.name?.first}{" "}
                {personal === "name" && user?.name?.last}
              </p>
              <p>{personal === "mail" && user?.email}</p>
              <p>{personal === "age" && user?.dob?.age}</p>

              <p>
                {personal === "location" && user?.location?.city}{" "}
                {personal === "location" && user?.location?.country}
              </p>
              <p>{personal === "phone" && user?.phone}</p>
              <p>
                {personal === "password" &&
                  user &&
                  user.login &&
                  user.login.password}
              </p>
            </div>
          </div>
        )}
        <div className="icons">
          <acronym title="gender" className="">
            <img
              onClick={() => handleClick("name")}
              src={user.gender === "female" ? woman : man}
              alt="asd"
              srcset=""
            />
          </acronym>
          <acronym title="gender" className="">
            <img
              src={mail}
              onClick={() => handleClick("mail")}
              alt="asd"
              srcset=""
            />{" "}
          </acronym>
          <acronym title="gender" className="">
            <img
              src={user.gender === "female" ? growingWoman : growingMan}
              onClick={() => handleClick("age")}
              alt="asd"
              srcset=""
            />{" "}
          </acronym>
          <acronym title="gender" className="">
            <img
              src={map}
              onClick={() => handleClick("location")}
              alt="asd"
              srcset=""
            />{" "}
          </acronym>
          <acronym title="gender" className="">
            <img
              src={phone}
              onClick={() => handleClick("phone")}
              alt="asd"
              srcset=""
            />{" "}
          </acronym>
          <acronym title="gender" className="">
            <img
              src={padlock}
              onClick={() => handleClick("password")}
              alt="asd"
              srcset=""
            />{" "}
          </acronym>
        </div>
        <div className="buttons">
          <button onClick={getData}>New User </button>
          <button onClick={addUserList}>Add User</button>
        </div>
        <div className="list">
          {userList.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {userList?.map((user, index) => (
                  <tr key={index}>
                    <td> {user.name}</td>
                    <td> {user.email}</td>
                    <td> {user.phone}</td>
                    <td> {user.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
