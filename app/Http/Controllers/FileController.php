<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\TemporaryFile;

class FileController extends Controller
{
    public function tempUpload(Request $request)
    {
        $request->validate([
            'files' => 'required|mimes:jpeg,png,pdf|max:2048', // Example: Restricting to JPEG, PNG, and PDF files, with a maximum size of 2MB (2048KB)
        ]);
    
        // Get the file from the request
        $file = $request->file('files');
    
        // Extract the original filename (without extension) for customization
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
    
        // Customize the file name if needed (e.g., appending a timestamp to ensure uniqueness)
        $customFileName = $originalFilename . '_' . time();
    
        // Generate the MD5 hash of the custom file name
        $md5FileName = md5($customFileName);
    
        // Get the file extension from the original file name
        $fileExtension = $file->getClientOriginalExtension();
    
        // Combine the hashed filename and the file extension
        $hashedFileNameWithExtension = $md5FileName . '.' . $fileExtension;
    
        // Specify the folder to store the file (create the folder if it doesn't exist)
        $folder = 'temp_upload'; // Change 'temp_upload' to the desired folder name
    
        // Store the file in the specified folder with the hashed custom filename and the original extension
        $path = $file->storeAs($folder, $hashedFileNameWithExtension);
    
        $file = TemporaryFile::create([
            'folder' => $folder,
            'file' => $hashedFileNameWithExtension,
        ]);
    
        return $file->id;
    }

    public function delete(Request $request)
    {
        $temp_file_id = json_decode($request->getContent());
        $temp_file = TemporaryFile::find($temp_file_id);

        if ($temp_file) {
            // Retrieve the folder and hashed filename from the database
            $folder = $temp_file->folder;
            $file = $temp_file->file;

            
            // Complete file path
            $filePath = $folder . '/' .  $file;
            
            // Now, you can delete the file from the storage
            Storage::delete($filePath);

            // Delete the entry from the temporary upload table
            $temp_file->delete();

            return response()->json(['status' => 'success', 'message' => 'File deleted successfully']);
        }

        // If the file is not found in the temporary upload table
        return response()->json(['status' => 'error', 'message' => 'File not found']);
    }

}