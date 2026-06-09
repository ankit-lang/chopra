"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function FeedbackPage() {
      const [rating, setRating] = useState(0);
      const [hoverRating, setHoverRating] = useState(0);
      const [submitted, setSubmitted] = useState(false);
      const [comment, setComment] = useState("");

      // Replace this with your actual Google Review Link
      const GOOGLE_REVIEW_URL = "https://www.tripadvisor.in/UserReviewEdit-g188633-d27464805-Chopras_Indian_Restaurant-The_Hague_South_Holland_Province.html";

      const handleStarClick = (selectedRating: number) => {
            setRating(selectedRating);

            // 4 or 5 Stars -> Redirect to Google Review
            if (selectedRating >= 4) {
                  window.location.href = GOOGLE_REVIEW_URL;
            }
      };

      const handlePrivateSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            // Instantly transition to the submitted success screen without an API call
            setSubmitted(true);
      };

      const handleReset = () => {
            // Clears all states to refresh the page back to its original form view
            setRating(0);
            setComment("");
            setSubmitted(false);
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
                                    <p className="text-gray-500 text-sm mb-6">Thank you for your feedback. We’re sorry your experience didn’t fully meet expectations. Your comments are valuable to us and we’ll work on improving. We hope to serve you better on your next visit. 🙏</p>

                                    {/* Button to reset the UI state */}
                                    <button
                                          onClick={handleReset}
                                          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 text-sm"
                                    >
                                          Back to Home
                                    </button>
                              </>
                        ) : (
                              /* RATING & FORM INTERFACE */
                              <>
                                    {rating > 0 && rating <= 3 ? (
                                          <>
                                                <p className="text-gray-500 mb-4 text-sm">Thank you for your feedback. We’re sorry your experience didn’t fully meet expectations. Your comments are valuable to us and we’ll work on improving. We hope to serve you better on your next visit. 🙏</p>
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
                                                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 text-sm"
                                                >
                                                      Submit Feedback
                                                </button>
                                          </form>
                                    )}
                              </>
                        )}

                  </div>
            </div>
      );
}