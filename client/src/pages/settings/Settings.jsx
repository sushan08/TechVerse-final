
import { useContext, useState } from 'react'
import axios from "axios";
import Sidebar from '../../components/sidebar/Sidebar'
import TopBar from '../../components/topbar/TopBar'
import './settings.css'
import { Context } from '../../context/Context'


export default function Setting() {
  const {user, dispatch} = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF = "https://api.techverse.revampgoal.co/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,email,password
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("https://api.techverse.revampgoal.co/api/upload", data);
      } catch (err) {}
    }
    try {
    const res = await axios.put("https://api.techverse.revampgoal.co/api/users/" + user._id, updatedUser);
    setSuccess(true);
    dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    } catch (err) {
      dispatch({type:"UPDATE_FAILURE"});
    }
  };




  return (
<div className="settings">

      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" >Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)}/>
          <label>Password</label>
          <input type="password"  onChange={e => setPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{color: "green", textAlign:"center", marginTop:"20px"}}>Profile has been updated!</span>}
          
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
