import "./App.scss";
import { useEffect, useState } from "react";
import Notes from "./components/viewNotes";
import UserForm from "./components/usersForms";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [signedInFlag, setSignedInFlag] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
      if (user !== null && user?.token?.length > 0) {
        setSignedInFlag(true);
        setUser(user);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    return () => {};
  }, []);

  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="header-inner">
            <span>Offline Notes</span>
            <div className="user-info">
              <span>{user?.username}</span>

              <button
                className="logout"
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  setSignedInFlag(false);
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="container">{signedInFlag ? <Notes /> : <UserForm />}</div>
    </div>
  );
}

export default App;
