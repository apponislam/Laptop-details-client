import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const SignIn = () => {
    const { signInUser, googleSignIn, setLoading } = useContext(AuthContext);
    const nvaigate = useNavigate();
    const location = useLocation();
    // console.log(location);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const signInBtn = (data) => {
        console.log(data);
        const { email, password } = data;
        signInUser(email, password)
            .then((result) => {
                console.log(result.user);
                toast.success("login successfully");
                nvaigate(location?.state ? location.state : "/");
            })
            .catch((error) => {
                toast.error("Please enter correct email and password");
                console.log(error);
                setLoading(false);
            });
    };

    const googleSignInBtn = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user);
                toast.success("Login successfully");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                toast.error("Sign In failed");
            });
    };

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Login | AP LAPTOP</title>
            </Helmet>
            <div className=" my-24 flex items-center justify-center">
                <div className="w-96 border border-[#00203f] p-4 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSubmit(signInBtn)}>
                        <div className="mb-4">
                            <input placeholder="Email" type="email" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
                            {errors.email?.type === "required" && (
                                <p className="text-red-600" role="alert">
                                    Email is required
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <input placeholder="Password" type="password" className="input input-bordered w-full border-[#00203f] border text-[#00203f] placeholder:text-[#00203f]" {...register("password", { required: "Password is required" })} aria-invalid={errors.password ? "true" : "false"} />
                            {errors.password && (
                                <p className="text-red-600" role="alert">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <input className="text-white bg-[#00203f] h-auto hover:bg-[#00203f] hover:text-white btn w-full mb-4" type="submit" value="Sign In" />
                    </form>

                    <div>
                        <p className="mb-3">
                            Don not have an Account ??{" "}
                            <Link className="text-blue-600 underline" to="/registration">
                                Please Register
                            </Link>
                        </p>
                        {/* <p className="text-center">{`"Or"`}</p> */}
                        <div className="flex justify-center items-center gap-4">
                            <div className="bg-[#00203f33] h-10 shadow-lg w-10 rounded-full flex justify-center items-center cursor-pointer" onClick={googleSignInBtn}>
                                <FcGoogle className="text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
