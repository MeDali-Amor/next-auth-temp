"use client";
import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";

export const ResetForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);

    const [success, setSuccess] = useState<string | undefined>(undefined);
    const form = useForm<zod.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit = (values: zod.infer<typeof ResetSchema>) => {
        setError(undefined);
        setSuccess(undefined);
        startTransition(() => {
            reset(values).then((data) => {
                setSuccess(data?.success);
                setError(data?.error);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Forgot your password?"
            backLinkText="Back to "
            backLinkhref="/login"
            backLinklabel="Login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
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
                    </div>

                    {error && <FormError message={error} />}
                    {success && <FormSuccess message={success} />}
                    <Button disabled={isPending} className="w-full">
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
