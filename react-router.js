import React, { useState, useEffect } from "react";

// 페이지 모음 (Home, About, User, 404Page )
function Home() {
  return <h1>HomePage</h1>;
}
function About() {
  return <h1>About</h1>;
}

function User({ match }) {
  const userId = match.params.id;
  return <h1>ID: {userId}</h1>;
}

function NotFound() {
  return <h1>404 !! 페이지를 찾을 수 없습니다.</h1>;
}
//

function App() {
  // 경로 추적하는 상태 변수
  const [path, setPath] = useState(window.location.pathname);

  // 브라우저 이력이 변경 감지해서 path 상태업데이트
  useEffect(() => {
    const handlePopstate = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  // URL 경로 업데이트, path 상태변경(페이지 리로드하지않음)
  function navigate(to) {
    window.history.pushState(null, "", to);
    setPath(to);
  }

  // 현재 path와 새로운 path 매칭 후 URL 파라미터 추출
  function matchPath(routePath) {
    const currentSegments = path.split("/").filter(Boolean);
    const segments = routePath.split("/").filter(Boolean);

    if (currentSegments.length !== segments.length) {
      return null;
    }

    const params = {};
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      if (segment.startsWith(":")) {
        const paramName = segment.slice(1);
        const paramValue = currentSegments[i];
        params[paramName] = paramValue;
      } else if (segment !== currentSegments[i]) {
        return null;
      }
    }

    return {
      path: routePath,
      params,
    };
  }

  // 컴포넌트와 match 객체를 받아서 컴포넌트를 랜더링
  function renderComponent(Component, match) {
    return <Component match={match} />;
  }

  // path 비교해서 해당하는 route 컴포넌틑 랜더링
  function renderRoute(routePath, Component) {
    const match = matchPath(routePath);
    if (match) {
      return renderComponent(Component, match);
    }
    return null;
  }

  return (
    <div>
      <nav>
        <a href="/" onClick={() => navigate("/")}>
          홈
        </a>
        <a href="/about" onClick={() => navigate("/about")}>
          소개
        </a>
        <a href="/users/123" onClick={() => navigate("/users/123")}>
          사용자
        </a>
      </nav>
      <div>
        {renderRoute("/", Home)}
        {renderRoute("/about", About)}
        {renderRoute("/users/:id", User)}
        {renderRoute("*", NotFound)}
      </div>
    </div>
  );
}

export default App;
