<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormData;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use PDF;

class FormDataController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get the per_page parameter from the request, default to 10 if not provided
            $perPage = $request->query('per_page', 10);

            // Paginate the FormData using the per_page value
            $formDataList = FormData::paginate($perPage);

            if ($request->wantsJson()) {
                // If it's an API request, return a JSON response with the paginated data
                return response()->json($formDataList);
            }

            // If it's a regular web request, render the Inertia view
            return Inertia::render('Data/Forms/Index', [
                'formData' => $formDataList,
            ]);
        } catch (\Exception $e) {
            abort(500, 'An error occurred while fetching the form data.');
        }
    }

    public function show($id)
    {
        $formData = FormData::findOrFail($id);
        if ($formData) {
            $decodedFormData = json_decode($formData->form_data);
            return Inertia::render('Data/Forms/Show',[
                'formData' => $decodedFormData,
                'formId' => $id,
            ]);
        } else {
            abort(404); // Or handle the case when business is not found
        }
    }

    public function generatePDF($id)
{
    // Replace 'Form' with the actual model name of your form
    $formData = FormData::findOrFail($id);
    $formData = json_decode($formData->form_data);

    // Replace 'form-pdf' with the actual view file name for generating the PDF
    $pdf = PDF::loadView('pdf/form-report', compact('formData'));

    // You can customize the PDF name and headers if needed
    return $pdf->download("{$formData->firstName}_Form.pdf");
}
}
