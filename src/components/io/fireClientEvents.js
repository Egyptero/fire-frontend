import handleAcknowledge from "./input/handleAcknowledge";
import handleConnected from "./input/handleConnected";
import handleError from "./input/handleError";
import handleMessage from "./input/handleMessage";
import handleNotify from "./input/handleNotify";

export default (ref) => {
  const { client } = ref.state;
  if (!client) {
    console.log("We should find the client here", client);
    return;
  }
  client.on("Aknowledge", (data) => handleAcknowledge(ref, data));
  client.on("Connected", (data) => handleConnected(ref, data));
  client.on("Error", (data) => handleError(ref, data));
  client.on("Message", (data) => handleMessage(ref, data));
  client.on("disconnect", () => {
    console.log("Client is disconnected");
  });
  client.on("Notify", (data) => handleNotify(ref, data));
};
