<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

use App\Http\Requests\UpdateBusinessRequest;
use App\Models\Business;

class BusinessController extends Controller
{
    public function show($slug)
    {
        $business = Business::where('slug', $slug)->first();
        $business_image = $business->user->avatar;
        if ($business) {
            return Inertia::render('Business/Index',[
                'business' => $business,
                'business_image' => $business_image
            ]);
        } else {
            abort(404); // Or handle the case when business is not found
        }
    }
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Business/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'business' => Auth::user()->business
        ]);
    }

    public function update(UpdateBusinessRequest $request): RedirectResponse
    {
        $user = $request->user();
        $business = $user->business;
        
        // If a business is assigned to the user, update it
        if ($business) {
            $business->update($request->validated());
            $business->save();
        }
        // If no business is assigned, create a new one
        else {
            $business = new Business($request->validated());
            $user->business()->save($business);
        }
    
        return Redirect::route('business.edit');
    }
}
