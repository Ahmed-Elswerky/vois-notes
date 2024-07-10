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
      if (!(user !== null && user?.token?.length > 0)) return;
      // context.setState({
      //   user
      // });
      getNotes(user);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user !== null && user?.token?.length > 0) {
      setSignedInFlag(true);
    } else setSignedInFlag(false);
  }, [user]);

  useEffect(() => {
    if (signedInFlag) {
      getNotes(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastActivity, user, signedInFlag]);

  const getNotes = async (user) => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    if (savedNotes && user.id) {
      context.setState({
        user,
        notes: savedNotes
          ?.filter(
            (note) =>
              note.userId === user.id || note?.taggedUsers?.includes(user.id)
          )
          ?.map((note) => ({
            ...note,
            text: decryptTxt(note.text),
            title: decryptTxt(note.title),
          })),
      });
    }
  };
  const handleLogout = () => {
    try {
      localStorage.removeItem("currentUser");
      context.setState({ user: { token: null }, notes: [] });
      // context.updateUserActivity();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="header-inner">
            <span>Offline Notes</span>
            {user?.id && (
              <div className="user-info">
                <span>{user?.username}</span>

                <button className="logout" onClick={handleLogout}>
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
