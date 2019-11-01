import socket from "socket.io-client";
import startFireClient from "../components/io/fireClientEvents";
import startPhoneClient from "../components/phone/startPhoneClient";
import url from "./url";

export default (ref, data) => {
  let { client } = ref.state;
  if (!client && data.user.odi) client = socket(url());
  ref.setState({
    authenticated: data.user.accountStatus === "Active",
    client: client,
    user: data.user,
    token: data.token,
    screen: data.user.type ? "Dashboard" : "Welcome"
  });
  if (data.user.accountStatus === "Active") {
    startFireClient(ref);
    startPhoneClient(ref);
  }
};
