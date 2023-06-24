import { Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <h1>This is the Root Page</h1>
            <div>
                <Outlet />
            </div>
        </>
    );
}
