import React, { createContext, useContext } from "react";
import { useRive, useStateMachineInput } from "rive-react";

export const AnimationContext = createContext({});

export const useAnimation = () => useContext(AnimationContext);

export default function AnimationProvider({ children }) {
  const STATE_MACHINE_NAME = "progress_state_machine";
  const INPUT_NAME = "lvl";

  const { RiveComponent, rive } = useRive({
    src: "/progress_animation.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });

  const levelOneInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  );

  const handleCompletedLevel = (lvl) => {
    levelOneInput.value = parseInt(lvl);
  };

  const RiveComp = <RiveComponent />;

  const value = { RiveComp, handleCompletedLevel };
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
