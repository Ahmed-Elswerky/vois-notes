import { useContext, useState } from "react";
import { randId } from "../../utils";
import { Context } from "../wrapper";

const NoteForm = ({ addNote }) => {
  const context = useContext(Context);
  const user = context.state?.user;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [taggedUsers, setTaggedUsers] = useState([]);
  const users = JSON.parse(localStorage.getItem("users") || "[]")?.filter(
    (u) => u.id !== user.id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addNote({
        title,
        text,
        createdDate: Date.now(),
        id: randId(),
        taggedUsers: taggedUsers,
      });
      setTitle("");
      setText("");
      setTaggedUsers([]);
    }
  };

  const getUserName = (user) => users.find((u) => u.id === user)?.username;

  const handleUsersTag = (e) => {
    if (e.target.value && !taggedUsers.includes(e.target.value)) {
      setTaggedUsers([...taggedUsers, e.target.value]);
      e.target.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="notes-form">
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title..."
        value={title}
        type="text"
      />
      <textarea
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note here..."
        value={text}
      ></textarea>
      <div className="tagging">
        <select name="users" onChange={handleUsersTag}>
          <option value="">Tag a User</option>
          {users.map((user, index) => (
            <option value={user?.id} key={index}>
              {user.username}
            </option>
          ))}
        </select>
        {taggedUsers?.length > 0 && (
          <div className="tagged-users">
            {taggedUsers.map((userId, index) => (
              <button
                onClick={() =>
                  setTaggedUsers(taggedUsers.filter((u) => u !== userId))
                }
                key={index}
              >
                {getUserName(userId)}{" "}
              </button>
            ))}
          </div>
        )}
      </div>

      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
