import joint from "jointjs/index";

export default (x, y) => {
  return new joint.shapes.standard.Rectangle({
    root: {
      title: "Execute"
    },
    position: { x: x, y: y },
    size: { width: 80, height: 60 },
    attrs: {
      body: {
        fill: "#9E9E9E", //EFE5B0
        stroke: "#666262",
        filter: {
          name: "dropShadow",
          args: {
            dx: 2,
            dy: 2,
            blur: 3,
          },
        },

      },
      bodyText: {
        text: "Execute",
        fill: "#FFFFFF",
        function: `var func= async (interaction,save) => {
/*
  * interaction is the running interaction. You can read the following
  * 1- attached 
  * 2- data
  * 3- fromAddress
  * 4- toAddress
  * 5- ani
  * 6- dnis
  * 7- dialNumber
  * 8- skillgroupId
  * 9- typeId
  * 10- stage
  * You can updated attached or data or any parameter by just setting its value. More details could be found in APIs documents
  * You can save the interaction by doing callback "save(interaction)" and it will be saved to the DB automatically.
  *  await save(interaction);
  */
};`
      }
    }
  });
};
