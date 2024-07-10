import "./App.scss";
import "./Notes.scss";
import { useContext, useEffect, useState } from "react";
import Notes from "./components/viewNotes";
import UserForm from "./components/usersForms";
import { decryptTxt } from "./utils";
import { Context } from "./components/wrapper";

function App() {
  const context = useContext(Context);
  const user = context.state?.user,
    lastActivity = context.state?.lastActivity;

  const [loading, setLoading] = useState(true);
  const [signedInFlag, setSignedInFlag] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      if (user !== null && user?.token?.length > 0) {
        setSignedInFlag(true);
      } else return;

      context.setState({
        user: { ...user, token: decryptTxt(user.token) },
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (signedInFlag) {
      getNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastActivity, user]);

  const getNotes = async () => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));

    if (savedNotes) {
      console.log("savedNotes", savedNotes);
      context.setState({
        notes: savedNotes
          ?.filter((note) => note.userId === user.id)
          ?.map((note) => ({
            ...note,
            text: decryptTxt(note.text),
            title: decryptTxt(note.title),
          })),
      });
    }
  };

  // useEffect(() => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  //     if (user !== null && user?.token?.length > 0) {
  //       setSignedInFlag(true);
  //       setUser(user);
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  //   return () => {};
  // }, []);

  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="header-inner">
            <span>Offline Notes</span>
            {user && (
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
            )}
          </div>
        </div>
      </header>
      <div className="container">{signedInFlag ? <Notes /> : <UserForm />}</div>
    </div>
  );
}

export default App;
