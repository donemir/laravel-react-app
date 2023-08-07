<?php

namespace App\Listeners;

use PDF;
use App\Events\FormSubmitted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use App\Mail\FormSubmissionEmail;
use App\Notifications\FormSubmissionNotification;

class SendFormSubmissionNotifications implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(FormSubmitted $event): void
    {

    $formData = $event->formData;
    $business = $event->business;

    // Generate the PDF from form data
    $pdf = PDF::loadView('pdf.form-report', ['formData' => $formData,'business'=>$business]);

        // Send confirmation email to the user
    // Mail::to($event->formData['emailAddress'])
    Mail::to('amir.khajedehi@gmail.com')
        ->send(new FormSubmissionEmail($formData, $pdf));

    // Send notification to the recipient
    Notification::route('mail', 'amir.khajedehi@gmail.com')
        ->notify(new FormSubmissionNotification($formData, $pdf));
    }
}
