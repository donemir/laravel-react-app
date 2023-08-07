<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Attachment;

class FormSubmissionEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $formData;
    public $pdf;

    /**
     * Create a new message instance.
     */
    public function __construct($formData, $pdf)
    {
        $this->formData = $formData;
        $this->pdf = $pdf;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Form Submission Email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.form_submission',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        // Attach the PDF to the email if it exists
        if ($this->pdf) {
            return [
                Attachment::fromData(fn () => $this->pdf->output(), 'Report.pdf')
                        ->withMime('application/pdf'),
            ];
        }

        return [];
    }
}
