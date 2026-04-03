import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Star, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export default function FeedbackModal({ isOpen, onClose, onSubmit }: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={24} />
          </button>

          <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
            🙏 Was this recommendation helpful?
          </h4>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
            Your feedback helps train our AI engine to provide better matches.
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-2 rounded-xl transition-all ${
                  rating >= star
                    ? "bg-orange-100 dark:bg-orange-900/30 text-orange-500"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                }`}
              >
                <Star size={28} fill={rating >= star ? "currentColor" : "none"} />
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your thoughts (optional)"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all mb-6 resize-none"
          />

          <div className="flex gap-3">
            <button
              onClick={() => {
                if (rating > 0) onSubmit(rating, comment);
              }}
              disabled={rating === 0}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white py-3 rounded-xl font-bold transition-colors"
            >
              Submit Feedback
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold transition-colors"
            >
              Skip
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
