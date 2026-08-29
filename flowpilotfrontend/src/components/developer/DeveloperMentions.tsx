import React, { useEffect, useState } from "react";

interface Mention {
  id: number;
  initials: string;
  name: string;
  task: string;
  message: string;
  time: string;
  unread: boolean;
}

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:8080"
}/api/developer/mentions`;

const DeveloperMentions: React.FC = () => {
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [replyOpen, setReplyOpen] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sentReply, setSentReply] = useState<number | null>(null);

  // Fetch mentions from backend
  const fetchMentions = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("jwt") ||
        localStorage.getItem("accessToken");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch mentions. Status: ${response.status}`
        );
      }

      const data: Mention[] = await response.json();

      setMentions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching mentions:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load mentions."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page opens
  useEffect(() => {
    fetchMentions();
  }, []);

  const unreadCount = mentions.filter(
    (mention) => mention.unread
  ).length;

  const openReply = (id: number) => {
    setReplyOpen(id);
    setReplyText("");

    // UI me unread ko false karo
    setMentions((prev) =>
      prev.map((mention) =>
        mention.id === id
          ? { ...mention, unread: false }
          : mention
      )
    );
  };

  const cancelReply = () => {
    setReplyOpen(null);
    setReplyText("");
  };

  const sendReply = (id: number) => {
    if (!replyText.trim()) {
      return;
    }

    /*
     * Abhi backend me reply API nahi banayi hai.
     * Isliye फिलहाल successful message dikhayega.
     *
     * Baad me QA/reply integration ke time
     * actual POST reply API connect karenge.
     */
    setSentReply(id);
    setReplyOpen(null);
    setReplyText("");

    setTimeout(() => {
      setSentReply(null);
    }, 2200);
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-400">
          Loading mentions...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchMentions}
            className="mt-4 rounded-lg border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* Summary */}
      <div className="mb-4 text-sm text-gray-500">
        <span className="font-medium">
          {unreadCount} unread mentions
        </span>{" "}
        · {mentions.length} total
      </div>

      {/* No Mentions */}
      {mentions.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-400">
          No mentions found.
        </div>
      )}

      {/* Mentions */}
      <div className="space-y-3">
        {mentions.map((mention) => (
          <div
            key={mention.id}
            className={`rounded-2xl border bg-white p-5 shadow-[0_3px_15px_rgba(0,0,0,0.04)] transition-all duration-200 ${
              mention.unread
                ? "border-teal-100"
                : "border-gray-100"
            }`}
          >
            <div className="flex items-start gap-3">

              {/* Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-indigo-300 text-xs font-bold text-white">
                {mention.initials}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[13px] font-bold text-gray-900">
                    {mention.name}
                  </span>

                  <span className="text-xs text-gray-400">
                    on
                  </span>

                  <span className="font-mono text-xs text-gray-400">
                    {mention.task}
                  </span>

                  {mention.unread && (
                    <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-600">
                      NEW
                    </span>
                  )}
                </div>

                <p className="mt-2 text-[13px] leading-6 text-gray-700">
                  {mention.message}
                </p>

                {/* Reply */}
                <div className="mt-3">
                  {replyOpen === mention.id ? (
                    <div className="max-w-xl">

                      <textarea
                        autoFocus
                        value={replyText}
                        onChange={(e) =>
                          setReplyText(e.target.value)
                        }
                        placeholder="Write a reply..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                      />

                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            sendReply(mention.id)
                          }
                          className="rounded-lg bg-teal-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-600"
                        >
                          Send
                        </button>

                        <button
                          type="button"
                          onClick={cancelReply}
                          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>

                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        openReply(mention.id)
                      }
                      className="rounded-lg border border-teal-100 bg-white px-4 py-2 text-xs font-semibold text-teal-600 transition hover:bg-teal-50"
                    >
                      Reply
                    </button>
                  )}

                  {sentReply === mention.id && (
                    <span className="ml-3 text-xs font-medium text-emerald-500">
                      Reply sent successfully.
                    </span>
                  )}
                </div>

              </div>

              {/* Time */}
              <div className="shrink-0 text-xs text-gray-400">
                {mention.time}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { DeveloperMentions };
export default DeveloperMentions;