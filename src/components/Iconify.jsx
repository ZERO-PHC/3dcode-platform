import { Icon } from "@iconify/react";
import React from "react";

export default function Iconify(props) {
    return <Icon height={props.size} color={props.color} icon={props.icon} />;
  
}
