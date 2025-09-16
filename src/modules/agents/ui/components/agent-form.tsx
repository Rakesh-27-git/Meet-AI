import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AgentGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agentsInsertSchema } from "../../schemas";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";

type Props = {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
};

const AgentForm = ({ onSuccess, onCancel, initialValues }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

        onSuccess?.();
      },

      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },

      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name || "",
      instructions: initialValues?.instructions || "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  function onSubmit(values: z.infer<typeof agentsInsertSchema>) {
    if (isEdit) {
      updateAgent.mutate({ id: initialValues.id, ...values });
    } else {
      createAgent.mutate(values);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g Math tutor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g Math tutor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              variant="ghost"
              type="button"
              disabled={isPending}
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}

          <Button type="submit" disabled={isPending}>
            {isEdit ? "Update" : "Create"}
            {isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AgentForm;
