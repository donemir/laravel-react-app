import DashboardLayout from "@/Layouts/DashboardLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateAvatar from "./Partials/UpdateAvatar";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateAvatar className="max-w-xl mx-auto" />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
