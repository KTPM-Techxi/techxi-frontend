import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <div className="h-[100vh] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Oops!</h1>
            <p className="">Sorry, looks like you got 404 :\(</p>
        </div>
    );
}
