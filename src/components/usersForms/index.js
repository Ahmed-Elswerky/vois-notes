import React, { useContext, useState } from "react";
import { decryptTxt, encryptTxt, randId, token } from "../../utils";
import { Context } from "../wrapper";

const UserForm = () => {
  const context = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);

  const onRegister = (username, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]"),
        searchedUser = users?.find((user) => user.username === username);

      if (searchedUser) {
        return alert(
          "User name already exists, please enter another one or login"
        );
      }

      const newUser = {
        username,
        password: encryptTxt(password),
        token: encryptTxt(token()),
        id: randId(),
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      onLogin(username, password);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onLogin = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]"),
      searchedUser = users?.find((user) => user.username === username);

    if (!searchedUser) {
      return alert("User name does not exist, please register");
    }
    if (decryptTxt(searchedUser.password) !== password) {
      return alert("Wrong password");
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...searchedUser, token: decryptTxt(searchedUser.token) })
    );

    context.setState({
      user: { ...searchedUser, token: decryptTxt(searchedUser.token) },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      onRegister(username, password);
    } else {
      onLogin(username, password);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </button>
    </form>
  );
};

export default UserForm;
