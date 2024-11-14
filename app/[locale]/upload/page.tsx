// @/app/upload/page.tsx

import UploadForm from '@/app/components/UploadForm';

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upload Your Kiddush</h1>
      
      <p className="mb-6">
        Please fill out the following form to upload your Kiddush. Your information helps us
        catalogue the various ways Kiddush is said across different regions and observance levels.
      </p>

      {/* Render the Upload Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <UploadForm />
      </div>
    </div>
  );
}
