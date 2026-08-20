import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface Department {
  id: number;
  name: string;
  head: string;
  members: number;
  progress: number;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
}

interface Member {
  id: number;
  fullName: string;
  email: string;
  employeeId: string;
  designation: string;
}

const initialDepartments: Department[] = [
  {
    id: 1,
    name: 'Engineering',
    head: 'Karan Mehta',
    members: 18,
    progress: 40,
    color: 'bg-[#69E8D0]',
    bgColor: 'bg-[#F4FEFC]',
    textColor: 'text-[#5DD9C3]',
    borderColor: 'border-[#D8F5EF]',
    shadowColor: 'shadow-[0_2px_8px_rgba(45,212,191,0.08)]',
  },
  {
    id: 2,
    name: 'Product',
    head: 'Arjun Shah',
    members: 6,
    progress: 14,
    color: 'bg-purple-400',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-500',
    borderColor: 'border-purple-100',
    shadowColor: 'shadow-[0_2px_8px_rgba(192,132,252,0.08)]',
  },
  {
    id: 3,
    name: 'Quality Assurance',
    head: 'Sana Sheikh',
    members: 7,
    progress: 16,
    color: 'bg-emerald-400',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-500',
    borderColor: 'border-emerald-100',
    shadowColor: 'shadow-[0_2px_8px_rgba(52,211,153,0.08)]',
  },
  {
    id: 4,
    name: 'Design',
    head: 'Divya Mehta',
    members: 5,
    progress: 11,
    color: 'bg-amber-400',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-500',
    borderColor: 'border-amber-100',
    shadowColor: 'shadow-[0_2px_8px_rgba(251,191,36,0.08)]',
  },
  {
    id: 5,
    name: 'Operations',
    head: 'Nisha Agarwal',
    members: 8,
    progress: 20,
    color: 'bg-rose-400',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-500',
    borderColor: 'border-rose-100',
    shadowColor: 'shadow-[0_2px_8px_rgba(251,113,133,0.08)]',
  },
  {
    id: 6,
    name: 'Leadership',
    head: 'Rajeev Kumar',
    members: 3,
    progress: 8,
    color: 'bg-slate-400',
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-500',
    borderColor: 'border-slate-100',
    shadowColor: 'shadow-[0_2px_8px_rgba(100,116,139,0.06)]',
  },
];

const initialMembers: Record<number, Member[]> = {
  1: [
    {
      id: 1,
      fullName: 'Karan Mehta',
      email: 'karan.mehta@ipmt.com',
      employeeId: 'EMP001',
      designation: 'Head of Engineering',
    },
    {
      id: 2,
      fullName: 'Rohit Varma',
      email: 'rohit.varma@ipmt.com',
      employeeId: 'EMP002',
      designation: 'Senior Developer',
    },
    {
      id: 3,
      fullName: 'Amit Sharma',
      email: 'amit.sharma@ipmt.com',
      employeeId: 'EMP003',
      designation: 'Software Developer',
    },
  ],

  2: [
    {
      id: 4,
      fullName: 'Arjun Shah',
      email: 'arjun.shah@ipmt.com',
      employeeId: 'EMP004',
      designation: 'Head of Product',
    },
    {
      id: 5,
      fullName: 'Priya Joshi',
      email: 'priya.joshi@ipmt.com',
      employeeId: 'EMP005',
      designation: 'Product Manager',
    },
  ],

  3: [
    {
      id: 6,
      fullName: 'Sana Sheikh',
      email: 'sana.sheikh@ipmt.com',
      employeeId: 'EMP006',
      designation: 'QA Lead',
    },
  ],

  4: [
    {
      id: 7,
      fullName: 'Divya Mehta',
      email: 'divya.mehta@ipmt.com',
      employeeId: 'EMP007',
      designation: 'Design Lead',
    },
  ],

  5: [
    {
      id: 8,
      fullName: 'Nisha Agarwal',
      email: 'nisha.agarwal@ipmt.com',
      employeeId: 'EMP008',
      designation: 'Operations Head',
    },
  ],

  6: [
    {
      id: 9,
      fullName: 'Rajeev Kumar',
      email: 'rajeev.kumar@ipmt.com',
      employeeId: 'EMP009',
      designation: 'Leadership',
    },
  ],
};

