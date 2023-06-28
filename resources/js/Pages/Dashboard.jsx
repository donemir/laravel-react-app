import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap">
                    {/* Left Sidebar */}
                    <div className="bg-gray-200 p-4 w-full sm:w-1/5">
                        {/* Sidebar content */}
                        <h3 className="font-semibold text-gray-800">
                            Left Sidebar
                        </h3>
                        {/* Add your left sidebar content here */}
                    </div>

                    {/* Main Content */}
                    <div className="bg-white overflow-hidden shadow-sm p-6 w-full sm:w-3/5">
                        <h3 className="font-semibold text-gray-900">
                            Main Content
                        </h3>
                        <p>You're logged in!</p>
                        {/* Add your main content here */}
                    </div>

                    {/* Right Sidebar */}
                    <div className="bg-gray-200 p-4 w-full sm:w-1/5">
                        {/* Sidebar content */}
                        <h3 className="font-semibold text-gray-800">
                            Right Sidebar
                        </h3>
                        {/* Add your right sidebar content here */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
