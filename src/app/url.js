export default () => {
  if (process.env.NODE_ENV === "development") return "http://localhost:5555";
  else if (process.env.NODE_ENV === "uat") return "http://cloud.firemisc.com";
  else return "http://cloud.firemisc.com";
};
