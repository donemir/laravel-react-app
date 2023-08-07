import React, { useState, useRef } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Croppie from "croppie";
import { toast } from "react-toastify";
import "croppie/croppie.css";

export default function UpdateProfileInformation({ className }) {
    const user = usePage().props.auth.user;
    const inputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Track the modal state

    const { data, setData, post, progress, processing, recentlySuccessful } =
        useForm({
            avatar: null, // Set initial value to null
        });

    const [croppieInstance, setCroppieInstance] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);

        if (croppieInstance) {
            croppieInstance.destroy();
        }

        const croppieElement = document.getElementById("croppieContainer");
        const instance = new Croppie(croppieElement, {
            viewport: {
                width: 256,
                height: 256,
                type: "square",
            },
            boundary: {
                width: 300,
                height: 300,
            },
        });

        instance.bind({
            url: imageUrl,
        });

        setCroppieInstance(instance);
    };

    const clearInput = () => {
        if (inputRef.current) {
            inputRef.current.value = null;
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (croppieInstance) {
            croppieInstance.destroy();
            setCroppieInstance(null);
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        if (croppieInstance) {
            const croppedImage = await croppieInstance.result({
                type: "base64",
                size: "viewport",
                format: "jpeg",
            });

            data.avatar = croppedImage;

            await post(route("profile.avatarUpdate"));

            clearInput();
            setData({
                avatar: null,
                previewUrl: null,
            });
            closeModal();
            toast.success("Profile picture updated successfully!");
        }
    };

    return (
        <section className={className}>
            <header className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                    Update Your Avatar
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Add your profile picture.
                </p>
            </header>

            <div className="flex items-center justify-center mt-4">
                {user.avatar && (
                    <img
                        src={`${window.location.origin}/storage/avatars/${user.avatar}`}
                        alt="User Avatar"
                        className="rounded-full w-64 h-64 object-cover"
                    />
                )}
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={openModal}
                    className="text-blue-600 underline cursor-pointer"
                >
                    Change Profile Picture
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg relative">
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 6L6 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6 6L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <input
                                type="file"
                                ref={inputRef}
                                onChange={handleFileChange}
                            />

                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}

                            <div id="croppieContainer"></div>

                            <div className="flex items-center justify-center mt-4">
                                <PrimaryButton disabled={processing}>
                                    Upload
                                </PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enterFrom="opacity-0"
                                    leaveTo="opacity-0"
                                    className="transition ease-in-out"
                                >
                                    <p className="text-sm text-gray-600">
                                        Saved.
                                    </p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
