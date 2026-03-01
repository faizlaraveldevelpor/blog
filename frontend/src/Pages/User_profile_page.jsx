import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdate_profileMutation, useLogin_userQuery } from "../Redux/Api";
import { toast } from "react-toastify";
import { login_user_data } from "../Redux/ALL_moduls._Slice";
import Avatar from "../Components/shared/Avatar";
import Button from "../Components/shared/Button";
import { HiPencil, HiPhoto, HiUser, HiLockClosed } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";

function User_profile_page() {
  const dispatch = useDispatch();
  const [update_fnc, { data, isLoading }] = useUpdate_profileMutation();
  const { refetch: refetchUser } = useLogin_userQuery();
  const user_data_local_storage = JSON.parse(localStorage.getItem("user")) || {};
  const img_ref = useRef();
  const [toggle_update, settoggle_update] = useState(null);
  const [updated_data, setupdated_data] = useState({
    name: "",
    email: "",
    password: "",
    img: "",
  });

  const buildForm = () => {
    const form = new FormData();
    if (updated_data.name) form.append("name", updated_data.name);
    if (updated_data.email) form.append("email", updated_data.email);
    if (updated_data.password) form.append("password", updated_data.password);
    if (updated_data.img) form.append("avtar", updated_data.img);
    return form;
  };

  const handleUpdate = () => {
    const form = buildForm();
    if (!form.entries().next().done) {
      update_fnc(form);
    } else {
      toast.info("Change something first, then click Update.");
    }
  };

  useEffect(() => {
    if (data?.success === true) {
      toast.success(data?.message);
      settoggle_update(null);
      setupdated_data({ name: "", email: "", password: "", img: "" });
      refetchUser().then((result) => {
        if (result.data?.user) {
          const u = result.data.user;
          const saved = { id: u._id, name: u.name, email: u.email, role: u.role, image: u.image, draft: u.draft };
          localStorage.setItem("user", JSON.stringify(saved));
          dispatch(login_user_data(saved));
        }
      });
    }
    if (data?.success === false) toast.error(data?.message);
  }, [data, dispatch, refetchUser]);

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Profile cover + avatar */}
      <div className="bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-24 sm:pb-28">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <div className="ring-4 ring-white/30 rounded-full p-1 bg-white/10">
                {updated_data.img ? (
                  <img
                    src={URL.createObjectURL(updated_data.img)}
                    alt="Preview"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
                  />
                ) : (
                  <Avatar
                    src={user_data_local_storage?.image}
                    alt={user_data_local_storage?.name || "Profile"}
                    size="2xl"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full"
                  />
                )}
              </div>
              <input
                type="file"
                ref={img_ref}
                className="hidden"
                accept="image/*"
                onChange={(e) =>
                  setupdated_data((prev) => ({ ...prev, img: e.target.files[0] }))
                }
              />
              <button
                type="button"
                onClick={() => img_ref.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-brand-accent hover:bg-brand-accent-hover rounded-full text-white shadow-lg transition-colors"
              >
                <HiPhoto className="w-5 h-5" />
              </button>
            </div>
            <h1 className="mt-4 text-xl sm:text-2xl font-bold font-merriweather">
              {user_data_local_storage?.name || "User"}
            </h1>
            <p className="text-white/80 text-sm mt-1">{user_data_local_storage?.email}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="!border-white/50 !text-white hover:!bg-white/20"
                onClick={() => img_ref.current?.click()}
              >
                <HiPhoto className="w-4 h-4 mr-1.5 inline" />
                Change photo
              </Button>
              {(updated_data.img || updated_data.name || updated_data.email || updated_data.password) && (
                <Button
                  variant="primary"
                  size="sm"
                  className="!bg-white !text-brand-primary hover:!bg-slate-100"
                  onClick={handleUpdate}
                  loading={isLoading}
                >
                  Save changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account info card */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 pb-12">
        <div className="card rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-brand-primary flex items-center gap-2">
              <HiUser className="text-brand-accent" />
              Account information
            </h2>
            <p className="text-sm text-brand-muted mt-0.5">View and update your details</p>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Name */}
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                  <HiUser className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium text-brand-muted uppercase tracking-wide">Name</p>
                  <p className="font-semibold text-brand-primary">
                    {toggle_update === "name" ? (
                      <input
                        type="text"
                        className="input mt-1 max-w-xs"
                        placeholder="Enter your name"
                        defaultValue={user_data_local_storage?.name}
                        onChange={(e) =>
                          setupdated_data((prev) => ({ ...prev, name: e.target.value }))
                        }
                        autoFocus
                      />
                    ) : (
                      user_data_local_storage?.name || "—"
                    )}
                  </p>
                </div>
              </div>
              {toggle_update === "name" ? (
                <Button size="sm" onClick={handleUpdate} loading={isLoading}>
                  Save
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => settoggle_update("name")}
                >
                  <HiPencil className="w-4 h-4" /> Update
                </Button>
              )}
            </div>

            {/* Email */}
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                  <HiOutlineMail className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium text-brand-muted uppercase tracking-wide">Email</p>
                  <p className="font-semibold text-brand-primary">
                    {toggle_update === "email" ? (
                      <input
                        type="email"
                        className="input mt-1 max-w-xs"
                        placeholder="Enter your email"
                        defaultValue={user_data_local_storage?.email}
                        onChange={(e) =>
                          setupdated_data((prev) => ({ ...prev, email: e.target.value }))
                        }
                        autoFocus
                      />
                    ) : (
                      user_data_local_storage?.email || "—"
                    )}
                  </p>
                </div>
              </div>
              {toggle_update === "email" ? (
                <Button size="sm" onClick={handleUpdate} loading={isLoading}>
                  Save
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => settoggle_update("email")}
                >
                  <HiPencil className="w-4 h-4" /> Update
                </Button>
              )}
            </div>

            {/* Password */}
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                  <HiLockClosed className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium text-brand-muted uppercase tracking-wide">Password</p>
                  <p className="font-semibold text-brand-primary">
                    {toggle_update === "password" ? (
                      <input
                        type="password"
                        className="input mt-1 max-w-xs"
                        placeholder="Enter new password"
                        onChange={(e) =>
                          setupdated_data((prev) => ({ ...prev, password: e.target.value }))
                        }
                        autoFocus
                      />
                    ) : (
                      "••••••••••••"
                    )}
                  </p>
                </div>
              </div>
              {toggle_update === "password" ? (
                <Button size="sm" onClick={handleUpdate} loading={isLoading}>
                  Save
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => settoggle_update("password")}
                >
                  <HiPencil className="w-4 h-4" /> Update
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User_profile_page;
