const Setting = ({ tab }) => {
  const renderContent = () => {
    switch (tab) {
      case 'member':
        return <p> <strong>회원 정보</strong> 관련 내용을 여기에 표시합니다.</p>
      case 'policy':
        return <div>
                  <h2>약관 및 정책</h2>
                  <h3 style={{marginTop: '4rem'}}>서비스 이용약관</h3>
                  <p><strong>제1조 (목적)</strong></p>
                  <p>본 약관은 [SELFIT] (이하 "selfit")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                  <p><strong>제2조 (서비스 내용)</strong></p>
                  <p>회사는 사용자가 업로드한 사진을 기반으로 AI 기술을 이용하여 3D 아바타를 생성하고, 옷 사진을 기반으로 가상 피팅을 제공하는 서비스를 제공합니다.</p>
                  <p><strong>제3조 (이용자의 의무)</strong></p>
                  <p>1. 이용자는 타인의 정보를 도용하거나 부정한 목적으로 서비스를 이용할 수 없습니다.</p>
                  <p>2. 저작권 등 제3자의 권리를 침해하는 사진이나 데이터를 업로드해서는 안 됩니다.</p>
                  <p><strong>제4조 (서비스 이용의 제한)</strong></p>
                  <p>회사는 다음과 같은 경우 사전 통지 없이 이용을 제한할 수 있습니다:</p>
                  <li>불법 콘텐츠 또는 부적절한 이미지 업로드</li>
                  <li>비정상적인 접근이나 시스템 해킹 시도</li>
                  <p><strong>제5조 (저작권)</strong></p>
                  <p>이용자가 등록한 사진 및 의류 이미지는 해당 이용자에게 저작권이 있으며, AI 처리된 결과물의 저작권은 회사에 귀속될 수 있습니다. 단, 별도 고지 시 해당 조건을 따릅니다.</p>

                  <h3>개인정보 처리 방침</h3>
                  <p><strong>1. 수집 항목 및 목적</strong></p>
                  <li>프로필 사진: 3D 아바타 생성을 위해 사용</li>
                  <li>의류 이미지: 가상 피팅 결과 생성</li>
                  <li>이메일, 사용자명 등: 계정 관리, 알림 전송</li>

                  <p><strong>2. 보유 및 이용 기간</strong></p>
                  <li>회원 탈퇴 시 즉시 파기</li>
                  <li>단, 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관</li>

                  <p><strong>3. 제3자 제공</strong></p>
                  <p>원칙적으로 수집한 정보를 외부에 제공하지 않으며, 아래의 경우 예외로 합니다.</p>
                  <li>수사기관의 법적 요청</li>
                  <li>AI 모델 학습 목적에 대한 사전 동의가 있는 경우</li>

                  <p><strong>4. 사용자 권리</strong></p>
                  <li>언제든지 본인의 정보를 열람, 수정, 삭제 요청 가능</li>
                  <li>처리 정지 및 동의 철회 가능</li>

                  <h3>오픈 라이선스</h3>
                  <p>본 서비스는 다음의 오픈소스 및 라이선스 기반 기술을 사용하고 있습니다.각 기술은 해당 라이선스 조건에 따라 사용됩니다:</p>
                  <li>React.js – MIT License</li>
                </div>
      case 'report':
        return <div>
                  <h2>오류 신고</h2>
                  <textarea style={{width:'90%',height: '50vh'}} placeholder='서비스 사용 중 불편했던 점을 작성해주세요.'/>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', marginRight:'8rem' }}>
                    <button style={{background: 'black', color:'white',height: '56px',width: '170px'}}
                            onClick={() => alert('제출되었습니다')}>
                              제출하기
                    </button>
                  </div>
              </div>
      default:
        return <p>메뉴를 선택해주세요.</p>
    }
  }

  return (
    <div style={{
      padding: '2rem',
      flex: 1,
      minHeight: '100vh',
      backgroundColor: '#fafafa',
      boxSizing: 'border-box',
      height: '100vh', 
      overflowY: 'auto', 

    }}>
      <div  style={{ width: '100%' }}>
        {renderContent()}
      </div>
    </div>
  )
}

export default Setting
