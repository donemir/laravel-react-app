import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdateProfileForm from "./Partials/UpdateProfileForm";

export default function ({ auth, business }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileForm
                            status={status}
                            className="max-w-xl"
                            business={business}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
