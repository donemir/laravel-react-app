<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FormSubmissionNotification extends Notification
{
    use Queueable;

    public $formData;
    public $pdf;
    /**
     * Create a new notification instance.
     */
    public function __construct($formData, $pdf)
    {
        $this->formData = $formData;
        $this->pdf = $pdf;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $fileName = 'form_submission.pdf';

        return (new MailMessage)
            ->markdown('notifications.form_submission')
            ->attachData($this->pdf->output(), $fileName, ['mime' => 'application/pdf']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
