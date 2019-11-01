export default (roleA, roleB) => {
  switch (roleB) {
    case "User":
      if (roleA !== "User") return 1;
      else if (roleA === "User") return 0;
      else return -1;
    case "Agent":
      if (roleA !== "User" && roleA !== "Agent") return 1;
      else if (roleA === "Agent") return 0;
      else return -1;
    case "Supervisor":
      if (roleA !== "User" && roleA !== "Agent" && roleA !== "Supervisor")
        return 1;
      else if (roleA === "Supervisor") return 0;
      else return -1;
    case "Leader":
      if (
        roleA !== "User" &&
        roleA !== "Agent" &&
        roleA !== "Supervisor" &&
        roleA !== "Leader"
      )
        return 1;
      else if (roleA === "Leader") return 0;
      else return -1;
    case "Business":
      if (
        roleA !== "User" &&
        roleA !== "Agent" &&
        roleA !== "Supervisor" &&
        roleA !== "Leader" &&
        roleA !== "Business"
      )
        return 1;
      else if (roleA === "Business") return 0;
      else return -1;
    case "Administrator":
      if (roleA === "Administrator") return 0;
      return -1;
    default:
      break;
  }
};
