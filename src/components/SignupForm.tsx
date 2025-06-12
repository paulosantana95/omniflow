import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { n8n } from "@/lib/axios";

export function SignupForm({ onCancel }: { onCancel?: () => void }) {
  const [form, setForm] = useState({
    companyName: "",
    name: "",
    email: "",
    whatsapp: "",
    document: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!form.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/^([\w-.]+)@([\w-]+\.)+[\w-]{2,}$/.test(form.email.trim())) newErrors.email = "E-mail inválido";
    if (!form.document.trim()) newErrors.document = "CPF/CNPJ é obrigatório";
    else {
      const doc = form.document.replace(/\D/g, "");
      if (!(validateCPF(doc) || validateCNPJ(doc))) newErrors.document = "CPF/CNPJ inválido";
    }
    if (!form.password.trim()) newErrors.password = "Senha é obrigatória";
    return newErrors;
  };

  // Validação de CPF
  function validateCPF(cpf: string): boolean {
    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let check = 11 - (sum % 11);
    if (check === 10 || check === 11) check = 0;
    if (check !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    check = 11 - (sum % 11);
    if (check === 10 || check === 11) check = 0;
    return check === parseInt(cpf.charAt(10));
  }

  // Validação de CNPJ
  function validateCNPJ(cnpj: string): boolean {
    if (cnpj.length !== 14 || /^([0-9])\1+$/.test(cnpj)) return false;
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanForm = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v.trim()])
    );
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const payload = {
      status: "active",
      name: cleanForm.companyName,
      maxUsers: 2,
      maxConnections: 1,
      email: cleanForm.email,
      identity: cleanForm.document,
      password: cleanForm.password,
      userName: cleanForm.name,
      profile: "admin",
      acceptTerms: acceptTerms,
      wppNumber: cleanForm.whatsapp
    };

    try {
      await n8n.post('/create-tenant', payload);
      toast.success("Conta criada com sucesso! Em breve entraremos em contato.");
      if (onCancel) onCancel();
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente mais tarde.");
      console.error("Erro ao criar conta:", error);
    }
  };

  const handleCancel = () => {
    setForm({
      companyName: "",
      name: "",
      email: "",
      whatsapp: "",
      document: "",
      password: "",
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [field]: _omit, ...rest } = prev;
      return rest;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-10 w-full max-w-md mx-auto"
    >
      <div className="flex flex-col gap-1">
        <Input
          placeholder="Nome completo ou Empresa"
          value={form.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          className="focus-visible:border-green-500 focus-visible:ring-1 focus-visible:ring-green-500/50"
        />
        <span className={`text-red-500 text-xs mt-1 min-h-[18px] block ${errors.name ? "" : "opacity-0"}`}>
          {errors.name || "placeholder"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          placeholder="Nome do responsável"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="focus-visible:border-green-500 focus-visible:ring-1 focus-visible:ring-green-500/50"
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
          onChange={(e) => handleChange("email", e.target.value)}
          className="focus-visible:border-green-500 focus-visible:ring-1 focus-visible:ring-green-500/50"
        />
        <span className={`text-red-500 text-xs mt-1 min-h-[18px] block ${errors.email ? "" : "opacity-0"}`}>
          {errors.email || "placeholder"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          type="phone"
          placeholder="Whatsapp para contato - Ex: 5582992219999"
          value={form.whatsapp}
          onChange={(e) => handleChange("whatsapp", e.target.value)}
          className="focus-visible:border-green-500 focus-visible:ring-1 focus-visible:ring-green-500/50"
        />
        <span className={`text-red-500 text-xs mt-1 min-h-[18px] block ${errors.email ? "" : "opacity-0"}`}>
          {errors.email || "placeholder"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          placeholder="CPF ou CNPJ"
          value={form.document}
          onChange={(e) => handleChange("document", e.target.value)}
          className="focus-visible:border-green-500 focus-visible:ring-1 focus-visible:ring-green-500/50"
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
          onChange={(e) => handleChange("password", e.target.value)}
          className="focus-visible:border-green-500 focus-visible:ring-1 focus-visible:ring-green-500/50"
        />
        <span className={`text-red-500 text-xs mt-1 min-h-[18px] block ${errors.password ? "" : "opacity-0"}`}>
          {errors.password || "placeholder"}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2">
          <Checkbox
            id="accept-terms"
            name="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={checked => setAcceptTerms(checked === true)}
            className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
          />
          <span>Li e aceito os termos de uso</span>
        </label>
        <span className={`text-red-500 text-xs mt-1 min-h-[18px] block ${!acceptTerms ? "" : "opacity-0"}`}>
          {!acceptTerms ? "Você deve aceitar os termos" : "placeholder"}
        </span>
      </div>

      <div className="flex flex-row gap-4 mt-6">

        <Button
          type="button"
          variant="outline"
          className="flex-1 border-red-500 text-primary cursor-pointer"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={!acceptTerms || Object.keys(errors).length > 0}
          className="flex-1 bg-gradient-to-br from-green-500 to-blue-500 text-primary font-semibold shadow hover:from-green-600 hover:to-blue-600 border-0 cursor-pointer"
        >
          Criar Conta
        </Button>
      </div>
    </form>
  );
}
