import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import getCroppedImg from "@utils/cropImage";
import { Camera, Trash2 } from "lucide-react";
import ConfirmModal from "@modals/ConfirmModal";

export default function AvatarEditorModal({ file, onClose, onSave, onDelete, currentPhotoURL }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleFileUpload = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(newFile);
    }
  };

  const handleCropComplete = useCallback((_, cropped) => {
    setCroppedAreaPixels(cropped);
  }, []);

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setLoading(true);
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const compressed = await imageCompression(blob, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 512,
        useWebWorker: true,
      });
  
      // ✅ wait until upload completed
      await onSave(compressed);
    } catch (err) {
      console.error("❌ Avatar crop failed:", err);
    } finally {
      setLoading(false); // ✅ gerçekten en sona alındı
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4">
        {imageSrc ? (
          <div className="relative w-full h-64 bg-gray-200 rounded-md overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </div>
        ) : (
          <div className="text-center">
            <img
              src={currentPhotoURL || "/cat_logo.png"}
              alt="Current Avatar"
              className="mx-auto w-24 h-24 rounded-full object-cover border"
            />
            <label className="mt-4 inline-flex items-center gap-2 cursor-pointer text-blue-600">
              <Camera size={18} /> Upload New
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition"
          >
            <Trash2 size={16} /> Delete
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition"
            >
              Cancel
            </button>
            {imageSrc && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>

        {/* 🔒 Confirm Modal for Delete */}
        <ConfirmModal
          isOpen={showConfirmDelete}
          title="Delete Avatar"
          message="Are you sure you want to delete your avatar? This action cannot be undone."
          onCancel={() => setShowConfirmDelete(false)}
          onConfirm={() => {
            setShowConfirmDelete(false);
            onDelete();
          }}
        />
      </div>
    </div>
  );
}