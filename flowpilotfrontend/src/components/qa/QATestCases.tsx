import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock3,
  XCircle,
  Search,
  Filter,
  FileCheck2,
} from 'lucide-react';

interface TestCase {
  id: string;
  title: string;
  type: string;
  module: string;
  date: string;
  status: 'Passed' | 'In Testing' | 'Pending' | 'Failed';
}

export const QATestCases: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const testCases: TestCase[] = [
    {
      id: 'T-042',
      title: 'Test velocity tracking module',
      type: 'Functional',
      module: 'Velocity',
      date: 'Aug 7',
      status: 'Passed',
    },
    {
      id: 'T-043',
      title: 'Test mobile responsive layout',
      type: 'UI/UX',
      module: 'Responsive UI',
      date: 'Aug 7',
      status: 'In Testing',
    },
    {
      id: 'T-044',
      title: 'Test file upload S3 integration',
      type: 'Integration',
      module: 'File Upload',
      date: 'Aug 6',
      status: 'In Testing',
    },
    {
      id: 'T-045',
      title: 'Test JWT token refresh',
      type: 'Security',
      module: 'Authentication',
      date: 'Aug 5',
      status: 'Passed',
    },
    {
      id: 'T-046',
      title: 'Validate API error handling',
      type: 'API',
      module: 'API Integration',
      date: 'Aug 4',
      status: 'Pending',
    },
    {
      id: 'T-047',
      title: 'Test sprint board drag and drop',
      type: 'Functional',
      module: 'Sprint Board',
      date: 'Aug 3',
      status: 'Failed',
    },
  ];

  const filteredTests = testCases.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(search.toLowerCase()) ||
      test.id.toLowerCase().includes(search.toLowerCase()) ||
      test.module.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || test.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: TestCase['status']) => {
    switch (status) {
      case 'Passed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';

      case 'In Testing':
        return 'bg-amber-50 text-amber-600 border-amber-200';

      case 'Pending':
        return 'bg-slate-50 text-slate-500 border-slate-200';

      case 'Failed':
        return 'bg-rose-50 text-rose-600 border-rose-200';
    }
  };

  const getStatusIcon = (status: TestCase['status']) => {
    switch (status) {
      case 'Passed':
        return <CheckCircle2 size={14} />;

      case 'In Testing':
        return <Clock3 size={14} />;

      case 'Failed':
        return <XCircle size={14} />;

      case 'Pending':
        return <Clock3 size={14} />;
    }
  };

  return (
    <div className="w-full space-y-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          My Test Tasks
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Manage and track your assigned QA test cases
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-extrabold uppercase text-slate-400">
            Total Tests
          </p>

          <p className="mt-2 text-3xl font-black text-slate-900">
            6
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Assigned tests
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-extrabold uppercase text-slate-400">
            Passed
          </p>

          <p className="mt-2 text-3xl font-black text-slate-900">
            2
          </p>

          <p className="mt-1 text-xs font-semibold text-emerald-500">
            Completed
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-extrabold uppercase text-slate-400">
            In Testing
          </p>

          <p className="mt-2 text-3xl font-black text-slate-900">
            2
          </p>

          <p className="mt-1 text-xs font-semibold text-amber-500">
            In progress
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-extrabold uppercase text-slate-400">
            Failed
          </p>

          <p className="mt-2 text-3xl font-black text-slate-900">
            1
          </p>

          <p className="mt-1 text-xs font-semibold text-rose-500">
            Needs attention
          </p>
        </div>

      </div>

      {/* Assigned Test Cases */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">

        {/* Section Header */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Assigned Test Cases
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Test cases assigned to you
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">

            {/* Search */}
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search tests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-xs outline-none focus:border-emerald-300 sm:w-52"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs font-bold text-slate-600 outline-none"
              >
                <option value="All">All Status</option>
                <option value="Passed">Passed</option>
                <option value="In Testing">In Testing</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

          </div>
        </div>

        {/* Test Cases */}
        {filteredTests.length > 0 ? (
          filteredTests.map((test) => (
            <div
              key={test.id}
              className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 transition hover:bg-slate-50 last:border-b-0 lg:flex-row lg:items-center lg:justify-between"
            >

              {/* Test Information */}
              <div className="flex items-start gap-4">

                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                  <FileCheck2
                    size={17}
                    className="text-emerald-500"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {test.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {test.id} · {test.type} · {test.module} · {test.date}
                  </p>
                </div>

              </div>

              {/* Status */}
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold ${getStatusStyle(
                  test.status
                )}`}
              >
                {getStatusIcon(test.status)}
                {test.status}
              </span>

            </div>
          ))
        ) : (
          <div className="p-10 text-center">

            <FileCheck2
              size={28}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-bold text-slate-600">
              No test cases found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </div>

    </div>
  );
};