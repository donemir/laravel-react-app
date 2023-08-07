<?php 

use Illuminate\Support\Facades\Storage;
use App\Models\TemporaryFile;

function moveTemporaryFileToFolder(TemporaryFile $tempFile, $newFolder)
{
    // Retrieve the folder and hashed filename from the database
    $folder = $tempFile->folder;
    $file = $tempFile->file;
    $originalFilePath = $folder . '/' . $file;
 
    // Generate the new path by concatenating the new folder and the original filename
    $newPath = $newFolder . '/' . $file;

    // Move the file to the new folder using the Storage facade
    Storage::move($originalFilePath, $newPath);

    // Delete the entry from the temporary upload table
    $tempFile->delete();

    // Return the new path
    return $newPath;
   
}

if (!function_exists('storeSignature')) {
    function storeSignature($signature)
    {
        $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $signature));

        // Generate a unique filename for the image (you can use any logic for generating a unique name)
        $originalFilename = 'signature_' . time() . '.png'; // Original filename with timestamp

        // Get the file extension from the signature (assuming it's a PNG image)
        $extension = 'png';

        // Hash the filename using Laravel's hash function
        $hashedFilename = hash('sha256', $originalFilename) . '.' . $extension;

        // Specify the folder to store the image (create the folder if it doesn't exist)
        $folder = 'signatures'; // Change 'signatures' to the desired folder name

        // Save the image to the specified folder with the hashed filename
        Storage::put($folder . '/' . $hashedFilename, $imageData);

        // Return the hashed filename to use it if needed
        return $hashedFilename;
    }
}