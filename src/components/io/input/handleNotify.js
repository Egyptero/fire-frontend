import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

export default (ref, data) => {
  // console.log("New notification message",ref.state.myTeams);
  // console.log("New notification message",data.users);
  let myTeams = [...ref.state.myTeams];

  console.log("my teams as is",myTeams);
  if(data.users.length > 0) {
      data.users.forEach(user => {
        // console.log("Trying to find user",user);
          myTeams.map((teammember, index) => {
            if (
              JSON.stringify(teammember._id) ===
              JSON.stringify(user._id)
            )         
            // console.log("user will be updated and name",user.firstname);   
            myTeams.splice(index, 1);
          });
          myTeams.push(user);
      });
      // console.log("My teams now",myTeams);
      ref.handleMyTeamsListLoad(myTeams)
  }
};
