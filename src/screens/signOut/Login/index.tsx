import React from "react";
import { Helmet } from "react-helmet-async";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useLogin } from "./useLogin";

export const Login: React.FC = () => {
  const userSchema = z.object({
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  });
  type NewCycleFormData = z.infer<typeof userSchema>;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(userSchema),
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: useLogin,
  });

  const onSubmit = async (data: NewCycleFormData) => {
    try {
      await authenticate({ email: data.email });
      toast.success("Enviamos um link de autenticação para o seu email", {
        action: {
          label: "Reenviar",
          onClick: () => onSubmit(data),
        },
      });
    } catch (error) {
      toast.error("Credenciais inválidas");
    }
  };

  return (
    <>
      <Helmet title="Login" />
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/sign-up">Novo estabelecimento</Link>
      </Button>
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel{" "}
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel parceiro
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`${errors.email && "border-none"}`}
              />
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            </div>
            <Button className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
