//라이브러리 없이 라우터(Router) 만들기

import React, { useState, useEffect } from "react";

// 페이지
const Home = () => <div>Home 페이지입니다.</div>;
const About = () => <div>About 페이지입니다.</div>;
const Portfolio = () => <div>Portfolio 페이지입니다.</div>;
const Skill = () => <div>Skill 페이지입니다.</div>;
const Contact = () => <div>Contact 페이지입니다.</div>;
const ErrorPage = () => <div>404 페이지를 찾을 수 없습니다.</div>;

const RouteTest = () => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState(null, "", path);
    setRoute(path);
  };

  let content;

  if (route === "/") {
    content = <Home />;
  } else if (route === "/about") {
    content = <About />;
  } else if (route === "/portfolio") {
    content = <Portfolio />;
  } else if (route === "/skill") {
    content = <Skill />;
  } else if (route === "/contact") {
    content = <Contact />;
  } else {
    content = <ErrorPage />;
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
          <li>
            <button onClick={() => navigate("/about")}>About</button>
          </li>
          <li>
            <button onClick={() => navigate("/portfolio")}>Portfolio</button>
          </li>
          <li>
            <button onClick={() => navigate("/skill")}>Skill</button>
          </li>
          <li>
            <button onClick={() => navigate("/contact")}>Contact</button>
          </li>
        </ul>
      </nav>
      {content}
    </div>
  );
};

export default RouteTest;
