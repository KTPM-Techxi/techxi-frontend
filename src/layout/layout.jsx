import NavigationBar from "./navbar";

const Layout = ({ children }) => {
    return (
        <div>
            <div className="relative">
                <NavigationBar/>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;