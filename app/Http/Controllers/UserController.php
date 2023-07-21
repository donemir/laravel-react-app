<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\Message;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function fetchUserData(Request $request):JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'unread_messages' => $user->unreadMessagesCount(),
        ]);
    }

    public function lastUnreadMessages(User $user)
    {
        // Check if the current user ID matches the authenticated user's ID
        if (Auth::id() !== $user->id) {
            abort(403); // Return a 403 Forbidden response if the IDs don't match
        }
    
        $lastUnreadMessages = $user->lastUnreadMessages()
            ->select('id', 'sender_id')
            ->get();
    
        return response()->json($lastUnreadMessages);
    }
}
