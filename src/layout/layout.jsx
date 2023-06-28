import NavigationBar from "./navbar";

const Layout = ({ children }) => {
    return (
        <div>
            <>
                <NavigationBar/>
                <main>
                    {children}
                </main>
            </>
        </div>
    );
};

export default Layout;