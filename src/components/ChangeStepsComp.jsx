import Link from "next/link"
import styled from "styled-components"

const ChangeStepsComp = ({step, oneMore, lessOne, finalStep, nextApp, pathFn, path, externalPath, setLearnComp}) => {
    const finalStepFn = () => {
        if(pathFn) pathFn()
        if(setLearnComp) setLearnComp(false)
    }
    return (
        <>
            <Wrapper>
                {step == 0 ? 
                <button onClick={() => oneMore()}> Start </button> :
                <>
                    {step == finalStep ? 
                    <div className="stepsDiv">
                        <button onClick={() => lessOne()}> Previous </button> 
                        <div className="finalStepDiv">
                            <Link href={"/"}><button disabled>Cadence Tests</button></Link> 
                            <Link href={path}><a href={externalPath}><button onClick={() => finalStepFn()}>{nextApp}</button></a></Link>
                        </div> 
                    </div> 
                    :
                    <div className="notFinalStepDiv">
                        <button onClick={() => lessOne()}> Previous </button>
                        <button onClick={() => oneMore()}> Next </button>
                    </div>
                    }
                </>
                }
            </Wrapper>
                <button className="closeBtn" onClick={() => finalStepFn()}>x</button>
        </>
    )
}

export default ChangeStepsComp

const Wrapper = styled.div`
    height: initial !important;
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-self: flex-end;
    margin: 0px auto !important;
    gap: 40px;
    font-family: Poppins;
    font-weight: 800;
    color: #d79b31;
    font-size: 3rem;
    position: absolute;
    bottom: 15px;

    .stepsDiv{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 50%;

        .finalStepDiv{
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: flex-end;

            button{
                margin: 0 5px;
                font-size: 1rem;
                width: 200px;
                height: 50px;
            }

            a{
                display: flex;
                text-decoration: none;
            }
        }
    }
    .notFinalStepDiv{
        width: 50%;
        display: flex;
        justify-content: space-around;  
    }

    button{
        height: 50px;
        width: 150px;
        padding: 10px 20px;
        margin: 0;
        border: none;
        background-color: #d79b31;
        color: black;
        font-weight: 900;
        border-radius: 20px;
        font-size: 1.5rem;

        &:hover{
            cursor: pointer;
        }
    }

    
    .closeBtn{
        position: absolute;
        top: -3px;
        right: 16px;
        background: none;
        color: #d79b31;
        border: none;
        font-size: 30px;
        font-family: 'Poppins';
        font-weight: 900;

        &:hover{
            cursor: pointer;
        }
    }
`