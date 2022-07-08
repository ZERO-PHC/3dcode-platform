import MagicSchoolModal from '../sections/MagicSchoolModal';
import { LoginPageData } from '../../texts-data/loginPageData';

const LearnLoginComp = ({loginFn, setLearnComp}) => {
    return (
        <>
            <MagicSchoolModal 
            data={LoginPageData} 
            nextApp="Login" 
            pathFn={loginFn} 
            path={""}
            setLearnComp={setLearnComp}
            />
        </>
    )
}

export default LearnLoginComp;