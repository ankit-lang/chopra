"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function FeedbackPage() {
      const [rating, setRating] = useState(0);
      const [hoverRating, setHoverRating] = useState(0);
      const [submitted, setSubmitted] = useState(false);
      const [comment, setComment] = useState("");
      const [loading, setLoading] = useState(false);

      // Replace this with your actual Google Review Link
      const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJDUXdqSuxxUcRa6FxjpzGMvk&source=g.page.m._&utm_source=gbp&laa=merchant-review-solicitation,3";

      const handleStarClick = (selectedRating: number) => {
            setRating(selectedRating);

            // 4 or 5 Stars -> Redirect to Google Review
            if (selectedRating >= 4) {
                  window.location.href = GOOGLE_REVIEW_URL;
            }
      };

      const handlePrivateSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);

            try {
                  const res = await fetch("/api/feedback", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ rating, comment }),
                  });

                  if (res.ok) setSubmitted(true);
            } catch (err) {
                  console.error("Submission failed", err);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 font-sans">
                  <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center border border-gray-100">

                        {submitted ? (
                              /* STATE 3: Success Screen */
                              <>
                                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                          <span className="text-green-500 text-xl">✓</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">Thank you!</h2>
                                    <p className="text-gray-500 text-sm">Awesome! Redirecting you to Google. Please share your experience with the community!</p>
                              </>
                        ) : (
                              /* RATING & FORM INTERFACE */
                              <>
                                    {rating > 0 && rating <= 3 ? (
                                          <>
                                                <h2 className="text-xl font-bold text-gray-800 mb-2">We're sorry to hear that!</h2>
                                                <p className="text-gray-500 mb-4 text-sm">How can we improve? Your response will remain completely private.</p>
                                          </>
                                    ) : (
                                          <>
                                                <h1 className="text-2xl font-bold text-gray-800 mb-2">Rate Your Experience</h1>
                                                <p className="text-gray-500 mb-6 text-sm">Your feedback helps us grow!</p>
                                          </>
                                    )}

                                    {/* Stars Row (Always visible until submission) */}
                                    <div className="flex justify-center gap-2 mb-6">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                      key={star}
                                                      type="button"
                                                      onClick={() => handleStarClick(star)}
                                                      onMouseEnter={() => setHoverRating(star)}
                                                      onMouseLeave={() => setHoverRating(0)}
                                                      className="transition-transform duration-150 hover:scale-110 focus:outline-none"
                                                >
                                                      <Star
                                                            size={40}
                                                            className={`stroke-1.5 transition-colors duration-150 ${star <= (hoverRating || rating)
                                                                  ? "fill-amber-400 stroke-amber-500"
                                                                  : "stroke-gray-300 fill-transparent"
                                                                  }`}
                                                      />
                                                </button>
                                          ))}
                                    </div>

                                    {/* STATE 2: Private Feedback Form (Appears conditionally for 1-3 stars) */}
                                    {rating > 0 && rating <= 3 && (
                                          <form onSubmit={handlePrivateSubmit} className="text-left w-full">
                                                <textarea
                                                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none text-gray-700 text-sm mb-4"
                                                      rows={4}
                                                      placeholder="Tell us what went wrong..."
                                                      value={comment}
                                                      onChange={(e) => setComment(e.target.value)}
                                                      required
                                                />
                                                <button
                                                      type="submit"
                                                      disabled={loading}
                                                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 disabled:opacity-50 text-sm"
                                                >
                                                      {loading ? "Submitting..." : "Submit Feedback"}
                                                </button>
                                          </form>
                                    )}
                              </>
                        )}

                  </div>
            </div>
      );
}