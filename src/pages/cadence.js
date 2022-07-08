import MagicSchoolModal from "../sections/MagicSchoolModal";
import { CadencePageData } from "../../texts-data/cadencePageDate";

import NavbarNoAddress from "../components/NavbarNoAdress";
import { useRouter } from "next/router";


const Cadence = () => {

    const router = useRouter()

    const redirect = () => {
        router.push('/', undefined, { shallow: true })
    }
    return (
        <>
            <NavbarNoAddress />
            <MagicSchoolModal 
            data={CadencePageData} 
            nextApp="Samplers App" 
            path={"/"}
            pathFn={redirect}
            />
        </>
    )
}

export default Cadence;