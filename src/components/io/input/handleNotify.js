import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

export default (ref, data) => {
  let myTeams = [...ref.state.myTeams];

  if(data.users.length > 0) {
      data.users.forEach(user => {
          myTeams.map((teammember, index) => {
            if (
              JSON.stringify(teammember._id) ===
              JSON.stringify(user._id)
            )         
            myTeams.splice(index, 1);
          });
          myTeams.push(user);
      });
      ref.handleMyTeamsListLoad(myTeams)
  }
};
