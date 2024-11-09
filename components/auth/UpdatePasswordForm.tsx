"use client";
import { UpdatePasswordSchema } from "@/schemas";
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
import { passwordUpdate } from "@/actions/password-update";
import { useSearchParams } from "next/navigation";

const defaultValues = {
    password: "",
    passwordConfirm: "",
};

export const UpdatePasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const form = useForm<zod.infer<typeof UpdatePasswordSchema>>({
        resolver: zodResolver(UpdatePasswordSchema),
        defaultValues,
    });
    const params = useSearchParams();
    const token = params.get("token");
    const onSubmit = (values: zod.infer<typeof UpdatePasswordSchema>) => {
        setError(undefined);
        setSuccess(undefined);
        startTransition(() => {
            if (!token) {
                return setError("Token not found");
            }
            passwordUpdate(token, values).then((data) => {
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New password</FormLabel>
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
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
