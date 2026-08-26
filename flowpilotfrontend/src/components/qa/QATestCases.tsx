import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

interface TestCase {
  id: number;
  testId: string;
  title: string;
  type: string;
  linkedTask: string;
  priority: string;
  status: string;
  assignedTo?: string;
  project?: string;
  createdAt?: string;
}

const API_URL = "http://localhost:8080/api/qa/test-cases";

/*
 * Get the JWT that was saved during login.
 *
 * We check the common keys so we don't need to change
 * anything outside the QA section.
 */
const getAuthToken = (): string | null => {
  const possibleKeys = [
    "token",
    "jwt",
    "accessToken",
    "authToken",
    "access_token",
  ];

  for (const key of possibleKeys) {
    const value = localStorage.getItem(key);

    if (value) {
      return value.replace(/^Bearer\s+/i, "");
    }
  }

  /*
   * In case your application stores the token
   * inside a user/auth object.
   */
  const possibleObjects = ["user", "currentUser", "auth", "userData"];

  for (const key of possibleObjects) {
    const value = localStorage.getItem(key);

    if (!value) continue;

    try {
      const parsed = JSON.parse(value);

      const token =
        parsed?.token ||
        parsed?.jwt ||
        parsed?.accessToken ||
        parsed?.access_token;

      if (token) {
        return String(token).replace(/^Bearer\s+/i, "");
      }
    } catch {
      // Ignore invalid JSON and continue checking.
    }
  }

  return null;
};

