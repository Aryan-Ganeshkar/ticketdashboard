// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { useTickets } from "../App.jsx";

// function Toast({ show, message }) {
//   return (
//     <div
//       className={`fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] transition-all duration-300 ${
//         show
//           ? "opacity-100 translate-y-0"
//           : "opacity-0 translate-y-3 pointer-events-none"
//       }`}
//     >
//       <div className="px-4 py-3 rounded-lg shadow-lg bg-emerald-600 text-white text-sm font-semibold">
//         {message}
//       </div>
//     </div>
//   );
// }

// export default function Edit() {
//   const { id } = useParams();
//   const tid = Number(id);
//   const navigate = useNavigate();
//   const { tickets, updateTicket } = useTickets();

//   const ticket = useMemo(
//     () => tickets.find((t) => t.id === tid),
//     [tickets, tid]
//   );

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     priority: "medium",
//     category: "Technical",
//     status: "",
//   });
//   const [errors, setErrors] = useState({
//     title: "",
//     description: "",
//     status: "",
//   });
//   const [toast, setToast] = useState({ show: false, message: "" });

//   useEffect(() => {
//     if (ticket) {
//       setForm({
//         title: ticket.title || "",
//         description: ticket.description || "",
//         priority: ticket.priority || "medium",
//         category: ticket.category || "Technical",
//         status: ticket.status || "",
//       });
//     }
//   }, [ticket]);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const showToast = (message = "Ticket updated successfully!") => {
//     setToast({ show: true, message });
//     setTimeout(() => setToast((t) => ({ ...t, show: false })), 1200);
//   };

//   const validate = () => {
//     const next = { title: "", description: "", status: "" };
//     if (!form.title.trim()) next.title = "Title is required.";
//     if (!form.description.trim()) next.description = "Description is required.";
//     if (!form.status) next.status = "Please select a status.";
//     const allowed = ["open", "in-progress", "closed"];
//     if (form.status && !allowed.includes(form.status))
//       next.status = "Invalid status selected.";
//     setErrors(next);
//     return !next.title && !next.description && !next.status;
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     if (!ticket) return;
//     if (!validate()) return;
//     updateTicket(ticket.id, { ...form });
//     showToast();
//     setTimeout(() => navigate(`/ticket/${ticket.id}`), 900);
//   };

//   if (!ticket) {
//     return (
//       <div className="text-center py-16">
//         <h2 className="text-2xl font-bold text-slate-800 mb-4">
//           Ticket Not Found
//         </h2>
//         <Link
//           to="/"
//           className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold"
//         >
//           Go to Dashboard
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Toast show={toast.show} message={toast.message} />

//       <div className="max-w-2xl mx-auto">
//         <form
//           onSubmit={submit}
//           noValidate
//           className="bg-white rounded-xl shadow-md p-6 sm:p-8"
//         >
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
//             Edit Ticket
//           </h2>

//           <div className="space-y-6">
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Title *
//               </label>
//               <input
//                 name="title"
//                 value={form.title}
//                 onChange={onChange}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
//                   errors.title
//                     ? "border-rose-500 focus:ring-rose-400"
//                     : "border-gray-300 focus:ring-indigo-500"
//                 }`}
//                 placeholder="Brief title"
//                 aria-invalid={!!errors.title}
//               />
//               {errors.title && (
//                 <p className="mt-1 text-sm text-rose-600">{errors.title}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={onChange}
//                 rows={5}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
//                   errors.description
//                     ? "border-rose-500 focus:ring-rose-400"
//                     : "border-gray-300 focus:ring-indigo-500"
//                 }`}
//                 placeholder="Detailed description"
//                 aria-invalid={!!errors.description}
//               />
//               {errors.description && (
//                 <p className="mt-1 text-sm text-rose-600">
//                   {errors.description}
//                 </p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Priority
//                 </label>
//                 <select
//                   name="priority"
//                   value={form.priority}
//                   onChange={onChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   value={form.category}
//                   onChange={onChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 >
//                   <option value="Technical">Technical</option>
//                   <option value="Billing">Billing</option>
//                   <option value="Feature">Feature Request</option>
//                   <option value="Support">General Support</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Status *
//                 </label>
//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={onChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
//                     errors.status
//                       ? "border-rose-500 focus:ring-rose-400"
//                       : "border-gray-300 focus:ring-indigo-500"
//                   }`}
//                   required
//                 >
//                   <option value="" disabled>
//                     -- Select Status --
//                   </option>
//                   <option value="open">Open</option>
//                   <option value="in-progress">In Progress</option>
//                   <option value="closed">Closed</option>
//                 </select>
//                 {errors.status && (
//                   <p className="mt-1 text-sm text-rose-600">{errors.status}</p>
//                 )}
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <button
//                 type="submit"
//                 className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
//               >
//                 Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTickets } from "../App.jsx";

function Toast({ show, message }) {
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] transition-all duration-300 ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="px-4 py-3 rounded-lg shadow-lg bg-emerald-600 text-white text-sm font-semibold">
        {message}
      </div>
    </div>
  );
}

export default function Edit() {
  const { id } = useParams();
  const tid = Number(id);
  const navigate = useNavigate();
  const { tickets, updateTicket } = useTickets();

  const ticket = useMemo(
    () => tickets.find((t) => t.id === tid),
    [tickets, tid]
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "Technical",
    status: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    if (ticket) {
      setForm({
        title: ticket.title || "",
        description: ticket.description || "",
        priority: ticket.priority || "medium",
        category: ticket.category || "Technical",
        status: ticket.status || "",
      });
    }
  }, [ticket]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const showToast = (message = "Ticket updated successfully!") => {
    setToast({ show: true, message });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 1200);
  };

  const validate = () => {
    const next = { title: "", description: "", status: "" };
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    if (!form.status) next.status = "Please select a status.";

    setErrors(next);
    return !next.title && !next.description && !next.status;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!ticket) return;
    if (!validate()) return;

    updateTicket(ticket.id, { ...form });
    showToast();

    // ✅ Navigate directly to dashboard after update
    setTimeout(() => navigate("/"), 900);
  };

  if (!ticket) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Ticket Not Found
        </h2>
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <>
      <Toast show={toast.show} message={toast.message} />

      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={submit}
          noValidate
          className="bg-white rounded-xl shadow-md p-6 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Edit Ticket
          </h2>

          <div className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 ${
                  errors.title
                    ? "border-rose-500 focus:ring-rose-400"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
                placeholder="Brief title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-rose-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 ${
                  errors.description
                    ? "border-rose-500 focus:ring-rose-400"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
                placeholder="Detailed description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-rose-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Priority / Category / Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Technical">Technical</option>
                  <option value="Billing">Billing</option>
                  <option value="Feature">Feature Request</option>
                  <option value="Support">General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={onChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 ${
                    errors.status
                      ? "border-rose-500 focus:ring-rose-400"
                      : "border-gray-300 focus:ring-indigo-500"
                  }`}
                >
                  <option value="" disabled>
                    -- Select Status --
                  </option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-rose-600">{errors.status}</p>
                )}
              </div>

            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  );
}
