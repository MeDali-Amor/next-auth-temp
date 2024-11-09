"use client";
import { register } from "@/actions/register";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CardWrapper from "./CardWrapper";

const defaultValues = {
    email: "",
    password: "",
    username: "",
    passwordConfirm: "",
};

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const form = useForm<zod.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues,
    });
    const onSubmit = (values: zod.infer<typeof RegisterSchema>) => {
        setError(undefined);
        setSuccess(undefined);
        startTransition(() => {
            register(values).then((data) => {
                setSuccess(data.success);
                if (data.success) {
                    form.reset();
                }
                setError(data.error);
            });
        });
    };
    return (
        <CardWrapper
            headerLabel="Create an account"
            backLinkText="Already have an account?"
            backLinkhref="/login"
            backLinklabel="Sign In"
            showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="user 1"
                                        ></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
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
                    </div>
                    {error && <FormError message={error} />}
                    {success && <FormSuccess message={success} />}
                    <Button disabled={isPending} className="w-full">
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
