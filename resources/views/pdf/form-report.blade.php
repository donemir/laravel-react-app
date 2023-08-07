<!DOCTYPE html>
<html>
<head>
    <title>Form Details PDF</title>
    <style>
        /* Add your custom styles for the PDF content here */
        /* For example: */
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
        }
        h1, h2, h3 {
            color: #333;
            margin-bottom: 20px;
        }
        /* Add more styles as needed */
    </style>
</head>
<body>
    <h1>Form Details</h1>
    {{$business->id}}
    <p>First Name: {{ $formData->firstName }}</p>
    <p>Last Name: {{ $formData->lastName }}</p>
    <p>Email Address: {{ $formData->emailAddress }}</p>
    <!-- Add other form data here -->
</body>
</html>
