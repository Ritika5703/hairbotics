import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";

const SyncUserToDB = () => {
  const { user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
          const payload = {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            userId: user.id,
          };

          console.log("Sending user data to backend:", payload);

          const response = await axios.post(
            "http://localhost:5000/api/users/create-user",
            payload
          );
          console.log("User synced successfully:", response);
        } catch (error) {
          console.error("Error syncing user:", error.response || error);
        }
      }
    };

    syncUser();
  }, [user]);

  return null;
};

export default SyncUserToDB;
