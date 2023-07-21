<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;

use App\Models\User;
use App\Models\Message;

use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function userTest(User $user)
    {
        $user = Auth::user();
        $lastUnreadMessages = $user->lastUnreadMessages()->get();

        return $lastUnreadMessages;
    }
    
    public function index(User $user)
    {
        $users = User::all();

        $messages = Message::whereIn('sender_id', [Auth::id(), $user->id])
            ->whereIn('recipient_id', [Auth::id(), $user->id])
            ->orderBy('created_at')
            ->get();

        return Inertia::render('Messages/Index', [
            'users' => $users,
            'recipient' => $user,
            'user' => Auth::user(),
            'messages' => $messages,
        ]);
    }

    public function fetchMessages(User $user)
    {
        $messages = Message::whereIn('sender_id', [Auth::id(), $user->id])
            ->whereIn('recipient_id', [Auth::id(), $user->id])
            ->orderBy('created_at')
            ->get();
        // Mark messages as seen
        $this->markAsSeen($user->id);
        return response()->json([
            'recipient' => $user,
            'user' => Auth::user(),
            'messages' => $messages,
        ]);
    }

    public function store(Request $request, User $recipient): JsonResponse
    {
        $message = Message::create([
            'sender_id' => Auth::id(),
            'recipient_id' => $recipient->id,
            'content' => $request->input('content'),
            'seen' => null,
        ]);

        broadcast(new \App\Events\MessageSent($message, $recipient))->toOthers();

        $messages = Message::whereIn('sender_id', [Auth::id(), $recipient->id])
            ->whereIn('recipient_id', [Auth::id(), $recipient->id])
            ->orderBy('created_at')
            ->get();

        return response()->json([
            'recipient' => $recipient,
            'user' => Auth::user(),
            'messages' => $messages,
        ]);
    }

    public function markAsSeen(int $senderId): void
    {
        $user = Auth::user();
        $unreadMessages = $user->lastUnreadMessages()->where('sender_id', $senderId)->get();
        $unreadMessageIds = $unreadMessages->pluck('id');
        Message::whereIn('id', $unreadMessageIds)->update(['seen' => true]);
    }
    
}
