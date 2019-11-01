import { UA } from "sip.js";
import handleTransportCreated from "./input/handleTransportCreated";
import handleOutOfDialogReferRequested from "./input/handleOutOfDialogReferRequested";
import handleInvite from "./input/handleInvite";
import handleMessage from "./input/handleMessage";
import handleRegistered from "./input/handleRegistered";
import handleUnregistered from "./input/handleUnregistered";
import handleRegistrationFailed from "./input/handleRegistrationFailed";
export default ref => {
  let { sipUA, user } = ref.state;
  if (
    !sipUA &&
    user.phone &&
    user.sipServer &&
    user.sipUri &&
    user.sipUserName &&
    user.sipPassword
  ) {
    console.log("Phone: Starting configuration");
    let config = {
      uri: user.sipUserName + "@" + user.sipServer, //1062@cloud.firemisc.com
      transportOptions: {
        wsServers: [user.sipUri] //ws://cloud.firemisc.com:8088/ws
      },
      authorizationUser: user.sipUserName, //1061
      password: user.sipPassword, //1061,
      displayName: user.firstname + " " + user.lastname,
      log: {
        builtinEnabled: false,
        level: "warn"
      },
      //traceSip: true,
      autoStart: true,
      // hackIpInContact: true,
      userAgentString: "firemisc phone ext:" + user.sipUserName
      // stunServers: [
      //   "stun1.l.google.com:19302",
      //   "stun2.l.google.com:19302",
      //   "stun3.l.google.com:19302",
      //   "stun4.l.google.com:19302"
      // ],
      // turnServers: [
      //   {
      //     urls: "turn:numb.viagenie.ca",
      //     password: "muazkh",
      //     username: "webrtc@live.com"
      //   },
      //   {
      //     urls: "turn:192.158.29.39:3478?transport=udp",
      //     password: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      //     username: "28224511:1379330808"
      //   }
      // ]
    };
    try {
      sipUA = new UA(config);
    } catch (error) {
      console.log(error);
      return;
    }

    sipUA.on("transportCreated", transport => {
      handleTransportCreated(ref, transport);
    });
    sipUA.on("outOfDialogReferRequested", referServerContext => {
      handleOutOfDialogReferRequested(ref, referServerContext);
    });
    sipUA.on("invite", session => {
      handleInvite(ref, session);
    });
    sipUA.on("message", message => {
      handleMessage(ref, message);
    });
    sipUA.on("registered", () => {
      handleRegistered(ref);
    });
    sipUA.on("unregistered", (response, cause) => {
      handleUnregistered(ref, response, cause);
    });
    sipUA.on("registrationFailed", (response, cause) => {
      handleRegistrationFailed(ref, response, cause);
    });

    sipUA.start();
    ref.setState({
      sipUA
    });
  }
};
