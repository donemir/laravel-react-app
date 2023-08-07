<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\TemporaryFile;
use App\Models\FormData;
use App\Models\Business;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;

use App\Events\FormSubmitted;

use App\Helpers\file_helpers;
use Psy\Formatter\SignatureFormatter;

class FormController extends Controller
{
    public function showMasterForm()
    {
            return Inertia::render('Forms/Master',[
            ]);

    }

    public function showTestForm()
    {
            return Inertia::render('Forms/Test',[
            ]);

    }
    public function showDPPIForm()
    {
            return Inertia::render('Forms/DentalPractice/PatientIntake',[
            ]);

    }

    public function showValidationTest()
    {
            return Inertia::render('Forms/ValidationTest',[
            ]);

    }

    public function submitValidationTest(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3', // Name is required and must be at least 3 characters long
        ]);

        // Check if the validation fails
        // if ($validator->fails()) {
        //     // Redirect back to the form with validation errors
        //     return Redirect::route('form.submitForm')->withErrors($validator);
        // }
        return 'Validation Passed';
    }

    public function submitDPPIForm(Request $request)
    {
        $data = $request->all();
        $jsonData = json_encode($data); // Convert the array to a JSON string
        $jsonObject = json_decode($jsonData); // Convert the JSON string back to an object
    
        // Now you can access the 'signature' property from the object
        $signature = $jsonObject->signature;
    
        $filename = storeSignature($signature);
        $jsonObject->signature = $filename;
        $updatedJsonData = json_encode($jsonObject);

        $formData = new FormData();
        $formData->form_data = $updatedJsonData;
        $formData->save();
        
        // Dispatch the event
        $business = Business::find(1);

        event(new FormSubmitted(json_decode($formData->form_data),$business));

        return response()->json(['data' => $formData, 'business' => $business]);
    }
    public function submitForm(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3', // Name is required and must be at least 3 characters long
            'email' => 'required|email',
            // Add other validation rules for your other form fields
        ]);
    
        // Check if the validation fails
        if ($validator->fails()) {
            // Redirect back to the form with validation errors
            return Redirect::route('form.submitForm')->withErrors($validator);
        }


        // Get the data from the form submission
        // dd($formData);
        $formData = $request->all();

        // Get the base64 image from the form data
        $base64Image = $formData['signature'];
        
        // Decode the base64 image
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
        
        // Generate a unique filename for the image (you can use any logic for generating a unique name)
        $filename = 'signature_' . time() . '.png'; // You can choose the extension based on the image format
        
        // Specify the folder to store the image (create the folder if it doesn't exist)
        $folder = 'signatures'; // Change 'signatures' to the desired folder name
        
        // Save the image to the specified folder
        Storage::put($folder . '/' . $filename, $imageData);
        
        // Optionally, you can store the file path in the database if needed
        // Example: YourModel::create(['signature_path' => $folder . '/' . $filename]);

        // Return a response or perform any other logic you need
        return response()->json(['message' => 'Signature saved successfully']);

        $files = $formData['files'];
        $serverIds = [];
        foreach ($files as $file) {
            $serverIds[] = (int) $file['serverId'];
        }
        $checkFiles = [];

        foreach ($serverIds as $serverId) {
            $tempFile = TemporaryFile::find($serverId);
            $checkFiles[] = $tempFile ? 'yes' : 'no';
        }

               // Array to store new paths for files
       $newPaths = [];
foreach ($serverIds as $serverId) {
     $tempFile = TemporaryFile::find($serverId);



       foreach ($serverIds as $serverId) {
           $tempFile = TemporaryFile::find($serverId);

           if ($tempFile) {
               // Specify the new folder to move the file to (create the folder if it doesn't exist)
               $newFolder = 'new_folder'; // Change 'new_folder' to the desired folder name

               // Move the file and get the new path using the helper function
               $newPath = moveTemporaryFileToFolder($tempFile, $newFolder);

               // Add the new path to the array for the current serverId
               $newPaths[$serverId] = $newPath;
           }
       }
}

// Return the array of new paths as a JSON response
return  $newPaths;
    }
}
