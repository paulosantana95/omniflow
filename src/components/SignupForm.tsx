import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SignupForm({ onCancel }: { onCancel?: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    document: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!form.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) newErrors.email = "E-mail inválido";
    if (!form.document.trim()) newErrors.document = "CPF/CNPJ é obrigatório";
    else if (!/^\d{11}|\d{14}$/.test(form.document.replace(/\D/g, ""))) newErrors.document = "CPF/CNPJ inválido";
    if (!form.password.trim()) newErrors.password = "Senha é obrigatória";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanForm = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v.trim()])
    );
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    console.log("Form data:", cleanForm);
    alert("Lead enviado com sucesso!");
  };

  const handleCancel = () => {
    setForm({
      name: "",
      email: "",
      document: "",
      password: "",
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-10 w-full max-w-md mx-auto"
    >
      <div className="flex flex-col gap-1">
        <Input
          placeholder="Nome completo ou Empresa"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:border-[1px]"
        />
        <span className={`text-red-500 text-xs mt-1 min-h-[18px] block ${errors.name ? "" : "opacity-0"}`}>
          {errors.name || "placeholder"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:border-[1px]"
        />
        <span className={`text-red-500 text-xs mt-1 min-h-[18px] block ${errors.email ? "" : "opacity-0"}`}>
          {errors.email || "placeholder"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          placeholder="CPF ou CNPJ"
          value={form.document}
          onChange={(e) => setForm({ ...form, document: e.target.value })}
          className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:border-[1px]"
        />
        <span className={`text-red-500 text-xs mt-1 min-h-[18px] block ${errors.document ? "" : "opacity-0"}`}>
          {errors.document || "placeholder"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:border-[1px]"
        />
        <span className={`text-red-500 text-xs mt-1 min-h-[18px] block ${errors.password ? "" : "opacity-0"}`}>
          {errors.password || "placeholder"}
        </span>
      </div>

      <div className="flex flex-row gap-4 mt-6">
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 border-0 cursor-pointer"
        >
          Criar Conta
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-red-500 text-red-600 hover:bg-red-50 cursor-pointer"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
