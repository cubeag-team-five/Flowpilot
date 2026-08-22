import React, { useEffect, useState } from 'react';
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


export const AdminDepartments: React.FC = () => {
  const [departments, setDepartments] =
  useState<Department[]>([]);

  const [toastMessage, setToastMessage] = useState('');

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
    useState<Record<number, Member[]>>({});

  const [showForm, setShowForm] = useState(false);

  const [departmentName, setDepartmentName] = useState('');
  const [departmentHead, setDepartmentHead] = useState('');
  const [members, setMembers] = useState('');
  const [progress, setProgress] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error(
            'Authentication token not found. Please login again.'
          );
        }

        const response = await fetch(
          'http://localhost:8080/api/admin/departments',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch departments: ${response.statusText}`
          );
        }

        const data = await response.json();

        const formattedDepartments: Department[] = data.map(
          (department: any, index: number) => ({
            id: department.id,
            name: department.name,
            head: department.head,
            members: department.members,
            progress: department.progress,

            color: [
              'bg-[#69E8D0]',
              'bg-purple-400',
              'bg-emerald-400',
              'bg-amber-400',
              'bg-rose-400',
              'bg-slate-400',
            ][index % 6],

            bgColor: [
              'bg-[#F4FEFC]',
              'bg-purple-50',
              'bg-emerald-50',
              'bg-amber-50',
              'bg-rose-50',
              'bg-slate-50',
            ][index % 6],

            textColor: [
              'text-[#5DD9C3]',
              'text-purple-500',
              'text-emerald-500',
              'text-amber-500',
              'text-rose-500',
              'text-slate-500',
            ][index % 6],

            borderColor: [
              'border-[#D8F5EF]',
              'border-purple-100',
              'border-emerald-100',
              'border-amber-100',
              'border-rose-100',
              'border-slate-100',
            ][index % 6],

            shadowColor:
              'shadow-[0_2px_8px_rgba(15,23,42,0.06)]',
          })
        );

        setDepartments(formattedDepartments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } 
    };

    fetchDepartments();
  }, []);

  const handleViewMembers = async (department: Department) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error(
          'Authentication token not found. Please login again.'
        );
      }

      const response = await fetch(
        `http://localhost:8080/api/admin/departments/${department.id}/members`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch members: ${response.statusText}`
        );
      }

      const data: Member[] = await response.json();

      setDepartmentMembers((previous) => ({
        ...previous,
        [department.id]: data,
      }));

      setSelectedDepartment({
        ...department,
        members: data.length,
      });

      setShowMembers(true);

    } 
    catch (error) {
      console.error('Error fetching department members:', error);

      setToastMessage(
        error instanceof Error
        ? error.message
        : 'Failed to fetch members.'
      );

      setTimeout(() => {
        setToastMessage('');
      }, 3000);
    }
  };

  const handleAddDepartment = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !departmentName.trim() ||
    !departmentHead.trim() ||
    !members ||
    !progress
  ) {
    return;
  }

  const payload = {
    name: departmentName.trim(),
    head: departmentHead.trim(),
    members: Number(members),
    progress: Number(progress),
  };

  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error(
        'Authentication token not found. Please login again.'
      );
    }

    const response = await fetch(
      'http://localhost:8080/api/admin/departments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
  let errorMessage = 'Failed to create department.';

  try {
    const errorData = await response.json();

    if (
      errorData?.message?.toLowerCase().includes('already exists') ||
      errorData?.message?.toLowerCase().includes('already exist') ||
      errorData?.message?.toLowerCase().includes('duplicate')
    ) {
      errorMessage = 'Department already exists !';
    } else if (errorData?.message) {
      errorMessage = errorData.message;
    }
  } catch {
    // Ignore JSON parsing error
  }

  throw new Error(errorMessage);
}

    const savedDepartment = await response.json();

    const newDepartment: Department = {
      id: savedDepartment.id,
      name: savedDepartment.name,
      head: savedDepartment.head,
      members: savedDepartment.members,
      progress: savedDepartment.progress,
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

    setToastMessage('Department added successfully.');

    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to create department. Please try again.';

    setToastMessage(message);

    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  }
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

  const handleAddOrEditMember = async (
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

  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error(
        'Authentication token not found. Please login again.'
      );
    }

    const url = editingMember
      ? `http://localhost:8080/api/admin/departments/${selectedDepartment.id}/members/${editingMember.id}`
      : `http://localhost:8080/api/admin/departments/${selectedDepartment.id}/members`;

    const response = await fetch(url, {
      method: editingMember ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: memberForm.fullName.trim(),
        email: memberForm.email.trim(),
        employeeId: memberForm.employeeId.trim(),
        designation: memberForm.designation.trim(),
      }),
    });

    if (!response.ok) {
      let errorMessage = editingMember
        ? 'Failed to update member.'
        : 'Failed to add member.';

      try {
        const errorData = await response.json();

        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Ignore JSON parsing error
      }

      throw new Error(errorMessage);
    }

    const savedMember: Member = await response.json();

    setDepartmentMembers((previous) => {
      const currentMembers =
        previous[selectedDepartment.id] || [];

      if (editingMember) {
        return {
          ...previous,
          [selectedDepartment.id]: currentMembers.map(
            (member) =>
              member.id === savedMember.id
                ? savedMember
                : member
          ),
        };
      }

      return {
        ...previous,
        [selectedDepartment.id]: [
          ...currentMembers,
          savedMember,
        ],
      };
    });

    const updatedMemberCount =
      (departmentMembers[selectedDepartment.id] || []).length +
      (editingMember ? 0 : 1);

    setDepartments((previous) =>
      previous.map((department) =>
        department.id === selectedDepartment.id
          ? {
              ...department,
              members: updatedMemberCount,
            }
          : department
      )
    );

    setSelectedDepartment((previous) =>
      previous
        ? {
            ...previous,
            members: updatedMemberCount,
          }
        : previous
    );

    setMemberForm({
      fullName: '',
      email: '',
      employeeId: '',
      designation: '',
    });

    setEditingMember(null);
    setShowMemberForm(false);

    setToastMessage(
      editingMember
        ? 'Member updated successfully.'
        : 'Member added successfully.'
    );

    setTimeout(() => {
      setToastMessage('');
    }, 3000);

  } catch (error) {
    console.error('Error saving member:', error);

    setToastMessage(
      error instanceof Error
        ? error.message
        : 'Failed to save member.'
    );

    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  }
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

      {toastMessage && (
        <div
          className="
            fixed
            right-5
            top-5
            z-[100]
            rounded-lg
            border
            border-red-100
            bg-white
            px-4
            py-3
            text-[13px]
            font-semibold
            text-red-500
            shadow-[0_8px_24px_rgba(15,23,42,0.12)]
          "
        >
          {toastMessage}
        </div>
      )}

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
            key={`${department.id}-${department.name}-${department.head}`}
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


            {/* TABLE / RESPONSIVE MEMBER LIST */}

            <div className="max-h-[55vh] overflow-y-auto">

              {/* ================= DESKTOP TABLE ================= */}

              <div className="hidden sm:block overflow-x-auto">

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
                  onClick={() => handleEditMember(member)}
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


  {/* ================= MOBILE MEMBER CARDS ================= */}

  <div className="block space-y-3 p-4 sm:hidden">

    {(departmentMembers[selectedDepartment.id] || []).map(
      (member) => (

        <div
          key={member.id}
          className="
            w-full
            rounded-lg
            border
            border-slate-200
            bg-white
            p-4
            shadow-[0_2px_8px_rgba(15,23,42,0.04)]
          "
        >

          {/* MEMBER NAME */}

          <div className="mb-3 flex items-start justify-between gap-3">

            <div className="min-w-0">

              <p
                className="
                  truncate
                  text-[14px]
                  font-extrabold
                  text-slate-900
                "
              >
                {member.fullName}
              </p>

              <p
                className="
                  mt-1
                  break-all
                  text-[11px]
                  font-medium
                  text-slate-500
                "
              >
                {member.email}
              </p>

            </div>

            <button
              type="button"
              onClick={() => handleEditMember(member)}
              className="
                shrink-0
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

          </div>


          {/* MEMBER DETAILS */}

          <div
            className="
              grid
              grid-cols-1
              gap-2
              border-t
              border-slate-100
              pt-3
              xs:grid-cols-2
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Employee ID
              </p>

              <p
                className="
                  mt-0.5
                  text-[12px]
                  font-semibold
                  text-slate-700
                "
              >
                {member.employeeId}
              </p>

            </div>


            <div>

              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Designation
              </p>

              <p
                className="
                  mt-0.5
                  break-words
                  text-[12px]
                  font-medium
                  text-slate-600
                "
              >
                {member.designation}
              </p>

            </div>

          </div>

        </div>

      )
    )}

  </div>

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