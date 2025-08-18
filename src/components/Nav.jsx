import { Link, useLocation } from "react-router-dom";
import Topics from "./Topics";
import { useEffect, useState } from "react";

function Nav() {
  const[showDocked, setShowDocked] = useState(false)
  const {pathname} = useLocation();

  useEffect(()=>{
    const anchor = document.getElementById("topics-anchor");
    if (!anchor) return;

    const obs = new IntersectionObserver(([entry]) => {
      setShowDocked(!entry.isIntersecting);
    }, 
    { rootMargin: "0px", threshold: 0 }
  );
    obs.observe(anchor)
    return () => obs.disconnect();
  }, [pathname]);


  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          <Link to={`/`} className="inline-flex items-center gap-2 flex-none">
            <span className="text-xl font-extrabold text-blue-600">NC News</span>
          </Link>

          <div className="flex-1 min-w-0">
            {showDocked && <Topics variant="docked" />}
          </div>
          
        </div>
        
      </div>
    </nav>
  );
}
export default Nav;
