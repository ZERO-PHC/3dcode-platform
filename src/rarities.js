import commonActive from "../public/common_active.png";
import inactive from "../public/inactive.png";
import rareActive from "../public/rare_active.png";
import legendaryActive from "../public/legendary_active.png";

export const rarities = [
  {
    id: 0,
    label: "common",
    inactiveImg: inactive,
    activeImg: commonActive,
  },
  {
    id: 1,
    label: "rare",
    inactiveImg: inactive,
    activeImg: rareActive,
  },
  {
    id: 2,
    label: "legendary",
    inactiveImg: inactive,
    activeImg: legendaryActive,
  },
];
