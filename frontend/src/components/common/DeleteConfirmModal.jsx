import { useState } from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName = 'this item', isDeleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center animate-fadeIn p-4">
      <div 
        className="bg-[#121214] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-200 transition-colors rounded-full hover:bg-white/5 disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-500/20">
            <AlertTriangle className="w-8 h-8 text-rose-500" />
          </div>
          
          <h3 id="delete-modal-title" className="text-xl font-bold text-neutral-50 mb-2">
            Confirm Deletion
          </h3>
          
          <p className="text-sm text-neutral-400 mb-8 max-w-xs">
            Are you sure you want to delete <span className="font-semibold text-neutral-200">{itemName}</span>? This action cannot be undone and will permanently remove all associated data.
          </p>

          <div className="flex w-full gap-3">
            <button 
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-neutral-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-4 py-3 bg-rose-500 hover:bg-rose-600 rounded-xl text-sm font-bold text-white transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:shadow-[0_0_25px_rgba(244,63,94,0.5)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
