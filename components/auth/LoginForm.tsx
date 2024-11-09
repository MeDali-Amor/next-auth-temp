"use client";
import React, { useMemo, useState, useTransition } from "react";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { login } from "@/actions/login";
import useAuthError from "@/hooks/useAuthError";
import Link from "next/link";

export const LoginForm = () => {
    const [show2FA, setShow2FA] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const { urlError } = useAuthError();
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const form = useForm<zod.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = (values: zod.infer<typeof LoginSchema>) => {
        setError(undefined);
        setSuccess(undefined);
        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error);

                    setSuccess(data?.success);

                    if (data.twoFA) {
                        setShow2FA(true);
                    }
                })
                .catch(() => {
                    setError("Opps, something went wrong!");
                });
        });
    };
    const authError = useMemo(() => error ?? urlError, [error, urlError]);
    return (
        <CardWrapper
            headerLabel="Welcome back"
            backLinkText="Not registered yet?"
            backLinkhref="/register"
            backLinklabel="Sign Up"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {!show2FA ? (
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                placeholder="email@email.com"
                                            ></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                type="password"
                                                {...field}
                                                placeholder="******"
                                            ></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full text-end">
                                <Link
                                    href={"/reset"}
                                    className=" text-sm  text-gray-700 underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="code2FA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="w-full text-center text-gray-600 font-semibold">
                                            Enter your 2 Factor confirmation
                                            code
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                            ></Input>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {authError && <FormError message={authError} />}
                    {success && <FormSuccess message={success} />}
                    <Button disabled={isPending} className="w-full">
                        {show2FA ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
