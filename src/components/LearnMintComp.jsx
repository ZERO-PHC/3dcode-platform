import { MintPageData } from "../../texts-data/mintPageData";

import MagicSchoolModal from "../sections/MagicSchoolModal";

const LearnMintComp = ({loginFn, setLearnComp}) => {
    return (
        <MagicSchoolModal 
        data={MintPageData}
        nextApp="Cadence Magic School"
        path={""}
        externalPath={"https://google.com"}
        setLearnComp={setLearnComp}
        />
    );
};

export default LearnMintComp;
