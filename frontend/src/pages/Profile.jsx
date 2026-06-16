import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { userInfo } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">
        Profile
      </h1>

      <p>Name: {userInfo.user.name}</p>
      <p>Email: {userInfo.user.email}</p>
    </div>
  );
}

export default Profile;