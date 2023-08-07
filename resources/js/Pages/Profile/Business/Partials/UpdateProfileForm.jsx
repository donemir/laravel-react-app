import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileForm({
    status,
    business,
    className = "",
}) {
    const user = usePage().props.auth.user;
    console.log(business);
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: business.name || "",
            email: business.email || "",
            address: business.address || "",
            phone: business.phone || "",
            slug: business.slug || "",
        });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        patch(route("business.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="businessName" value="Business Name" />

                    <TextInput
                        id="businessName"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoComplete="organization"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        required
                        autoComplete="street-address"
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone" />

                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        required
                        autoComplete="tel"
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>
                <div>
                    <InputLabel htmlFor="slug" value="Slug" />

                    <TextInput
                        id="slug"
                        className="mt-1 block w-full"
                        value={data.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        required
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.slug} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
