import React from "react";
import GroupList from "./Components/GroupList";
import GroupListForProfile from "./Components/GroupListForProfile";
import AddGroup from "./Components/Dialog/AddGroup";
import RequestBO from "./API/RequestBO"
import ChatroomBO from "./API/ChatroomBO";
import AddChatroomForGroup from "./Components/Dialog/AddChatroom";
import DeleteRequest from "./Components/Dialog/DeleteRequest";
import RequestList from "./Components/RequestList";
import AddRequest from "./Components/Dialog/AddChatroom";


function App() {
  return (
    <div className="App">
      {/*<RequestList/>*/}
      <AddRequest/>
    </div>
  );
}

export default App;
