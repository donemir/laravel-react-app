import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <DashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <p>content of dashboard</p>
        </DashboardLayout>
    );
}
