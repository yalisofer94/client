import { createContext } from "react";

const UserContext = createContext({
    userName: "en",
    setUserName: () =>{},
    userId: 1,
    setUserId: () =>{}
});
export default UserContext;