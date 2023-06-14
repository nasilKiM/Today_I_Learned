// 실제 zoop zoop 프로젝트에서 사용했던 방식
// form (signup + register 페이지에서 사용)

const preventGoBack = () => {
    history.pushState(null, '', location.href);
    const result = confirm(
        '페이지 이동 시 입력하신 내용이 저장되지 않을 수 있습니다.',
    );
    if (result === true) {
        navigate('/');
    }
};

useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => {
        window.removeEventListener('popstate', preventGoBack);
    };
}, []);

const preventClose = e => {
    e.preventDefault();
    e.returnValue = '';
};

useEffect(() => {
    (() => {
        window.addEventListener('beforeunload', preventClose); 
    })();

    return () => {
        window.removeEventListener('beforeunload', preventClose);
    };
}, []);