const getAxiosConfig = () => {
  const token = getAuthToken();

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

const QATestCases: React.FC = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  /*
   * GET TEST CASES
   */
  const loadTestCases = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<TestCase[]>(
        API_URL,
        getAxiosConfig()
      );

      setTestCases(response.data || []);
    } catch (err: any) {
      console.error("Failed to load test cases:", err);

      if (err?.response?.status === 401) {
        setError("Authentication required. Please login again.");
      } else if (err?.response?.status === 403) {
        setError(
          "Access denied. Your login session may have expired. Please login again."
        );
      } else {
        setError("Failed to load test cases.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * LOAD WHEN PAGE OPENS
   */
  useEffect(() => {
    loadTestCases();
  }, [loadTestCases]);

  /*
   * UPDATE STATUS
   */
  const updateStatus = async (
    id: number,
    status: "Passed" | "Failed"
  ) => {
    try {
      setUpdatingId(id);
      setError("");

      await axios.put(
        `${API_URL}/${id}/status`,
        {
          status,
        },
        getAxiosConfig()
      );

      /*
       * Update the table immediately instead of waiting
       * for another page refresh.
       */
      setTestCases((current) =>
        current.map((testCase) =>
          testCase.id === id
            ? {
                ...testCase,
                status,
              }
            : testCase
        )
      );
    } catch (err: any) {
      console.error("Failed to update test case:", err);

      if (err?.response?.status === 401) {
        setError("Authentication required. Please login again.");
      } else if (err?.response?.status === 403) {
        setError(
          "Access denied. Your login session may have expired. Please login again."
        );
      } else {
        setError("Failed to update test case status.");
      }
    } finally {
      setUpdatingId(null);
    }
  };

  /*
   * PRIORITY STYLE
   */
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-[#fff0f0] text-[#ff3b3b]";

      case "Medium":
        return "bg-[#fff7e8] text-[#e99a00]";

      case "Low":
        return "bg-[#eef7ff] text-[#4388d8]";

      default:
        return "bg-[#f4f6f8] text-[#657184]";
    }
  };

  /*
   * STATUS STYLE
   */
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Passed":
        return "bg-[#eafaf2] text-[#20c978]";

      case "In Testing":
        return "bg-[#fff6e7] text-[#e99a00]";

      case "Failed":
        return "bg-[#fff0f0] text-[#ff3b3b]";

      case "Pending":
      default:
        return "bg-[#f4f6f8] text-[#9aa8bb]";
    }
  };

  /*
   * FORMAT DATE
   */
  const formatDate = (createdAt?: string) => {
    if (!createdAt) {
      return "-";
    }

    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full">
      {/* ERROR MESSAGE */}

      {error && (
        <div className="mb-[12px] rounded-[6px] border border-[#ffc9c9] bg-[#fff4f4] px-[12px] py-[8px] text-[9px] font-[500] text-[#ff4b4b]">
          {error}
        </div>
      )}

      {/* ============================================================
          DESKTOP TABLE
      ============================================================ */}

      <div className="hidden md:block w-full overflow-x-auto">
        <div
          className="
            min-w-[1050px]
            bg-white
            border-b
            border-[#e5e7eb]
            shadow-sm
            overflow-hidden
          "
        >
          {/* TABLE HEADER */}

          <div
            className="
              grid
              grid-cols-[110px_minmax(300px,1fr)_120px_130px_110px_120px_100px_95px]
              items-center
              h-[40px]
              px-[12px]
              border-b
              border-[#e5e7eb]
              bg-white
            "
          >
            {[
              "TEST ID",
              "TEST TITLE",
              "TYPE",
              "LINKED TASK",
              "PRIORITY",
              "STATUS",
              "DATE",
              "ACTION",
            ].map((heading) => (
              <div
                key={heading}
                className="
                  text-[9px]
                  font-[600]
                  uppercase
                  tracking-[0.06em]
                  text-[#7c8796]
                "
              >
                {heading}
              </div>
            ))}
          </div>

          {/* LOADING */}

          {loading && (
            <div className="py-[40px] text-center text-[10px] text-[#9aa8bb]">
              Loading test cases...
            </div>
          )}

          {/* EMPTY */}

          {!loading && testCases.length === 0 && !error && (
            <div className="py-[40px] text-center text-[10px] text-[#9aa8bb]">
              No test cases found.
            </div>
          )}

          {/* TABLE ROWS */}

          {!loading &&
            testCases.map((testCase, index) => (
              <div
                key={testCase.id}
                className={`
                  grid
                  grid-cols-[110px_minmax(300px,1fr)_120px_130px_110px_120px_100px_95px]
                  items-center
                  h-[50px]
                  px-[12px]
                  bg-white
                  ${
                    index !== testCases.length - 1
                      ? "border-b border-[#eeeeee]"
                      : ""
                  }
                `}
              >
                {/* TEST ID */}

                <div
                  className="
                    text-[9px]
                    font-[400]
                    leading-[12px]
                    text-[#8d98a8]
                  "
                >
                  {testCase.testId}
                </div>

                {/* TITLE */}

                <div className="min-w-0 pr-[12px]">
                  <p
                    className="
                      text-[11px]
                      font-[600]
                      leading-[14px]
                      text-[#111827]
                      truncate
                    "
                  >
                    {testCase.title}
                  </p>
                </div>

                {/* TYPE */}

                <div>
                  <span
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-[6px]
                      bg-[#f4f6f8]
                      px-[8px]
                      py-[4px]
                      text-[9px]
                      font-[500]
                      leading-[10px]
                      text-[#657184]
                    "
                  >
                    {testCase.type || "-"}
                  </span>
                </div>

                {/* LINKED TASK */}

                <div
                  className="
                    text-[9px]
                    font-[400]
                    leading-[12px]
                    text-[#8d98a8]
                  "
                >
                  {testCase.linkedTask || "-"}
                </div>

                {/* PRIORITY */}

                <div>
                  <span
                    className={`
                      inline-flex
                      items-center
                      justify-center
                      rounded-[6px]
                      px-[8px]
                      py-[4px]
                      text-[9px]
                      font-[600]
                      leading-[10px]
                      ${getPriorityClass(testCase.priority)}
                    `}
                  >
                    {testCase.priority || "-"}
                  </span>
                </div>

                {/* STATUS */}

                <div>
                  <span
                    className={`
                      inline-flex
                      items-center
                      justify-center
                      rounded-[6px]
                      px-[8px]
                      py-[4px]
                      text-[9px]
                      font-[600]
                      leading-[10px]
                      ${getStatusClass(testCase.status)}
                    `}
                  >
                    {testCase.status || "Pending"}
                  </span>
                </div>

                {/* DATE */}

                <div
                  className="
                    text-[9px]
                    font-[400]
                    leading-[12px]
                    text-[#8d98a8]
                  "
                >
                  {formatDate(testCase.createdAt)}
                </div>

                {/* ACTION */}

                <div className="flex items-center gap-[6px]">
                  {/* PASS */}

                  {testCase.status !== "Passed" && (
                    <button
                      type="button"
                      disabled={updatingId === testCase.id}
                      onClick={() =>
                        updateStatus(testCase.id, "Passed")
                      }
                      className="
                        flex
                        h-[24px]
                        items-center
                        justify-center
                        rounded-[6px]
                        border
                        border-[#b9ead4]
                        bg-[#f0fbf6]
                        px-[9px]
                        text-[9px]
                        font-[600]
                        leading-[10px]
                        text-[#20b978]
                        transition
                        hover:bg-[#e5f8ef]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      {updatingId === testCase.id ? "..." : "Pass"}
                    </button>
                  )}

                  {/* FAIL */}

                  {testCase.status !== "Failed" && (
                    <button
                      type="button"
                      disabled={updatingId === testCase.id}
                      onClick={() =>
                        updateStatus(testCase.id, "Failed")
                      }
                      className="
                        flex
                        h-[24px]
                        items-center
                        justify-center
                        rounded-[6px]
                        border
                        border-[#ffc9c9]
                        bg-[#fff4f4]
                        px-[9px]
                        text-[9px]
                        font-[600]
                        leading-[10px]
                        text-[#ff4b4b]
                        transition
                        hover:bg-[#ffeaea]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      {updatingId === testCase.id ? "..." : "Fail"}
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ============================================================
          MOBILE CARDS
      ============================================================ */}

      <div className="md:hidden space-y-3">
        {loading && (
          <div className="py-[30px] text-center text-[10px] text-[#9aa8bb]">
            Loading test cases...
          </div>
        )}

        {!loading && testCases.length === 0 && !error && (
          <div className="py-[30px] text-center text-[10px] text-[#9aa8bb]">
            No test cases found.
          </div>
        )}

        {!loading &&
          testCases.map((testCase) => (
            <div
              key={testCase.id}
              className="
                rounded-[12px]
                border
                border-[#e5e7eb]
                bg-white
                p-4
                shadow-sm
              "
            >
              {/* TOP */}

              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="min-w-0">
                  <p className="text-[9px] text-[#8d98a8] mb-1">
                    {testCase.testId}
                  </p>

                  <p
                    className="
                      text-[11px]
                      font-[600]
                      text-[#111827]
                      leading-[15px]
                    "
                  >
                    {testCase.title}
                  </p>
                </div>

                <span
                  className={`
                    shrink-0
                    rounded-[6px]
                    px-[7px]
                    py-[3px]
                    text-[9px]
                    font-[600]
                    ${getStatusClass(testCase.status)}
                  `}
                >
                  {testCase.status}
                </span>
              </div>

              {/* DETAILS */}

              <div className="grid grid-cols-2 gap-2 text-[9px] mb-3">
                <div>
                  <span className="text-[#9aa8bb]">Type: </span>

                  <span className="bg-[#f4f6f8] text-[#657184] rounded-[5px] px-[6px] py-[2px]">
                    {testCase.type || "-"}
                  </span>
                </div>

                <div>
                  <span className="text-[#9aa8bb]">Task: </span>

                  <span className="text-[#8d98a8]">
                    {testCase.linkedTask || "-"}
                  </span>
                </div>

                <div>
                  <span className="text-[#9aa8bb]">Priority: </span>

                  <span
                    className={`
                      rounded-[5px]
                      px-[6px]
                      py-[2px]
                      font-[600]
                      ${getPriorityClass(testCase.priority)}
                    `}
                  >
                    {testCase.priority || "-"}
                  </span>
                </div>

                <div>
                  <span className="text-[#9aa8bb]">Date: </span>

                  <span className="text-[#8d98a8]">
                    {formatDate(testCase.createdAt)}
                  </span>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="flex gap-2 pt-2 border-t border-[#eeeeee]">
                {testCase.status !== "Passed" && (
                  <button
                    type="button"
                    disabled={updatingId === testCase.id}
                    onClick={() =>
                      updateStatus(testCase.id, "Passed")
                    }
                    className="
                      flex
                      h-[26px]
                      items-center
                      rounded-[6px]
                      border
                      border-[#b9ead4]
                      bg-[#f0fbf6]
                      px-[10px]
                      text-[9px]
                      font-[600]
                      text-[#20b978]
                      disabled:opacity-50
                    "
                  >
                    {updatingId === testCase.id ? "..." : "Pass"}
                  </button>
                )}

                {testCase.status !== "Failed" && (
                  <button
                    type="button"
                    disabled={updatingId === testCase.id}
                    onClick={() =>
                      updateStatus(testCase.id, "Failed")
                    }
                    className="
                      flex
                      h-[26px]
                      items-center
                      rounded-[6px]
                      border
                      border-[#ffc9c9]
                      bg-[#fff4f4]
                      px-[10px]
                      text-[9px]
                      font-[600]
                      text-[#ff4b4b]
                      disabled:opacity-50
                    "
                  >
                    {updatingId === testCase.id ? "..." : "Fail"}
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QATestCases;