export default (app) => {
  if (!app.types) return { channel: "", typeName: "" };
  let channel = null;
  let typeName = null;
  app.types.forEach((type) => {
    if (type._id === app.myInteraction.interaction.typeId) {
      channel = type.channel;
      typeName = type.name;
    }
  });

  return { channel, typeName };
};
