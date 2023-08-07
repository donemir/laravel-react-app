import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { PictureAsPdf } from "@mui/icons-material";

const FormShowPage = ({ auth, formData, formId }) => {
    // const handleDownloadPDF = () => {
    //     // Replace "form_id" with the actual ID of the form you want to download
    //     window.open(`/forms/generate-pdf/${formId}`, "_blank");
    // };

    return (
        <DashboardLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Form Details
                </h2>
            }
        >
            <div>
                <div className="mx-auto sm:px-6 lg:px-8">
                    {formData ? (
                        <div className="bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h1 className="text-2xl font-semibold mb-4 bg-gray-500 text-white py-2 px-4 rounded-sm">
                                    Personal Information
                                </h1>
                                <p className="mb-2">
                                    First Name: {formData.firstName || "N/A"}
                                </p>
                                <p className="mb-2">
                                    Last Name: {formData.lastName || "N/A"}
                                </p>
                                <p className="mb-2">
                                    Email Address:{" "}
                                    {formData.emailAddress || "N/A"}
                                </p>
                                {/* Add other personal information fields similarly */}
                            </div>

                            {/* Add other sections with similar styling */}
                            {formData.hasDentalInsurance && (
                                <div className="px-4 py-5 sm:px-6 mb-4">
                                    <h1 className="text-2xl font-semibold mb-4 bg-gray-500 text-white py-2 px-4 rounded-sm">
                                        Primary Insurance Information
                                    </h1>
                                    <p className="mb-2">
                                        Secondary Insurance Provider:{" "}
                                        {formData.primaryInsuranceProvider ||
                                            "N/A"}
                                    </p>
                                    <p className="mb-2">
                                        Secondary Policy Holder's Name:{" "}
                                        {formData.primaryPolicyHolderName ||
                                            "N/A"}
                                    </p>
                                    {/* Add other secondary insurance information fields similarly */}
                                </div>
                            )}

                            <div className="px-4 py-5 sm:px-6">
                                <h1 className="text-2xl font-semibold mb-4 bg-gray-500 text-white py-2 px-4 rounded-sm">
                                    Signature Section
                                </h1>
                                <p className="mb-2">
                                    Print Name: {formData.printName || "N/A"}
                                </p>
                                {formData.signature ? (
                                    <img
                                        src={`${window.location.origin}/signatures/${formData.signature}`}
                                        alt="Signature"
                                        className=""
                                    />
                                ) : (
                                    <p>No signature available</p>
                                )}
                            </div>

                            <div className="flex justify-center p-4">
                                <a
                                    href={`/forms/generate-pdf/${formId}`}
                                    target="_blank"
                                    className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
                                    download={`${formData.firstName}_Form.pdf`}
                                >
                                    <PictureAsPdf className="w-6 h-6 mr-2" />
                                    Download PDF
                                </a>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FormShowPage;