export const AdminDepartments: React.FC = () => {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);

  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const [showMembers, setShowMembers] = useState(false);

  const [showMemberForm, setShowMemberForm] = useState(false);

  const [editingMember, setEditingMember] =
    useState<Member | null>(null);

  const [memberForm, setMemberForm] = useState({
    fullName: '',
    email: '',
    employeeId: '',
    designation: '',
  });

  const [departmentMembers, setDepartmentMembers] =
    useState<Record<number, Member[]>>(initialMembers);

  const [showForm, setShowForm] = useState(false);

  const [departmentName, setDepartmentName] = useState('');
  const [departmentHead, setDepartmentHead] = useState('');
  const [members, setMembers] = useState('');
  const [progress, setProgress] = useState('');

  const handleViewMembers = (department: Department) => {
    setSelectedDepartment(department);
    setShowMembers(true);
  };

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !departmentName.trim() ||
      !departmentHead.trim() ||
      !members ||
      !progress
    ) {
      return;
    }

    const newDepartment: Department = {
      id: departments.length + 1,
      name: departmentName.trim(),
      head: departmentHead.trim(),
      members: Number(members),
      progress: Number(progress),
      color: 'bg-blue-400',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-100',
      shadowColor:
        'shadow-[0_2px_8px_rgba(96,165,250,0.08)]',
    };

    setDepartments((previous) => [
      ...previous,
      newDepartment,
    ]);

    setDepartmentName('');
    setDepartmentHead('');
    setMembers('');
    setProgress('');

    setShowForm(false);
  };

  const handleCancel = () => {
    setDepartmentName('');
    setDepartmentHead('');
    setMembers('');
    setProgress('');
    setShowForm(false);
  };

  const handleMemberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setMemberForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddOrEditMember = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !memberForm.fullName.trim() ||
      !memberForm.email.trim() ||
      !memberForm.employeeId.trim() ||
      !memberForm.designation.trim() ||
      !selectedDepartment
    ) {
      return;
    }

    if (editingMember) {
      setDepartmentMembers((previous) => ({
        ...previous,
        [selectedDepartment.id]: (
          previous[selectedDepartment.id] || []
        ).map((member) =>
          member.id === editingMember.id
            ? {
                ...member,
                ...memberForm,
              }
            : member
        ),
      }));
    } else {
      const newMember: Member = {
        id: Date.now(),
        ...memberForm,
      };

      setDepartmentMembers((previous) => ({
        ...previous,
        [selectedDepartment.id]: [
          ...(previous[selectedDepartment.id] || []),
          newMember,
        ],
      }));
    }

    setMemberForm({
      fullName: '',
      email: '',
      employeeId: '',
      designation: '',
    });

    setEditingMember(null);
    setShowMemberForm(false);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);

    setMemberForm({
      fullName: member.fullName,
      email: member.email,
      employeeId: member.employeeId,
      designation: member.designation,
    });

    setShowMemberForm(true);
  };

  const handleOpenAddMember = () => {
    setEditingMember(null);

    setMemberForm({
      fullName: '',
      email: '',
      employeeId: '',
      designation: '',
    });

    setShowMemberForm(true);
  };

  return (
    <div className="w-full">

      {/* =====================================================
          ADD DEPARTMENT BUTTON
      ====================================================== */}

      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="
            inline-flex
            items-center
            justify-center
            gap-1.5
            rounded-xl
            bg-slate-900
            px-4
            py-2.5
            text-[13px]
            font-extrabold
            text-white
            transition-colors
            hover:bg-slate-800
          "
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Department</span>
        </button>
      </div>


      {/* =====================================================
          DEPARTMENT GRID
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {departments.map((department) => (
          <div
            key={department.id}
            className={`
              w-full
              min-h-[96px]
              rounded-xl
              border
              ${department.borderColor}
              bg-white
              px-5
              py-5
              ${department.shadowColor}
              transition-all
              duration-200
              hover:-translate-y-0.5
            `}
          >

            {/* TOP SECTION */}

            <div className="flex items-start justify-between gap-3">

              <div className="min-w-0">

                <h2
                  className="
                    text-[16px]
                    font-extrabold
                    leading-4
                    tracking-tight
                    text-slate-900
                  "
                >
                  {department.name}
                </h2>

                <p
                  className="
                    mt-2
                    text-[12.5px]
                    font-medium
                    leading-3.5
                    text-slate-500
                  "
                >
                  Head: {department.head}
                </p>

              </div>

              <div
                className={`
                  flex
                  h-9.5
                  min-w-9.5
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  px-1.5
                  text-[13px]
                  font-extrabold
                  ${department.bgColor}
                  ${department.textColor}
                `}
              >
                {department.members}
              </div>

            </div>


            {/* PROGRESS BAR */}

            <div className="mt-4">

              <div
                className="
                  h-[4px]
                  w-full
                  overflow-hidden
                  rounded-full
                  bg-slate-100
                "
              >
                <div
                  className={`
                    h-full
                    rounded-full
                    ${department.color}
                  `}
                  style={{
                    width: `${department.progress}%`,
                  }}
                />
              </div>

            </div>


            {/* VIEW MEMBERS BUTTON */}

            <button
              type="button"
              onClick={() => handleViewMembers(department)}
              className={`
                mt-2
                flex
                h-8.5
                w-full
                items-center
                justify-center
                rounded-md
                border
                ${department.borderColor}
                ${department.bgColor}
                ${department.textColor}
                text-[12px]
                font-bold
                transition-all
                duration-200
                hover:brightness-95
              `}
            >
              View Members
            </button>

          </div>
        ))}
      </div>


      {/* =====================================================
          ADD DEPARTMENT POPUP
      ====================================================== */}

      {showForm && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-900/30
            px-4
            backdrop-blur-[2px]
          "
        >

          <div
            className="
              w-full
              max-w-[460px]
              rounded-xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-[0_12px_40px_rgba(15,23,42,0.15)]
            "
          >

            <div className="mb-5">

              <h2
                className="
                  text-[18px]
                  font-extrabold
                  tracking-tight
                  text-slate-900
                "
              >
                Add Department
              </h2>

              <p
                className="
                  mt-1
                  text-[12.5px]
                  font-medium
                  text-slate-500
                "
              >
                Enter the department details below.
              </p>

            </div>


            <form
              onSubmit={handleAddDepartment}
              className="space-y-4"
            >

              {/* DEPARTMENT NAME */}

              <div>

                <label
                  className="
                    mb-1.5
                    block
                    text-[12px]
                    font-bold
                    text-slate-700
                  "
                >
                  Department Name
                </label>

                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) =>
                    setDepartmentName(e.target.value)
                  }
                  placeholder="Enter department name"
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-slate-200
                    bg-white
                    px-3
                    text-[13px]
                    font-medium
                    text-slate-800
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                  "
                />

              </div>


              {/* DEPARTMENT HEAD */}

              <div>

                <label
                  className="
                    mb-1.5
                    block
                    text-[12px]
                    font-bold
                    text-slate-700
                  "
                >
                  Department Head
                </label>

                <input
                  type="text"
                  value={departmentHead}
                  onChange={(e) =>
                    setDepartmentHead(e.target.value)
                  }
                  placeholder="Enter department head"
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-slate-200
                    bg-white
                    px-3
                    text-[13px]
                    font-medium
                    text-slate-800
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                  "
                />

              </div>


              {/* MEMBERS + PROGRESS */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                "
              >

                <div>

                  <label
                    className="
                      mb-1.5
                      block
                      text-[12px]
                      font-bold
                      text-slate-700
                    "
                  >
                    Members
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={members}
                    onChange={(e) =>
                      setMembers(e.target.value)
                    }
                    placeholder="0"
                    className="
                      h-10
                      w-full
                      rounded-md
                      border
                      border-slate-200
                      bg-white
                      px-3
                      text-[13px]
                      font-medium
                      text-slate-800
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-slate-400
                      focus:ring-2
                      focus:ring-slate-100
                    "
                  />

                </div>


                <div>

                  <label
                    className="
                      mb-1.5
                      block
                      text-[12px]
                      font-bold
                      text-slate-700
                    "
                  >
                    Progress (%)
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) =>
                      setProgress(e.target.value)
                    }
                    placeholder="0"
                    className="
                      h-10
                      w-full
                      rounded-md
                      border
                      border-slate-200
                      bg-white
                      px-3
                      text-[13px]
                      font-medium
                      text-slate-800
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-slate-400
                      focus:ring-2
                      focus:ring-slate-100
                    "
                  />

                </div>

              </div>


              {/* FORM BUTTONS */}

              <div
                className="
                  flex
                  flex-col-reverse
                  gap-2
                  border-t
                  border-slate-100
                  pt-4
                  sm:flex-row
                  sm:justify-end
                "
              >

                <button
                  type="button"
                  onClick={handleCancel}
                  className="
                    h-9
                    rounded-md
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-[12px]
                    font-bold
                    text-slate-600
                    transition
                    hover:bg-slate-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    h-9
                    rounded-md
                    bg-slate-900
                    px-5
                    text-[12px]
                    font-bold
                    text-white
                    transition
                    hover:bg-slate-800
                  "
                >
                  Add Department
                </button>

              </div>

            </form>

          </div>
        </div>
      )}


      {/* =====================================================
          VIEW MEMBERS POPUP
      ====================================================== */}

      {showMembers && selectedDepartment && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-900/30
            px-4
            backdrop-blur-[2px]
          "
        >

          <div
            className="
              w-full
              max-w-[760px]
              max-h-[85vh]
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-[0_12px_40px_rgba(15,23,42,0.15)]
            "
          >

            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                px-5
                py-4
              "
            >

              <div>

                <h2
                  className="
                    text-[17px]
                    font-extrabold
                    text-slate-900
                  "
                >
                  {selectedDepartment.name} Members
                </h2>

                <p
                  className="
                    mt-1
                    text-[12px]
                    font-medium
                    text-slate-500
                  "
                >
                  Department Head: {selectedDepartment.head}
                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowMembers(false)}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-md
                  text-[18px]
                  font-bold
                  text-slate-500
                  hover:bg-slate-100
                "
              >
                ×
              </button>

            </div>


            {/* ACTION BUTTON */}

            <div
              className="
                flex
                justify-end
                gap-2
                border-b
                border-slate-100
                px-5
                py-3
              "
            >

              <button
                type="button"
                onClick={handleOpenAddMember}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-md
                  bg-slate-900
                  px-3
                  py-2
                  text-[12px]
                  font-bold
                  text-white
                  hover:bg-slate-800
                "
              >
                <Plus size={14} strokeWidth={2.5} />
                Add Member
              </button>

            </div>


            {/* TABLE */}

            <div className="max-h-[55vh] overflow-auto">

              <table className="w-full min-w-[650px]">

                <thead className="sticky top-0 bg-slate-50">

                  <tr
                    className="
                      border-b
                      border-slate-200
                      text-left
                    "
                  >

                    <th className="px-5 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                      Member Name
                    </th>

                    <th className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                      Employee ID
                    </th>

                    <th className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                      Designation
                    </th>

                    <th className="px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                      Email
                    </th>

                    <th className="px-5 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                      Edit
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {(departmentMembers[selectedDepartment.id] || []).map(
                    (member) => (

                      <tr
                        key={member.id}
                        className="
                          border-b
                          border-slate-100
                          hover:bg-slate-50/60
                        "
                      >

                        <td className="px-5 py-3.5">

                          <div className="text-[13px] font-bold text-slate-900">
                            {member.fullName}
                          </div>

                        </td>


                        <td className="px-4 py-3.5">

                          <span className="text-[12px] font-semibold text-slate-600">
                            {member.employeeId}
                          </span>

                        </td>


                        <td className="px-4 py-3.5">

                          <span className="text-[12px] font-medium text-slate-600">
                            {member.designation}
                          </span>

                        </td>


                        <td className="px-4 py-3.5">

                          <span className="text-[12px] font-medium text-slate-500">
                            {member.email}
                          </span>

                        </td>


                        <td className="px-5 py-3.5">

                          <button
                            type="button"
                            onClick={() =>
                              handleEditMember(member)
                            }
                            className="
                              rounded-md
                              border
                              border-slate-200
                              bg-white
                              px-3
                              py-1.5
                              text-[11px]
                              font-bold
                              text-slate-700
                              hover:bg-slate-50
                            "
                          >
                            Edit
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>


            {/* CLOSE */}

            <div
              className="
                flex
                justify-end
                border-t
                border-slate-100
                px-5
                py-3
              "
            >

              <button
                type="button"
                onClick={() => setShowMembers(false)}
                className="
                  rounded-md
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-[12px]
                  font-bold
                  text-slate-600
                  hover:bg-slate-50
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          ADD / EDIT MEMBER POPUP
      ====================================================== */}

      {showMemberForm && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-center
            justify-center
            bg-slate-900/30
            px-4
            backdrop-blur-[2px]
          "
        >

          <div
            className="
              w-full
              max-w-[460px]
              rounded-xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-[0_12px_40px_rgba(15,23,42,0.15)]
            "
          >

            {/* HEADER */}

            <div className="mb-5">

              <h2
                className="
                  text-[18px]
                  font-extrabold
                  tracking-tight
                  text-slate-900
                "
              >
                {editingMember ? 'Edit Member' : 'Add Member'}
              </h2>

              <p
                className="
                  mt-1
                  text-[12.5px]
                  font-medium
                  text-slate-500
                "
              >
                {editingMember
                  ? 'Update the member details below.'
                  : 'Enter the member details below.'}
              </p>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleAddOrEditMember}
              className="space-y-4"
            >

              {/* FULL NAME */}

              <div>

                <label className="mb-1.5 block text-[12px] font-bold text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={memberForm.fullName}
                  onChange={handleMemberInputChange}
                  placeholder="Enter full name"
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-slate-200
                    px-3
                    text-[13px]
                    font-medium
                    text-slate-800
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                  "
                />

              </div>


              {/* EMAIL */}

              <div>

                <label className="mb-1.5 block text-[12px] font-bold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={memberForm.email}
                  onChange={handleMemberInputChange}
                  placeholder="Enter email address"
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-slate-200
                    px-3
                    text-[13px]
                    font-medium
                    text-slate-800
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                  "
                />

              </div>


              {/* EMPLOYEE ID */}

              <div>

                <label className="mb-1.5 block text-[12px] font-bold text-slate-700">
                  Employee ID
                </label>

                <input
                  type="text"
                  name="employeeId"
                  value={memberForm.employeeId}
                  onChange={handleMemberInputChange}
                  placeholder="Enter employee ID"
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-slate-200
                    px-3
                    text-[13px]
                    font-medium
                    text-slate-800
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                  "
                />

              </div>


              {/* DESIGNATION */}

              <div>

                <label className="mb-1.5 block text-[12px] font-bold text-slate-700">
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  value={memberForm.designation}
                  onChange={handleMemberInputChange}
                  placeholder="Enter designation"
                  className="
                    h-10
                    w-full
                    rounded-md
                    border
                    border-slate-200
                    px-3
                    text-[13px]
                    font-medium
                    text-slate-800
                    outline-none
                    focus:border-slate-400
                    focus:ring-2
                    focus:ring-slate-100
                  "
                />

              </div>


              {/* BUTTONS */}

              <div
                className="
                  flex
                  flex-col-reverse
                  gap-2
                  border-t
                  border-slate-100
                  pt-4
                  sm:flex-row
                  sm:justify-end
                "
              >

                <button
                  type="button"
                  onClick={() => {
                    setShowMemberForm(false);
                    setEditingMember(null);
                  }}
                  className="
                    h-9
                    rounded-md
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-[12px]
                    font-bold
                    text-slate-600
                    hover:bg-slate-50
                  "
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="
                    h-9
                    rounded-md
                    bg-slate-900
                    px-5
                    text-[12px]
                    font-bold
                    text-white
                    hover:bg-slate-800
                  "
                >
                  {editingMember
                    ? 'Save Changes'
                    : 'Add Member'}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminDepartments;