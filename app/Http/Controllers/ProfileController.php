<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

        /**
     * Update the user's profile picture
     */
    public function avatarUpdate(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        
        // Check if avatar data is present
        if ($request->has('avatar')) {
            $avatarData = $request->input('avatar');
            
            // Extract the base64 data and file extension from the avatar data
            list($type, $data) = explode(';', $avatarData);
            list(, $data) = explode(',', $data);
            
            // Generate a unique file name
            $imageName = uniqid() . '_' . time();
            
            // Replace any spaces with '+' in the base64 data
            $image = str_replace(' ', '+', $data);
            
            // Decode the base64 data and store it as an image file
            Storage::disk('public')->put($imageName, base64_decode($image));
            
            // Delete previous avatar if it exists
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            
            // Update the user's avatar
            $user->avatar = $imageName;
            $user->save();
        } else {
            // Handle error when avatar is null
            // You can add your own logic here, such as displaying an error message
            // or redirecting back with an error status
        }
        
        return redirect()->route('profile.edit');
    }
    
    

    

    
    

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
