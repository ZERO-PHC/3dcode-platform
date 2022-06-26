import MagicSchoolModal from "../sections/MagicSchoolModal";
import { CadencePageData } from "../../texts-data/cadencePageDate";

import NavbarNoAddress from "../components/NavbarNoAdress";


const Cadence = () => {
    return (
        <>
            <NavbarNoAddress />
            <MagicSchoolModal data={CadencePageData} nextApp="Samplers App" path={"/"}/>
        </>
    )
}

export default Cadence;