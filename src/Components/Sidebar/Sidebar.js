import "./Sidebar.css";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import ConvoItem from "../ConvoItem/ConvoItem";
export default function Sidebar() {
  return (
    <div className="conta">
      <div className="topp border border-dark">
        <div className="ele">
          <PublicIcon />
          <div className="p">Global Chat</div>
        </div>
        <div className="ele">
          <GroupsIcon />
          <div className="p">Add Group</div>
        </div>
      </div>
      <div className="search">
        <div className="input-group mb-3 ">
          <input
            type="text"
            className="form-control border border-dark ip"
            placeholder="Search Username..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append ">
            <button className="btn btn-dark border border-dark ip"  type="button">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="convo border border-dark">
        <ConvoItem name="Himanshu" msg="Hello.. How Are..." time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
        <ConvoItem name="Himanshu" msg="Hello.. How Are You" time="today"/>
      </div>
    </div>
  );
}
