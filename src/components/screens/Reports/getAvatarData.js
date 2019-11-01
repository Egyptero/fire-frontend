export default channel => {
  let img = null;
  let color = null;
  switch (channel) {
    case "facebook":
      img = "./imgs/facebookwhitelogo.png";
      color = "#3b5998";
      break;
    case "twitter":
      img = "./imgs/twitterwhitelogo.png";
      color = "#00acee";
      break;
    case "instagram":
      img = "./imgs/instagramwhitelogo.png";
      color = "#7f1734";
      break;
    case "call":
      img = "./imgs/phonewhitelogo.png";
      color = "#548235";
      break;
    case "chat":
      img = "./imgs/chatwhitelogo.png";
      color = "#203864";
      break;
    case "email":
      img = "./imgs/emailwhitelogo.png";
      color = "#7c9cb0";
      break;
    case "whatsapp":
      img = "./imgs/whatsappwhitelogo.png";
      color = "#25d366";
      break;
    case "project":
      img = "./imgs/projectwhitelogo.png";
      color = "#468078";
      break;
    default:
      break;
  }
  if (img && color) {
    return {
      img,
      color
    };
  }
};
