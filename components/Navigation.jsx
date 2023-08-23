import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { ImStatsBars } from "react-icons/im";

export default function Nav() {
  // Grabbing user, loading, logOut from AuthContext
  const { user, loading, logOut } = useContext(authContext);

  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex rounded-full items-center gap-2">
        {/* User Information showing Conditionaly */}
        {user && !loading && (
          <div>
            <img
              className="rounded-full"
              src={user.photoURL}
              width={40}
              height={40}
              alt={user.displayName}
              referrerPolicy="no-referrer"
            />
            <h2>Hi, {user.displayName}</h2>
          </div>
        )}
      </div>

      {/* Showing Navigaton conditionaly if user is loggedIn */}
      {user && !loading && (
        <nav className="flex items-center gap-4">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger" onClick={logOut}>
              Sign out
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
