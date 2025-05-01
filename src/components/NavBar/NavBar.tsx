import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const { pathname } = useLocation();

    const linkClass = (path: string) =>
        `px-4 py-2 rounded-md font-medium ${
            pathname === path ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
        }`;

    return (
        <nav className="bg-gray-900 px-6 py-4 shadow-md">
            <div className="flex space-x-2">
                <h1 className="text-2xl lg:text-3xl font-bold">Warframe Overview</h1>
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                    Dashboard
                </Link>
                <Link to="/fissures" className={linkClass("/fissures")}>
                    Void Fissures
                </Link>
                <Link to="/tierlist" className={linkClass("/tierlist")}>
                    Tier List
                </Link>

            </div>
        </nav>
    );
};

export default Navbar;
