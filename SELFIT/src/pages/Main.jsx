import mainLogo from "../assets/MainLogo.svg"

function Main({mode, inputValue}) {
    return (
        <div style={{flex: 1, padding: '2rem'}}>
            {mode === 'main' && (
                <div style={{alignItems:"center", justifyContent: 'center', width:"100%", display:"flex", minHeight: '80vh'}}>
                    <img
                        src={mainLogo}
                        width="60%"
                    />
                </div>
            )}

            {mode === 'input' && (
                <>
                    <h1>입력 결과</h1>
                    <p>입력한 값: {inputValue}</p>
                </>
            )}

            {mode !== 'main' && mode !== 'input' && (
                <>
                    <h1>{mode} 모드</h1>
                    <p>아직 구현되지 않은 모드입니다.</p>
                </>
            )}
        </div>
    )
}

export default Main