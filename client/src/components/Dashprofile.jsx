import { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Deleteuserpop from "./Deleteuserpop";
import useSignout from "../hooks/useSignout.js";
import { Link } from "react-router-dom";

const Dashprofile = () => {
  const { user, setUser } = useUserStore();
  const [isDeletePopOpen, setIsDeletePopOpen] = useState(false)
  const { signout } = useSignout();

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  // Reset form when user changes (optional)
  useEffect(() => {
    reset({ username: "", email: "", password: "" });
  }, [user, reset]);

  const onSubmit = async (data) => {
    // Create a payload containing only fields that have a value
    const payload = {};
    if (data.username) payload.username = data.username;
    if (data.email) payload.email = data.email;
    if (data.password) payload.password = data.password;

    if (Object.keys(payload).length === 0) {
      toast.error("Please fill at least one field to update.");
      return;
    }

    try {
      const res = await axios.put(`/api/v1/user/update/${user._id}`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success(res.data.message);
      setUser(res.data.user);
      reset({ username: "", email: "", password: "" }); // clear form after update
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 min-h-[73vh] px-4 sm:px-10">
      <h1 className="text-2xl font-bold text-center sm:text-left md:text-3xl">
        Profile
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-center w-full max-w-md">
        {/* Profile Image */}
        <div className="w-32 sm:w-38">
          <img
            src={user.imgURL}
            alt="Pic"
            className="rounded-full border-4 border-[var(--border-colour)] w-full"
          />
        </div>

        {/* Inputs */}
        <div className="w-full flex flex-col gap-4">
          <input
            {...register("username")}
            className="my-2 border border-[var(--border-colour)] p-2 rounded bg-[var(--bg-colour)] text-[var(--text-colour)] placeholder-[var(--text-muted-colour)] w-full"
            type="text"
            placeholder={user.username || "Username"}
          />
          <input
            {...register("email")}
            className="my-2 border border-[var(--border-colour)] p-2 rounded bg-[var(--bg-colour)] text-[var(--text-colour)] placeholder-[var(--text-muted-colour)] w-full"
            type="text"
            placeholder={user.email || "Email"}
          />
          <input
            {...register("password")}
            className="my-2 border border-[var(--border-colour)] p-2 rounded bg-[var(--bg-colour)] text-[var(--text-colour)] placeholder-[var(--text-muted-colour)] w-full"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-[var(--primary-colour)] text-[var(--bg-colour)] p-2 rounded hover:bg-[var(--primary-hover-colour)] transition w-full"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>

          {/*Create Post Button */}
          <Link to="/create-post">
          <button
            type="submit"
            className="text-[var(--text-colour)] p-2 rounded border border-[var(--border-colour)] transition w-full hover:border-2"
            >
            Create Post
          </button>
          </Link>
        </div>
        {/* Delete / Sign Out */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full text-sm font-semibold text-red-500 mt-4 gap-2 sm:gap-0">
          <span onClick={() => setIsDeletePopOpen(true)} className="cursor-pointer hover:text-red-600 transition-colors">
            Delete Account
          </span>
          <span onClick={signout} className="cursor-pointer hover:text-red-600 transition-colors">
            Sign Out
          </span>
        </div>
      </form>
      {isDeletePopOpen && <Deleteuserpop  setIsDeletePopOpen={setIsDeletePopOpen} />}
    </div>
  );
};

export default Dashprofile;
