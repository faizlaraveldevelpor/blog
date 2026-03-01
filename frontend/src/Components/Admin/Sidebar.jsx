import { GoHome } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RiPriceTagLine } from "react-icons/ri";
import { PiArticleThin } from "react-icons/pi";
import { FaRegCommentAlt, FaUsers } from "react-icons/fa";
import { MdOutlineRoundaboutLeft, MdOutlinePrivacyTip } from "react-icons/md";
import { PiTerminalWindowLight } from "react-icons/pi";
import { CiWarning } from "react-icons/ci";
import { HiChevronRight } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ hover, sethover }) {
  const location = useLocation();

  const navSections = [
    {
      title: "Main",
      items: [
        { path: "/admin", icon: GoHome, label: "Dashboard" },
      ]
    },
    {
      title: "Content",
      items: [
        { path: "/All_blogs/admin", icon: PiArticleThin, label: "All Blogs" },
        { path: "/create/blog", icon: IoCreateOutline, label: "Create Blog" },
        { path: "/delete/blog", icon: AiOutlineDelete, label: "Delete Blog" },
        { path: "/all/comments", icon: FaRegCommentAlt, label: "Comments" },
      ]
    },
    {
      title: "Categories",
      items: [
        { path: "/all_cetagories/admin", icon: RiPriceTagLine, label: "All Categories" },
        { path: "/create/cetagory", icon: IoCreateOutline, label: "Create Category" },
        { path: "/delete/cetagory", icon: AiOutlineDelete, label: "Delete Category" },
      ]
    },
    {
      title: "Pages",
      items: [
        { path: "/create/About", icon: MdOutlineRoundaboutLeft, label: "About" },
        { path: "/create/privacy", icon: MdOutlinePrivacyTip, label: "Privacy Policy" },
        { path: "/create/disclamer", icon: CiWarning, label: "Disclaimer" },
        { path: "/create/term", icon: PiTerminalWindowLight, label: "Terms" },
      ]
    },
    {
      title: "Users",
      items: [
        { path: "/users", icon: FaUsers, label: "All Users" },
      ]
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen transition-all duration-300 z-40
        ${hover ? "w-64" : "w-20"}
      `}
      onMouseEnter={() => sethover(true)}
      onMouseLeave={() => sethover(false)}
    >
      <div className="h-full bg-white border-r border-slate-200 flex flex-col shadow-xl">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className={`font-bold text-xl text-brand-primary transition-opacity duration-200 ${hover ? "opacity-100" : "opacity-0 w-0"}`}>
            Thoughtlab
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto cusSc py-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              {hover && (
                <h3 className="px-5 mb-2 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1 px-3">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        ${active 
                          ? "bg-brand-accent text-white shadow-md" 
                          : "text-brand-muted hover:bg-slate-100 hover:text-brand-primary"
                        }
                      `}
                    >
                      <Icon className={`text-xl flex-shrink-0 ${active ? "text-white" : ""}`} />
                      <span className={`font-medium text-sm transition-opacity duration-200 whitespace-nowrap ${hover ? "opacity-100" : "opacity-0 w-0"}`}>
                        {item.label}
                      </span>
                      {hover && active && (
                        <HiChevronRight className="ml-auto text-white" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        {hover && (
          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                <span className="text-brand-primary font-semibold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-primary truncate">Admin</p>
                <p className="text-xs text-brand-muted truncate">admin@thoughtlab.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
